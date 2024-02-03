import { MUTATION_REJECTREQUEST } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Button, List, ListItem, Form, FormField } from 'semantic-ui-react'


function RejectRequest(){
    const [ rejectFriendRequest, {error, data}] = useMutation(MUTATION_REJECTREQUEST);


    const reject = async(e) =>{
        e.preventDefault();

        const init = document.getElementById('rejector').value;
        const receive = document.getElementById('rejectee').value;
        console.log( init, receive);
        try{
            await rejectFriendRequest({
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
            <h1>Reject a friend request</h1>
            <Form onSubmit={reject}>
                <FormField>
                    <label htmlFor="rejector">Request rejector (ID)</label>
                    <input type="text" id="rejector" />
                </FormField>
                <FormField>
                    <label htmlFor="rejectee">Request rejectee (ID)</label>
                    <input type="text" id="rejectee" />
                </FormField>
                <Button>Make request</Button>
            </Form>
        </div>
    )
}

export default RejectRequest;