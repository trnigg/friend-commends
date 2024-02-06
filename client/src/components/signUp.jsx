import { MUTATION_ADDUSER } from '../utils/mutations';
import auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { Button, List, ListItem, Form, FormField } from 'semantic-ui-react'



function AddUser(props){
    const [ adduser, {error, data}] = useMutation(MUTATION_ADDUSER);

    const goLogin = () => {
        props.onSubmit('login')
    }

    const plusUser = async(e) => {
        e.preventDefault();

        const uName = document.getElementById('userName').value;
        const fName = document.getElementById('firstName').value;
        const lName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const pword = document.getElementById('password').value;
        const dob = document.getElementById('DOB').value;

        try{
            await adduser({
                    variables: {
                          input: {
                                userName: uName,
                                firstName: fName,
                                lastName: lName,
                                email: email,
                                password: pword,
                                dateOfBirth: dob
                          }  
                    }
            })
            .then((data)=> {
                auth.login(data.data.addUser.token);
            });

        }catch(err){console.log(err)}
        // console.log(uName, fName)
    }


    return(
        <div>

            <br />
            <h2>Input new user details</h2>
            <Form>
                <FormField>
                    <label htmlFor="userName">Username</label>
                    <input type="text" id='userName' />
                </FormField>
                <FormField>
                    <label htmlFor="firstName">first name</label>
                    <input type="text" id='firstName'/>
                </FormField>
                <FormField>
                    <label htmlFor="lastName">last name</label>
                    <input type="text" id='lastName'/>
                </FormField>
                <FormField>
                    <label htmlFor="email">email</label>
                    <input type="text" id='email'/>
                </FormField>
                <FormField>
                    <label htmlFor="password">password</label>
                    <input type="text" id='password'/>
                </FormField>
                <FormField>
                    <label htmlFor="DOB">DOB</label>
                    <input type="text" id='DOB'/>
                </FormField>

            <Button className='plusUserBtn' onClick={plusUser}>Add User</Button>

            </Form>
            <Button onClick={goLogin}>Login instead</Button>
            
        </div>
    )

}

export default AddUser