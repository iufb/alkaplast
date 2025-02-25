const backendUrl = import.meta.env.VITE_BACKENDURL
interface CRequest {
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "UPDATE";
    query?: URLSearchParams | Record<string, any>;
    body?: { json?: Record<string, any>; multipart?: Record<string, any> };
}
export const customFetch = async (params: CRequest) => {
    const url = new URL(`/api/${params.path}`, backendUrl);
    url.search =
        params.query instanceof URLSearchParams
            ? params.query.toString()
            : new URLSearchParams(params.query).toString();
    let body = null;
    if (params.body?.json) {
        body = JSON.stringify(params.body?.json);
    }
    if (params.body) {
        if (params.body.multipart) {
            const formData = new FormData()
            const data = params.body.multipart
            Object.keys(data).forEach((key) => {
                const value = data[key]
                formData.append(key, value)
            })
            console.log(data)
            console.log(formData)
            body = formData
        }
    }
    const headers = new Headers();
    if (params.body?.json) {
        headers.set("Content-Type", "application/json");
    }
    const token = localStorage.getItem('access')
    if (token) {
        headers.set("Authorization", 'Bearer ' + token);
    }

    const response = await fetch(url, {
        method: params.method,
        body,
        cache: "no-store",
        headers,
    });
    const isJson =
        response.headers.get("content-type")?.includes("application/json") &&
        params.method !== "DELETE";
    if (response.ok) {
        if (isJson) {
            return response.json();
        }
        return response.text();
    }
    if (isJson) {
        throw await response.json();
    }
    if (response.status === 404) {
        throw { message: `notFound ${params.path}` };
    }
};
