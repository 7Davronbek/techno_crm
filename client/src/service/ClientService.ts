import axios from "@/config"
import IClientType from "../types/IClientType.ts";

class ToolService {
    async getAllAccountant() {
        return await axios.get<Array<IClientType>>("/client/accountant");
    }

    async getAllSpecialist() {
        return await axios.get<Array<IClientType>>("/client/specialist");
    }

    async getAll() {
        return await axios.get<Array<IClientType>>("/client");
    }

    async getAllReceiver() {
        return await axios.get<Array<IClientType>>("/receiver");
    }

    async get(id: number) {
        return await axios.get<IClientType>(`/client/${id}`);
    }

    async updateStatusPayment(id: number) {
        return await axios.post("/client/accountant/" + id);
    }

    async updateStatusPayment(id: number) {
        return await axios.post("/client/accountant/" + id);
    }

    async create(data: IClientType) {
        return await axios.post<IClientType>("/client", data);
    }

    async createTool(data: number[], id: number) {
        return await axios.post<IClientType>("/client/add-tool/" + id, data);
    }

    async update(data: IClientType, id: number | undefined) {
        return await axios.put<IClientType>(`/client/${id}`, data);
    }

    async delete(id: number | undefined) {
        return await axios.delete(`/client/${id}`);
    }

}

export default new ToolService();