import axios from "@/config"
import IDocumentType from "../types/IDocumentType.ts";

class DocService {
    async getAll() {
        return await axios.get<Array<IDocumentType>>("/doc");
    }

    async get(id: number) {
        return await axios.get<IDocumentType>(`/doc/${id}`);
    }

    async create(data: IDocumentType) {
        return await axios.post<IDocumentType>("/doc", data);
    }

    async update(data: IDocumentType, id: number | undefined) {
        return await axios.put<IDocumentType>(`/doc/${id}`, data);
    }

    async delete(id: number | undefined) {
        return await axios.delete(`/doc/${id}`);
    }

}

export default new DocService();