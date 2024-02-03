import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";

function SingUser(){

    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: {userId: "65bd838099f80990049443ea"}
    })
    if(data){
        console.log(data);
    }



    return(
    <div>
        <h3>Single User search</h3>

    </div>
    )
}

export default SingUser; 