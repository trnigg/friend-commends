import React, { useState } from "react";
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
  // const [watchlist, setWatchlist] = useState({})
  const { loading, error, data } = useQuery(QUERY_MYWATCHLIST);
    
  if(loading){
    return (
        <div>
            Please Wait.....
        </div>
    )
  }
  if (error) return `Error! ${error.message}`;

  // console.log("data", data4.myWatchList.watchList);

// if (data4&&!watchlist){
//   setWatchlist(data4)
//   console.log(watchlist)

// }

  const watchList = data?.myWatchList?.watchList || [];

  console.log(watchList)

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
  // }
}
