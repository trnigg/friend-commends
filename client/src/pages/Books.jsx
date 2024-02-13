import { Header, Container, Segment } from 'semantic-ui-react';

import UnderConstructionMessage from '../components/underConstructionMessage';

function Books() {
	return (
		<Container>
			<Segment raised>
				<Header as="h1">Books</Header>
			</Segment>

			<Segment raised>
				<div className="centered-message">
					<UnderConstructionMessage />
				</div>
			</Segment>
		</Container>
	);
}

export default Books;
