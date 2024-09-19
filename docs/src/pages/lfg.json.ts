import {postJobsParse} from "../lib/nomad/jobs.ts";
import HelloWorld from '../templates/hello-world.hcl?raw';
console.log(import.meta.env)
export async function GET() {
    const response = await postJobsParse("http://localhost:4646", {
        "JobHCL": HelloWorld.replace('hello-world', 'lets-fucking-go')
    })

    console.log(response)


    return new Response(
        JSON.stringify({"Job": response})
    )
}
