import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../TestData/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const Sidebar = ({ handleMenuClick, selectedKey }) => {
  const [expanded, setExpanded] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Đăng ký sự kiện resize khi component được mount
    window.addEventListener("resize", handleResize);

    // Hủy đăng ký sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      if (window.innerWidth > 768) {
        setExpanded(true);
      }
    };
  }, []);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  const handleOnclickMenuItem = (item, index) => {
    handleMenuClick(item.heading);
  };

  return (
    <>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        <div
          className="bars"
          style={{
            left: expanded ? "45%" : "2%",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <UilBars />
        </div>
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => (
            <div
              className={
                selectedKey === item.heading ? "menuItem active" : "menuItem"
              }
              key={index}
              onClick={() => handleOnclickMenuItem(item, index)}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <item.icon size={32} />
              </div>
              <span style={{ fontSize: "18px" }}>{item.heading}</span>
            </div>
          ))}
          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
