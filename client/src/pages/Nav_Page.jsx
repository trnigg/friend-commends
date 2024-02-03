import { FormField, Button, Checkbox, Form } from 'semantic-ui-react'
import { MUTATION_LOGIN } from '../utils/mutations';
import auth from '../utils/auth';
import { useMutation } from '@apollo/client';

function Nav_Page(){
    const [login, {error, data}] = useMutation(MUTATION_LOGIN);

    const tryLogin = async(e) =>{
        e.preventDefault();

        const item1 = document.getElementById('num1').value;
        const item2 = document.getElementById('num2').value;

        console.log(`Form Submitted ${item1} ${item2}`);

        try{
            await login({
                variables: { input: {email: item1,
                            password: item2} },
            })
            .then((data)=> {
                console.log(data);
                auth.login(data.data.login.token);
            });


        }catch(err){
            console.log(err)
        }
    };

    return(
        <div>
            <h1>Nav Page</h1>

            <Form onSubmit={tryLogin}>
                <FormField>
                    <label htmlFor="num1">email</label>
                    <input type="text" id="num1" />
                </FormField>
                <FormField>
                    <label htmlFor="num2">password</label>
                    <input type="text" id="num2"/>
                </FormField>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default Nav_Page;