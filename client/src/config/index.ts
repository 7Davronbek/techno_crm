import axios from "axios";
import {TOKEN} from "@/constants"

export default axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer `,
        "id": localStorage.getItem(TOKEN)
    }
});