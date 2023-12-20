export default interface IUserType {
    id?: number,
    fullName: string,
    username: string,
    password: string,
    role: IUserRole,
    created?:  string,
    active?: boolean
}

export enum IUserRole {
    ROLE_ADMIN, ROLE_USER
}