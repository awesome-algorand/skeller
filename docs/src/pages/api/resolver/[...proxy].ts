import type { APIRoute } from "astro";
import {getSession} from "auth-astro/server.ts";

const getProxyUrl = (request: Request) => {
    const proxyUrl = new URL("http://localhost:5600");
    const requestUrl = new URL(request.url);

    return new URL(requestUrl.pathname.replace(/^\/api\/resolver/, ''), proxyUrl);
};

export const ALL: APIRoute = async ({ request }) => {
    const session = await getSession(request);
    if (!session) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }
    const proxyUrl = getProxyUrl(request);
    const response = await fetch(proxyUrl.href, request);
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
            "content-type": response.headers.get("content-type") || "",
        },
    });
};
