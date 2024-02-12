import { useState } from 'react';
import { QUERY_FRIENREQ } from '../utils/queries';
import auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import MovieItems from '../components/MovieItems';
import {
	ItemGroup,
	Button,
	Header,
	Divider,
	Select,
	Icon,
} from 'semantic-ui-react';

function PageCont() {
	// let state = useLocation();
	const [userData, setUserData] = useState();
	const [date, setDate] = useState();
	const [date2, setDate2] = useState();
	const [format, setFormat] = useState();

	let url = window.location.href;
	let newurl = url.substr(1 + url.lastIndexOf('/'));
	if (!format) {
		newurl === 'movies'
			? setFormat('Movie')
			: newurl === 'tv_shows'
			? setFormat('TV')
			: console.log('Invalid Format');
	}

	const idNum = auth.getProfile();
	const {
		loading: loading2,
		error,
		data,
	} = useQuery(QUERY_FRIENREQ, {
		variables: { userId: idNum.data._id },
	});
	if (loading2) {
		return <div>Please Wait......</div>;
	}
	if (data && !date && format) {
		setUserData(data);
		const friendsDetails = data.friendRecommendations;
		const friendArray = [];
		friendsDetails.forEach((entry) => {
			friendArray.push(entry.recommendations);
		});
		const workingArray = friendArray.flat();
		const movieRecommend = workingArray.filter(
			(entry) => entry.__typename === format
		);
		const dateClone = movieRecommend;
		const newDateClone = [...new Set(dateClone)];
		const newDataCloneArray = [];
		newDateClone.forEach((y) => {
			const numbER = dateClone.filter((x) => x == y).length;
			newDataCloneArray.push({ ...y, count: numbER });
		});
		setDate([...newDataCloneArray]);
		setDate2([...newDataCloneArray]);
	}

	const recent = () => {
		const dateClone = date2;
		const recentArray = dateClone.sort((a, b) => b.createdAt - a.createdAt);
		setDate2([...recentArray]);
	};

	const recommended = () => {
		const dateClone = date2;
		const recentArray = dateClone.sort((a, b) => b.count - a.count);
		setDate2([...recentArray]);
	};

	const friendOmmend = (id) => {
		const newUsers = userData.friendRecommendations;
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

	const sortBy = (e) => {
		const newChoice = e.target.innerText;
		newChoice === 'most recent'
			? recent()
			: newChoice === 'most recommended'
			? recommended()
			: console.log('Wrong');
	};

	const refineFriends = (e) => {
		const objectFilter = userData.friendRecommendations.filter(
			(user) => user.userName === e.target.innerText
		);

		let reviewedArray = [];
		objectFilter[0].recommendations.forEach((recommendation) => {
			for (let i = 0; i < date.length; i++) {
				if (date[i].tmdbID === recommendation.tmdbID) {
					reviewedArray.push(date[i]);
				}
			}
		});
		const filterByType = reviewedArray.filter(
			(entry) => entry.__typename === format
		);

		setDate2([...filterByType]);
	};

	const resetAll = () => {
		setDate();
	};

	if (date) {
		const friendArray = userData.friendRecommendations.map(function (entry) {
			return {
				key: entry.userName,
				value: entry.userName,
				text: entry.userName,
			};
		});

		return (
			<>
				<div className="header-filter-container">
					<Header as="h3">Refine your results:</Header>
					{/* <select name="selectFilter" id="selectFilter" onChange={sortBy}>
				<option value="recent">most recent</option>
				<option value="recommended">most recommended</option>
			</select> */}
					<div className="filter-container">
						<Select
							name="selectFilter"
							id="selectFilter"
							placeholder="Sort by"
							options={[
								{ key: 'recent', value: 'recent', text: 'most recent' },
								{
									key: 'recommended',
									value: 'recommended',
									text: 'most recommended',
								},
							]}
							onChange={sortBy}
						/>
						<Select
							placeholder="Search by friends"
							search
							options={friendArray}
							onChange={refineFriends}
							id="friendSearch"
						/>
						<Button basic primary onClick={resetAll}>
							<Icon name="refresh" />
							Reset
						</Button>
					</div>
				</div>
				<Divider section />
				<ItemGroup divided>
					{date2.map(function (data) {
						return (
							<MovieItems
								key={data?.original_title || data.original_name}
								movietitle={data?.original_title || data.original_name}
								original_title={data?.original_title || data.original_name}
								poster_path={data.poster_path}
								description={data.overview}
								overview={data.overview}
								friendRecommend={data.count}
								platforms={data.AU_platforms}
								type={format}
								tmdbID={data.tmdbID}
								friendArray={friendOmmend(data.tmdbID)}
							/>
						);
					})}
				</ItemGroup>
			</>
		);
	}
}

export default PageCont;
