import { useNavigate, useParams } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'
import { useEffect, useState } from 'react'
import { SearchState } from '@/types/Constants.ts'
import { getHutById } from '@/services/Huts.ts'
import { LoadingSpinner } from '@/components/common/LoadingSpinner.tsx'
import { AspectRatio } from '@/components/ui/aspect-ratio.tsx'

const HutDetails2 = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchResult, setSearchResult] = useState<ApiResponse<Hut>>({
    content: {
      id: -1,
      globalId: '',
      name: '',
      location: '',
      imageUrl: '',
      hutUrl: '',
      region: '',
      facilities: [],
      lat: -1,
      lon: -1,
      bookable: false,
      category: -1,
      description: '',
      largeImageUrl: '',
      status: '',
      numberOfBunks: -1,
    },
    state: SearchState.LOADING,
  })
  useEffect(() => {
    const fetchHut = async () => {
      setSearchResult((prevState) => ({
        ...prevState,
        state: SearchState.LOADING,
      }))
      getHutById(parseInt(id!, 10)).then(
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
    fetchHut()
    document.title = searchResult.content.name
  }, [id])

  const headerContent = () => {
    if (searchResult.state === SearchState.SUCCESS) {
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/huts">Huts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{searchResult.content.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
    }
  }

  const content = () => {
    switch (searchResult.state) {
      case SearchState.LOADING:
        return (
          <div className="flex flex-col items-center h-full justify-center">
            <LoadingSpinner className="mr-2 h-5 w-5 animate-spin" />
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Loading Hut...
            </h4>
          </div>
        )
      case SearchState.SUCCESS:
        return (
          <div className="flex flex-col w-full h-full justify-center items-start gap-4">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
              {searchResult.content.name}
            </h1>
            <AspectRatio>
              <img
                src={searchResult.content.largeImageUrl}
                alt={searchResult.content.name}
              />
            </AspectRatio>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {searchResult.content.description}
            </h4>
          </div>
        )
      case SearchState.ERROR:
        navigate('/notFound')
    }
  }

  return (
    <div className="flex flex-col w-full h-full p-4">
      <header className="w-full flex flex-col pb-2">{headerContent()}</header>
      {content()}
    </div>
  )
}

export default HutDetails2
