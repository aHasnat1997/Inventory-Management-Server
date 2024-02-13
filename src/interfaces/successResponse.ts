// success response type
export type TSuccessResponse<T> = {
    success?: boolean,
    message: string,
    meta?: object
    doc: T | T[] | null
}