import { useMutation, useQuery } from "react-query"

export const useQ = ({ fn, qKey, params, onSuccess, onError }: { fn: (...args: any) => Promise<any>, qKey: string, params: any, onSuccess?: (data: any) => void, onError?: (err: unknown) => void }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [qKey], queryFn: async () => {
            const data = await fn(...params)
            return data
        },
        onSuccess, onError
    })
    return { data, isLoading, isError }
}

export const useM = ({ fn, mKey, onSuccess, onError }: { fn: (...args: any) => Promise<any>, mKey: string, onSuccess?: (data: any) => void, onError?: (err: unknown) => void }) => {
    const { mutate, isLoading, isError } = useMutation({ mutationKey: [mKey], mutationFn: fn, onSuccess, onError })
    return { mutate, isLoading, isError }
}
