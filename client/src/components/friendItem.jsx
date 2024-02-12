import {
	Item,
	ItemImage,
	ItemHeader,
	ItemContent,
	Icon,
	ItemMeta,
	ItemExtra,
} from 'semantic-ui-react';

// https://react.semantic-ui.com/views/item/#variations-link
const FriendItem = ({ friend }) => (
	<Item>
		<ItemImage size="tiny" src="avatars/default_avatar.svg" />
		<ItemContent>
			<ItemHeader>{`${friend.firstName} ${friend.lastName}`}</ItemHeader>
			<ItemMeta>
				<span className="username">{friend.userName}</span>
			</ItemMeta>
			<ItemExtra>
				<Icon name="thumbs up" />
				<strong>0</strong> recommendations
			</ItemExtra>
		</ItemContent>
	</Item>
);

export default FriendItem;
