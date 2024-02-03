import { MUTATION_ACCEPTREQUEST } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Button, List, ListItem, Form, FormField } from 'semantic-ui-react'


function AcceptRequest(){
    const [ acceptFriendRequest, {error, data}] = useMutation(MUTATION_ACCEPTREQUEST);


    const accept = async(e) =>{
        e.preventDefault();

        const init = document.getElementById('acceptor').value;
        const receive = document.getElementById('acceptee').value;
        console.log( init, receive);
        try{
            await acceptFriendRequest({
                variables: {
                    fromUserId: init,
                    toUserId: receive                  
                }
            })
            .then((data)=>console.log(data))
        }catch(err){console.log(err)}

    }

    return(
        <div>
            <h1>Accept a friend request</h1>
            <Form onSubmit={accept}>
                <FormField>
                    <label htmlFor="acceptor">Person accepting (ID)</label>
                    <input type="text" id="acceptor" />
                </FormField>
                <FormField>
                    <label htmlFor="acceptee">From (ID)</label>
                    <input type="text" id="acceptee" />
                </FormField>
                <Button>Accept Request</Button>
            </Form>
        </div>
    )
}

export default AcceptRequest;