import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import { FaChevronRight, FaImage, FaShare } from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im';
import { IAnime } from '../../@types/anime';
import { useControl } from '../../providers/ControlProvider';
import { api } from '../../services/api';

interface InputProps {
	anime: UseQueryResult<IAnime, unknown>;
	refetch: () => void;
}

interface IStats {
	id: number;
	anime: string;
	theme: {
		title: string;
		type: string;
	};
	timestamp: number;
	errors: number;
}

interface StatsCardProps {
	refetch: () => void;
	stats: IStats[];
	currentStatsId: number;
}

const Toolbar = ToolbarPrimitive.Root;
const ToolbarButton = ToolbarPrimitive.Button;

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipPortal = TooltipPrimitive.Portal;
const TooltipContent = TooltipPrimitive.Content;

const StatsCard = ({ refetch, stats, currentStatsId }: StatsCardProps) => {
	const currentStat = stats.find((stat) => stat.id === currentStatsId);
	console.log(currentStat);
	return (
		<div className="relative z-50 flex flex-col animate-inputAppear mb-4 bg-[rgba(0,0,0,0.1)] p-2 rounded-lg backdrop-blur-lg w-72">
			<div className="flex justify-around items-center">
				<div className="flex flex-col items-center text-green-500">
					<span className="text-5xl">
						<>
							{currentStat.timestamp}
							<span className="text-base">s</span>
						</>
					</span>
					<span className="text-sm font-mono">timestamp</span>
				</div>
				<div className="flex flex-col items-center text-red-500">
					<span className="text-5xl">{currentStat.errors}</span>
					<span className="text-sm font-mono">errors</span>
				</div>
			</div>
			<Toolbar
				orientation="horizontal"
				className="flex justify-around gap-3 mt-2"
			>
				<TooltipProvider delayDuration={200}>
					<Tooltip>
						<TooltipTrigger>
							<ToolbarButton asChild onClick={refetch} type="button">
								<FaChevronRight
									size={18}
									className="text-slate-500 hover:text-slate-200 transition-colors"
								/>
							</ToolbarButton>
						</TooltipTrigger>
						<TooltipPortal>
							<TooltipContent
								side="bottom"
								className="bg-slate-200 p-2 z-50 rounded-lg text-slate-800 animate-inputAppear"
								sideOffset={10}
							>
								Next theme
							</TooltipContent>
						</TooltipPortal>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider delayDuration={200}>
					<Tooltip>
						<TooltipTrigger>
							<ToolbarButton asChild>
								<FaShare
									size={18}
									className="text-slate-500 hover:text-slate-200 transition-colors"
								/>
							</ToolbarButton>
						</TooltipTrigger>
						<TooltipPortal>
							<TooltipContent
								side="bottom"
								className="bg-slate-200 p-2 z-50 rounded-lg text-slate-800 animate-inputAppear"
								sideOffset={10}
							>
								Share
							</TooltipContent>
						</TooltipPortal>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider delayDuration={200}>
					<Tooltip>
						<TooltipTrigger>
							<ToolbarButton asChild>
								<FaImage
									size={18}
									className="text-slate-500 hover:text-slate-200 transition-colors"
								/>
							</ToolbarButton>
						</TooltipTrigger>
						<TooltipPortal>
							<TooltipContent
								side="bottom"
								className="bg-slate-200 p-2 z-50 rounded-lg text-slate-800 animate-inputAppear"
								sideOffset={10}
							>
								Save screenshot
							</TooltipContent>
						</TooltipPortal>
					</Tooltip>
				</TooltipProvider>
			</Toolbar>
		</div>
	);
};

export const Input = ({ anime, refetch }: InputProps) => {
	const [isSearching, setIsSearching] = React.useState(false);
	const [options, setOptions] = React.useState<any[]>([]);
	const [timer, setTimer] = React.useState<any>();
	const [isStatsVisible, setIsStatsVisible] = React.useState<boolean>(false);
	const [stats, setStats] = React.useState<IStats[]>([]);
	const [errorsCount, setErrorsCount] = React.useState(0);
	const [currentStatsId, setCurrentStatsId] = React.useState<number>();

	const {
		isAnimeCorrect,
		setIsAnimeCorret,
		setIsVisible,
		inputRef,
		cursorRef,
		currentTheme,
		videoRef,
	} = useControl();

	async function handleSearch(query: string) {
		const response = await api.get(`/anime/search?q=${query}`);
		return response.data.data;
	}

	function handleCheck(value: string) {
		if (
			value.toLocaleLowerCase() ===
			anime.data?.titles.default.toLocaleLowerCase()
		) {
			setIsAnimeCorret('yes');
			setOptions([]);
			inputRef.current.value = 'Correct!';
			const id = Date.now();
			setCurrentStatsId(id);
			console.log(errorsCount);
			setStats((prevState) => [
				...prevState,
				{
					id,
					anime: anime.data.titles.default,
					errors: errorsCount,
					theme: { title: currentTheme.title, type: currentTheme.type },
					timestamp: Math.floor(videoRef.current.currentTime),
				} as unknown as IStats,
			]);
			setIsVisible(true);
			setIsStatsVisible(true);
		} else {
			setIsAnimeCorret('no');
			setErrorsCount((prevState) => prevState + 1);
			setTimeout(() => {
				setIsAnimeCorret('unset');
			}, 500);
		}
	}

	const inputChanged = (value: string) => {
		clearTimeout(timer);
		const newTimer = setTimeout(async () => {
			if (!value) {
				setOptions([]);
				return;
			}
			if (isAnimeCorrect === 'yes') {
				setOptions([]);
				return;
			}
			setIsSearching(true);
			let result;
			while (!result) {
				result = await handleSearch(value);
			}
			setOptions(result);
			setIsSearching(false);
		}, 200);
		setTimer(newTimer);
	};

	return (
		<div
			onMouseOver={() => {
				cursorRef.current.style.visibility = 'hidden';
			}}
			onMouseLeave={() => {
				cursorRef.current.style.visibility = 'visible';
			}}
		>
			{isAnimeCorrect === 'yes' && (
				<StatsCard
					refetch={refetch}
					stats={stats}
					currentStatsId={currentStatsId}
				/>
			)}
			<form
				className={`w-72 z-10 relative flex justify-end items-center animate-inputAppear group ${
					isAnimeCorrect === 'yes' && 'hidden'
				}`}
				onSubmit={(event) => {
					event.preventDefault();
					// @ts-ignore
					handleCheck(event.target[0].value);
				}}
			>
				<input
					ref={inputRef}
					type="text"
					id="anime"
					className={`w-full py-4 px-5 rounded-lg bg-slate-200 text-slate-800 text-lg focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none ${
						isAnimeCorrect === 'no' &&
						'animate-bounce bg-red-300 ring-red-500 ring-2'
					}
				${isAnimeCorrect === 'yes' && 'bg-green-300 ring-green-500 ring-2'}
				`}
					placeholder="Type a anime name"
					autoComplete="off"
					onChange={(event) => inputChanged(event.target.value)}
					disabled={isAnimeCorrect === 'yes'}
				/>
				<div className="max-h-[300px] w-full rounded-lg bg-slate-200 text-lg absolute top-full mt-2 overflow-y-auto overflow-x-hidden scroll">
					{options.length > 0 &&
						options.map((opt) => (
							<button
								tabIndex={0}
								key={opt.mal_id}
								className="w-full text-start py-4 px-5 leading-[1] text-slate-800 hover:bg-slate-300 cursor-pointer focus:outline-none focus:bg-slate-400"
								onClick={() => handleCheck(opt.title)}
								onSubmit={() => handleCheck(opt.title)}
								type="button"
							>
								{opt.title}
							</button>
						))}
				</div>
				{isSearching && (
					<ImSpinner9
						className="absolute text-slate-800 animate-spin m-4"
						size={25}
					/>
				)}
			</form>
		</div>
	);
};
