import { UseQueryResult } from '@tanstack/react-query';
import { IAnime } from '../../@types/anime';
import { useControl } from '../../providers/ControlProvider';

interface OverlayProps {
	anime: UseQueryResult<IAnime, unknown>;
}

export const Overlay = ({ anime }: OverlayProps) => {
	const { setIsPlaying, setIsStarted, isStarted, isPlaying } =
		useControl();

	function handlePlay() {
		if (anime.isLoading || anime.isFetching) {
			return;
		}
		setIsPlaying(!isPlaying);
	}

	function handleStart() {
		if (anime.isLoading || anime.isFetching) {
			return;
		}
		setIsStarted(true);
		setIsPlaying(true);
	}

	return (
		<div
			className="radial-filter cursor-pointer"
			onClick={isStarted ? handlePlay : handleStart}
		/>
	);
};
