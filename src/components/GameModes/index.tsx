import { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export const GameModes = () => {
	return (
		<div className="w-80 z-10">
			<Swiper
				effect={'coverflow'}
				grabCursor={true}
				centeredSlides={true}
				initialSlide={1}
				slidesPerView={3}
				coverflowEffect={{
					rotate: 20,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				}}
				modules={[EffectCoverflow, Pagination]}
			>
				<SwiperSlide className="slider">
					<div>
						<h1>Custom</h1>
					</div>
				</SwiperSlide>
				<SwiperSlide className="slider">
					<div>
						<h1>Top anime</h1>
					</div>
				</SwiperSlide>
				<SwiperSlide className="slider">
					<div>
						<h1>Random anime</h1>
					</div>
				</SwiperSlide>
			</Swiper>
			<button className="w-full p-3 bg-slate-800 rounded-lg cursor-pointer mt-4 hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none">
				Play
			</button>
		</div>
	);
};
