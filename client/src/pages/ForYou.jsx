import {
	Container,
	Segment,
	Header,
	Message,
	HeaderContent,
	HeaderSubheader,
	Icon,
	CardGroup,
} from 'semantic-ui-react';

import { useState } from 'react';

import auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import CardExampleCard from '../components/CardPics';
import './Nav_Page.css';
import { QUERY_FRIENREQ } from '../utils/queries';
// import { useEffect, useState } from 'react';

import RecommendedContentCard from '../components/recommendedContentCard';
import UnderConstructionMessage from '../components/underConstructionMessage';

function ForYou() {
	// const [type, setType] = useState()
	// const [funnArray, setFunArray] = useState()
	// const handleClick = (workingArray) => {
	// 							setType("Movie")
	// 							setFunArray(workingArray)
	// 							console.log(funnArray)
	// 							}

	// useEffect(() => {
	//   console.log('You are ' + type + ' years old!')
	// })

	console.log('Hello');

	const [activeCard, setActiveCard] = useState(null); // lifted state for the active index of the accordion
	const [activeIndex, setActiveIndex] = useState(-1);

	// for the accordion, when a card is clicked, the active index is set to the index of the card
	const handleClick = (cardId, index) => {
		setActiveCard(cardId);
		setActiveIndex(cardId === activeCard ? -1 : index);
	};

	let userDetails = {};
	let friendsDetails = {};
	const idNum = auth.getProfile();
	console.log(idNum.data._id);
	const {
		loading: loading2,
		error: error2,
		data: data2,
	} = useQuery(QUERY_FRIENREQ, {
		variables: { userId: idNum.data._id },
	});
	const { loading, error, data } = useQuery(QUERY_USER, {
		variables: { userId: idNum.data._id },
	});
	if (loading || loading2) {
		return <div>Please Wait.....</div>;
	}
	if (data && data2) {
		userDetails = data;
		console.log('Yellow');
		friendsDetails = data2.friendRecommendations;
		const friendArray = [];
		friendsDetails.forEach((entry) => {
			friendArray.push(entry.recommendations);
		});
		const workingArray = friendArray.flat();
		const movieRecommend = workingArray

			.filter((entry) => entry.__typename === 'Movie')
			.slice(-3);
		const tvRecommend = workingArray
			.filter((entry) => entry.__typename === 'TV')
			.slice(-3);
		const bookRecommend = workingArray
			.filter((entry) => entry.__typename === 'Book')
			.slice(-3);
		console.log(movieRecommend, tvRecommend, bookRecommend);

		return (
			<Container>
				<Segment>
					<Header as="h1">For You</Header>
				</Segment>

				<Message>
					You have {userDetails.user.pendingFriendRequests.length} friend
					requests
				</Message>
				<Segment>
					<Header as="h2">
						<Icon name="film" />
						<HeaderContent>
							Movies recommended for you
							<HeaderSubheader>
								<a href="/Movies">See more movie recommendations...</a>
							</HeaderSubheader>
						</HeaderContent>
					</Header>
					<CardGroup>
						{movieRecommend.map(function (data) {
							return (
								<RecommendedContentCard
									key={data.id}
									type="Movie"
									selectedContent={{
										id: data.id,
										title: data.original_title,
										description: data.overview,
										posterImage: data.poster_path,
										backdropImage: data.poster_path,
									}}
									contentSource={data.AU_platforms}
									noStreamingAvailable={data.AU_platforms.length === 0}
									cardId={data.id}
									handleClick={handleClick}
									activeIndex={data.id === activeCard ? activeIndex : -1}
								/>
							);
						})}
					</CardGroup>
				</Segment>
				<Segment>
					<Header as="h2">
						<Icon name="tv" />
						<HeaderContent>
							TV shows recommended for you
							<HeaderSubheader>
								<a href="/tv_shows">See more TV recommendations...</a>
							</HeaderSubheader>
						</HeaderContent>
					</Header>
					<CardGroup>
						{tvRecommend.map(function (data) {
							return (
								<RecommendedContentCard
									key={data.id}
									type="TV"
									selectedContent={{
										id: data.id,
										title: data.original_name,
										description: data.overview,
										posterImage: data.poster_path,
										backdropImage: data.poster_path,
									}}
									contentSource={data.AU_platforms}
									noStreamingAvailable={data.AU_platforms.length === 0}
									cardId={data.id}
									handleClick={handleClick}
									activeIndex={data.id === activeCard ? activeIndex : -1}
								/>
							);
						})}
					</CardGroup>
				</Segment>
				<Segment>
					<Header as="h2">
						<Icon name="book" />
						<HeaderContent>Books recommended for you</HeaderContent>
					</Header>
					<UnderConstructionMessage />
				</Segment>
			</Container>
		);
	} else {
		console.log('No Luck');
	}
}

export default ForYou;
