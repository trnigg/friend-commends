// import { useState } from "react";
// import CardExampleCard from "../components/CardPics";
// import MovieCard from "../components/movieCards";
// import { QUERY_FRIENREQ } from "../utils/queries";
// import auth from "../utils/auth";
// import { useQuery } from "@apollo/client";
// import MovieItems from "../components/MovieItems";
// import { ItemGroup } from "semantic-ui-react";

// function TVCont() {
// 	// let state = useLocation();
// 	const [userData, setUserData] = useState()
// 	const [date, setDate] = useState()

// 	const idNum = auth.getProfile();
// 	const { loading: loading2, error: error2, data: data2 } = useQuery(QUERY_FRIENREQ, {
// 		variables: { userId: idNum.data._id },
// 	})
// 	if(loading2){
// 		return <div>Please Wait......</div>
// 	}
// 	if(data2&&!date){
// 		setUserData(data2);
// 		const friendsDetails = data2.friendRecommendations;
// 		const friendArray = [];
// 		friendsDetails.forEach((entry)=>{
// 			friendArray.push(entry.recommendations)
// 		})
// 		const workingArray = friendArray.flat();
// 		const TVRecommend = workingArray
// 			.filter((entry) => entry.__typename === 'TV');
// 		const dateClone = TVRecommend;
// 		const newDateClone = [...new Set(dateClone)];
// 		const newDataCloneArray = [];
// 			newDateClone.forEach((y) => {
// 				const numbER = dateClone.filter(x => x==y).length
// 				newDataCloneArray.push({...y, count: numbER})
// 			});
// 			setDate([...newDataCloneArray]);
// 	}

// 	const recent = () => {
// 		const dateClone = date;
// 		const recentArray = dateClone.sort((a,b) => b.createdAt - a.createdAt);
// 		setDate([...recentArray]);
// 	}

// 	const recommended =() => {
// 		const dateClone = date;
// 		const recentArray = dateClone.sort((a,b) => b.count - a.count);
// 		setDate([...recentArray]);
// 	}

// 	const friendOmmend =(id) => {
// 		const newUsers = userData.friendRecommendations;
// 		const loopArray = [];
// 		newUsers.forEach((friend)=>{
// 			friend.recommendations.forEach((recommendation)=>{
// 				if(recommendation.tmdbID === id){
// 					loopArray.push(friend.userName)
// 				}
// 			})
// 		})

// 		return loopArray
// 	}

// 	const sortBy =()=>{
// 		const newChoice = selectFilter.value;
// 		newChoice === "recent" ? recent():
// 		newChoice === "recommended" ? recommended():
// 		console.log("Wrong");

// 	}
// 	if(date){
//     console.log(date)
// 	return (
// 		<div>
// 			<h1>This is the TV page</h1>
// 			<h3>would you like to sort by</h3>
// 			<select name="selectFilter" id="selectFilter" onChange={sortBy}>
// 				<option value="recent">most recent</option>
// 				<option value="recommended">most recommended</option>
// 			</select>
// 			<p>Your recommended TV Shows are:</p>
// 			<div className="recommendBox">
// 			<>
// 							{/* {date.map(function (data) {
// 								return (
// 									<div key={data.original_name}>
// 										<MovieCard
// 										movietitle={data.original_name}
//                                         poster_path={data.poster_path}
//                                         description={data.overview}
// 										friendRecommend={data.count}
// 										friendArray={friendOmmend(data.tmdbID)} />
// 									</div>
// 								);
// 							})} */}
// 							{date.map(function (data) {
// 								return (
// 									<ItemGroup divided	key={data.original_name}>
// 										<MovieItems
// 										key={data.original_name}
// 										movietitle={data.original_name}
//                                         poster_path={data.poster_path}
//                                         description={data.overview}
// 										friendRecommend={data.count}
// 										friendArray={friendOmmend(data.tmdbID)} />
// 									</ItemGroup>
// 								);
// 							})}

// 						</>

// 			</div>
// 		</div>
// 	);
// 	}
// }

// export default TVCont