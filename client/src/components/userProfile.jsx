import {
	CardMeta,
	CardHeader,
	CardDescription,
	CardContent,
	Card,
	Icon,
	Image,
	Button,
} from 'semantic-ui-react';
import UpdateProfileModal from './updateProfile';

const UserCard = (props) => {
	const { userName, firstName, lastName, dateOfBirth, email, recommendations } =
		props.data;
	//console.log("props.data", props.data);
	const numberOfRecs = recommendations.length || 0;

	const birthday = new Date(parseInt(dateOfBirth, 10)).toLocaleDateString(
		'en-AU'
	);

	return (
		<Card raised>
			<Image src="avatars/default_avatar.svg" wrapped ui={false} />
			<CardContent>
				<CardHeader>{`${firstName} ${lastName}`}</CardHeader>
				<CardMeta>
					<span className="username">{userName}</span>
				</CardMeta>
				<CardDescription>
					<p>{dateOfBirth ? `DOB: ${birthday}` : 'DOB: Not Available'}</p>
					<p>{`Email address: ${email}`}</p>
				</CardDescription>
				<UpdateProfileModal {...props.data} />
			</CardContent>
			<CardContent extra>
				<a>
					<Icon name="thumbs up" />
					You have made <strong>{numberOfRecs}</strong> recommendations
				</a>
			</CardContent>
		</Card>
	);
};
export default UserCard;
