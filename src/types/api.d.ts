interface ApiResponse<T> {
    detail?: string
    data: T
    code: number
    total?: number
}