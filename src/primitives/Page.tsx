interface PageProps {
	children: JSX.Element | JSX.Element[];
}

export const Page = ({ children }: PageProps) => {
	return (
		<div className="min-h-screen bg-slate-900 text-slate-100 flex justify-center items-center overflow-hidden">
			{children}
		</div>
	);
};
