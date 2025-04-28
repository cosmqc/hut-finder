import {AspectRatio, Card, CardContent, CardOverflow, CardProps, Link, Typography} from '@mui/joy';
import HutCategoryChip from './HutCategoryChip.tsx';
import HutImage from './HutImage.tsx';

const HutCard = ({hut, ...props}: { hut: Hut } & CardProps) => {
  return (
    <Card {...props}>
      <CardOverflow>
        <AspectRatio ratio='2'>
          {HutImage(hut)}
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Link
          overlay
          underline='none'
          href={`/huts/${hut.id}`}
        >
          <Typography level='title-md'>{hut.name}</Typography>
        </Link>
        <Typography level='body-sm' sx={{textAlign: 'left'}}>{hut.location}</Typography>
        {HutCategoryChip(hut.category)}
      </CardContent>
    </Card>
  );
};

export default HutCard;