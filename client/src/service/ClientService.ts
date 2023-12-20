import axios from "@/config"
import IClientType from "../types/IClientType.ts";

class ToolService {
    async getAll() {
        return await axios.get<Array<IClientType>>("/client");
    }

    async get(id: number) {
        return await axios.get<IClientType>(`/client/${id}`);
    }

    async create(data: IClientType) {
        return await axios.post<IClientType>("/client", data);
    }

    async update(data: IClientType, id: number | undefined) {
        return await axios.put<IClientType>(`/client/${id}`, data);
    }

    async delete(id: number | undefined) {
        return await axios.delete(`/client/${id}`);
    }

}

export default new ToolService();