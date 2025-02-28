import { customFetch } from "@/shared/api"

export const rCreateApplication = (data: any) => {
    return customFetch({
        method: "POST", path: 'user/requests/', body: { json: data },
    })
}
export const rGetUserApplications = () => {
    return customFetch({
        method: "GET", path: 'user/requests',
    })
}
export const rGetManagerApplications = () => {
    return customFetch({
        method: "GET", path: 'manager/requests',
    })

}
export const rFinishApplication = (id: number) => {
    return customFetch({
        method: "PATCH", path: 'master/details/',
        query: { detail_id: id }
    })

}
export const rGetMasterApplications = async () => {
    const details: any[] = (await customFetch({
        method: "GET", path: 'master/details',
    })).filter((d: any) => d.measurement_date == null)
    const promises: Promise<any>[] = []
    details.forEach(d => {
        promises.push(customFetch({
            method: "GET", path: 'master/get-request/',
            query: { request_id: d.request_id }
        }))
    })
    const full = await Promise.all(promises)
    return details.map((d, idx) => ({
        ...d, ...full[idx]
    }))
}
