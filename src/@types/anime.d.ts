export interface IAnimeInfo {
	id: number;
	name: string;
	slug: string;
	year: number;
	season: string;
	synopsis: string;
}

export interface IMyAnimeList {
	resource: {
		id: number;
		link: string;
		external_id: number;
		site: string;
	};
}

export interface IAnime {
	mal_id: number;
	external_url: string;
	titles: {
		default: string;
		japanese: string;
	};
	cover: string;
	episodes: number;
	year: number;
	season: string;
	score: number;
	members: number;
	synopsis: string;
	studios: IAnimeStudio[];
	themes: Theme[];
	genres: IAnimeGenre[];
}

export interface Theme {
	title: string;
	theme_id: string;
	type: string;
	artist?: string;
	mirrors: Mirror[];
	notes?: string;
	episodes: string;
	category: any;
}

export interface Mirror {
	quality: string;
	mirror: string;
	audio: string;
}

export interface IAnimeStudio {
	mal_id: number;
	type: string;
	name: string;
	url: string;
}

export interface IAnimeGenre {
	mal_id: number;
	type: string;
	name: string;
	url: string;
}
