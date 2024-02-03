import { gql } from '@apollo/client';

export const QUERY_ALL = gql`
    query Users {
        users {
        firstName
        id
        lastName
        email
        password
        dateOfBirth
        userName
        }
    }
`;

export const QUERY_USER = gql`
    query user($userId: ID!) {
        user(id: $userId) {
        userName
        firstName
        lastName
        email
        password
        dateOfBirth
        }
    }
`;

export const QUERY_FRIENDS = gql`
    query friends($friendsId: ID!) {
        friends(id: $friendsId) {
        id
        userName
        firstName
        lastName
        }
    }
`;
