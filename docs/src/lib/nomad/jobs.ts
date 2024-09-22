// /v1/jobs

export function getJobs(baseUrl: string): Promise<any> {
  return fetch(`${baseUrl}/v1/jobs`).then((res) => res.json());
}
export function getJobById(baseUrl: string, id: string): Promise<any> {
    return fetch(`${baseUrl}/v1/job/${id}`).then((res) => {
        if (res.status === 404) {
            return null;
        }
        return res.json();
    });
}
export function postJobs(baseUrl: string, body: any): Promise<any> {
  return fetch(`${baseUrl}/v1/jobs`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => res.json());
}
export function postJobsParse(baseUrl: string, body: any): Promise<any> {
  return fetch(`${baseUrl}/v1/jobs/parse`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => res.json());
}
