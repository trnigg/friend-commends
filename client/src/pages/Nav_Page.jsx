import { FormField, Button, Checkbox, Form } from 'semantic-ui-react'
import { MUTATION_LOGIN } from '../utils/mutations';
import auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import Login from '../components/login';
import { Header } from 'semantic-ui-react'
import React from 'react'; 

function Nav_Page(){

    return(
        <div>
            <Header as='H1'>Welcome to you Login Page</Header>
            <div>
                {auth.loggedIn() ? (console.log("logged in")):(console.log('logged out'))}
            </div>
            <Login />
        </div>
    )
}

export default Nav_Page;