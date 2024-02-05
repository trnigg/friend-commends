import { useQuery, useMutation } from '@apollo/client';
import {
	ACCEPT_FRIEND_REQUEST,
	REJECT_FRIEND_REQUEST,
} from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import AuthService from '../utils/auth';
import GetFriends from '../components/getFriends';
import FriendRequests from '../components/friendRequests';
import {
	HeaderSubheader,
	HeaderContent,
	Header,
	Icon,
} from 'semantic-ui-react';

function Friends() {
	const { data: { _id: id } = {} } = AuthService.getProfile();

	const { loading, error, data } = useQuery(QUERY_USER, {
		variables: { id },
	});

	const [AcceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
	const [rejectFriendRequest] = useMutation(REJECT_FRIEND_REQUEST);

	const handleAccept = (fromUserId) => {
		AcceptFriendRequest({ variables: { fromUserId, toUserId: id } });
	};

	const handleDecline = (fromUserId) => {
		rejectFriendRequest({ variables: { fromUserId, toUserId: id } });
	};

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	return (
		<div>
			<Header as="h1">Friends</Header>
			<Header as="h2" icon textAlign="center">
				<Icon name="user plus" circular />
				<HeaderContent>
					Friend Requests
					<HeaderSubheader>
						You have <strong>{data.user.pendingFriendRequests.length}</strong>{' '}
						friend requests awaiting your response.
					</HeaderSubheader>
				</HeaderContent>
			</Header>
			<FriendRequests
				requests={data.user.pendingFriendRequests}
				onAccept={handleAccept}
				onDecline={handleDecline}
			/>
			<Header as="h2" icon textAlign="center">
				<Icon name="users" circular />
				<HeaderContent>
					Your Friends
					<HeaderSubheader>
						You have <strong>{data.user.friends.length}</strong> friends.
					</HeaderSubheader>
				</HeaderContent>
			</Header>
			<GetFriends friends={data.user.friends} />
		</div>
	);
}

export default Friends;
