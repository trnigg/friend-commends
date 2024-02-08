import React from "react";
import {
  ItemGroup,
  Message,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MYWATCHLIST } from "../utils/selfQueries";
import WatchItem from "./watchListItem";

export default function WatchList() {
  const { loading, error, data } = useQuery(QUERY_MYWATCHLIST);
    
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  //console.log("data", data.myWatchList.watchList);

  const watchList = data.myWatchList.watchList || [];

  return (
    <>
      {watchList.length == 0 ? (
        <Message>
          Start by adding movies and TV shows to your watch list!
        </Message>
      ) : (
        <ItemGroup divided>
          {watchList.map((watch) => (
            <WatchItem key={watch.id} {...watch} />
          ))}
        </ItemGroup>
      )}
    </>
  );
}
