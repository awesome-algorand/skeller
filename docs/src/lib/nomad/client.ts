// /v1/event/stream
import {type StreamCallback} from "@/lib/utils.ts";


export function getFsLogs(
    baseUrl: string,
    data: {
        allocationId: string,
        offset?: number,
    },
    onMessage: StreamCallback,
    onClose: VoidFunction
): Promise<any> {
    return fetch(`${baseUrl}/v1/client/fs/logs/${data.allocationId}?follow=true&offset=${data.offset || 0}&origin=start&task=web&type=stdout&plain=true`)
        .then(readLogStream(onMessage))
        .then(onClose);
}
const decoder = new TextDecoder();
export const readLogStream = (processLine: StreamCallback) => (response: Response) => {
    if(!response.body) return
    const stream = response.body.getReader();
    const loop = () =>
        stream.read().then<any>(({ done, value }) => {
            processLine(decoder.decode(value, {
                stream: true
            }))
        });
    return loop();
}
