import type { NextApiRequest, NextApiResponse } from 'next';
import {
	animeMoeApi,
	animeThemesApi,
	jikanApi,
} from '../../../../services/api';
import { randomNumber } from '../../../../utils/randomNumber';
import { IAnime } from '../../../../@types/anime';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const NUMBER_OF_PAGES = 2;
	const randomPage = randomNumber(1, NUMBER_OF_PAGES);
	await jikanApi
		.get(`/top/anime?type=tv&page=${randomPage}`)
		.then(async (response) => {
			const jikanData = response.data.data;
			const randomIndex = randomNumber(0, jikanData.length);
			const jikanRandomAnime = jikanData[randomIndex];
			const MyAnimeListId = jikanRandomAnime.mal_id;
			await animeThemesApi.get(`/anime/${MyAnimeListId}`).then((response) => {
				const animeData = response.data as IAnime;
				if (!animeData.themes) {
					res.status(400);
				}
				if (animeData.themes.length <= 0) {
					res.status(400);
				}
				const randomAnime: IAnime = {
					mal_id: jikanRandomAnime.mal_id,
					external_url: jikanRandomAnime.url,
					titles: {
						default: jikanRandomAnime.title,
						japanese: jikanRandomAnime.title_japanese,
					},
					cover: animeData.cover,
					episodes: jikanRandomAnime.episodes,
					year: jikanRandomAnime.year,
					season: jikanRandomAnime.season,
					score: jikanRandomAnime.score,
					members: jikanRandomAnime.members,
					synopsis: jikanRandomAnime.synopsis,
					studios: jikanRandomAnime.studios,
					themes: animeData.themes,
					genres: jikanRandomAnime.genres,
				};
				res.status(200).json(randomAnime);
			});
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};
