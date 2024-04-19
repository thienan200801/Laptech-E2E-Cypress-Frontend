import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  //*********** test w/ fake data ***********
  const navigate = useNavigate();
  const handleDetail = (id) => {
    navigate("/productdetail/", {
      replace: false,
      state: {
        id: data.id,
        name: data.name,
        image: data.image,
      },
    });
  };
  const handleDetailProduct = (id) => {
    navigate(`/productdetail/${id}`);
  };
  //******************************************

  return (
    // <Link to={'/@${data.name}'} className={cx('wrapper')}>
    //     <FontAwesomeIcon icon={faMagnifyingGlass} />
    //     <div className={cx('info')}>
    //         <h4 className={cx('name')}>
    //             <span>{data.full_name}</span>
    //             {data.tick && <FontAwesomeIcon icon={faCheckCircle} />}
    //         </h4>
    //         <span className={cx('username')}>{data.nickname}</span>
    //     </div>
    // </Link>

    //*********** test w/ fake data ***********
    <Link
      className={cx("wrapper")}
      onClick={() => handleDetailProduct(data._id)}
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} key={data._id} />
      <div className={cx("info")}>
        <h4 className={cx("name")}>
          <span>{data.name}</span>
        </h4>
      </div>
    </Link>
    //*****************************************
  );
}

export default AccountItem;
