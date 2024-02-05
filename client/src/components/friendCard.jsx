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

import React from 'react';
import {
	CardMeta,
	CardHeader,
	CardDescription,
	CardContent,
	Card,
	Icon,
	Image,
} from 'semantic-ui-react';

const FriendCard = ({ friend }) => (
	<Card>
		<Image
			src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
			wrapped
			ui={false}
		/>
		<CardContent>
			<CardHeader>{`${friend.firstName} ${friend.lastName}`}</CardHeader>
			<CardMeta>
				<span className="username">{friend.userName}</span>
			</CardMeta>
			<CardDescription>{friend.bio || 'No bio available.'}</CardDescription>
		</CardContent>
		<CardContent extra>
			<a>
				<Icon name="thumbs up" />
				<strong>0</strong> recommendations
			</a>
		</CardContent>
	</Card>
);

export default FriendCard;
