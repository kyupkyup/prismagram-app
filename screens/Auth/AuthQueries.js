import {gql} from "apollo-boost";

export const LOG_IN = gql`
    mutation requestSecret($email: String!){
        requestSecret(email: $email)
    }
`;

export const CONFIRM_SECRET = gql`
    mutation confirmSecret($email: String!, $secret: String!){
        confirmSecret(email: $email, secret: $secret)

    }
`;
export const CREATE_ACCOUNT = gql`
    mutation createAccount(            
            $userName:String!
            $email:String!
            $firstName:String
            $lastName:String){

        createAccount(
            userName: $userName
            email: $email
            firstName: $firstName
            lastName: $lastName 
        )
    }
`;