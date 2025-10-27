import { getSingleNote } from '@/lib/api'
import NotesPreview from './NotePreview.client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'



type Props = {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const noteId = (await params).id
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['note', noteId],
        queryFn: () => getSingleNote(noteId)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesPreview noteId={noteId} />
        </HydrationBoundary>
    )
}
