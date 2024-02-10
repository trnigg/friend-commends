import { gql } from '@apollo/client';

export const MUTATION_LOGIN = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
			token
			user {
				firstName
				lastName
				userName
				id
			}
		}
	}
`;

export const MUTATION_ADDUSER = gql`
	mutation AddUser($input: UserInput!) {
		addUser(input: $input) {
			token
			user {
				id
				firstName
				lastName
				email
				password
				dateOfBirth
			}
		}
	}
`;

export const MUTATION_DELETEUSER = gql`
	mutation deleteUser($deleteUserId: ID!) {
		deleteUser(id: $deleteUserId) {
			id
			userName
		}
	}
`;

export const MUTATION_SENDREQUEST = gql`
	mutation sendFriendRequest($fromUserId: ID!, $toUserId: ID!) {
		sendFriendRequest(fromUserId: $fromUserId, toUserId: $toUserId) {
			userName
			sentFriendRequests {
				userName
				firstName
				lastName
			}
		}
	}
`;

export const MUTATION_ACCEPTREQUEST = gql`
	mutation acceptFriendRequest($fromUserId: ID!, $toUserId: ID!) {
		acceptFriendRequest(fromUserId: $fromUserId, toUserId: $toUserId) {
			id
			userName
			firstName
			friends {
				id
				userName
				firstName
			}
		}
	}
`;

export const MUTATION_REJECTREQUEST = gql`
	mutation rejectFriendRequest($fromUserId: ID!, $toUserId: ID!) {
		rejectFriendRequest(fromUserId: $fromUserId, toUserId: $toUserId) {
			id
			userName
			firstName
			pendingFriendRequests {
				id
				userName
			}
		}
	}
`;

export const ACCEPT_FRIEND_REQUEST = gql`
	mutation AcceptFriendRequest($fromUserId: ID!, $toUserId: ID!) {
		acceptFriendRequest(fromUserId: $fromUserId, toUserId: $toUserId) {
			id
			userName
			firstName
			lastName
			friends {
				id
				userName
				firstName
				lastName
			}
			pendingFriendRequests {
				id
				userName
				firstName
				lastName
			}
		}
	}
`;

export const REJECT_FRIEND_REQUEST = gql`
	mutation RejectFriendRequest($fromUserId: ID!, $toUserId: ID!) {
		rejectFriendRequest(fromUserId: $fromUserId, toUserId: $toUserId) {
			id
			userName
			firstName
			lastName
			friends {
				id
				userName
				firstName
				lastName
			}
			pendingFriendRequests {
				id
				userName
				firstName
				lastName
			}
		}
	}
`;

export const SEND_FRIEND_REQUEST = gql`
	mutation SendFriendRequest($fromUserId: ID!, $toUserId: ID!) {
		sendFriendRequest(fromUserId: $fromUserId, toUserId: $toUserId) {
			id
			userName
			firstName
			lastName
			sentFriendRequests {
				id
				userName
				firstName
				lastName
			}
		}
	}
`;

export const ADD_TV_RECOMMENDATION = gql`
	mutation addTVRecommend($input: TVInput!) {
		addTVRecommend(input: $input) {
		userName
		}
	}
`;


export const ADD_MOVIE_RECOMMENDATION = gql`
	mutation AddMovieRecommend($input: MovieInput!) {
	addMovieRecommend(input: $input) {
	  userName
	}
  }
`;
