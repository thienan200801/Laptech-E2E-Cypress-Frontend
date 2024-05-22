import React, { useEffect, useState } from "react";
import styles from "./CardCart.module.scss";
import classNames from "classnames/bind";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeCartProduct,
} from "../../redux/slide/cartSlide";
import * as UserSerVice from "../../services/UserService";

const cx = classNames.bind(styles);

const CardCart = ({ props }) => {
  const dispatch = useDispatch();
  const numberFormat = new Intl.NumberFormat("en-US");
  const user = useSelector((state) => state.user);
  const [amount, setAmount] = useState(props?.amount);
  const [price, setPrice] = useState(props?.price * props?.amount);

  useEffect(() => {
    setAmount(props?.amount);
    setPrice(props?.price * props?.amount);
  }, [props]);

  const handleChangeCount = async (type, idProduct, limited) => {
    if (type === "increase" && !limited) {
      try {
        const newAmount = amount + 1;
        setAmount(newAmount);
        setPrice(newAmount * props?.price);
        UserSerVice.updateUserCart(
          user?.id,
          idProduct,
          newAmount,
          user?.access_token
        );

        dispatch(increaseAmount(idProduct));
      } catch (error) {
        console.error("Failed to increase amount", error);
      }
    } else if (type === "decrease" && amount > 1) {
      try {
        const newAmount = amount - 1;
        setAmount(newAmount);
        setPrice(newAmount * props?.price);
        UserSerVice.updateUserCart(
          user?.id,
          idProduct,
          newAmount,
          user?.access_token
        );

        dispatch(decreaseAmount(idProduct));
      } catch (error) {
        console.error("Failed to decrease amount", error);
      }
    }
  };

  const handleDeleteProductinCart = async (id, idProduct) => {
    try {
      const res = await UserSerVice.deleteUserCart(
        id,
        idProduct,
        user?.access_token
      );
      if (res.status === "OK") {
        alert("Xóa sản phẩm thành công");
        dispatch(removeCartProduct({ idProduct }));
      }
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <div className={cx("container")} id="checkoutItem">
      <div className={cx("wrapper")}>
        <div className={cx("product")}>
          <div className={cx("image")}>
            <img
              src={props?.image}
              alt="img"
              width={"100px"}
              height={"100px"}
            />
          </div>
          <div className={cx("name")}>{props?.name}</div>
        </div>
        <div className={cx("price")}>{numberFormat.format(props?.price)}Đ</div>
        <div className={cx("quantity")}>
          <div className={cx("wrapper-quantity")}>
            <button
              id="cartDecreaseBtn"
              onClick={() =>
                handleChangeCount("decrease", props?._id, amount === 1)
              }
            >
              -
            </button>
            <p id="cartAmount">{amount}</p>
            <button
              id="cartIncreaseBtn"
              onClick={() =>
                handleChangeCount("increase", props?._id, amount === 50)
              }
            >
              +
            </button>
          </div>
        </div>
        <div className={cx("total")}>{numberFormat.format(price)}Đ</div>
        <div className={cx("remove")}>
          <AiOutlineDelete
            size="2rem"
            color="red"
            onClick={() => handleDeleteProductinCart(user?.id, props?._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardCart;
