import {
    SITE_AUTHOR,
    SITE_DESCRIPTION,
    SITE_TITLE,
    SITE_URL,
} from '@/consts.ts'


export async function GET() {
    const jobs = await fetch('http://localhost:4646/v1/jobs').then(res => {
        if (res.ok) {
            return res.json()
        }
        return null
    }).catch(() => null)
    const nodes = await fetch('http://localhost:4646/v1/nodes').then(res => {
        if (res.ok) {
            return res.json()
        }
        return null
    }).catch(() => null)
    const pools = await fetch('http://localhost:4646/v1/node/pools').then(res => {
        if (res.ok) {
            return res.json()
        }
        return null
    }).catch(() => null)
    const metrics = await fetch('http://localhost:4646/v1/metrics').then(res => {
        if (res.ok) {
            return res.json()
        }
        return null
    }).catch(() => null)
    const plugins = await fetch('http://localhost:4646/v1/plugins').then(res => {
        if (res.ok) {
            return res.json()
        }
        return null
    }).catch(() => null)
    const regions = await fetch('http://localhost:4646/v1/regions').then(res => {
        if (res.ok) {
            return res.json()
        }
        return null
    }).catch(() => null)
    const services = await fetch('http://localhost:4646/v1/services').then(res => {
        if (res.ok) {
            return res.json()
        }
        return null
    }).catch(() => null)
    const leader = await fetch('http://localhost:4646/v1/status/leader').then(res => {
        if (res.ok) {
            return res.json()
        }
        return null
    }).catch(() => null)
    const peers = await fetch('http://localhost:4646/v1/status/peers').then(res => {
        if (res.ok) {
            return res.json()
        }
        return null
    }).catch(() => null)
    return new Response(
        JSON.stringify({
            name: SITE_TITLE,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            author: SITE_AUTHOR,
            nomad: {
                nodes: nodes.length,
                pools: pools.length,
                plugins: plugins.length,
                regions: regions.length,
                services: services.length,
                jobs: jobs.length,
                leader: !!leader,
                peers: peers ? peers.length : 0
            }
        }),
        {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        }
    )
}
