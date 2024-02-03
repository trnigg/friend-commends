import { Button, List, ListItem } from 'semantic-ui-react'

function Home(){
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

            <Button>Click Me!</Button>
        </div>
    )
}

export default Home;