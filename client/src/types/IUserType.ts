export default interface IUserType {
    id?: number,
    fullName: string,
    username: string,
    password: string,
    role: string,
    created?: string,
    active?: boolean
}

export enum IUserRole {
    ROLE_ADMIN, ROLE_RECEIVER, ROLE_SPECIALIST, ROLE_ACCOUNTANT, ROLE_STAFF, ROLE_STANDARD
}