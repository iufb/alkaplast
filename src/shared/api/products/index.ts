import { customFetch } from "@/shared/api"

export const rCreateProduct = (body: any) => {
    return customFetch({ method: "POST", path: "items/", body: { multipart: body } })
}
export const rGetProducts = () => {
    return customFetch({ method: "GET", path: "items/", })
}
export const rPatchProduct = ({ id, count }: { id: number, count: number }) => {
    return customFetch({ method: "PATCH", path: `items/${id}/`, body: { multipart: { count } } })
}

