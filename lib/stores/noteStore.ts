import { persist } from "zustand/middleware";
import { requestBodyData } from "../api";
import { create } from "zustand";


type NoteDraftStore = {
    draft: requestBodyData;
    setDraft: (note: requestBodyData) => void;
    clearDraft: () => void;
};

const initialDraft: requestBodyData = {
    title: '',
    content: '',
    tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (note) => set(() => ({ draft: note })),
            clearDraft: () => set(() => ({ draft: initialDraft })),
        }
        ),
        {
            name: 'note-draft',
            // Зберігаємо лише властивість draft
            partialize: (state) => ({ draft: state.draft }),
        }
    )
)
