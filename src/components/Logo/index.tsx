import Link from 'next/link';
import { GiMusicSpell } from 'react-icons/gi';

export const Logo = () => {
	return (
		<Link href="/">
			<a className="flex items-center text-3xl font-mono gap-1 tracking-tighter text-slate-200">
				<GiMusicSpell size={35} />
				AnimeGuess
			</a>
		</Link>
	);
};
