import GetFriends from "../components/getFriends";
import { QUERY_FRIENDS } from "../utils/queries";
import { useQuery } from "@apollo/client";

function Friends(){
//     const { friends, error, data } = useQuery(QUERY_FRIENDS, ({
//         variables: {
//             // friendsId: "65bd838099f80990049443ea"
//         }
//     }))
//     if(data){
//         console.log(data)
//     }

    return(
        <div>
            <h1>Friends</h1>
            <button>Press me</button>

            <GetFriends />
        </div>
    )
}

export default Friends;