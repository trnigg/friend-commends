import {
  ItemMeta,
  ItemImage,
  ItemHeader,
  ItemGroup,
  ItemDescription,
  ItemContent,
  Image,
  Item,
} from 'semantic-ui-react'

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

// movietitle={data.original_name}
// poster_path={data.poster_path}
// description={data.overview}
// friendRecommend={data.count}
// friendArray={friendOmmend(data.tmdbID)} />

export default function MovieItems(props){

let posterURL = props?.poster_path
? `https://image.tmdb.org/t/p/w154/${props.poster_path}`
: `https://react.semantic-ui.com/images/wireframe/image.png`;
  
console.log(props)

return(
  <ItemGroup>
    <Item>
      <ItemImage src={posterURL} />

      <ItemContent>
        <ItemHeader>{props.movietitle}</ItemHeader>
        <ItemMeta>
          <span className='price'>recommended by {props.friendRecommend} friend/s</span>
          {/* <span className='stay'>1 Month</span> */}
        </ItemMeta>
        <ItemDescription>{props.description}</ItemDescription>
      </ItemContent>
    </Item>
  </ItemGroup>
)
}

// export default ItemExampleLink
