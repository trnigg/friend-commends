import { MUTATION_SENDREQUEST } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Button, List, ListItem, Form, FormField } from 'semantic-ui-react'


function SendRequest(){
    const [ sendFriendRequest, {error, data}] = useMutation(MUTATION_SENDREQUEST);


    const initiate = async(e) =>{
        e.preventDefault();

        const init = document.getElementById('initiator').value;
        const receive = document.getElementById('receiver').value;
        console.log( init, receive);
        try{
            await sendFriendRequest({
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
            <h1>Make a friend request</h1>
            <Form onSubmit={initiate}>
                <FormField>
                    <label htmlFor="initiator">Request initiator (ID)</label>
                    <input type="text" id="initiator" />
                </FormField>
                <FormField>
                    <label htmlFor="receiver">Request receiver (ID)</label>
                    <input type="text" id="receiver" />
                </FormField>
                <Button>Make request</Button>
            </Form>
        </div>
    )
}

export default SendRequest;