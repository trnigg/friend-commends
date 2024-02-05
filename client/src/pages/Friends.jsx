import { useQuery, useMutation } from '@apollo/client';
import {
	ACCEPT_FRIEND_REQUEST,
	REJECT_FRIEND_REQUEST,
} from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import AuthService from '../utils/auth';

import FriendRequestCard from '../components/friendRequestCard';
import FriendCard from '../components/friendCard';
import UserSearchBar from '../components/userSearchBar';

import {
	HeaderSubheader,
	HeaderContent,
	Header,
	Icon,
	CardGroup,
	Message,
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
			<UserSearchBar />
			{/* Use React conditional rendering to only render if 1 or more active requests. */}
			{data.user.pendingFriendRequests.length > 0 && (
				<>
					<Header as="h2">
						<Icon name="user outline" />
						<HeaderContent>
							Friend Requests
							<HeaderSubheader>
								{/* Pluralise if more not 1 friend */}
								You have{' '}
								<strong>{data.user.pendingFriendRequests.length}</strong> friend
								request{data.user.pendingFriendRequests.length !== 1 ? 's' : ''}{' '}
								awaiting your response.
							</HeaderSubheader>
						</HeaderContent>
					</Header>
					<CardGroup>
						{data.user.pendingFriendRequests.map((request) => (
							<FriendRequestCard
								key={request.id}
								request={request}
								onAccept={() => handleAccept(request.id)}
								onReject={() => handleDecline(request.id)}
							/>
						))}
					</CardGroup>
				</>
			)}
			<Header as="h2">
				<Icon name="users" />
				<HeaderContent>
					Your Friends
					<HeaderSubheader>
						{/* Pluralise if more not 1 friend */}
						You have <strong>{data.user.friends.length}</strong> friend
						{data.user.friends.length !== 1 ? 's' : ''}.
					</HeaderSubheader>
				</HeaderContent>
			</Header>
			{data.user.friends.length > 0 ? (
				<CardGroup>
					{data.user.friends.map((friend) => (
						<FriendCard key={friend.id} friend={friend} />
					))}
				</CardGroup>
			) : (
				<Message>
					Start by adding some friends to see their recommendations, and get
					tailored recommendations for you!
				</Message>
			)}
		</div>
	);
}

export default Friends;
