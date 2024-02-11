import {
	HeaderContent,
	HeaderSubheader,
	Header,
	Icon,
	Container,
	Segment,
} from 'semantic-ui-react';

function UnderConstructionMessage() {
	return (
		<Header as="h2" icon>
			<Icon name="wrench" />
			Under Construction
			<HeaderSubheader>
				This page is currently under construction. Please check back later.
			</HeaderSubheader>
		</Header>
	);
}

export default UnderConstructionMessage;
