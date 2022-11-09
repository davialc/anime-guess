import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react';
import { IAnime } from '../@types/anime';

interface IControlContext {
	currentTheme: any;
	setCurrentTheme: React.Dispatch<React.SetStateAction<any>>;
	isPlaying: boolean;
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
	isStarted: boolean;
	setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isAnimeCorrect: 'yes' | 'no' | 'unset';
	setIsAnimeCorret: React.Dispatch<
		React.SetStateAction<'yes' | 'no' | 'unset'>
	>;
	wavesRef: React.RefObject<Player>;
	videoRef: React.RefObject<HTMLVideoElement>;
	inputRef: React.RefObject<HTMLInputElement>;
	cursorRef: React.RefObject<HTMLDivElement>;
}

export const ControlContext = React.createContext({} as IControlContext);

export const ControlProvider = ({ children }: any) => {
	const [currentTheme, setCurrentTheme] = React.useState<any>({} as any);
	const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
	const [isStarted, setIsStarted] = React.useState(false);
	const [isVisible, setIsVisible] = React.useState(false);
	const [isAnimeCorrect, setIsAnimeCorret] = React.useState<
		'yes' | 'no' | 'unset'
	>('unset');

	const wavesRef = React.useRef<Player>(null);
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const inputRef = React.useRef<HTMLInputElement>(null);
	const cursorRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		if (!isStarted) {
			return;
		}
		if (isPlaying) {
			wavesRef.current.pause();
			videoRef.current.pause();
		}
		if (!isPlaying) {
			videoRef.current.play();
			wavesRef.current.play();
			videoRef.current.muted = false;
		}
	}, [isPlaying, isStarted]);

	React.useEffect(() => {
		if (isStarted) {
			setIsPlaying(!isPlaying);
		}
	}, [isStarted]);

	const value = React.useMemo(
		() => ({
			currentTheme,
			setCurrentTheme,
			isPlaying,
			setIsPlaying,
			wavesRef,
			isStarted,
			setIsStarted,
			videoRef,
			isVisible,
			setIsVisible,
			isAnimeCorrect,
			setIsAnimeCorret,
			inputRef,
			cursorRef,
		}),
		[currentTheme, isPlaying, isStarted, isVisible, isAnimeCorrect]
	);

	return (
		<ControlContext.Provider value={value}>{children}</ControlContext.Provider>
	);
};

export const useControl = () => {
	const {
		currentTheme,
		setCurrentTheme,
		videoRef,
		wavesRef,
		isPlaying,
		setIsPlaying,
		isStarted,
		setIsStarted,
		isVisible,
		setIsVisible,
		isAnimeCorrect,
		setIsAnimeCorret,
		inputRef,
		cursorRef,
	} = React.useContext(ControlContext);
	return {
		currentTheme,
		setCurrentTheme,
		videoRef,
		wavesRef,
		isPlaying,
		setIsPlaying,
		isStarted,
		setIsStarted,
		isVisible,
		setIsVisible,
		isAnimeCorrect,
		setIsAnimeCorret,
		inputRef,
		cursorRef,
	};
};
