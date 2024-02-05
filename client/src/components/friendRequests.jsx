import FriendRequestCard from './friendRequestCard';
import { CardGroup } from 'semantic-ui-react';

const FriendRequests = ({ requests, onAccept, onDecline }) => {
	return (
		<CardGroup>
			{requests.map((request) => (
				<FriendRequestCard
					key={request.id}
					firstName={request.firstName}
					lastName={request.lastName}
					userName={request.userName}
					onAccept={() => onAccept(request.id)}
					onReject={() => onDecline(request.id)}
				/>
			))}
		</CardGroup>
	);
};

export default FriendRequests;
