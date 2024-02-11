import ContentPage from './ContentPage'; // Adjust the path based on your project structure
import { searchMoviesByQuery, searchMovieSource } from '../utils/API'; // Adjust the path based on your project structure

function Movies() {
	return (
		<>
		<ContentPage
			searchByQuery={searchMoviesByQuery}
			searchSource={searchMovieSource}
			contentType="Movie"
		/>
		</>
	);
}

export default Movies;
