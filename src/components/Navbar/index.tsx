import { useControl } from '../../providers/ControlProvider';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Logo } from '../Logo';
import {
	FaCrown,
	FaEye,
	FaGamepad,
	FaRandom,
	FaRegSun,
	FaUser,
} from 'react-icons/fa';
import Link from 'next/link';

const Toolbar = ToolbarPrimitive.Root;
const ToolbarButton = ToolbarPrimitive.Button;

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipPortal = TooltipPrimitive.Portal;
const TooltipContent = TooltipPrimitive.Content;
	
export const Navbar = () => {
	const { cursorRef, inputRef, setIsAnimeCorret, setIsVisible, videoRef } =
		useControl();

	return (
		<nav
			className="fixed top-0 left-0 z-40 m-4 flex items-center gap-4"
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
			<Logo />
			<Toolbar
				orientation="horizontal"
				className="flex gap-3"
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
							<Link href="">
								<FaCrown
									size={18}
									className="text-slate-500 hover:text-slate-200 transition-colors"
								/>
							</Link>
						</TooltipTrigger>
						<TooltipPortal>
							<TooltipContent
								className="bg-slate-200 p-2 z-50 rounded-lg text-slate-800 animate-inputAppear"
								sideOffset={10}
							>
								Leaderboards
							</TooltipContent>
						</TooltipPortal>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider delayDuration={200}>
					<Tooltip>
						<TooltipTrigger>
							<Link href="">
								<FaRegSun
									size={18}
									className="text-slate-500 hover:text-slate-200 transition-colors"
								/>
							</Link>
						</TooltipTrigger>
						<TooltipPortal>
							<TooltipContent
								className="bg-slate-200 p-2 z-50 rounded-lg text-slate-800 animate-inputAppear"
								sideOffset={10}
							>
								Settings
							</TooltipContent>
						</TooltipPortal>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider delayDuration={200}>
					<Tooltip>
						<TooltipTrigger>
							<Link href="/game-modes" prefetch>
								<FaGamepad
									size={18}
									className="text-slate-500 hover:text-slate-200 transition-colors"
								/>
							</Link>
						</TooltipTrigger>
						<TooltipPortal>
							<TooltipContent
								className="bg-slate-200 p-2 z-50 rounded-lg text-slate-800 animate-inputAppear"
								sideOffset={10}
							>
								Game modes
							</TooltipContent>
						</TooltipPortal>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider delayDuration={200}>
					<Tooltip>
						<TooltipTrigger>
							<Link href="">
								<FaUser
									size={18}
									className="text-slate-500 hover:text-slate-200 transition-colors"
								/>
							</Link>
						</TooltipTrigger>
						<TooltipPortal>
							<TooltipContent
								className="bg-slate-200 p-2 z-50 rounded-lg text-slate-800 animate-inputAppear"
								sideOffset={10}
							>
								Profile
							</TooltipContent>
						</TooltipPortal>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider delayDuration={200}>
					<Tooltip>
						<TooltipTrigger>
							<ToolbarButton
								asChild
								onClick={() => {
									setIsAnimeCorret('yes');
									inputRef.current.value = 'Correct!';
									setIsVisible(true);
									console.dir(videoRef.current);
								}}
							>
								<FaEye
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
								Reveal anime
							</TooltipContent>
						</TooltipPortal>
					</Tooltip>
				</TooltipProvider>
			</Toolbar>
		</nav>
	);
};
