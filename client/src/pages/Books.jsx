import { Button } from "semantic-ui-react";
import { searchMovieSource } from "../utils/API";

function Books() {

	const getArray = async()=>{
			const numnum = 343611;
		try{
			const proverArray = await searchMovieSource(numnum);
			let services = [];
			let services2 =[];
			const firstRefine = proverArray.results;
			let newArrayOfData = Object.values(firstRefine);
			newArrayOfData.forEach((entry)=>{
				const entryArray = entry.flatrate;
				services.push(entryArray);
			})
			
			const secondArray = services.flat();
			secondArray.forEach((result) => {
				if(result){
					services2.push(result.provider_name)
				}
				else {
					return
				}
			})
			const streamingServices = [...new Set(services2)]
			console.log(streamingServices);

		}catch(err){
			console.log(err)
		}
	}



	return (
		<div>
			<h1>This is the Books page</h1>
			<Button onClick={getArray}>Press Me</Button>
		</div>
	);
}

export default Books;
