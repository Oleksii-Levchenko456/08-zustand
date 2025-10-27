import { fetchNotes } from "@/lib/api"
import NotesClient from "./Notes.client"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { Metadata } from "next"

interface GenerateMetaDataProps {
    params: { slug: string }
}

export const generateMetadata = async ({ params }: GenerateMetaDataProps): Promise<Metadata> => {
    const { slug } = await params

    const tag = slug === undefined ? 'All notes' : slug

    return {
        title: `Tag: ${tag}`,
        description: 'Add new tags!',
        openGraph: {
            title: `Tag: ${slug}`,
            description: 'Add new tags!',
            url: `http://localhost:3000/tag/${slug}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: tag,
                },
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: `Tag: ${slug}`,
            description: 'Add new tags!',
            images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
        },
    }

}

interface Props {
    params: Promise<{ slug: string[] }>
}

const NotesByCategory = async ({ params }: Props) => {
    const { slug } = await params
    const tag = slug[0] === 'all' ? undefined : slug[0]

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['notes', 1, '', tag],
        queryFn: () => fetchNotes(1, 12, '', tag)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>)
}
export default NotesByCategory