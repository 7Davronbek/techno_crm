import axios from "../config"
import IUserType from "../types/IUserType.ts";

class UserService {
    async getAll() {
        return await axios.get<Array<IUserType>>("/user");
    }

    async get(id: number) {
        return await axios.get<IUserType>(`/user/${id}`);
    }

    async create(data: IUserType) {
        return await axios.post<IUserType>("/user", data);
    }

    async update(data: IUserType, id: number | undefined) {
        return await axios.put<IUserType>(`/user/${id}`, data);
    }

    async delete(id: number | undefined) {
        return await axios.delete(`/user/${id}`);
    }

}

export default new UserService();