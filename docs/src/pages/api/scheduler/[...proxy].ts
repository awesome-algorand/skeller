import type { APIRoute } from "astro";

const getProxyUrl = (request: Request) => {
    const proxyUrl = new URL("http://localhost:4646");
    const requestUrl = new URL(request.url);
    const path = requestUrl.pathname.replace(/^\/api\/scheduler/, '')
    return new URL(`${path}?${requestUrl.searchParams}`, proxyUrl);
};

export const ALL: APIRoute = async ({ request, locals }) => {
    if (!locals.auth().userId) {
        return new Response('Unauthorized', { status: 401 })
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
