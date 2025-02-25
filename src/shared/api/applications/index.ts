import { customFetch } from "@/shared/api"

export const rCreateApplication = (data: any) => {
    return customFetch({
        method: "POST", path: 'user/requests/', body: { json: data },
    })
}
export const rGetUserApplications = () => {
    console.log('wokrs')
    return customFetch({
        method: "GET", path: 'user/requests',
    })
}
