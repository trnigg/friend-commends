import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
} from 'semantic-ui-react'


export default function UserCards(props){
  console.log(props)


  let posterURL = props?.poster_path
  ? `https://image.tmdb.org/t/p/w154/${props.poster_path}`
  : `https://react.semantic-ui.com/images/wireframe/image.png`;


return(
  <Card>
    <Image src={posterURL} wrapped ui={false} />
    <CardContent>
      <CardHeader>{props.movietitle}</CardHeader>
      <CardDescription>
        {props.description}
      </CardDescription>
    </CardContent>
    {/* <CardContent extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </CardContent> */}
  </Card>
)
}
const CardExampleCard = (props) => (
  <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    <CardContent>
      <CardHeader>{props.movietitle}</CardHeader>
      <CardDescription>
        {props.description}
      </CardDescription>
    </CardContent>
    {/* <CardContent extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </CardContent> */}
  </Card>
)



