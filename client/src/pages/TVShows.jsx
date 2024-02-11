import ContentPage from './ContentPage'; // Adjust the path based on your project structure
import { searchTVsByQuery, searchTVSource } from '../utils/API'; // Adjust the path based on your project structure
import PageCont from './pageContent';

function TVShows() {
	return (
		<>
		<ContentPage
			searchByQuery={searchTVsByQuery}
			searchSource={searchTVSource}
			contentType="TV show"
		/>
		<PageCont />
		</>
	);
}

export default TVShows;
