import {http, HttpResponse} from "msw";
import { getStoredTodos } from "./db";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const handlers = [
    http.get(`${API_URL}/todos`, ()=>{
        const todos = getStoredTodos();
        return HttpResponse.json(todos);
    })
];
