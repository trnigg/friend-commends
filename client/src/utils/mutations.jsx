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