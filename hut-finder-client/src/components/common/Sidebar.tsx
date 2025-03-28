import {Box, Chip, Input, List, ListItem, ListSubheader} from '@mui/joy';
import Option from '@mui/joy/Option';
import Select, {selectClasses} from '@mui/joy/Select';
import {KeyboardArrowDown, Search} from '@mui/icons-material';

interface SearchSidebarProps {
  onSearch: (query: string) => void;
  onSelectedCategories: (categories: number[]) => void;
}

const SearchSidebar = (props: SearchSidebarProps) => {

  return (
    <Box
      component='nav'
      sx={{
        p: 2,
        bgcolor: 'background.surface',
        borderRight: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        display: {
          xs: 'none',
          sm: 'initial',
        },
      }}
    >
      <List
        size='md'
        sx={{
          '--ListItem-radius': 'var(--joy-radius-sm)',
          '--List-gap': '4px',
        }}
      >
        <ListItem nested>
          <ListSubheader
            sx={{
              letterSpacing: '2px',
              fontWeight: '800',
            }}
          >
            Search
          </ListSubheader>
            <ListItem>
              <Input
                size='sm'
                variant='outlined'
                placeholder='Search hut name…'
                startDecorator={
                  <Search/>
                }
                onChange={(e) => props.onSearch(e.target.value)}
              />
            </ListItem>
        </ListItem>
        <ListItem nested>
          <ListSubheader
            sx={{
              letterSpacing: '2px',
              fontWeight: '800',
            }}
          >
            Filters
          </ListSubheader>
          <ListItem>
            <Select
              size='sm'
              placeholder='Select hut categories…'
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                  {selected.map((selectedOption) => (
                    <Chip variant='soft' color='primary'>
                      {selectedOption.label}
                    </Chip>
                  ))}
                </Box>
              )}
              slotProps={{
                listbox: {
                  sx: {
                    width: '100%',
                  },
                },
              }}
              indicator={<KeyboardArrowDown />}
              sx={{
                width: 237,
                [`& .${selectClasses.indicator}`]: {
                  transition: '0.2s',
                  [`&.${selectClasses.expanded}`]: {
                    transform: 'rotate(-180deg)',
                  },
                },
              }}
            >
              <Option value='dog'>Dog</Option>
              <Option value='cat'>Cat</Option>
              <Option value='fish'>Fish</Option>
              <Option value='bird'>Bird</Option>
            </Select>
          </ListItem>
        </ListItem>
      </List>
    </Box>
  )
};

export default SearchSidebar;