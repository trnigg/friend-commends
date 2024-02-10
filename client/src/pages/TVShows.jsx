import ContentPage from './ContentPage'; // Adjust the path based on your project structure
import { searchTVsByQuery, searchTVSource } from '../utils/API'; // Adjust the path based on your project structure
import TVCont from './TVContent';

function TVShows() {
	return (
		<>
		<ContentPage
			searchByQuery={searchTVsByQuery}
			searchSource={searchTVSource}
			contentType="TV show"
		/>
		<TVCont />
		</>
	);
}

export default TVShows;
