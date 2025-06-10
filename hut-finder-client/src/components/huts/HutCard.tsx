import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card.tsx'
import { useNavigate } from 'react-router-dom'
import { AspectRatio } from '@/components/ui/aspect-ratio.tsx'
import HutImage from '@/components/huts/HutImage.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { getHutCategory } from '@/types/Constants.ts'

const HutCard = (props: { hut: Hut }) => {
  const navigate = useNavigate()
  return (
    <Card
      className="flex flex-col"
      onClick={() => navigate(`/huts/${props.hut.id}`)}
    >
      <CardContent className="flex flex-col flex-grow">
        <AspectRatio ratio={3 / 2} className="rounded-lg">
          {HutImage(props.hut)}
        </AspectRatio>
        <CardTitle>{props.hut.name}</CardTitle>
        <CardDescription className="text-xs">
          {props.hut.location}
        </CardDescription>
        {/*TODO: fix spacing between these two */}
        <Badge className="mt-auto">{getHutCategory(props.hut.category)}</Badge>
      </CardContent>
    </Card>
  )
}

export default HutCard
