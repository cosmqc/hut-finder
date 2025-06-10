import React from 'react'
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar.tsx'

const SearchSidebar2 = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarGroupLabel>Search</SidebarGroupLabel>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  )
}

export default SearchSidebar2
