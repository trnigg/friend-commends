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
} from 'semantic-ui-react';
import ShareModal from './shareModal';
import { useMutation } from '@apollo/client';
import {
	MUTATION_REMOVEWATCHITEM,
	MUTATION_ADDRECOMMENDMOVIE,
	MUTATION_ADDRECOMMENDTV,
} from '../utils/selfMutations';
import {
	QUERY_MYWATCHLIST,
	QUERY_MYRECOMMENDATIONS,
} from '../utils/selfQueries';
import Auth from '../utils/auth';

export default function WatchItem(props) {
	console.log('props:', props);
	const {
		id,
		overview,
		tmdbID,
		AU_platforms: platforms,
		type,
		poster_path,
	} = props.watch;
	const posterURL = poster_path
		? `https://image.tmdb.org/t/p/w342${poster_path}`
		: `https://react.semantic-ui.com/images/wireframe/image.png`;
	const title = props.watch?.original_title || props.watch?.original_name;
	const itemType = type === 'TV' ? 'TV show' : type;

	const recommendList = props?.recommend || [];
	const [removeWatchItem, { error: removeErr }] = useMutation(
		MUTATION_REMOVEWATCHITEM,
		{ refetchQueries: [{ query: QUERY_MYWATCHLIST }] }
	);

	const [addRecommendMovie, { error: movieErr }] = useMutation(
		MUTATION_ADDRECOMMENDMOVIE,
		{ refetchQueries: [{ query: QUERY_MYRECOMMENDATIONS }] }
	);

	const [addRecommendTV, { error: tvErr }] = useMutation(
		MUTATION_ADDRECOMMENDTV,
		{ refetchQueries: [{ query: QUERY_MYRECOMMENDATIONS }] }
	);

	const handleAddRecommend = async () => {
		//console.log("props.share",props.share)
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		let newRecommendItem = {};
		if (type === 'Movie') {
			newRecommendItem = {
				type: type,
				poster_path: poster_path,
				tmdbID: tmdbID,
				overview: overview,
				AU_platforms: platforms,
				original_title: title,
			};

			try {
				await addRecommendMovie({
					variables: { addMovieRecommendInput2: { ...newRecommendItem } },
				});
			} catch (err) {
				console.error(err);
			}
		} else if (type === 'TV') {
			newRecommendItem = {
				type: type,
				poster_path: poster_path,
				tmdbID: tmdbID,
				overview: overview,
				AU_platforms: platforms,
				original_name: title,
			};

			try {
				const { tvData } = await addRecommendTV({
					variables: { addTvRecommendInput2: { ...newRecommendItem } },
				});
				//console.log('tvData:', tvData);
			} catch (err) {
				console.error(err);
			}
		}
	};

	const handleRemoveOnClick = async () => {
		//console.log("props.share",props.share)
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			await removeWatchItem({
				variables: { removeFromWatchListId: id },
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Item>
			<ItemImage src={posterURL} />

			<ItemContent>
				<ItemHeader as="a">{title}</ItemHeader>
				<ItemMeta>
					<span className="type"> {itemType} </span>
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
							<Button
								circular
								basic
								primary
								icon="thumbs up"
								size="big"
								onClick={handleAddRecommend}
								disabled={recommendList.includes(tmdbID)}
							/>
							<ShareModal key={props.id} {...props} />
						</div>
					</div>
				</ItemExtra>
			</ItemContent>
		</Item>
	);
}
