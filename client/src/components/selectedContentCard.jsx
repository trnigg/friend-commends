import {
	Card,
	Image,
	Icon,
	Accordion,
	Button,
	CardContent,
	CardMeta,
	Label,
} from 'semantic-ui-react';

function SelectedContentCard({
	selectedContent,
	contentSource,
	noStreamingAvailable,
	activeIndex,
	setActiveIndex,
}) {
	// panels for the accordion
	// requires ternary to check if the selectedTVShow is null;
	// otherwise it will throw an error before a TV show is selected
	// renders the description and streaming providers, if available, else displays a message
	const panels = [
		{
			key: 'description',
			title: 'Description',
			content: selectedContent ? selectedContent.description : '',
		},
		{
			key: 'stream',
			title: 'Stream',
			content: {
				content: noStreamingAvailable
					? 'This content is not available in your region.'
					: contentSource &&
					  contentSource.map((provider) => (
							<Label
								key={provider.provider_id}
								image
								style={{ marginBottom: '4px' }}
							>
								<img
									src={`http://image.tmdb.org/t/p/w92/${provider.logo_path}`}
								/>
								{provider.provider_name}
							</Label>
					  )),
			},
		},
	];

	return (
		selectedContent && (
			<Card>
				<CardContent>
					<Card.Header>{selectedContent.title}</Card.Header>
				</CardContent>
				{selectedContent.backdropImage && (
					<Image
						src={`http://image.tmdb.org/t/p/w342/${selectedContent.backdropImage}`}
						wrapped
						ui={false}
						rounded
						style={{
							marginLeft: '15px',
							marginRight: '15px',
							marginBottom: '15px',
							borderRadius: '5px',
						}}
					/>
				)}
				<CardMeta
					style={{
						display: 'flex',
						alignItems: 'center',
						marginLeft: '15px',
						marginRight: '15px',
						marginBottom: '15px',
					}}
				>
					<Icon
						name="thumbs up outline"
						size="big"
						style={{ marginRight: '10px' }}
					/>
					<div>
						{' '}
						Recommended by <strong>name1</strong>, <strong>name2</strong> and{' '}
						<strong>4 other friends</strong>.
					</div>
				</CardMeta>
				<CardContent extra>
					<Accordion
						activeIndex={activeIndex}
						onTitleClick={(e, { index }) =>
							setActiveIndex(index === activeIndex ? -1 : index)
						}
						defaultActiveIndex={-1}
						panels={panels}
					/>
				</CardContent>
				<CardContent
					extra
					style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}
				>
					<Button circular icon="thumbs up" size="big" />
					<Button circular icon="share" size="big" />
					<Button circular icon="add" size="big" />
				</CardContent>
			</Card>
		)
	);
}

export default SelectedContentCard;
