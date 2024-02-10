import { Button } from 'semantic-ui-react';
import auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { Header } from 'semantic-ui-react';
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

	console.log("Hello")

	let userDetails = {};
	let friendsDetails = {};
	const idNum = auth.getProfile();
	console.log(idNum.data._id)
	const { loading: loading2, error: error2, data: data2 } = useQuery(QUERY_FRIENREQ, {
		variables: { userId: idNum.data._id },

	})
	const { loading, error, data } = useQuery(QUERY_USER, {
		variables: { userId: idNum.data._id },
	});
	if (loading||loading2) {
		return <div>Please Wait.....</div>;
	}
	if (data&&data2)  {
		userDetails = data;
		console.log("Yellow")
		friendsDetails = data2.friendRecommendations;
		const friendArray = [];
		friendsDetails.forEach((entry)=>{
			friendArray.push(entry.recommendations)
		})
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
			<div>
				<Header as="h1">Welcome {userDetails.user.userName} to your profile page</Header>
				<div>

					<h2>
						You have {userDetails.user.pendingFriendRequests.length} friend
						requests
					</h2>

					<Header as="h2">Friends Movie Recommendations</Header>
					<div className="movieBox">
						<>
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
						</>
					</div>
					<Button as='a' href='/Movies'>See more movie recommendations</Button>

					<Header as="h2">Friends TV Show Recommendations</Header>
					<div className="tvBox">
						<>
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
						</>
					</div>
					<Button as='a' href='/tv_shows'>See more TV recommendations</Button>

					<Header as="h2">Books</Header>
					<div className="bookBox">
						<>
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
						</>
					</div>

					<Button as='a' href='/books'>See Recommended</Button>
				</div>
			</div>
		);
	} else {
		console.log('No Luck');
	}
}

export default ForYou;
