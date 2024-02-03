import { Button, List, ListItem } from 'semantic-ui-react'
import { useQuery } from '@apollo/client';
import { QUERY_ALL } from '../utils/queries';


function Home(){

    const { loading, error, data } = useQuery(QUERY_ALL)
    if(data){
        console.log(data);
    }


    const findUsers=async()=>{
        console.log("Hello");
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
        </div>
    )
}

export default Home;

