import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:3000/api',
});

export const animeMoeApi = axios.create({
	baseURL: 'https://api.animethemes.moe',
});

export const animeThemesApi = axios.create({
	baseURL: 'https://animethemes-api.herokuapp.com/api/v1',
});

export const jikanApi = axios.create({
	baseURL: 'https://api.jikan.moe/v4',
});
