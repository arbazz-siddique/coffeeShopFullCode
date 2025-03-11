import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <h2 className="section-title">Testimonials</h2>
      <div className="section-content">
        <div className="slider-content">
          <div className="slider-container">
            <div className="slider-wrapper">
              <Swiper
                loop={true}
                spaceBetween={25}
                slidesPerView={1}
                autoplay={{
                  delay: 2000, // 2 seconds
                  disableOnInteraction: false, // Keeps autoplay even after manual interaction
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                centeredSlides={true}
                className="testimonials-list swiper-wrapper "
              >
                <SwiperSlide className="testimonial swiper-slide">
                  <img src={`./user-1.jpg`} alt="User" className="user-image" />
                  <h3 className="name">Sarah Tharu</h3>
                  <i className="feedback">"Loved the French roast. Perfectly balanced and rich. Will order again!"</i>
                </SwiperSlide>
                <SwiperSlide className="testimonial swiper-slide">
                  <img src={`./user-2.jpg`} alt="User" className="user-image" />
                  <h3 className="name">John Den</h3>
                  <i className="feedback">"Great espresso blend! Smooth and bold flavor. Fast shipping too!"</i>
                </SwiperSlide>
                <SwiperSlide className="testimonial swiper-slide">
                  <img src={`./user-3.jpg`} alt="User" className="user-image" />
                  <h3 className="name">Aryan Len</h3>
                  <i className="feedback">"Fantastic mocha flavor. Fresh and aromatic. Quick shipping!"</i>
                </SwiperSlide>
                <SwiperSlide className="testimonial swiper-slide">
                  <img src={`./user-4.jpg`} alt="User" className="user-image" />
                  <h3 className="name">Sarah Tharu</h3>
                  <i className="feedback">"Loved the French roast. Perfectly balanced and rich. Will order again!"</i>
                </SwiperSlide>
                <SwiperSlide className="testimonial swiper-slide">
                  <img src={`./user-5.jpg`} alt="User" className="user-image" />
                  <h3 className="name">John Den</h3>
                  <i className="feedback">"Great espresso blend! Smooth and bold flavor. Fast shipping too!"</i>
                </SwiperSlide>
                <SwiperSlide className="testimonial swiper-slide">
                  <img src={`./user-2.jpg`} alt="User" className="user-image" />
                  <h3 className="name">Aryan Len</h3>
                  <i className="feedback">"Fantastic mocha flavor. Fresh and aromatic. Quick shipping!"</i>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
