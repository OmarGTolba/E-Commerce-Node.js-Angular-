export interface IUser {
    name: string,
    email: string,
    phone?: string,
    address?: string
}

export interface ApiResponse {
    data: any[];
}