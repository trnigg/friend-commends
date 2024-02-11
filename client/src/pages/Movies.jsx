import ContentPage from './ContentPage'; // Adjust the path based on your project structure
import { searchMoviesByQuery, searchMovieSource } from '../utils/API'; // Adjust the path based on your project structure
import PageCont from './pageContent';

function Movies() {
	return (
		<>
		<ContentPage
			searchByQuery={searchMoviesByQuery}
			searchSource={searchMovieSource}
			contentType="Movie"
		/>
		<PageCont />
		</>
	);
}

export default Movies;
