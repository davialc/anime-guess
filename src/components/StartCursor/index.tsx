import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import { IAnime } from '../../@types/anime';
import { useControl } from '../../providers/ControlProvider';

interface CursorProps {
	anime: UseQueryResult<IAnime, unknown>;
}

export const StartCursor = ({ anime }: CursorProps) => {
	const { isStarted, isPlaying, cursorRef } = useControl();

	React.useEffect(() => {
		document.addEventListener('mousemove', (event) => {
			let left = event.offsetX;
			let top = event.offsetY;
			if (!!cursorRef.current) {
				cursorRef.current.style.left = left + 'px';
				cursorRef.current.style.top = top + 'px';
			}
		});
	}, []);

	return (
		<div
			ref={cursorRef}
			className="main-cursor bg-slate-200 text-slate-800 p-2 rounded-lg fixed"
		>
			{anime.isLoading || anime.isFetching ? 'Loading...' : 'Click to start'}
		</div>
	);
};
