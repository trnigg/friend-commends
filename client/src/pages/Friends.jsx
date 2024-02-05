import { useQuery, useMutation } from '@apollo/client';
import {
	ACCEPT_FRIEND_REQUEST,
	REJECT_FRIEND_REQUEST,
} from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import AuthService from '../utils/auth';

import FriendRequestCard from '../components/friendRequestCard';
import FriendCard from '../components/friendCard';

import {
	HeaderSubheader,
	HeaderContent,
	Header,
	Icon,
	CardGroup,
} from 'semantic-ui-react';

function Friends() {
	const { data: { _id: userId } = {} } = AuthService.getProfile();

	const { loading, error, data } = useQuery(QUERY_USER, {
		variables: { userId },
	});
	console.log(userId);
	console.log(data);

	const [AcceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
	const [rejectFriendRequest] = useMutation(REJECT_FRIEND_REQUEST);

	const handleAccept = (fromUserId) => {
		AcceptFriendRequest({ variables: { fromUserId, toUserId: userId } });
	};

	const handleDecline = (fromUserId) => {
		rejectFriendRequest({ variables: { fromUserId, toUserId: userId } });
	};

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	console.log(data);
	return (
		<div>
			<Header as="h1">Friends</Header>
			<Header as="h2" icon textAlign="center">
				<Icon name="user plus" circular />
				<HeaderContent>
					Friend Requests
					<HeaderSubheader>
						You have <strong>{data.user.pendingFriendRequests.length}</strong>
						friend requests awaiting your response.
					</HeaderSubheader>
				</HeaderContent>
			</Header>
			<CardGroup>
				{data.user.pendingFriendRequests.map((request) => (
					<FriendRequestCard
						key={request.id}
						firstName={request.firstName}
						lastName={request.lastName}
						userName={request.userName}
						onAccept={() => handleAccept(request.id)}
						onReject={() => handleDecline(request.id)}
					/>
				))}
			</CardGroup>
			<Header as="h2" icon textAlign="center">
				<Icon name="users" circular />
				<HeaderContent>
					Your Friends
					<HeaderSubheader>
						You have <strong>{data.user.friends.length}</strong> friends.
					</HeaderSubheader>
				</HeaderContent>
			</Header>
			<CardGroup></CardGroup>
		</div>
	);
}

export default Friends;
