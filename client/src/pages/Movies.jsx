import React from 'react';
import ContentPage from './ContentPage'; // Adjust the path based on your project structure
import { searchMoviesByQuery, searchMovieSource } from '../utils/API'; // Adjust the path based on your project structure
import MovieCont from './MovieContent';

function Movies() {
	return (
		<>
		<ContentPage
			searchByQuery={searchMoviesByQuery}
			searchSource={searchMovieSource}
			contentType="Movie"
		/>
		<MovieCont />
		</>
	);
}

export default Movies;
