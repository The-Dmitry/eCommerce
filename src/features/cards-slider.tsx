'use client';

import React, { ReactNode } from 'react';
import { A11y, Autoplay, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

interface Props {
  children: ReactNode[];
}

export default function CardsSlider({ children }: Props) {
  return (
    <section>
      <Swiper
        grabCursor={true}
        slidesPerView={'auto'}
        spaceBetween={20}
        loop
        mousewheel
        autoplay={{ delay: 10000, pauseOnMouseEnter: true }}
        modules={[A11y, Autoplay, Mousewheel]}
      >
        {React.Children.map(children, (child) => (
          <SwiperSlide
            className='select-none'
            style={{ width: 'min(100%, 18rem)' }}
          >
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
