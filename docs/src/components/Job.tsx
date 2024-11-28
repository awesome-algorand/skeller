"use client";

import {getStream} from "@/lib/nomad/event";
import {getFsLogs} from "@/lib/nomad/client";
import {useEffect, useState} from "react";
import {QueryClient, QueryClientProvider, useQuery, useQueryClient} from "@tanstack/react-query";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {CollapsibleCard} from "@/components/CollapsibleCard.tsx";
import {useXTerm} from "react-xtermjs";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

type Job = {
    Stop: boolean;
    Region: string;
    Namespace: string;
    ID: string;
    ParentID: string;
    Name: string;
    Type: string;
    Priority: number;
    AllAtOnce: boolean;
    Datacenters: string[];
    NodePool: string;
    Status: string;
    SubmitTime: number;
}
type Event = {
    Index: number;
    Topic: string;
    Type: string;
    Key: string;
    Namespace: string;
    Payload: any;
    FilterKeys: string[];
}
type EventStream = {
    Index: number;
    Events: Event[];
}

const queryClient = new QueryClient()

function useAllocationLogSubscription(allocationId: string){
    const queryClient = useQueryClient()
    const key = [allocationId,  "terminal"]
    useEffect(() => {
        getFsLogs(`/api/scheduler`, {allocationId}, (d)=>{
            console.log(d)
            queryClient.setQueryData(key, d);
        }, ()=>{
            console.log('Goodbye')
        })
    }, [queryClient])
}

export function JobTerminal({allocationId}: {allocationId: string}) {
    // const allocations = await fetch( `/api/scheduler/v1/job/${job.Name}/allocations`).then(r=>r.json())
    const { instance, ref } = useXTerm()
    useAllocationLogSubscription(allocationId)
    const {data, isLoading} = useQuery({
        queryKey: [`${allocationId}`, "terminal"],
    })

    data && instance?.writeln(data.toString())
    instance?.onData((data) => instance?.write(data))

    return <div ref={ref} style={{ width: '100%', height: '100%' }} />
}

function useJobEventSubscription(name: string){
    const queryClient = useQueryClient()
    useEffect(() => {
        let _logs: any[] = []
        let _key = [[name]]
        getStream("/api/scheduler", (stream)=>{
            console.log('got message')
            if(typeof stream.Events !== 'undefined' && stream.Events.length > 0){
                for(let i = 0; i < stream.Events.length; i++){
                    if(stream.Events[i].FilterKeys && stream.Events[i].FilterKeys.includes(name)) {
                        // if(!_logs.some(log => log.Key === stream.Events[i].Key))
                            _logs.push(stream.Events[i]);
                    }
                }
                queryClient.setQueryData(_key, _logs);

            }
        }, ()=>{
            console.log('closed')
        }).catch(console.error)
    }, [queryClient])
    return useQuery<Event[]>({
        queryKey: [[name]]
    })
}

function JobEvent({event}: {event: Event}){
    return (
        <Card>
            <CardHeader>
                <div className="flex"><CardTitle className="flex-1">Topic: {event.Topic}</CardTitle></div>
                <CardDescription>Type: {event.Type} | Namespace: {event.Namespace}</CardDescription>
            </CardHeader>
            <CardContent>
                <p><strong>Filer Keys:</strong> {event.FilterKeys.join(', ')}</p>
            </CardContent>
        </Card>
    )
}
function JobApp({job}: {job: Job} ) {
    const jobEvent = useJobEventSubscription(job.Name)

    const allocations = useQuery<any>({
        queryKey: [[job.Name, "allocations"]],
        queryFn: ()=>fetch( `/api/scheduler/v1/job/${job.Name}/allocations`).then(r=>r.json())
    })

    return (
            <div className="job">
                {allocations.data && <JobTerminal allocationId={allocations.data[0].ID as string}/>}
                <CollapsibleCard title="Events">
                {jobEvent.data?.map((e)=><JobEvent key={`${e.Index}-${e.Key}`} event={e}/>)}
                </CollapsibleCard>
            </div>
    )
}
export function Job({ job }: {job: Job}) {
    return (
        <QueryClientProvider client={queryClient}>
            <JobApp job={job}/>
            <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    )
}
