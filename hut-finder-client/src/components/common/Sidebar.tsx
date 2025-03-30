import {Box, Button, Chip, Input, List, ListItem, ListSubheader} from '@mui/joy';
import Option from '@mui/joy/Option';
import Select, {selectClasses} from '@mui/joy/Select';
import {KeyboardArrowDown, Search} from '@mui/icons-material';
import {SortMethod} from '../../types/Constants.ts';

interface SearchSidebarProps {
  onSearch: (query: string) => void;
  onSelectedCategories: (categories: number[]) => void;
  onSortMethod: (sortMethod: string) => void;
  categories: HutCategory[];
  loading: boolean;
  search: () => void;
}

const SearchSidebar = (props: SearchSidebarProps) => {
  // Evil little hack to bypass some weird component constraints
  const handleSortMethodChange = (newValue: string | null) => {
    props.onSortMethod(newValue === null ? 'ALPHABETICAL_ASC' : newValue);
  };

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
              defaultValue={new Array<number>()}
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
              onChange={(_, newValue: number[]) => props.onSelectedCategories(newValue)}
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
              {props.categories.map((category) => (
                <Option value={category.id}>{category.name}</Option>
              ))}
            </Select>
          </ListItem>
        </ListItem>
        <ListItem nested>
          <ListSubheader
            sx={{
              letterSpacing: '2px',
              fontWeight: '800',
            }}
          >
            Sort By
          </ListSubheader>
          <ListItem>
            <Select
              size='sm'
              defaultValue={SortMethod.ALPHABETICAL_ASC}
              slotProps={{
                listbox: {
                  sx: {
                    width: '100%',
                  },
                },
              }}
              onChange={(_, value) => handleSortMethodChange(value)}
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
              <Option value={SortMethod.ALPHABETICAL_ASC}>
                Name (Ascending)
              </Option>
              <Option value={SortMethod.ALPHABETICAL_DESC}>
                Name (Descending)
              </Option>
              <Option value={SortMethod.CATEGORY_ASC}>
                Category (Great Walks - Basic)
              </Option>
              <Option value={SortMethod.CATEGORY_DESC}>
                Category (Basic - Great Walks)
              </Option>
            </Select>
          </ListItem>
        </ListItem>
        <ListItem>
          <Button
            startDecorator={<Search/>}
            sx={{width: 237}}
            loading={props.loading}
            onClick={props.search}
          >
            Search
          </Button>
        </ListItem>
      </List>
    </Box>
  )
};

export default SearchSidebar;