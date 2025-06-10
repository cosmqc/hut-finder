import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card.tsx";
import {useNavigate} from "react-router-dom";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import HutImage from "@/components/huts/HutImage2.tsx";

const HutCard = (props: {hut: Hut}) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/huts/${props.hut.id}`)}>
      <CardContent>
        <AspectRatio ratio={3/2} className="rounded-lg">
          {HutImage(props.hut)}
        </AspectRatio>
        <CardTitle>{props.hut.name}</CardTitle>
        <CardDescription>{props.hut.location}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default HutCard