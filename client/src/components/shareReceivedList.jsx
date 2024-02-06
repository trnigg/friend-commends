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
import { QUERY_SHAREDWITHME } from "../utils/selfQueries";
import ShareReceived from "./selfListItems";

export default function ShareReceivedList() {
  const { loading, error, data } = useQuery(QUERY_SHAREDWITHME);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  //console.log("data", data.sharedWithMe);

  const shareReceivedList = data.sharedWithMe || [];

  return (
    <>
      {shareReceivedList.length == 0 ? (
        <Message>
          Your friends haven&apos;t shared anything with you yet.
        </Message>
      ) : (
        <ItemGroup divided>
          {shareReceivedList.map((watch) => (
            <ShareReceived key={watch.id} {...watch} />
          ))}
        </ItemGroup>
      )}
    </>
  );
}
