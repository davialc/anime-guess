export const StatsCard = () => {
	return (
		<div className="w-80 z-10 flex justify-around items-center animate-inputAppear mb-4">
			<div className="flex flex-col items-center">
				<span className="text-5xl">
					1.04<span className="text-base">m</span>
				</span>
				<span className="text-sm font-mono">timestamp</span>
			</div>
			<div className="flex flex-col items-center">
				<span className="text-5xl">2</span>
				<span className="text-sm font-mono">errors</span>
			</div>
		</div>
	);
};
