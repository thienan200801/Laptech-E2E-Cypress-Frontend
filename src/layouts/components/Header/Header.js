import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "../Search";
import * as UserService from "../../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";
import { useSelector, useDispatch } from "react-redux";
import lapTech_logo_3 from "../../../assets/images/lapTech_logo_3.png";
import { Popover } from "antd";
import { resetUser } from "../../../redux/slide/userSlide";
import { resetState } from "../../../redux/slide/cartSlide";
import { adminMenu, guestMenu, userMenu } from "./menuApp";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";

const cx = classNames.bind(styles);

const Header = () => {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const handleCart = () => {
    navigate("/cart");
    setVisible(false);
  };
  const handleLogout = async () => {
    await UserService.logoutUser();
    dispatch(resetUser());
    dispatch(resetState());
    setVisible(false);
    navigate("/");
  };

  const handleMenuItemClick = (path) => {
    if (path) {
      navigate(path);
      setVisible(false);
    } else {
      handleLogout();
    }
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link className={cx("logo")} to={config.routes.home}>
          <img id="laptechLogo" src={lapTech_logo_3} alt="tiki-logo" width="72" height="72" />
        </Link>
        <Search />
        <div className={cx("actions")}>
          <div className={cx("user")}>
            <Popover
              content={
                user?.isAdmin
                  ? adminMenu.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={cx("item")}
                          onClick={() => handleMenuItemClick(item.path)}
                        >
                          <item.icon
                            style={{
                              marginRight: "8px",
                              marginLeft: "4px",
                              color: "4f94ca",
                            }}
                            size={28}
                          />
                          <p className={cx("menu-item")}>{item.name}</p>
                        </div>
                      );
                    })
                  : user?.id
                  ? userMenu.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={cx("item")}
                          onClick={() => handleMenuItemClick(item.path)}
                        >
                          <item.icon
                            style={{
                              marginRight: "8px",
                              marginLeft: "4px",
                              color: "4f94ca",
                            }}
                            size={28}
                          />
                          <p className={cx("menu-item")}>{item.name}</p>
                        </div>
                      );
                    })
                  : guestMenu.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={cx("item")}
                          onClick={() => handleMenuItemClick(item.path)}
                        >
                          <item.icon
                            style={{
                              marginRight: "8px",
                              marginLeft: "4px",
                              color: "4f94ca",
                            }}
                            size={28}
                          />
                          <p className={cx("menu-item")}>{item.name}</p>
                        </div>
                      );
                    })
              }
              trigger="click"
              placement="bottom"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {user?.avatar ? (
                  <img
                    alt="avatar"
                    src={user.avatar}
                    width="40px"
                    height="40px"
                    style={{ borderRadius: "50%", marginRight: "4px" }}
                  />
                ) : (
                  <AiOutlineUser
                    size={28}
                    style={{
                      marginRight: "8px",
                    }}
                  />
                )}
                {user?.name ? <div>{user?.name}</div> : <div>Account</div>}
              </div>
            </Popover>
          </div>
          <div className={cx("cart")} onClick={handleCart}>
            <div>
              {cart.products.length ? (
                <label
                  style={{
                    position: "absolute",
                    fontSize: "12px",
                    backgroundColor: "red",
                    color: "#fff",
                    top: "30%",
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "12px",
                  }}
                >
                  {cart.products?.length}
                </label>
              ) : (
                <></>
              )}
              <AiOutlineShoppingCart
                size={24}
                style={{
                  marginRight: "12px",
                  marginTop: "4px",
                }}
              />
            </div>
            <div>My Cart</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
