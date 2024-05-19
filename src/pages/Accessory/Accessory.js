import React from "react";

import styles from "./Accessory.module.scss";
import classNames from "classnames/bind";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import CardItem from "../../components/CardItem/CardItem";
import Data from "../../Data/Data";
const cx = classNames.bind(styles);
const Accessory = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("content-pcgaming")}>
          <p>Pc Gaming bán chạy</p>
          <div className={cx("items-wrapper")}>
            <Swiper
              slidesPerView={6}
              spaceBetween={15}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },

                590: {
                  slidesPerView: 1,
                },
                840: {
                  slidesPerView: 2,
                },
                1090: {
                  slidesPerView: 3,
                },
                1340: {
                  slidesPerView: 4,
                },
                1590: {
                  slidesPerView: 5,
                },
                1840: {
                  slidesPerView: 6,
                },
              }}
            >
              {Data.map((item) => (
                <SwiperSlide key={item.id}>
                  <CardItem props={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={cx("content-laptop")}>
          <p>Laptop bán chạy</p>
          <div className={cx("items-wrapper")}>
            <Swiper
              slidesPerView={6}
              spaceBetween={15}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },

                590: {
                  slidesPerView: 1,
                },
                840: {
                  slidesPerView: 2,
                },
                1090: {
                  slidesPerView: 3,
                },
                1340: {
                  slidesPerView: 4,
                },
                1590: {
                  slidesPerView: 5,
                },
                1840: {
                  slidesPerView: 6,
                },
              }}
            >
              {Data.map((item) => (
                <SwiperSlide key={item.id}>
                  <CardItem props={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessory;
