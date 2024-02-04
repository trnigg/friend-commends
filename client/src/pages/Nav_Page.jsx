import { FormField, Button, Checkbox, Form } from 'semantic-ui-react'
import auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { Header, Image } from 'semantic-ui-react'
import { QUERY_USER } from '../utils/queries';
import CardExampleCard from '../components/CardPics';
import "./Nav_Page.css"

function Nav_Page(){
    // const [userDetails, setUserDetails] = useState({userName: "white"})
    let userDetails = {};
    const idNum = auth.getProfile()
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: {userId: idNum.data._id}
    })
    if(loading){
        return (
            <div>
                Please Wait.....
            </div>
        )
    }
    if(data){
        console.log(data)
        userDetails = data;
        console.log(userDetails);
        }
    else{console.log("No Luck")}



    if(userDetails!=={}){
        console.log(userDetails)
        console.log(userDetails.user.userName)
        const recommended = userDetails.user.recommendations;
        const movieRecommend = recommended.filter((entry)=> entry.__typename === "Movie").slice(-3)
        const tvRecommend = recommended.filter((entry)=> entry.__typename === "TV").slice(-3)
        const bookRecommend = recommended.filter((entry)=> entry.__typename === "Book").slice(-3)
        console.log(movieRecommend, tvRecommend, bookRecommend)


        return(
            <div>
                <Header as='h1'>Welcome to your profile page</Header>
                <div>
                    <div height='400px'>
                        <span>{userDetails.user.userName}</span>
                        {/* <Image src='/images/47456306.jpg' size='small'  circular/> */}
                    </div>

                    <h2>You have {userDetails.user.pendingFriendRequests.length} friend requests</h2>

                    <Header as='h2'>Movies</Header>
                    <div className='movieBox'>
                    <>
                    {movieRecommend.map(function(data){
                        return(
                           <div key={data.original_title}>
                            <CardExampleCard 
                                movietitle={data.original_title}/>
                           </div>
                        )
                    })}
                    </>
                    </div>
                    <Button>See more movie recommendations</Button>


                    <Header as='h2'>TV Shows</Header>
                    <div className='tvBox'>
                    <>
                    {tvRecommend.map(function(data){
                        return(
                           <div key={data.original_name}>
                            <CardExampleCard
                                movietitle={data.original_name}/>
                           </div>
                        )
                    })}
                    </>
                    </div>
                    <Button>See more TV recommendations</Button>

                    <Header as='h2'>Books</Header>
                    <div className='bookBox'>
                    <>
                    {bookRecommend.map(function(data){
                        return(
                           <div key={data.original_name} >
                            <CardExampleCard
                                key={data.original_name} 
                                movietitle={data.original_name}/>
                           </div>
                        )
                    })}
                    </>
                    </div>

                    <Button>See Recommended</Button>
                    


                </div>
            </div>
        )
    }
    else{
        console.log("No")
    }

    // return(
    //     <div>
    //         <Header as='h1'>Welcome to your profile page</Header>
    //         <div>
    //             {/* {auth.loggedIn() ? (console.log("logged in")):(console.log('logged out'))} */}
    //             <Image src='/images/47456306.jpg' avatar />
    //             <span>name</span>

    //         </div>
    //     </div>
    // )
}

export default Nav_Page;