import { customFetch } from "@/shared/api"
import dayjs from "dayjs"

export const rCreateProduct = (body: any) => {
    return customFetch({ method: "POST", path: "items/", body: { multipart: body } })
}
export const rGetProducts = () => {
    return customFetch({ method: "GET", path: "items/", })
}
export const rGetMasterProducts = () => {
    return customFetch({ method: "GET", path: "master/get-items/", })
}
export const rPatchProduct = ({ id, count }: { id: number, count: number }) => {
    return customFetch({ method: "PATCH", path: `items/${id}/`, body: { multipart: { count } } })
}

export const rMasterRequest = ({ data, detail_id }: { data: Record<string, number>, detail_id: number }) => {
    const promises: Promise<any>[] = []
    Object.keys(data).forEach(key => {
        promises.push(customFetch({
            method: "POST", path: "master/request-items/", body: {
                json: {
                    detail_id: detail_id, item_id: key, count: data[key], "installation_date": dayjs(new Date()).format('YYYY-MM-DD')
                }
            }
        }))
    })
    return Promise.all(promises)
}
