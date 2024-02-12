import {
	Item,
	ItemImage,
	ItemHeader,
	ItemContent,
	Icon,
	ItemMeta,
	ItemExtra,
	Popup,
} from 'semantic-ui-react';

// https://react.semantic-ui.com/views/item/#variations-link
const FriendItem = ({ friend }) => (
	<Item className="friend-item">
		<ItemImage size="tiny" src="avatars/default_avatar.svg" />
		<ItemContent className="friend-item-content">
			<ItemHeader>{`${friend.firstName} ${friend.lastName}`}</ItemHeader>
			<ItemMeta>{friend.userName}</ItemMeta>
			<ItemExtra>
				<Popup
					content="This feature is coming soon!"
					trigger={
						<a href="#">
							<Icon name="thumbs up" />
							See {friend.firstName}'s recommendations
						</a>
					}
				/>
			</ItemExtra>
		</ItemContent>
	</Item>
);

export default FriendItem;
