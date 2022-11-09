import { Player } from '@lottiefiles/react-lottie-player';
import { UseQueryResult } from '@tanstack/react-query';
import { IAnime } from '../../@types/anime';
import { useControl } from '../../providers/ControlProvider';

interface WavesProps {
	anime: UseQueryResult<IAnime, unknown>;
	wavesRef: React.RefObject<Player>;
}

export const Waves = ({ wavesRef, anime }: WavesProps) => {
	const { isAnimeCorrect, isPlaying } = useControl();
	return (
		<div
			className={`absolute group ${
				anime.isLoading || anime.isFetching ? 'animate-spin' : ''
			}`}
		>
			{isAnimeCorrect === 'yes' ? (
				<Player
					ref={wavesRef}
					loop
					autoplay
					speed={isPlaying ? 0.7 : 1}
					src="/sound_waves_2_correct.json"
					className={`group-hover:scale-105 transition-all ${
						anime.isLoading || anime.isFetching
							? 'lg:w-[500px] sm:w-full sm:h-full'
							: 'lg:w-[1000px] sm:w-full sm:h-full'
					}`}
				/>
			) : isAnimeCorrect === 'no' ? (
				<Player
					ref={wavesRef}
					loop
					autoplay
					speed={isPlaying ? 0.7 : 1}
					src="/sound_waves_2_incorrect.json"
					className={`group-hover:scale-105 transition-all ${
						anime.isLoading || anime.isFetching
							? 'lg:w-[500px] sm:w-full sm:h-full'
							: 'lg:w-[1000px] sm:w-full sm:h-full'
					}`}
				/>
			) : isAnimeCorrect === 'unset' ? (
				<Player
					ref={wavesRef}
					loop
					autoplay
					speed={isPlaying ? 0.7 : 1}
					src="/sound_waves_2.json"
					className={`group-hover:scale-105 transition-all ${
						anime.isLoading || anime.isFetching
							? 'lg:w-[500px] sm:w-full sm:h-full'
							: 'lg:w-[1000px] sm:w-full sm:h-full'
					}`}
				/>
			) : (
				''
			)}
		</div>
	);
};
