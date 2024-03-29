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

import { useState, Component } from 'react'; // we will extend component with semantic
import { Link } from 'react-router-dom';

import auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import './Nav_Page.css';
import { QUERY_FRIENREQ } from '../utils/queries';
// import { useEffect, useState } from 'react';

import RecommendedContentCard from '../components/recommendedContentCard';
import UnderConstructionMessage from '../components/underConstructionMessage';

// https://react.semantic-ui.com/collections/message/#types-dismissible-block
class DismissibleMessage extends Component {
	state = { visible: true };

	handleDismiss = () => {
		this.setState({ visible: false });
	};

	render() {
		if (this.state.visible) {
			return (
				<Message
					color="blue"
					onDismiss={this.handleDismiss}
					header="You have new friend requests!"
					content={
						<Link to="/friends">
							You have <strong>{this.props.count}</strong> pending
							friend-request{this.props.count === 1 ? '' : 's'}. Click here to
							go to the Friends page.
						</Link>
					}
				/>
			);
		}

		return null;
	}
}

function ForYou() {

	const [activeCard, setActiveCard] = useState(null); // lifted state for the active index of the accordion
	const [activeIndex, setActiveIndex] = useState(-1);

	// for the accordion, when a card is clicked, the active index is set to the index of the card
	const handleClick = (cardId, index) => {
		if (cardId === activeCard && index !== activeIndex) {
			setActiveIndex(index);
		} else {
			setActiveCard(cardId);
			setActiveIndex(cardId === activeCard ? -1 : index);
		}
	};

	let userDetails = {};
	let friendsDetails = {};
	const idNum = auth.getProfile();
	// console.log(idNum.data._id);
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
		// console.log(movieRecommend, tvRecommend, bookRecommend);

		const friendOmmend = (id) => {
			const newUsers = data2.friendRecommendations;
			const loopArray = [];
			newUsers.forEach((friend) => {
				friend.recommendations.forEach((recommendation) => {
					if (recommendation.tmdbID === id) {
						loopArray.push(friend.userName);
					}
				});
			});
			return loopArray;
		};

		return (
			<Container>
				<Segment className="page-header-segment">
					<Header as="h1">For You</Header>
				</Segment>

				{userDetails.user.pendingFriendRequests.length > 0 && (
					<DismissibleMessage
						count={userDetails.user.pendingFriendRequests.length}
					/>
				)}
				<Segment>
					<Header as="h2">
						<Icon name="film" />
						<HeaderContent>
							Movies recommended for you
							<HeaderSubheader>
								<a href="/movies">See more movie recommendations...</a>
							</HeaderSubheader>
						</HeaderContent>
					</Header>
					<CardGroup className="centered-cards-group">
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
									friendArray={friendOmmend(data.tmdbID)}
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
					<CardGroup className="centered-cards-group">
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
									friendArray={friendOmmend(data.tmdbID)}
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
					<div className="centered-message">
						<UnderConstructionMessage />
					</div>
				</Segment>
			</Container>
		);
	} else {
		console.log('No Luck');
	}
}

export default ForYou;
