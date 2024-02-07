import React from "react";
import {
  ItemGroup,
  Message,
  Icon,
  Image,
  Item,
  Label,
} from "semantic-ui-react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SHAREDWITHME, QUERY_MYWATCHLIST } from "../utils/selfQueries";
import ShareReceived from "./sharedListItem";

export default function ShareReceivedList() {
  const { loading, error, data } = useQuery(QUERY_SHAREDWITHME);
  const { data: watchData } = useQuery(QUERY_MYWATCHLIST);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  //console.log("data", data.sharedWithMe);
  //console.log("watchData", watchData.myWatchList.watchList);  
  const shareReceivedList = data.sharedWithMe || [];
  const watchIdList = watchData.myWatchList?.watchList?.map((watch) => watch.tmdbID)
  //console.log("watchID", watchIdList)
  //console.log("shareReceivedList", shareReceivedList)


  
  return (
    <>
      {shareReceivedList.length == 0 ? (
        <Message>
          Your friends haven&apos;t shared anything with you yet.
        </Message>
      ) : (
        <ItemGroup divided>
          {shareReceivedList.map((share) => (
            <ShareReceived key={share.id} share={share} watch={watchIdList}/>
          ))}
        </ItemGroup>
      )}
    </>
  );
}
