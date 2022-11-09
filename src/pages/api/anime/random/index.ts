import type { NextApiRequest, NextApiResponse } from 'next';
import {
	animeMoeApi,
	animeThemesApi,
	jikanApi,
} from '../../../../services/api';
import { randomNumber } from '../../../../utils/randomNumber';
import { IAnime } from '../../../../@types/anime';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const NUMBER_OF_PAGES = 258;
	const randomPage = randomNumber(1, NUMBER_OF_PAGES);
	await animeMoeApi
		.get(`/anime?page%5Bnumber%5D=${randomPage}`)
		.then(async (response) => {
			const { anime: animes } = response.data;
			const randomIndex = randomNumber(0, animes.length);
			const randomAnimeInfo = animes[randomIndex];
			await animeMoeApi
				.get(`/resource/${randomAnimeInfo.id}`)
				.then(async (response) => {
					const MyAnimeListResource = response.data;
					const MyAnimeListId = MyAnimeListResource.resource.external_id;
					await animeThemesApi
						.get(`/anime/${MyAnimeListId}`)
						.then(async (response) => {
							const animeData = response.data;
							if (!animeData.themes) {
								res.status(400);
							}
							if (animeData.themes.length <= 0) {
								res.status(400);
							}
							await jikanApi.get(`/anime/${MyAnimeListId}`).then((response) => {
								const jikanData = response.data.data;
								const randomAnime: IAnime = {
									mal_id: jikanData.mal_id,
									external_url: jikanData.url,
									titles: {
										default: jikanData.title,
										japanese: jikanData.title_japanese,
									},
									cover: animeData.cover,
									episodes: jikanData.episodes,
									year: jikanData.year,
									season: jikanData.season,
									score: jikanData.score,
									members: jikanData.members,
									synopsis: jikanData.synopsis,
									studios: jikanData.studios,
									themes: animeData.themes,
									genres: jikanData.genres,
								};
								res.status(200).json(randomAnime);
							});
						});
				});
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};
