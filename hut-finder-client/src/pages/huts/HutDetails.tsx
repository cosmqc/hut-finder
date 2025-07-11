import { useNavigate, useParams } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'
import { useEffect, useMemo, useState } from 'react'
import { getHutCategory, SearchState } from '@/types/Constants.ts'
import { getHutById } from '@/services/Huts.ts'
import { LoadingSpinner } from '@/components/common/LoadingSpinner.tsx'
import { AspectRatio } from '@/components/ui/aspect-ratio.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ExternalLink } from 'lucide-react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import AlertDrawer from '@/components/huts/AlertDrawer.tsx'
import { Badge } from '@/components/ui/badge.tsx'

const HutDetails = () => {
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
      status: '',
      numberOfBunks: -1,
      alerts: [],
    },
    state: SearchState.LOADING,
  })
  const [drawerState, setDrawerState] = useState({
    isOpen: false,
    selectedAlert: null as Alert | null
  });

  const handleAlertClick = (alert: Alert) => {
    setDrawerState({
      isOpen: true,
      selectedAlert: alert
    });

  }

  useEffect(() => {
    const fetchHut = async () => {
      setSearchResult((prevState) => ({
        ...prevState,
        state: SearchState.LOADING,
      }))
      try {
        const response = await getHutById(parseInt(id!, 10));
        setSearchResult({ content: response, state: SearchState.SUCCESS });
        document.title = response.name;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setSearchResult(prev => ({
          ...prev,
          state: SearchState.ERROR
        }));
      }

    }
    if (id) {
      fetchHut()
    }
  }, [id])

  const locationText = useMemo(() => {
    if (!searchResult.content) return ''
    return [searchResult.content.location, searchResult.content.region]
      .filter(Boolean)
      .join(', ');
  }, [searchResult.content]);


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
          <div className="flex flex-col w-full h-full items-start gap-4">
            <div>
              <div className="flex flex-row gap-2 items-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
                  {searchResult.content.name}
                </h1>
                <Badge className="mt-1">
                  {getHutCategory(searchResult.content.category)}
                </Badge>
              </div>
              <p className="leading-7 opacity-70 italic">
                {locationText}
              </p>
              <h4 className="scroll-m-20 text-l font-semibold tracking-tight">
                {searchResult.content.description}
              </h4>
            </div>
            <div className="flex flex-row w-full h-full items-start">
              <div className="flex flex-col h-full items-start w-2/3 gap-4">
                <AspectRatio ratio={16 / 9}>
                  <img src={searchResult.content.imageUrl} alt="" />
                </AspectRatio>
              </div>
              <Separator orientation="vertical" className="mx-4 h-full" />
              <div className="w-1/3 h-full flex flex-col gap-2">
                <Tabs defaultValue="details">
                  <TabsList>
                    <TabsTrigger className="cursor-pointer" value="details">
                      Hut Details
                    </TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="alerts">
                      Regional Alerts
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="details">
                    <Card className="h-[360px]">
                      <CardContent className="flex flex-col gap-2">
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                          Facilities
                        </h4>
                        {searchResult.content.facilities.map(
                          (facility: string, index: number) => (
                            <p key={`facility-${index}`} className="leading-7">
                              {facility}
                            </p>
                          )
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="alerts">
                    <Card className="h-[360px]">
                      <CardContent className="flex flex-col gap-2 overflow-y-scroll">
                        {searchResult.content.alerts ? (
                          searchResult.content.alerts?.map((alert: Alert) => (
                            <div
                              key={alert.id}
                              className="w-full justify-start p-0"
                              onClick={() => handleAlertClick(alert)}
                            >
                              <p className="text-sm font-semibold overflow-hidden text-ellipsis hover:underline">
                                {alert.summary}
                              </p>
                            </div>
                          ))
                        ) : (
                          <h4 className="scroll-m-20 font-semibold tracking-tight">
                            {' '}
                            No alerts for the {searchResult.content.region}{' '}
                            region.
                          </h4>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                <Button
                  onClick={() =>
                    window.open(
                      searchResult.content.hutUrl,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                >
                  <ExternalLink /> View on DOC Website
                </Button>
              </div>
            </div>
          </div>
        )
      case SearchState.ERROR:
        navigate('/notFound')
    }
  }

  return (
    <div className="w-full h-full p-4">
      <header className="w-full flex flex-col pb-2">{headerContent()}</header>
      {content()}
      <AlertDrawer
        alert={drawerState.selectedAlert}
        isOpen={drawerState.isOpen}
        onClose={() => setDrawerState(prev => ({...prev, isOpen: false}))}
      />
    </div>
  )
}

export default HutDetails
