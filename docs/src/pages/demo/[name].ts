import type { APIRoute } from "astro";

import {postJobsParse} from "@/lib/nomad/jobs.ts";
import HelloWorld from '@/templates/algod-localnet.hcl?raw';

export const GET: APIRoute = async ({params}) => {
    const response = await postJobsParse("http://localhost:4646", {
        "JobHCL": HelloWorld.replace('algod-localnet', params.name as string)
    })
    return new Response(
        JSON.stringify({"Job": response}),
        {
            headers: {
                "content-type": "application/json"
            }
        }
    )
}
