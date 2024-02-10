import React from "react";
import {
  ItemGroup,
  Message,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MYRECOMMENDATIONS } from "../utils/selfQueries";
import RecommendItem from "./recommendListItem";

export default function RecommendList() {
  const { loading, error, data } = useQuery(QUERY_MYRECOMMENDATIONS);

  if(loading){
    return (
        <div>
            Please Wait.....
        </div>
    )
  }
  if (error) return `Error! ${error.message}`;

  //console.log("data", data.myRecommendations.recommendations);

  const recommendations = data?.myRecommendations?.recommendations || [];

  return (
    <>
      {recommendations.length == 0 ? (
        <Message>
          Recommend movies or TV shows for your friends!
        </Message>
      ) : (
        <ItemGroup divided>
          {recommendations.map((recommend) => (
            <RecommendItem key={recommend.id} {...recommend} />
          ))}
        </ItemGroup>
      )}
    </>
  );
}
