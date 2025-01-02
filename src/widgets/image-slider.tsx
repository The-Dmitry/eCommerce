'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { CSSProperties } from 'react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductProjection } from '../shared/models/ProductProjection';

export default function ImageSlider({
  list,
}: {
  list: ProductProjection['masterVariant']['images'];
}) {
  const images = list.slice(1);

  if (!images.length) {
    return <></>;
  }

  return (
    <Swiper
      className='max-w-full text-orange-500'
      style={
        {
          '--swiper-navigation-color': 'currentColor',
          '--swiper-pagination-color': 'currentColor',
        } as CSSProperties
      }
      modules={[Navigation, Pagination, A11y, Autoplay]}
      navigation={{}}
      pagination={{ clickable: true }}
      slidesPerView={1}
      loop
      autoplay={{ delay: 10000, pauseOnMouseEnter: true }}
    >
      {images.map((v, i) => (
        <SwiperSlide key={i}>
          <img
            src={v.url}
            alt='game image'
            className='mx-auto h-full select-none object-cover'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
