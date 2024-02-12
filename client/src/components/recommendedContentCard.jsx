// NOTE, currently using state and effect to check if the add content buttons have been clicked, then disabling them.
// This isn't the cleanest solution as if it's previously been added, they won't be disabled on load and allow re-adding.
// Currently DB prevents re-adding, but this should be handled in the front end.
// Ideal solution would be querying the DB for the user's recommendations and watchlist and checking if the content is already in there.

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
// import { ADD_MOVIE_RECOMMENDATION } from '../utils/mutations';
import { useMutation } from '@apollo/client';
// import { ADD_MOVIE_WATCHLIST } from '../utils/mutations';
// import { ADD_TV_WATCHLIST } from '../utils/mutations';
import ShareModal from './shareModal';

function RecommendedContentCard({
	selectedContent,
	contentSource,
	noStreamingAvailable,
	cardId,
	handleClick,
	activeIndex,
	type, // type of content; used to determine which mutation to use
}) {
	const [isAddContentClicked, setIsAddContentClicked] = useState(false); // state for determing if the add content button has been clicked
	const [isAddToWatchClicked, setIsAddToWatchClicked] = useState(false); // state for determing if the add to watch button has been clicked

	useEffect(() => {
		// Reset the state of the buttons whenever the selectedContent changes
		setIsAddContentClicked(false);
		setIsAddToWatchClicked(false);
	}, [selectedContent]);

	const [addShow, { error, data }] = useMutation(ADD_TV_RECOMMENDATION);
	const [addMovie, { error: error2, data: data2 }] = useMutation(
		ADD_MOVIE_RECOMMENDATION
	);
	const [addWatch, { error: error3, data: data3 }] =
		useMutation(ADD_MOVIE_WATCHLIST);
	const [addTVWatch, { error: error4, data: data4 }] =
		useMutation(ADD_TV_WATCHLIST);

	const addContent = async () => {
		const newNumber = selectedContent.id.toString();
		let contentType = selectedContent.type;
		let AU_platforms = contentSource.map((provider) => provider.provider_name);

		type === 'TV'
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
			: type === 'Movie'
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

	const addToWatch = async () => {
		const newNumber = selectedContent.id.toString();
		let contentType = selectedContent.type;
		let AU_platforms = contentSource.map((provider) => provider.provider_name);

		type === 'Movie'
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
			: type === 'TV'
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

	let modalData = {};
	console.log(selectedContent);
	if (selectedContent) {
		modalData = {
			original_title: selectedContent.title,
			overview: selectedContent.description,
			tmdbID: selectedContent.id.toString(),
			poster_path: selectedContent.posterImage,
			type: 'Movie',
		};
	}

	console.log(modalData);
	// panels for the accordion
	// requires ternary to check if the selectedTVShow is null;
	// otherwise it will throw an error before a TV show is selected
	// renders the description and streaming providers, if available, else displays a message

	// use props to pass the cardId and index to the handleClick function
	const handleTitleClick = (e, titleProps) => {
		const { index } = titleProps;
		handleClick(cardId, index);
	};

	// Inline style for label has been retained due to Semanntic overriding, and limited time to solve
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
					  contentSource.map((platform, index) => (
							<Label key={index} style={{ marginBottom: '4px' }}>
								{platform}
							</Label>
					  )),
			},
		},
	];

	return (
		selectedContent && (
			<Card raised className="recommended-card">
				<CardContent>
					<Card.Header> {selectedContent.title}</Card.Header>
				</CardContent>
				{selectedContent.backdropImage && (
					<Image
						className="content-card-image"
						src={`http://image.tmdb.org/t/p/w342/${selectedContent.backdropImage}`}
						wrapped
						ui={false}
						rounded
					/>
				)}
				<CardMeta className="content-card-meta">
					<Icon name="thumbs up outline" size="large" />
					<span>
						{' '}
						Recommended by <strong>4 friends</strong>.
					</span>
				</CardMeta>
				<CardContent extra>
					<Accordion
						activeIndex={activeIndex}
						onTitleClick={handleTitleClick}
						panels={panels}
					/>
				</CardContent>
				<CardContent className="content-card-button-container" extra>
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

export default RecommendedContentCard;
