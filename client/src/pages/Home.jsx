import { Button, List, ListItem, Form, FormField } from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ALL } from '../utils/queries';
import { MUTATION_ADDUSER } from '../utils/mutations';
import auth from '../utils/auth';

function Home(){
    const [ adduser, {error, data}] = useMutation(MUTATION_ADDUSER);
    const { loading, error: error2, data: data2 } = useQuery(QUERY_ALL)
    if(data2){
        console.log(data2);
    }


    const findUsers=async()=>{
        console.log("Hello");
    }

    const plusUser = async(e) => {
        e.preventDefault();
        console.log("reytyuiteryetiruy")

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
                console.log(data);
                auth.login(data.data.addUser.token);
            });

        }catch(err){console.log(err)};
        console.log(uName, fName)
    }

    return(
        <div>
            <h1>Home</h1>

            <List>
                <ListItem>Item1</ListItem>
                <ListItem>Item2</ListItem>
                <ListItem>Item3</ListItem>
                <ListItem>Item4</ListItem>
                <ListItem>Item5</ListItem>
            </List>

            <Button className='searchAllBtn' onClick={findUsers}>Click Me!</Button>
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
        </div>
    )
}

export default Home;

