// NOTE, currently using state and effect to check if the add content buttons have been clicked, then disabling them.
// This isn't the cleanest solution as if it's previously been added, they won't be disabled on load and allow re-adding.
// Currently DB prevents re-adding, but this should be handled in the front end.
// Ideal solution would be querying the DB for the user's recommendations and watchlist and checking if the content is already in there.

// import { useState, useEffect, useQuery } from 'react';
import { useState, useEffect } from 'react';
import {
	Card,
	Image,
	Icon,
	Accordion,
	Button,
	CardContent,
	CardMeta,
	Label,
	Popup,
} from 'semantic-ui-react';
import {
	ADD_TV_RECOMMENDATION,
	ADD_MOVIE_RECOMMENDATION,
	ADD_MOVIE_WATCHLIST,
	ADD_TV_WATCHLIST,
} from '../utils/mutations';
import { QUERY_MYRECOMMENDATIONS, QUERY_MYWATCHLIST } from '../utils/selfQueries';
// import { ADD_MOVIE_RECOMMENDATION } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
// import { ADD_MOVIE_WATCHLIST } from '../utils/mutations';
// import { ADD_TV_WATCHLIST } from '../utils/mutations';
import ShareModal from './shareModal';
import { QUERY_FRIENREQ } from '../utils/queries';
import auth from '../utils/auth';

function SelectedContentCard({
	selectedContent,
	contentSource,
	noStreamingAvailable,
	activeIndex,
	setActiveIndex,
}) {
	const [isAddContentClicked, setIsAddContentClicked] = useState(false); // state for determing if the add content button has been clicked
	const [isAddToWatchClicked, setIsAddToWatchClicked] = useState(false); // state for determing if the add to watch button has been clicked
	const [friends, setFriends] = useState();


	useEffect(() => {
		// Reset the state of the buttons whenever the selectedContent changes
		setIsAddContentClicked(false);
		setIsAddToWatchClicked(false);
	}, [selectedContent]);

	const [addShow, { error, data }] = useMutation(ADD_TV_RECOMMENDATION,{refetchQueries: [{query: QUERY_MYRECOMMENDATIONS}]});
	const [addMovie, { error: error2, data: data2 }] = useMutation(
		ADD_MOVIE_RECOMMENDATION,{refetchQueries: [{query: QUERY_MYRECOMMENDATIONS}]});
	const [addWatch, { error: error3, data: data3 }] =
		useMutation(ADD_MOVIE_WATCHLIST,{refetchQueries: [{query: QUERY_MYWATCHLIST}]});
	const [addTVWatch, { error: error4, data: data4 }] =
		useMutation(ADD_TV_WATCHLIST,{refetchQueries: [{query: QUERY_MYWATCHLIST}]});
	
	const idNum = auth.getProfile();
	const { loading: loading2, error: error5, data: data5 } = useQuery(QUERY_FRIENREQ, {
		variables: { userId: idNum.data._id },
	})
	

	const addToWatch = async () => {
		const newNumber = selectedContent.id.toString();
		let url = window.location.href.split('/');
		let urlExt = url[3];
		let AU_platforms = contentSource.map((provider) => provider.provider_name);
		urlExt === 'movies'
			? await addWatch({
					variables: {
						input: {
							type: 'Movie',
							tmdbID: newNumber,
							overview: selectedContent.description,
							original_title: selectedContent.title,
							poster_path: selectedContent.posterImage,
							AU_platforms: AU_platforms,
						},
					},
			  }).then(() => {
					console.log('added');
					setIsAddToWatchClicked(true); // update the state here
			  })
			: urlExt === 'tv_shows'
			? await addTVWatch({
					variables: {
						input: {
							type: 'TV',
							tmdbID: newNumber,
							overview: selectedContent.description,
							original_name: selectedContent.title,
							poster_path: selectedContent.posterImage,
							AU_platforms: AU_platforms,
						},
					},
			  }).then(() => {
					console.log('added');
					setIsAddToWatchClicked(true); // update the state here
			  })
			: console.log('No Good');
	};

	const addContent = async () => {
		// console.log(selectedContent);
		const newNumber = selectedContent.id.toString();
		let url = window.location.href.split('/');
		let urlExt = url[3];
		let AU_platforms = contentSource.map((provider) => provider.provider_name);
		// console.log(AU_platforms);
		urlExt === 'tv_shows'
			? await addShow({
					variables: {
						input: {
							type: 'TV',
							tmdbID: newNumber,
							overview: selectedContent.description,
							original_name: selectedContent.title,
							poster_path: selectedContent.posterImage,
							AU_platforms: AU_platforms,
						},
					},
			  }).then(() => {
					console.log('added');
					setIsAddContentClicked(true); // update the state here
			  })
			: urlExt === 'movies'
			? await addMovie({
					variables: {
						input: {
							type: 'Movie',
							tmdbID: newNumber,
							overview: selectedContent.description,
							original_title: selectedContent.title,
							poster_path: selectedContent.posterImage,
							AU_platforms: AU_platforms,
						},
					},
			  }).then(() => {
					console.log('added');
					setIsAddContentClicked(true); // update the state here
			  })
			: console.log('Bad');
	};

	// const shareContent = () => {
	// 	<ShareModal />;
	// 	console.log('Good Stuff');
	// };

	let modalData = {};
	// console.log(selectedContent);

	if (selectedContent) {
		modalData = {
			original_title: selectedContent.title,
			overview: selectedContent.description,
			tmdbID: selectedContent.id.toString(),
			poster_path: selectedContent.posterImage,
			type: 'Movie',
		};
	}

	// console.log(modalData);
	// panels for the accordion
	// requires ternary to check if the selectedTVShow is null;
	// otherwise it will throw an error before a TV show is selected
	// renders the description and streaming providers, if available, else displays a message
	const panels = [
		{
			key: 'description',
			title: 'Description',
			content: selectedContent ? selectedContent.description : '',
		},
		{
			key: 'stream',
			title: 'Stream',
			content: {
				content: noStreamingAvailable
					? 'This content is not available in your region.'
					: contentSource &&
					  contentSource.map((provider) => (
							<Label
								key={provider.provider_id}
								image
								style={{ marginBottom: '4px' }}
							>
								<img
									src={`http://image.tmdb.org/t/p/w92/${provider.logo_path}`}
								/>
								{provider.provider_name}
							</Label>
					  )),
			},
		},
	];

	let matchingFriends;
	
	if (!friends&&selectedContent){
		setFriends(data5)
	}

	if (friends){
		const newNumber = selectedContent?.id.toString()||"0"

		let friendsArray = [];
		friends.friendRecommendations.forEach((friend) =>{
			for(let i=0; i<friend.recommendations.length; i++){
				if(friend.recommendations[i].tmdbID===newNumber){
					friendsArray.push(friend)
				}
			}
		})
		matchingFriends = friendsArray.length;
		console.log(friendsArray)

	}






	return (
		selectedContent && (
			<Card>
				<CardContent>
					<Card.Header> {selectedContent.title}</Card.Header>
				</CardContent>
				{selectedContent.backdropImage && (
					<Image
						src={`http://image.tmdb.org/t/p/w342/${selectedContent.backdropImage}`}
						wrapped
						ui={false}
						rounded
						style={{
							marginLeft: '15px',
							marginRight: '15px',
							marginBottom: '15px',
							borderRadius: '5px',
						}}
					/>
				)}
				<CardMeta
					style={{
						display: 'flex',
						alignItems: 'center',
						marginLeft: '15px',
						marginRight: '15px',
						marginBottom: '15px',
					}}
				>
					<Icon
						name="thumbs up outline"
						size="big"
						style={{ marginRight: '10px' }}
					/>
					<div>
						{' '}
						<strong>Recommended by {matchingFriends} other friends</strong>.
					</div>
				</CardMeta>
				<CardContent extra>
					<Accordion
						activeIndex={activeIndex}
						onTitleClick={(e, { index }) =>
							setActiveIndex(index === activeIndex ? -1 : index)
						}
						defaultActiveIndex={-1}
						panels={panels}
					/>
				</CardContent>
				<CardContent
					extra
					style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}
				>
					<Popup
						content={
							isAddContentClicked
								? "You've already recommended this"
								: 'Recommend this'
						}
						trigger={
							<Button
								circular
								basic
								primary
								icon="thumbs up"
								size="big"
								onClick={addContent}
								disabled={isAddContentClicked}
							/>
						}
					/>
					{/* <Button circular icon="share" size="big" onClick={shareContent}/> */}
					<ShareModal key={selectedContent.id} {...modalData} icon="add" />
					<Popup
						content={
							isAddToWatchClicked
								? "You've already added this to watchlist"
								: 'Add to watchlist'
						}
						trigger={
							<Button
								circular
								basic
								primary
								icon="eye"
								size="big"
								onClick={addToWatch}
								disabled={isAddToWatchClicked}
							/>
						}
					/>
				</CardContent>
			</Card>
		)
	);
}

export default SelectedContentCard;
