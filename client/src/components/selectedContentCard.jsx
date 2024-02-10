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
import { ADD_TV_RECOMMENDATION } from '../utils/mutations';
import { useMutation } from '@apollo/client';





function SelectedContentCard({
	selectedContent,
	contentSource,
	noStreamingAvailable,
	activeIndex,
	setActiveIndex,
}) {
	const [ addShow, { error, data }] = useMutation(ADD_TV_RECOMMENDATION);

	const addContent = async() =>{
		console.log(selectedContent)
		const newNumber = selectedContent.id.toString()
		let url = window.location.href.split('/');
		let urlExt = url[3];
		console.log(url)
		urlExt === 'tv_shows' ? (
			await addShow({
				variables: {
				input: {
					type: "TV",
					tmdbID: newNumber,
					overview: selectedContent.description,
					original_name: selectedContent.title,
					poster_path: selectedContent.posterImage
					}                   
				}
			})
			.then(console.log("added"))
		) : 
		urlExt === 'movies' ? (
			await addMovie({
				variables: {
				input: {
					type: "Movie",
					tmdbID: newNumber,
					overview: selectedContent.description,
					original_title: selectedContent.title,
					poster_path: selectedContent.posterImage
					}                   
				}
			})
			.then(console.log("added"))
		) : (
			console.log("Bad")
		)
		console.log("Hello");

}

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
					<Card.Header> {selectedContent.title}</Card.Header>
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
					<Button circular icon="thumbs up" size="big" onClick={addContent}/>
					<Button circular icon="share" size="big" />
					<Button circular icon="add" size="big" />
				</CardContent>
			</Card>
		)
	);
}

export default SelectedContentCard;
