import axios from "@/config"
import {TOKEN} from "@/constants"
import IUserType from "../types/IUserType.ts";

class UserService {

    async get() {
        return await axios.get<IUserType>(`/user/${localStorage.getItem(TOKEN)}`);
    }


}

export default new UserService();