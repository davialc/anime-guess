import type { NextApiRequest, NextApiResponse } from 'next';
import { jikanApi } from '../../../../services/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { q: query } = req.query;
	await jikanApi
		.get(`/anime?q=${query}`)
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};
