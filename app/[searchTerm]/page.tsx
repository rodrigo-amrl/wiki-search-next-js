import getWikiResults from '@/lib/getWikiResults'
import Item from './components/Item'
type Props = {
    params: {
        searchTerm: string
    }
}
type Result = {
    pageid: number
    title: string
    extract: string
    thumbnail?: {
        source: string
        width: number
        height: number
    }
}

type SearchResult = {
    query?: {
        pages?: {
            [key: string]: Result
        }
    }
}

export async function generateMetadata({ params: { searchTerm } }: Props) {
    const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
    const data = await wikiData
    const displayTerm = searchTerm.replaceAll("%20", "")
    if (!data?.query?.pages)
        return { title: `${displayTerm} not found` }

    return {
        title: displayTerm,
        description: `Search results for ${displayTerm}`
    }
}

export default async function page({ params: { searchTerm } }: Props) {
    const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
    const data = await wikiData
    console.log(data, 20)
    const results: Result[] | undefined = data?.query?.pages
        ? Object.values(data.query.pages)
        : undefined
    const content = (
        <main className='bg-slate-200 text-black mx-auto max-w-lg py-1 min-h-screen'>
            {results ? Object.values(results).map(result => {
                return <Item key={result.pageid} result={result} />
            }) : <h2 className='p-2 text-xl'> {`${searchTerm} Not Found`}</h2>

            }
        </main>
    )
    return content
}