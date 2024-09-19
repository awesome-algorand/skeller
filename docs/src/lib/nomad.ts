// http://127.0.0.1:4646/v1/agent/members

export function getMembers(baseUrl: string): Promise<any> {
  return fetch(`${baseUrl}/v1/agent/members`).then((res) => res.json());
}

///agent/servers
// TODO: POST
// CLIENT ONLY
export function getServers(baseUrl: string): Promise<any> {
  return fetch(`${baseUrl}/v1/agent/servers`).then((res) => res.text());
}

///agent/self

export function getSelf(baseUrl: string): Promise<any> {
  return fetch(`${baseUrl}/v1/agent/self`).then((res) => res.json());
}

///agent/join - POST TODO SERVER ONLY
///agent/force-leave - POST TODO SERVER ONLY

///agent/health

export function getHealth(baseUrl: string): Promise<any> {
    return fetch(`${baseUrl}/v1/agent/health`).then((res) => res.json());
}

export function getNamespaces(baseUrl: string): Promise<any> {
    return fetch(`${baseUrl}/v1/namespaces`).then((res) => res.json());
}

export function getNamespaceById(baseUrl: string, id: string): Promise<any> {
    return fetch(`${baseUrl}/v1/namespace/${id}`).then((res) => res.json());
}

export function createNamespace(baseUrl: string, body: any): Promise<any> {
    return fetch(`${baseUrl}/v1/namespace`, {
        method: "POST",
        body: JSON.stringify(body),
    }).then((res) => res.json());
}

export function updateNamespace(baseUrl: string, id: string, body: any): Promise<any> {
    return fetch(`${baseUrl}/v1/namespace/${id}`, {
        method: "POST",
        body: JSON.stringify(body),
    }).then((res) => res.json());
}
