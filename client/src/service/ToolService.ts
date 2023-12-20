import axios from "@/config"
import IToolType from "@/types/IToolType.ts";

class ToolService {
    async getAll() {
        return await axios.get<Array<IToolType>>("/tool");
    }

    async get(id: number) {
        return await axios.get<IToolType>(`/tool/${id}`);
    }

    async create(data: IToolType) {
        return await axios.post<IToolType>("/tool", data);
    }

    async update(data: IToolType, id: number | undefined) {
        return await axios.put<IToolType>(`/tool/${id}`, data);
    }

    async delete(id: number | undefined) {
        return await axios.delete(`/tool/${id}`);
    }

}

export default new ToolService();