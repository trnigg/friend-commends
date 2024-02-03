import { QUERY_FRIENDS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Button, List, ListItem, Form, FormField } from 'semantic-ui-react'


function GetFriends(){

    const { friends, error, data } = useQuery(QUERY_FRIENDS, {
        variables: {
            friendsId: "65bdf4089d1efc62380f2f52"
        }
    })
    if(data){
        console.log(data)
    }

    return <div>Hello</div>
}

export default GetFriends;