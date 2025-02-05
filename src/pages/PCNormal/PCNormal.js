import React, { useEffect, useState } from "react";

import styles from "./PCNormal.module.scss";
import classNames from "classnames/bind";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import * as ProductService from "../../services/ProductService";
import CardItem from "../../components/CardItem/CardItem";
import Data from "../../Data/Data";
const cx = classNames.bind(styles);
const PCNormal = () => {
  const [PData, setPData] = useState([]);

  const fetchProductAll = async () => {
    try {
      const res = await ProductService.getAllProduct();
      console.log("Data fetched:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProductAll();
        setPData(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    console.log("PData:", PData);
  }, []);

  useEffect(() => {
    console.log("Rerendered!");
  }, [PData]);

  console.log("data products: ", PData);

  const NormalPc = PData.filter((index) => {
    return index.type === "normal-pc";
  });
  return (
    <div className={cx("container")}>
      <div className={cx("content")} id="laptopBrand">
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
              {NormalPc.map((item) => (
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
              {NormalPc.map((item) => (
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

export default PCNormal;
