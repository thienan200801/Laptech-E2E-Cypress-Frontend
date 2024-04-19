import React from "react";
import styles from "./CardItem.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import Star from "../Star/Star";

const cx = classNames.bind(styles);

const CardItem = ({ props }) => {
  const navigate = useNavigate();

  const handleDetailProduct = (id) => {
    navigate(`/productdetail/${id}`);
  };
  const numberFormat = new Intl.NumberFormat("en-US");

  return (
    <div className={cx("wrapper")}>
      <div
        key={props._id}
        className={cx("image")}
        onClick={() => handleDetailProduct(props._id)}
      >
        <img
          src={props.image}
          alt="img"
          width={"100%"}
          height={"100%"}
          style={{ borderRadius: "16px 16px 0 0" }}
        />
      </div>
      <div className={cx("info")}>
        <div className={cx("name")}>{props.name}</div>
        <div className={cx("rate")}>
          <Star stars={props.averageRating} size={"1.8rem"} />
        </div>
        <p className={cx("price")}> {numberFormat.format(props.price)}đ </p>
      </div>
    </div>
  );
};

export default CardItem;
