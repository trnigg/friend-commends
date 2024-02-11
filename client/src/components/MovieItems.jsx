import {
  ItemMeta,
  ItemImage,
  ItemHeader,
  ItemExtra,
  ItemDescription,
  ItemContent,
  Message,
  Icon,
  Button,
  Item,
  Label,
  Popup,
} from "semantic-ui-react";
import ShareModal from "./shareModal";
import { useMutation } from "@apollo/client";
import {
  MUTATION_REMOVEWATCHITEM,
} from "../utils/selfMutations";
import { QUERY_MYWATCHLIST } from "../utils/selfQueries";
import Auth from "../utils/auth";

export default function WatchItem(props) {
  console.log("props:", props);
  const { id, overview, AU_platforms: platforms, type } = props;
  let posterURL = props?.poster_path
    ? `https://image.tmdb.org/t/p/w154/${props.poster_path}`
    : `https://react.semantic-ui.com/images/wireframe/image.png`;
  let title = props.original_title || props.original_name||props.movietitle;
  const itemType = type === "TV" ? "TV show" : type;

  const [removeWatchItem, { error: movieErr }] = useMutation(MUTATION_REMOVEWATCHITEM,{
    refetchQueries: [
      QUERY_MYWATCHLIST, // Query to be refecthed
      'MyWatchList' // Query name
    ],
  });
  const handleRemoveOnClick = async () => {
    //console.log("props.share",props.share)
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

      try {
        await removeWatchItem({
          variables: { removeFromWatchListId:id },
        });
      } catch (err) {
        console.error(err);
      }


  };

  const friendArray = (props) =>{
    console.log(props)
    return(
      <div>
        <div>Recommended by </div>
        <div>
          {props.map(function (friend) {
            return(
              <div key={friend}>{friend}</div>
            )
          })}
        </div>
      </div>
    )
  }

  console.log(props)
  return (
    <Item>
      <ItemImage src={posterURL} />

      <ItemContent>
        <ItemHeader as="a">{title}</ItemHeader>
        <ItemMeta>
          <Popup
              content={friendArray(props.friendArray)}
              on='click'
              pinned
              trigger={
              // <Button content='Button' />
                <a className="popupLink">Recommended by  {props.friendRecommend} friend/s</a>
            }
            />
        </ItemMeta>
        <ItemDescription>{props.description}</ItemDescription>
        <ItemExtra>
          {props.platforms?.map((platform) => (
            <Label key={platform}>{platform}</Label>
          ))}
          <ShareModal key={props.id} {...props} />
        </ItemExtra>

      </ItemContent>
    </Item>
  );
}
