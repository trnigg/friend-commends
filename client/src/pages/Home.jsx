import { Button, List, ListItem, Form, FormField, Header } from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ALL } from '../utils/queries';
import auth from '../utils/auth';
import AddUser from '../components/createNewUser';
import Login from '../components/login';
import { useState } from 'react';
import { QUERY_USER } from "../utils/queries";
import LogNewUser from '../components/logNewUser';
import { QUERY_FRIENREQ } from '../utils/queries';


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
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: {userId: proFile.data._id}
    })
    if(data){
        data.user.userName!==userName ?
        setUserName(data.user.userName): (userName);
        }
    else{console.log("No Luck")}
    }

    if (auth.loggedIn()){
        // setLogState("In");
        const { loading, error, data } = useQuery(QUERY_FRIENREQ)
        if(data&&data!==logState){
            console.log(data);
            setLogState(data);
            }
        else{console.log("No Luck")}
        }
    
    let recommArray = [];


    if(logState){
        console.log(logState.friendRecommendations)
        const array1 = logState.friendRecommendations
        array1.forEach((entry)=>{
            console.log(entry.recommendations)
            recommArray.push(entry.recommendations)
        })

    console.log(recommArray)

    }
    return(
        <div>
            <Header as='h1'>Login Page</Header>
            {auth.loggedIn() ? (
                <>
                <p>Welcome {userName}, Press button to continue</p>
                <Button as='a' href='/nav_page' something={"plenty"}>Continue</Button>
                </>
            ) : (
                <>
                <LogNewUser />
                </>
            )}
        </div>
    )
}

export default Home;

