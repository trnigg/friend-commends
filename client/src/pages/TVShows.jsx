import ContentPage from './ContentPage'; // Adjust the path based on your project structure
import { searchTVsByQuery, searchTVSource } from '../utils/API'; // Adjust the path based on your project structure

function TVShows() {
	return (
		<ContentPage
			searchByQuery={searchTVsByQuery}
			searchSource={searchTVSource}
			contentType="TV show"
		/>
	);
}

export default TVShows;
