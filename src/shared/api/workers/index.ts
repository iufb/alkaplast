import { customFetch } from "@/shared/api"

export const rGetMasters = async () => {
    const workers: any[] = await customFetch({ path: "manager/masters", method: "GET" })
    const statsPromises: Promise<any>[] = []
    workers.forEach((w: { id: number }) => {
        statsPromises.push(customFetch({ path: "manager/get-master-info/", method: "GET", query: { worker_id: w.id } }))
    })
    const stats = await Promise.all(statsPromises)
    return workers.map((w, idx) => ({
        ...w,
        ...stats[idx]
    }))
}

export const rChainMaster = (body: any) => {
    return customFetch({ path: "manager/details/", method: "POST", body: { json: body } })
}
