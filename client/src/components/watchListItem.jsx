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
import { MUTATION_REMOVEWATCHITEM } from '../utils/selfMutations';
import { QUERY_MYWATCHLIST } from '../utils/selfQueries';
import Auth from '../utils/auth';

export default function WatchItem(props) {
	//console.log("props:", props);
	const { id, overview, AU_platforms: platforms, type } = props;
	let posterURL = props?.poster_path
		? `https://image.tmdb.org/t/p/w154/${props.poster_path}`
		: `https://react.semantic-ui.com/images/wireframe/image.png`;
	let title = props.original_title || props.original_name;
	const itemType = type === 'TV' ? 'TV show' : type;

	const [removeWatchItem, { error: movieErr }] = useMutation(
		MUTATION_REMOVEWATCHITEM,
		{
			refetchQueries: [
				QUERY_MYWATCHLIST, // Query to be refecthed
				'MyWatchList', // Query name
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
						<ShareModal key={props.id} {...props} />
					</div>
				</ItemExtra>
			</ItemContent>
		</Item>
	);
}
