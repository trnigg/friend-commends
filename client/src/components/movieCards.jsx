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

export default function MovieCard(props){
console.log()
let posterURL = props?.poster_path
  ? `https://image.tmdb.org/t/p/w154/${props.poster_path}`
  : `https://react.semantic-ui.com/images/wireframe/image.png`;

  console.log(posterURL);


return(
  <Popup
      trigger={
    <Card>
      <Image src={posterURL} wrapped ui={false} />
      <CardContent>
        <CardHeader>{props.movietitle}</CardHeader>
        <CardMeta>
          <span className='date'>Joined in 2015</span>
        </CardMeta>
        <CardDescription>       
          {props.description}
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
}

// export default MovieCard
