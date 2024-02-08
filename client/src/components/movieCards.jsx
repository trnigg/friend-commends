import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
  Popup,
  Rating,
  PopupHeader,
  PopupContent,
} from 'semantic-ui-react'
import MovieFriendList from './movieFriendList'

const MovieCard = (props) => (
<Popup
    trigger={
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
    }
    >
    <PopupHeader>This movie is</PopupHeader>
    <PopupContent>
        recommended by 
        {props.friendArray.map((request) => (
        <MovieFriendList 
            key={request}
            title={request}/>
        ))}
    </PopupContent>
  </Popup>

)

export default MovieCard
