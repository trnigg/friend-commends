import React from 'react';
import {
	ItemMeta,
	ItemImage,
	ItemHeader,
	ItemGroup,
	ItemExtra,
	ItemDescription,
	ItemContent,
	Message,
	Icon,
	Button,
	Item,
	Label,
	Popup,
} from 'semantic-ui-react';
import ShareModal from './shareModal';
import { useMutation } from '@apollo/client';
import {
	MUTATION_ADDMOVIETOWATCHLIST,
	MUTATION_ADDTVTOWATCHLIST,
	MUTATION_REMOVESHAREITEM,
} from '../utils/selfMutations';
import { QUERY_MYWATCHLIST, QUERY_SHAREDWITHME } from '../utils/selfQueries';
import Auth from '../utils/auth';

export default function SharedItem(props) {
	//console.log('props:', props);
	const {
		id,
		overview,
		AU_platforms: platforms,
		type,
		poster_path,
		tmdbID,
	} = props.share;
	const watchList = props?.watch ||[];
	let posterURL = poster_path
		? `https://image.tmdb.org/t/p/w154/${poster_path}`
		: `https://react.semantic-ui.com/images/wireframe/image.png`;
	let title = props.share.original_title || props.share.original_name;
	let date = props.share.release_date || props.share.first_air_date;
	const itemType = type === 'TV' ? 'TV show' : type;
	const sender = props.share.sharedFrom
		? `${props.share.sharedFrom.firstName} ${props.share.sharedFrom.lastName[0]}`
		: null;
	const message = props.share.shareMessage ? props.share.shareMessage : '';
	//console.log("message:",props.share.shareMessage)

	const [addMovieToWatch, { error: movieErr }] = useMutation(
		MUTATION_ADDMOVIETOWATCHLIST,
		{
			refetchQueries: [
				QUERY_MYWATCHLIST, // Query to be refecthed
				'MyWatchList', // Query name
			],
		}
	);
	const [addTVToWatch, { error: tvErr }] = useMutation(
		MUTATION_ADDTVTOWATCHLIST,
		{
			refetchQueries: [
				QUERY_MYWATCHLIST, // Query to be refecthed
				'MyWatchList', // Query name
			],
		}
	);
	const [removeShare, { error: removeErr }] = useMutation(
		MUTATION_REMOVESHAREITEM,
		{
			refetchQueries: [
				QUERY_SHAREDWITHME, // Query to be refecthed
				'SharedWithMe', // Query name
			],
		}
	);

	const handleRemoveOnClick = async () => {
		//console.log("props.share",props.share)
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			await removeShare({
				variables: { shareId: id },
			});
		} catch (err) {
			console.error(err);
		}
	};

	const handleWatchOnClick = async () => {
		//console.log("props.share",props.share)
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		let newWatchItem = {};
		if (type === 'Movie') {
			newWatchItem = {
				type: type,
				poster_path: poster_path,
				tmdbID: tmdbID,
				overview: overview,
				AU_platforms: platforms,
				original_title: title,
				release_date: date,
			};

			try {
				await addMovieToWatch({
					variables: { addMovieToWatchInput: { ...newWatchItem } },
				});
			} catch (err) {
				console.error(err);
			}
		} else if (type === 'TV') {
			newWatchItem = {
				type: type,
				poster_path: poster_path,
				tmdbID: tmdbID,
				overview: overview,
				AU_platforms: platforms,
				original_name: title,
				first_air_date: date,
			};

			try {
				const { tvData } = await addTVToWatch({
					variables: { addTvToWatchInput2: { ...newWatchItem } },
				});
				console.log('tvData:', tvData);
			} catch (err) {
				console.error(err);
			}
		}
		//console.log("new obj:", newWatchItem);
	};

	return (
		<Item>
			<ItemImage src={posterURL} />

			<ItemContent key={tmdbID}>
				<ItemHeader as="a">{title}</ItemHeader>
				<ItemMeta>
					{sender ? (
						<>
							<p className="type">
								{sender} shared this {itemType} with you
							</p>
							<p className="senderMsg">{`"${message}" -- ${sender}`}</p>
						</>
					) : (
						<p className="type"> {itemType} </p>
					)}
				</ItemMeta>
				<ItemDescription>{overview}</ItemDescription>
				<ItemExtra>
					{platforms?.map((platform) => (
						<Label key={platform}>{platform}</Label>
					))}
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button basic negative onClick={() => handleRemoveOnClick()}>
							<Icon name="trash" />
							Remove from list
						</Button>
						<div style={{ display: 'flex' }}>
							<Popup
								content={
									watchList.includes(tmdbID)
										? 'Added to your watch list!'
										: 'Add to your watch list!'
								}
								trigger={
									<Button
										circular
										basic
										positive
										icon="eye"
										size="big"
										disabled={watchList.includes(tmdbID)}
										onClick={() => handleWatchOnClick()}
									/>
								}
							/>
							<ShareModal key={props.id} {...props.share} />
						</div>
					</div>
				</ItemExtra>
			</ItemContent>
		</Item>
	);
}
