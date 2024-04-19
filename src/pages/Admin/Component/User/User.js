import React, { useEffect, useState } from "react";
import styles from "./User.module.scss";
import classNames from "classnames/bind";
import * as UserService from "../../../../services/UserService";

const cx = classNames.bind(styles);

const User = () => {
  const [Data, setData] = useState([]);

  //Fetch ALL data
  const fetchUserAll = async () => {
    try {
      const res = await UserService.getAllUser();
      console.log("Data fetched all user:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchUserAll();
        setData(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    console.log("Data:", Data);
  }, []);

  return (
    <div className={cx("container")}>
      <p>Quản lí User</p>
      <div className={cx("content")}></div>
    </div>
  );
};

export default User;
