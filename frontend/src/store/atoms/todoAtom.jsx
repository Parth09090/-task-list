import axios from "axios";
import { atomFamily, selector, selectorFamily } from "recoil";

export const todoAtomFamily = atomFamily({
    key : "todoAtomFamily",
    default : selectorFamily({
        key : "todoAtom",
        get: (id) => async () => {
            try {
                const response = await axios.get("http://localhost:3000/todos");
                console.log("Fetched todos:", response.data);
                return response.data;
            } catch (error) {
                console.error("Error fetching todos:", error);
                return [];
            }
        },
        
    })
})