import { customFetch } from "@/shared/api";

export const rLogin = (data: any) => {
    return customFetch(
        {
            method: "POST",
            path: "token/",
            body: { json: data },
        },
    );
};
export const rRegister = (data: any) => {
    return customFetch(
        {
            method: "POST",
            path: "register/",
            body: { json: data },
        },
    );
};
export const rCreateWorker = (data: any) => {
    return customFetch({
        method: "POST",
        path: "worker-register/",
        body: { multipart: data }
    })
}

