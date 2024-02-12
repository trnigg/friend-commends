import {
	ButtonOr,
	ButtonGroup,
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
		<Card raised>
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
				<ButtonGroup>
					<Button basic color="green" onClick={() => onAccept(request.id)}>
						<Icon name="user plus" />
						Accept
					</Button>
					<ButtonOr />
					<Button basic color="red" onClick={() => onReject(request.id)}>
						<Icon name="user times" />
						Decline
					</Button>
				</ButtonGroup>
			</CardContent>
		</Card>
	);
}

export default FriendRequestCard;
