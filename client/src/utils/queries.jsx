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
