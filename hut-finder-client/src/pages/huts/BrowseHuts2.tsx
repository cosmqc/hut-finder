import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import SearchSidebar2 from "@/components/common/Sidebar2.tsx";

const BrowseHuts2 = () => {
  return (
    <SidebarProvider>
      <SearchSidebar2/>
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default BrowseHuts2