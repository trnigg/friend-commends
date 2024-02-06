import React from "react";
import { useState, useEffect } from 'react';
import WatchList from "../components/watchList";
import ShareReceivedList from "../components/shareReceivedList";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import AuthService from "../utils/auth";

import { Header } from "semantic-ui-react";
import {
	AccordionTitle,
	AccordionContent,
	Accordion,
	Icon,
  } from 'semantic-ui-react'

function User() {
  const { data: { _id: userId } = {} } = AuthService.getProfile();
  const [activeIndex, setActiveIndex] = useState();
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { userId },
  });
  //console.log(userId);
  //console.log("data:",data);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
 
 

  const handleClick = (event,titleProps) => {
	console.log("event",event);
	console.log("titleProps",titleProps);
	const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }


  return (
    <div>
      <Header as="h1">Hi {data.user.firstName} </Header>

      <div>
        
		<Accordion fluid styled>
        <AccordionTitle
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          Your Watch List:
        </AccordionTitle>
        <AccordionContent active={activeIndex === 0}>
		<WatchList />
        </AccordionContent>
        <AccordionTitle
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          Shares received List:
        </AccordionTitle>
        <AccordionContent active={activeIndex === 1}>
		<ShareReceivedList />
        </AccordionContent>
		</Accordion>

      </div>
    </div>
  );
}

export default User;
