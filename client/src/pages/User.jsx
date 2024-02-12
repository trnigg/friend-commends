import React from 'react';
import { useState, useEffect } from 'react';
import WatchList from '../components/watchList';
import ShareReceivedList from '../components/shareReceivedList';
import RecommendationList from '../components/recommendationList';
import UserCard from '../components/userProfile';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import AuthService from '../utils/auth';

import { Header } from 'semantic-ui-react';
import {
	AccordionTitle,
	AccordionContent,
	Accordion,
	Icon,
	Container,
	Segment,
} from 'semantic-ui-react';

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

	const handleClick = (event, titleProps) => {
		//console.log("event", event);
		//console.log("titleProps", titleProps);
		const { index } = titleProps;
		const newIndex = activeIndex === index ? -1 : index;

		setActiveIndex(newIndex);
	};

	return (
		<Container>
			<Segment raised className="page-header-segment">
				<Header as="h1">Hi {data.user.firstName} </Header>
			</Segment>
			<div className="user-card-container">
				<UserCard data={data.user} />
			</div>
			<Segment raised>
				<Accordion fluid styled>
					<Accordion.Title
						active={activeIndex === 0}
						index={0}
						onClick={handleClick}
					>
						<Header as="h3">
							<Icon name="dropdown" />
							Your watchlist:
						</Header>
					</Accordion.Title>
					<AccordionContent active={activeIndex === 0}>
						<WatchList />
					</AccordionContent>
					<Accordion.Title
						active={activeIndex === 1}
						index={1}
						onClick={handleClick}
					>
						<Header as="h3">
							<Icon name="dropdown" />
							Shares received:
						</Header>
					</Accordion.Title>
					<AccordionContent active={activeIndex === 1}>
						<ShareReceivedList />
					</AccordionContent>
					<Accordion.Title
						active={activeIndex === 2}
						index={2}
						onClick={handleClick}
					>
						<Header as="h3">
							<Icon name="dropdown" />
							Your recommendations:
						</Header>
					</Accordion.Title>
					<AccordionContent active={activeIndex === 2}>
						<RecommendationList />
					</AccordionContent>
				</Accordion>
			</Segment>
		</Container>
	);
}

export default User;
