import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar.tsx'
import SearchSidebar2 from '@/components/common/Sidebar2.tsx'
import { LoadingSpinner } from '@/components/common/LoadingSpinner.tsx'
import { useEffect, useState } from 'react'
import { getHuts } from '@/services/Huts.ts'
import { SearchState, SortMethod } from '@/types/Constants.ts'
import HutList from '@/components/huts/HutList2.tsx'

const BrowseHuts2 = () => {
  const [searchResult, setSearchResult] = useState<ApiResponse>({
    content: {
      categories: [],
      results: [],
    } satisfies HutSearchResponse,
    state: SearchState.LOADING,
  })
  const [searchParams, setSearchParams] = useState<{
    query: string
    categories: number[]
    sortMethod: string
  }>({
    query: '',
    categories: [],
    sortMethod: SortMethod.ALPHABETICAL_ASC,
  })

  useEffect(() => {
    const fetchHuts = async () => {
      getHuts(searchParams).then(
        (response) => {
          setSearchResult({ content: response, state: SearchState.SUCCESS })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        },
        (_error) => {
          setSearchResult({ ...searchResult, state: SearchState.ERROR })
        }
      )
    }
    document.title = 'Browse Huts'
    fetchHuts()
  }, [])

  const content = () => {
    switch (searchResult.state) {
      case SearchState.LOADING:
        return (
          <div className="flex flex-col items-center h-full justify-center">
            <LoadingSpinner className="mr-2 h-5 w-5 animate-spin" />
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Loading Huts...
            </h4>
          </div>
        )
      case SearchState.SUCCESS:
        return <HutList huts={searchResult.content.results} />
      case SearchState.ERROR:
        return (
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Failed to fetch huts. Please try again later.
          </h4>
        )
    }
  }

  return (
    <SidebarProvider>
      <SearchSidebar2 />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 items-center">
          {content()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default BrowseHuts2
