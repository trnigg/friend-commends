//TODO: Update <a> tag to link to friend's profile page
//TODO: Need to update GraphQL schema to include friend recommendations
//e.g:
// query {
//     user {
//       friends {
//         id
//         firstName
//         lastName
//         userName
//         bio
//         user {
//           recommendations
//         }
//       }
//     }
//   }

//NOTE: Can copy to implement user search and replace <a> tag with button to send friend request - "Add as a friend to see their recommendations"

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
const FriendCard = ({ friend }) => (
	<Item>
		<ItemImage
			size="tiny"
			src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
		/>
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

export default FriendCard;
