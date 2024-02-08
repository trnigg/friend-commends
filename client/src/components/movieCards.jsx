import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
} from 'semantic-ui-react'

const MovieCard = (props) => (
  <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    <CardContent>
      <CardHeader>{props.movietitle}</CardHeader>
      <CardMeta>
        <span className='date'>Joined in 2015</span>
      </CardMeta>
      <CardDescription>
        Matthew is a musician living in Nashville.
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <a>
        <Icon name='thumbs up' />
        recommended by {props.friendRecommend} friend/s
      </a>
    </CardContent>
  </Card>
)

export default MovieCard
