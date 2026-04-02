import { LoadingSpinner } from '@/components/common/LoadingSpinner.tsx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getHuts } from '@/services/Huts.ts'
import { getHutCategory, SearchState, SortMethod } from '@/types/Constants.ts'
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
import { debounce } from '@/components/common/Util.ts'

const BrowseHuts = () => {
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState<
    ApiResponse<HutSearchResponse>
  >({
    content: {
      categories: [],
      results: [],
      regions: [],
    },
    state: SearchState.LOADING,
  })
  const [searchParams, setSearchParams] = useState<{
    query: string
    categories: number[]
    sortMethod: string
    regions: string[]
  }>({
    query: '',
    categories: [],
    sortMethod: SortMethod.ALPHABETICAL_ASC,
    regions: [],
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

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchParams((prev) => ({ ...prev, query: value }))
    }, 500),
    []
  )

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    debouncedSearch(e.target.value)
  }

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

  const selectedRegionsText = useMemo(() => {
    if (searchParams.regions.length === 0) return 'Select Region...'
    return searchParams.regions
      .map(
        (id) =>
          searchResult.content.regions.find((region) => region.id === id)?.name
      )
      .filter(Boolean)
      .join(', ')
  }, [searchParams.regions, searchResult.content.regions])

  const selectedCategoriesText = useMemo(() => {
    if (searchParams.categories.length === 0) return 'Select Category...'
    return searchParams.categories.map((id) => getHutCategory(id)).join(', ')
  }, [searchParams.categories])

  const handleCategoryToggle = useCallback(
    (categoryId: number, checked: boolean) => {
      setSearchParams((prevState) => ({
        ...prevState,
        categories: checked
          ? [...prevState.categories, categoryId]
          : prevState.categories.filter((id) => id !== categoryId),
      }))
    },
    []
  )

  const handleRegionToggle = useCallback(
    (regionId: string, checked: boolean) => {
      setSearchParams((prevState) => ({
        ...prevState,
        regions: checked
          ? [...prevState.regions, regionId]
          : prevState.regions.filter((id) => id !== regionId),
      }))
    },
    []
  )

  const searchHeader = () => {
    return (
      <header className="w-full flex h-4 shrink-0 mt-5 gap-1 mb-4 pb-2 border-b items-end">
        <div className="flex w-full items-center gap-2">
          <Input
            key="search-input"
            placeholder="Search"
            onChange={handleSearchInput}
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
                <span className="truncate">{selectedRegionsText}</span>
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[200px] p-0"
              side="bottom"
              align="start"
            >
              <DropdownMenuLabel>Regions</DropdownMenuLabel>
              <Separator />
              {searchResult.content.regions.map((region, index) => (
                <DropdownMenuCheckboxItem
                  key={`region-${index}`}
                  checked={searchParams.regions.includes(region.id)}
                  onCheckedChange={(checked) =>
                    handleRegionToggle(region.id, checked)
                  }
                >
                  {region.name}
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
                <span className="truncate">{selectedCategoriesText}</span>
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
              {searchResult.content.categories.map((category, index) => (
                <DropdownMenuCheckboxItem
                  key={`category-${index}`}
                  checked={searchParams.categories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryToggle(category.id, checked)
                  }
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
