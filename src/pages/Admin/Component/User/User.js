import React, { useEffect, useState } from "react";
import styles from "./User.module.scss";
import classNames from "classnames/bind";
import * as UserService from "../../../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
const cx = classNames.bind(styles);

const User = () => {
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("Usee:", user);

  //Fetch ALL data

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const res = await UserService.getAllUser(user.access_token);
        setData(res.data);
        return res;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAllUser();
  }, []);

  return (
    <div className={cx("container")}>
      <p>Quản lí User</p>
      <div className={cx("content")}></div>
    </div>
  );
};

export default User;
