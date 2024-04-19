import React, { useEffect, useState } from "react";
import styles from "./Star.module.scss";
import classNames from "classnames/bind";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const cx = classNames.bind(styles);

const Star = ({ stars, size }) => {
  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar color="#FFCD00" size={size} />
        ) : stars >= number ? (
          <FaStarHalfAlt color="#FFCD00" size={size} />
        ) : (
          <AiOutlineStar color="#FFCD00" size={size} />
        )}
      </span>
    );
  });
  return <div className={cx("star")}>{ratingStar}</div>;
};

export default Star;
