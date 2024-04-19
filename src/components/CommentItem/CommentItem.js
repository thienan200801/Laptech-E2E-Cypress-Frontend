import React from "react";
import styles from "./CommentItem.module.scss";
import classNames from "classnames/bind";
import Star from "../Star/Star";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
const cx = classNames.bind(styles);

const CommentItem = ({ props }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("comment")} key={props._id}>
        <div className={cx("comment-user")}>
          <img
            src={props.userId.avatar}
            alt="avatar"
            width={"30px"}
            height={"30px"}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className={cx("comment-and-rating-wrapper")}>
          <div className={cx("comment-and-rating")}>
            <p>{props.userId.name}</p>
            <Star stars={props.rating} />
            <p style={{ margin: "8px 0 4px" }}>{props.comment}</p>
            <p style={{ color: "#ccc", margin: "0 0 8px" }}>
              đánh giá vào ngày: {props.createdAt}
            </p>
            <div>
              <img
                src={"https://www.pngwing.com/en/free-png-xsukd"}
                width={"100px"}
                height={"100px"}
                style={{ marginRight: "8px" }}
              />
              <img
                src={"https://www.pngwing.com/en/free-png-xsukd"}
                width={"100px"}
                height={"100px"}
                style={{ marginRight: "8px" }}
              />
              <img
                src={"https://www.pngwing.com/en/free-png-xsukd"}
                width={"100px"}
                height={"100px"}
                style={{ marginRight: "8px" }}
              />
            </div>
          </div>
          <div className={cx("react-reply")}>
            <div className={cx("like")}>
              <AiOutlineLike size={"24px"} />
            </div>
            <div className={cx("reply")}>
              <FaRegComment size={"24px"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
