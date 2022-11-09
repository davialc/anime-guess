import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import React from 'react';
import { AnimeCard } from '../../components/AnimeCard';
import { StartCursor } from '../../components/StartCursor';
import { Input } from '../../components/Input';
import { Overlay } from '../../components/Overlay';
import { Video } from '../../components/Video';
import { Waves } from '../../components/Waves';
import { Page } from '../../primitives/Page';
import { useControl } from '../../providers/ControlProvider';
import { api } from '../../services/api';
import { GameCursor } from '../../components/GameCursor';
import { Navbar } from '../../components/Navbar';
import { GameModes } from '../../components/GameModes';

const GameModesPage: NextPage = () => {
	const {
		videoRef,
		wavesRef,
		isStarted,
		setIsPlaying,
		setIsVisible,
		setIsAnimeCorret,
	} = useControl();

	const anime = useQuery(['anime'], getRandomAnime, {
		refetchOnWindowFocus: false,
		onError: () => {
			anime.refetch();
		},
	});

	async function getRandomAnime() {
		const response = await api.get('/anime/random');
		return response.data;
	}

	React.useEffect(() => {
		console.log(anime);
	}, [anime.data]);

	async function handleRefetch() {
		setIsPlaying(true);
		setIsVisible(false);
		setIsAnimeCorret('unset');
		await anime.refetch();
		setIsPlaying(false);
		wavesRef.current.play();
		setTimeout(() => {
			videoRef.current.play();
		}, 1000);
	}

	React.useEffect(() => {
		if ((anime.isLoading || anime.isFetching) && !!videoRef.current) {
			videoRef.current.pause();
		}
	}, [anime]);

	return (
		<>
			<Page>
				<>
					<Navbar />
					<Overlay anime={anime} />
					<GameModes />
				</>
			</Page>
		</>
	);
};

export default GameModesPage;
