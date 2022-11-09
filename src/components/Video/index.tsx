import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import { IAnime } from '../../@types/anime';
import { useControl } from '../../providers/ControlProvider';
import { randomNumber } from '../../utils/randomNumber';

interface VideoProps {
	videoRef: React.RefObject<HTMLVideoElement>;
	anime: UseQueryResult<IAnime, unknown>;
	refetch: () => Promise<void>;
}

export const Video = ({ anime, videoRef, refetch }: VideoProps) => {
	const { isVisible, setCurrentTheme } = useControl();

	React.useEffect(() => {
		if (anime.data && !anime.isLoading && !anime.isFetching) {
			const randomIndex = randomNumber(0, anime.data.themes.length - 1);
			const randomTheme = anime.data.themes[randomIndex];
			if (!randomTheme.mirrors) {
				anime.refetch();
				return;
			}
			videoRef.current.src = randomTheme.mirrors[0].mirror;
			setCurrentTheme(randomTheme);
		}
	}, [anime.data]);

	return (
		<video
			poster="/no-bg.png"
			ref={videoRef}
			className={`fixed min-h-screen w-full blur-md object-cover ${
				!isVisible ? 'invisible' : 'visible'
			}`}
			onEnded={refetch}
			muted
			preload="metadata"
		/>
	);
};
