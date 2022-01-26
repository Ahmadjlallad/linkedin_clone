import React, { ReactElement, useState, useEffect } from "react";
import Image from "next/image";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import HeaderLink from "./HeaderLink";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import Avatar from "@mui/material/Avatar";
// import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Skeleton } from "@mui/material";
interface Props {}
const spring = {
  type: "spring",
  damping: 100,
  stiffness: 700,
};

function Header({}: Props): ReactElement {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Skeleton variant="circular" width={40} height={40} />;
  return (
    <div>
      <header className="sticky top-0 z-40  bg-white dark:bg-[#1d2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg">
        {/* left*/}

        <div className="flex items-center space-x-2 w-full max-w-xs">
          {
            <>
              {resolvedTheme === "dark" ? (
                <Image
                  src="https://rb.gy/bizvqj"
                  width={45}
                  height={45}
                  objectFit="contain"
                  alt="logo"
                />
              ) : (
                <Image
                  src="https://rb.gy/dpmd9s"
                  width={45}
                  height={45}
                  objectFit="contain"
                  alt="logo"
                />
              )}
            </>
          }

          <div className="flex items-center space-x-1 dark:md:bg-gray-700 px-4 rounded w-full">
            <SearchRoundedIcon className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 
              dark:placeholder-white/70 flex-grow"
            />
          </div>
        </div>

        {/* right*/}
        <div className="flex items-center space-x-6">
          <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
          <HeaderLink Icon={GroupIcon} text="My Network" feed />
          <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
          <HeaderLink Icon={ChatIcon} text="Messaging" feed />
          <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
          <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
          <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />
        </div>

        <div
          className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative
          ${resolvedTheme === "dark" ? "justify-end" : "justify-start"}
          `}
          onClick={() => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
          }}
        >
          <span className="absolute left-0">🌜</span>
          <motion.div
            className="w-5 h-5 bg-white rounded-full z-40"
            layout
            transition={spring}
          />
          <span className="absolute right-0.5">🌞</span>
        </div>
      </header>
    </div>
  );
}

export default Header;
