import { LoadingSpinner } from '@/components/common/LoadingSpinner.tsx'
import { useEffect, useState } from 'react'
import { getHuts } from '@/services/Huts.ts'
import { SearchState, SortMethod } from '@/types/Constants.ts'
import HutList from '@/components/huts/HutList.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ChevronsUpDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input.tsx'
import { Separator } from '@/components/ui/separator.tsx'

const BrowseHuts = () => {
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState<
    ApiResponse<HutSearchResponse>
  >({
    content: {
      categories: [],
      results: [],
    },
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
  const sortMethods: { title: string; sortMethod: SortMethod }[] = [
    {
      title: 'Name (Ascending)',
      sortMethod: SortMethod.ALPHABETICAL_ASC,
    },
    {
      title: 'Name (Descending)',
      sortMethod: SortMethod.ALPHABETICAL_DESC,
    },
    {
      title: 'Category (Great Walks - Basic)',
      sortMethod: SortMethod.CATEGORY_ASC,
    },
    {
      title: 'Category (Basic - Great Walks)',
      sortMethod: SortMethod.CATEGORY_DESC,
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev) => ({ ...prev, query: query }))
    }, 500) // 500ms delay to debounce

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    const fetchHuts = async () => {
      setSearchResult((prevState) => ({
        ...prevState,
        state: SearchState.LOADING,
      }))
      getHuts(searchParams).then(
        (response) => {
          setSearchResult({ content: response, state: SearchState.SUCCESS })
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_error) => {
          setSearchResult((prevState) => ({
            ...prevState,
            state: SearchState.ERROR,
          }))
        }
      )
    }
    document.title = 'Browse Huts'
    fetchHuts()
  }, [searchParams])

  const searchHeader = () => {
    return (
      <header className="w-full flex h-4 shrink-0 mt-5 gap-1 mb-4 pb-2 border-b items-end">
        <div className="flex w-full max-w-sm items-center gap-2">
          <Input
            key="search-input"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
        <div className="flex gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                role="combobox"
                className="w-[250px] justify-between"
              >
                Select Categories...
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[200px] p-0"
              side="bottom"
              align="start"
            >
              <DropdownMenuLabel>Hut Categories</DropdownMenuLabel>
              <Separator />
              {searchResult.content.categories.map((category) => (
                <DropdownMenuCheckboxItem
                  checked={searchParams.categories.includes(category.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSearchParams((prevState) => ({
                        ...prevState,
                        categories: [...prevState.categories, category.id],
                      }))
                    } else {
                      setSearchParams((prevState) => ({
                        ...prevState,
                        categories: prevState.categories.filter(
                          (id) => id !== category.id
                        ),
                      }))
                    }
                  }}
                >
                  {category.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                role="combobox"
                className="w-[250px] justify-between"
              >
                {
                  sortMethods.find(
                    (method) => method.sortMethod === searchParams.sortMethod
                  )?.title
                }
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[200px] p-0"
              side="bottom"
              align="start"
            >
              <DropdownMenuRadioGroup
                value={searchParams.sortMethod}
                onValueChange={(newMethod) =>
                  setSearchParams((prevState) => ({
                    ...prevState,
                    sortMethod: newMethod,
                  }))
                }
              >
                {sortMethods.map((method) => (
                  <DropdownMenuRadioItem
                    key={method.title}
                    value={method.sortMethod}
                  >
                    {method.title}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    )
  }

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
        return (
          <div className="w-full h-full">
            <HutList huts={searchResult.content.results} />
          </div>
        )
      case SearchState.ERROR:
        return (
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Failed to fetch huts. Please try again later.
          </h4>
        )
    }
  }

  return (
    <div className="flex flex-1 flex-col p-4 items-center">
      {searchHeader()}
      {content()}
    </div>
  )
}

export default BrowseHuts
