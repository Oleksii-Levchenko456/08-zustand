import axios from "axios"
import type { Note } from "@/types/note"
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

export interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
}

export const fetchNotes = async (page: number, perPage: number, search?: string, tag?: string): Promise<FetchNotesResponse> => {
    const res = await axios.get<FetchNotesResponse>('https://notehub-public.goit.study/api/notes', {
        params: {
            page,
            perPage,
            search,
            tag
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return (
        res.data
    )
}

export const getSingleNote = async (id: string): Promise<Note> => {
    const res = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export interface requestBodyData {
    "title": string,
    "content": string,
    "tag": string
}

export const createNote = async (requestBody: requestBodyData): Promise<Note> => {
    const res = await axios.post<Note>('https://notehub-public.goit.study/api/notes',
        requestBody,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data
}

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}
