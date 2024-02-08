import React from "react";
import {
  ItemMeta,
  ItemImage,
  ItemHeader,
  ItemGroup,
  ItemExtra,
  ItemDescription,
  ItemContent,
  Message,
  Icon,
  Button,
  Item,
  Label,
} from "semantic-ui-react";
import ShareModal from "./shareModal";

export default function WatchItem(props) {
  //console.log("props:", props);
  const { overview, AU_platforms: platforms ,type} = props;
  let posterURL = props?.poster_path
    ? `https://image.tmdb.org/t/p/w154/${props.poster_path}`
    : `https://react.semantic-ui.com/images/wireframe/image.png`;
  let title = props.original_title || props.original_name;
  const itemType = type==="TV"? "TV show":type;

  return (
    <Item>
      <ItemImage src={posterURL} />

      <ItemContent>
        <ItemHeader as="a">{title}</ItemHeader>
        <ItemMeta>
            <span className="type"> {itemType} </span>
        </ItemMeta>
        <ItemDescription>{overview}</ItemDescription>
        <ItemExtra>
          {platforms?.map((platform) => (
            <Label key={platform}>{platform}</Label>
          ))}
          <ShareModal key={props.id} {...props}/>
        </ItemExtra>
      </ItemContent>
    </Item>
  );
}
