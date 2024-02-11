import {
	Container,
	Segment,
	Header,
	Message,
	HeaderContent,
	HeaderSubheader,
	Icon,
} from 'semantic-ui-react';

import auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import CardExampleCard from '../components/CardPics';
import './Nav_Page.css';
import { QUERY_FRIENREQ } from '../utils/queries';
// import { useEffect, useState } from 'react';

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
					{movieRecommend.map(function (data) {
						return (
							<div key={data.original_title}>
								<CardExampleCard
									movietitle={data.original_title}
									poster_path={data.poster_path}
									description={data.overview}
								/>
							</div>
						);
					})}
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
					{tvRecommend.map(function (data) {
						return (
							<div key={data.original_name}>
								<CardExampleCard
									movietitle={data.original_name}
									poster_path={data.poster_path}
									description={data.overview}
								/>
							</div>
						);
					})}
				</Segment>
				<Segment>
					<Header as="h2">
						<Icon name="book" />
						<HeaderContent>
							Books recommended for you
							<HeaderSubheader>
								<a href="/books">See more book recommendations...</a>
							</HeaderSubheader>
						</HeaderContent>
					</Header>
					{bookRecommend.map(function (data) {
						return (
							<div key={data.original_name}>
								<CardExampleCard
									movietitle={data.original_name}
									poster_path={data.poster_path}
									description={data.overview}
								/>
							</div>
						);
					})}
				</Segment>
			</Container>
		);
	} else {
		console.log('No Luck');
	}
}

export default ForYou;
