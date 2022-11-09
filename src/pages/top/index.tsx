import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import React from 'react';
import { AnimeCard } from '../../components/AnimeCard';
import { GameCursor } from '../../components/GameCursor';
import { Input } from '../../components/Input';
import { Navbar } from '../../components/Navbar';
import { Overlay } from '../../components/Overlay';
import { StartCursor } from '../../components/StartCursor';
import { Video } from '../../components/Video';
import { Waves } from '../../components/Waves';
import { Page } from '../../primitives/Page';
import { useControl } from '../../providers/ControlProvider';
import { api } from '../../services/api';

const Top: NextPage = () => {
	const {
		videoRef,
		wavesRef,
		isPlaying,
		isStarted,
		setIsPlaying,
		isVisible,
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
		const response = await api.get('/anime/top');
		return response.data;
	}

	React.useEffect(() => {
		console.log(anime);
	}, [anime.data]);

	async function handleRefetch() {
		// videoRef.current.pause();
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
					{isVisible && <AnimeCard anime={anime} refetch={handleRefetch} />}
					<Navbar />
					{/* <AnimeCard anime={anime} refetch={handleRefetch} /> */}
					<Overlay anime={anime} />
					<Video videoRef={videoRef} anime={anime} refetch={handleRefetch} />
					<Waves anime={anime} wavesRef={wavesRef} />
					{/* <GameModes /> */}
					{!anime.isLoading && !anime.isFetching && isStarted ? (
						<Input anime={anime} refetch={handleRefetch} />
					) : (
						''
					)}
					{!isStarted ? (
						<StartCursor anime={anime} />
					) : (
						<GameCursor anime={anime} />
					)}
				</>
			</Page>
		</>
	);
};

export default Top;
