import React from 'react';
import {getHutCategory, HutCategory} from '../../types/Constants.ts';
import {Chip} from '@mui/joy';
import {stringToColour} from '../common/Util.ts';

const HutCategoryChip = (category: number): React.ReactNode => {
  const hutCategory: HutCategory = getHutCategory(category);
  return (
    <Chip
      variant='solid'
      sx={{
        backgroundColor: stringToColour(hutCategory),
        color: '#fff'
      }}
    >
      {hutCategory}
    </Chip>
  );

}

export default HutCategoryChip;