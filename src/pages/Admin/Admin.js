// import { getItem } from "../../utils";
// import {
//   UserOutlined,
//   AppstoreOutlined,
//   ShoppingCartOutlined,
// } from "@ant-design/icons";
// import { Menu } from "antd";
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import Sidebar from "./Component/Sidebar/Sidebar";
import User from "./Component/User/User";
import Order from "./Component/Order/Order";
import Product from "./Component/Product/Product";

const cx = classNames.bind(styles);

const Admin = () => {
  const [selectedKey, setSelectedKey] = useState("Customers");

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const renderComponent = () => {
    switch (selectedKey) {
      case "Customers":
        return <User />;
      case "Orders":
        return <Order />;
      case "Products":
        return <Product />;
      default:
        return <></>;
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <Sidebar handleMenuClick={handleMenuClick} selectedKey={selectedKey} />
        <div className={cx("content-wrapper")}>
          <div className={cx("content")}>{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
