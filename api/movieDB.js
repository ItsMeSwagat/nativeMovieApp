import axios from "axios";
import { apiKey } from "../constants";

const apiBaseURL = `https://api.themoviedb.org/3`;
const trendingMoviesAPI = `${apiBaseURL}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesAPI = `${apiBaseURL}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesAPI = `${apiBaseURL}/movie/top_rated?api_key=${apiKey}`;

//dynaic endpoints
const movieDetailsAPI = (id) => `${apiBaseURL}/movie/${id}?api_key=${apiKey}`;
const movieCreditsAPI = (id) =>
  `${apiBaseURL}/movie/${id}/credits?api_key=${apiKey}`;
const movieSimilarAPI = (id) =>
  `${apiBaseURL}/movie/${id}/similar?api_key=${apiKey}`;

export const img500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;

export const img342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;

export const img185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster = "";
export const fallbackCastImg = "https://img.freepik.com/premium-vector/black-silhouette-default-profile-avatar_664995-354.jpg";

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesAPI);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesAPI);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesAPI);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsAPI(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsAPI(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(movieSimilarAPI(id));
};
