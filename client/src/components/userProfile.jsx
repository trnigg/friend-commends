import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
  Button
} from "semantic-ui-react";

const UserCard = (props) => {
  const {
    userName,
    firstName,
    lastName,
    dateOfBirth,
    email,
    recommendations,
  } = props.data;
  //console.log("userName", userName);
   const numberOfRecs = recommendations.length||0;

  return (
    <Card color='teal' >
      <Image src="avatars/24-girl.svg" wrapped ui={false} />
      <CardContent>
        <CardHeader>{`${firstName} ${lastName}`}</CardHeader>
        <CardMeta>
          <span className="username">{userName}</span>
        </CardMeta>
        <CardDescription>
          <p>{dateOfBirth ? `DOB: ${dateOfBirth}` : "DOB: Not Available"}</p>
          <p>{`Email address: ${email}`}</p>
        </CardDescription>
        <Button>Update your profile</Button>
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
