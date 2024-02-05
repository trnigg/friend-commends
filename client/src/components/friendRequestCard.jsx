import {
	CardMeta,
	CardHeader,
	CardDescription,
	CardContent,
	Button,
	Card,
	Icon,
} from 'semantic-ui-react';

function FriendRequestCard({ request, onAccept, onReject }) {
	return (
		<Card>
			<CardContent>
				<CardHeader>
					{request.firstName} {request.lastName}
				</CardHeader>
				<CardMeta>{request.userName}</CardMeta>
				<CardDescription>
					{request.firstName} wants to add you as a <strong>friend</strong>.
				</CardDescription>
			</CardContent>
			<CardContent extra>
				<div className="ui two buttons">
					<Button basic color="green" onClick={onAccept}>
						<Icon name="user plus" />
						Accept
					</Button>
					<Button basic color="red" onClick={onReject}>
						<Icon name="user times" />
						Decline
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

export default FriendRequestCard;
