// import { Button } from "semantic-ui-react";
// import { searchMovieSource } from "../utils/API";
import {
	HeaderContent,
	HeaderSubheader,
	Header,
	Icon,
	Container,
	Segment,
} from 'semantic-ui-react';

function Books() {
	// const getArray = async()=>{
	// 		const numnum = 343611;
	// 	try{
	// 		const proverArray = await searchMovieSource(numnum);
	// 		let services = [];
	// 		let services2 =[];
	// 		const firstRefine = proverArray.results;
	// 		let newArrayOfData = Object.values(firstRefine);
	// 		newArrayOfData.forEach((entry)=>{
	// 			const entryArray = entry.flatrate;
	// 			services.push(entryArray);
	// 		})

	// 		const secondArray = services.flat();
	// 		secondArray.forEach((result) => {
	// 			if(result){
	// 				services2.push(result.provider_name)
	// 			}
	// 			else {
	// 				return
	// 			}
	// 		})
	// 		const streamingServices = [...new Set(services2)]
	// 		console.log(streamingServices);

	// 	}catch(err){
	// 		console.log(err)
	// 	}
	// }

	return (
		<Container>
			<Segment raised>
				<Header as="h1">Books</Header>
			</Segment>

			<Segment raised>
				<Header as="h2" icon>
					<Icon name="wrench" />
					Under Construction
					<HeaderSubheader>
						This page is currently under construction. Please check back later.
					</HeaderSubheader>
				</Header>
			</Segment>
		</Container>
	);
}

export default Books;
