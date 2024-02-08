import { Button, List, ListItem, Form, FormField } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import { MUTATION_DELETEUSER } from '../utils/mutations';
import SendRequest from '../components/sendRequest';
import AcceptRequest from '../components/acceptRequest';
  

function Indiv_Shows(){
    const [ deleteUser, {error, data}] = useMutation(MUTATION_DELETEUSER);


    const delUser=async()=>{
       const number = document.getElementById('userId').value;
        try{
            await deleteUser({
                variables: {
                    deleteUserId: number
                }
            })
            .then((data) => console.log(data))
                
        }catch(err){console.log(err)}
    }

    return(
        <div>
            <h1>Individual Shows</h1>
            <br />
            <Form onSubmit={delUser}>
                <h2> Delete A User</h2>
                <FormField>
                    <label htmlFor="userId">User Id to delete</label>
                    <input type="text" id='userId' />
                </FormField>
                <Button>Delete User</Button>
            </Form>

            <SendRequest />
            <AcceptRequest />
        </div>
    )
}

export default Indiv_Shows;