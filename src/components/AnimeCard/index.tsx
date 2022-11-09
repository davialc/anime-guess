import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { UseQueryResult } from '@tanstack/react-query';
import {
	FaExternalLinkAlt,
	FaEye,
	FaHeart,
	FaInfoCircle,
	FaRandom,
} from 'react-icons/fa';
import { IAnime } from '../../@types/anime';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useControl } from '../../providers/ControlProvider';
import Link from 'next/link';

interface AnimeCardProps {
	anime: UseQueryResult<IAnime, unknown>;
	refetch: () => Promise<void>;
}

const Toolbar = ToolbarPrimitive.Root;
const ToolbarButton = ToolbarPrimitive.Button;
const ToolbarLink = ToolbarPrimitive.Link;

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipPortal = TooltipPrimitive.Portal;
const TooltipContent = TooltipPrimitive.Content;

export const AnimeCard = ({ anime, refetch }: AnimeCardProps) => {
	const { cursorRef, currentTheme, setIsAnimeCorret, inputRef, setIsVisible } =
		useControl();
	return (
		<div
			className="fixed top-0 right-0 bg-slate-800 w-52 min-h=[30px] rounded-lg z-40 m-4 overflow-hidden"
			onMouseOver={() => {
				if (!!cursorRef.current) {
					cursorRef.current.style.visibility = 'hidden';
				}
			}}
			onMouseLeave={() => {
				if (!!cursorRef.current) {
					cursorRef.current.style.visibility = 'visible';
				}
			}}
		>
			{!anime.isLoading && anime.data && (
				<>
					<img src={anime.data.cover} alt="" />
					<div className="p-4">
						<p>
							Anime:{' '}
							<span className="text-slate-400 text-xs">
								{anime.data.titles.default}
							</span>
						</p>
						<p>
							Playing:{' '}
							<span className="text-slate-400 text-xs">
								{currentTheme.title}
							</span>
						</p>
						<p>
							Type:{' '}
							<span className="text-slate-400 text-xs">
								{currentTheme.type}
							</span>
						</p>
						<p>
							Year:{' '}
							<span className="text-slate-400 text-xs">{anime.data.year}</span>
						</p>
						<Toolbar
							orientation="horizontal"
							className="flex justify-around items-center mt-4"
							onMouseOver={() => {
								if (!!cursorRef.current) {
									cursorRef.current.style.visibility = 'hidden';
								}
							}}
							onMouseLeave={() => {
								if (!!cursorRef.current) {
									cursorRef.current.style.visibility = 'visible';
								}
							}}
						>
							<TooltipProvider delayDuration={200}>
								<Tooltip>
									<TooltipTrigger>
										<ToolbarButton asChild>
											<FaInfoCircle
												size={18}
												className="text-slate-500 hover:text-slate-200 transition-colors"
											/>
										</ToolbarButton>
									</TooltipTrigger>
									<TooltipPortal>
										<TooltipContent
											className="bg-slate-200 p-2 z-50 rounded-lg text-slate-800 animate-inputAppear"
											sideOffset={10}
										>
											Anime info
										</TooltipContent>
									</TooltipPortal>
								</Tooltip>
							</TooltipProvider>
							<TooltipProvider delayDuration={200}>
								<Tooltip>
									<TooltipTrigger>
										<ToolbarLink
											href={anime.data.external_url}
											target="_blank"
											rel="noreferrer"
										>
											<FaExternalLinkAlt
												size={18}
												className="text-slate-500 hover:text-slate-200 transition-colors"
											/>
										</ToolbarLink>
									</TooltipTrigger>
									<TooltipPortal>
										<TooltipContent
											className="bg-slate-200 p-2 z-50 rounded-lg text-slate-800 animate-inputAppear"
											sideOffset={10}
										>
											MyAnimeList anime page
										</TooltipContent>
									</TooltipPortal>
								</Tooltip>
							</TooltipProvider>
							<TooltipProvider delayDuration={200}>
								<Tooltip>
									<TooltipTrigger>
										<FaHeart
											size={18}
											className="text-slate-500 hover:text-slate-200 transition-colors"
										/>
									</TooltipTrigger>
									<TooltipPortal>
										<TooltipContent
											className="bg-slate-200 p-2 z-50 rounded-lg text-slate-800 animate-inputAppear"
											sideOffset={10}
										>
											Favorite theme
										</TooltipContent>
									</TooltipPortal>
								</Tooltip>
							</TooltipProvider>
						</Toolbar>
					</div>
				</>
			)}
		</div>
	);
};
