import React from "react";
//import { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_FRIENDS } from "../utils/queries";

const FriendSearchSelection = ({shareWith,setShareWith}) => {
  const { loading, error, data } = useQuery(QUERY_FRIENDS);
  //const [shareWith, setShareWith] = useState();
  
  //console.log("data.friends.friends:",data.friends.friends)
  console.log(data)

  const myFriends = data?.friends?.friends || [];
  //console.log("myFriends:", myFriends);
  let friendOptions = [];
  myFriends.map((friend) => {
    return friendOptions.push({
      key: friend.id,
      value: friend.id,
      description: friend.userName,
      text: `${friend.firstName} ${friend.lastName}`,
    });
  });

  return (
    <Dropdown
      placeholder="Select friend"
      fluid
      search
      selection
      onChange={(e,{value})=> setShareWith({value})}
      options={friendOptions}
    loading={loading}
    error={error}
    />
  );
};

export default FriendSearchSelection;
