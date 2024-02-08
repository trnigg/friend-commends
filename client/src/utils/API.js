// import "dotenv/config";
import 'dotenv';
// const path = require('path'); // required to resolve the path to the .env file
// require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); // Getting secret from .env file in root directory

const TOKEN = process.env.API_BEARER_TOKEN;

//search movie from TMDB by keyword - call function searchMoviesByQuery("harry+potter");

export const searchMoviesByQuery = (query) => {
	const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${TOKEN}`,
		},
	};

	return fetch(url, options)
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.error('error:' + err));
};

//search single movie details by TMDB's id
export const searchMovieByID = (id) => {
	const url = `https://api.themoviedb.org/3/movie/${id}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${TOKEN}`,
		},
	};

	return fetch(url, options)
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.error('error:' + err));
};

//return movie platforms by TMDB's id
export const searchMovieSource = (id) => {
	const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${TOKEN}`,
		},
	};

	return fetch(url, options)
		.then((res) => res.json())
    .then((json) => {
			console.log(json);
			return json;
		})

		// .then((json) => console.log(json.results?.AU))
		// .catch((err) => console.error('error:' + err));
};

//search TV shows from TMDB by keyword
export const searchTVsByQuery = (query) => {
	const url = `https://api.themoviedb.org/3/search/tv?query=${query}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${TOKEN}`,
		},
	};

	return fetch(url, options)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			return json;
		})
		.catch((err) => {
			console.error('error:' + err);
			throw new Error(err); // Throw an error instead of returning an empty object
		});
};

//search single TV shows details by TMDB's id
export const searchTVByID = (id) => {
	const url = `https://api.themoviedb.org/3/tv/${id}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${TOKEN}`,
		},
	};

	return fetch(url, options)
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.error('error:' + err));
};

//return tv show platforms by TMDB's id
export const searchTVSource = (id) => {
	const url = `https://api.themoviedb.org/3/tv/${id}/watch/providers`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${TOKEN}`,
		},
	};

	return fetch(url, options)
		.then((res) => res.json())
		.then((json) => console.log(json.results?.AU))
		.catch((err) => console.error('error:' + err));
};

//Function call examples:
//searchMoviesByQuery("harry+potter");
//searchTVsByQuery("simpsons");
//searchTVSource("456");
//searchMovieSource("673");
