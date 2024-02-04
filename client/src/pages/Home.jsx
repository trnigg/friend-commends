import { Button, List, ListItem, Form, FormField, Header } from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ALL } from '../utils/queries';
import auth from '../utils/auth';
import AddUser from '../components/createNewUser';
import Login from '../components/login';
import { useState } from 'react';
import { QUERY_USER } from "../utils/queries";
import LogNewUser from '../components/logNewUser';


function Home(){
    const [userName, setUserName] = useState()
    const [logState, setLogState] = useState()
    const { loading, error: error2, data: data2 } = useQuery(QUERY_ALL)
    if(data2){
        console.log(data2);
    }

    if (auth.loggedIn()){
    // setLogState("In");
    const proFile = auth.getProfile()
    console.log("JJJJJJJJJJJ");
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: {userId: proFile.data._id}
    })
    if(data){
        data.user.userName!==userName ?
        setUserName(data.user.userName): (userName);
    
        console.log(data.user.userName);
    }
    else{console.log("No Luck")}

    }

    return(
        <div>
            <Header as='H1'>Login Page</Header>
            {auth.loggedIn() ? (
                <>
                <p>Welcome {userName}, Press button to continue</p>
                <Button>Continue</Button>
                </>
            ) : (
                <>
                <LogNewUser />
                {/* <Login /> */}

                </>
            )}

            {/* <AddUser /> */}
        </div>
    )
}

export default Home;

