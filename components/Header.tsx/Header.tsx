"use client";
import React from "react";
import Wrapper from "../Wrapper";
import styles from "./Header.module.css";
import useLogin from "@/hooks/useLogin";
import Link from "next/link";
import logo from "@/public/img/logo.png";
import Image from "next/image";

const Header = () => {
  const [, , , logoutHandler, ,] = useLogin();
  return (
    <Wrapper>
      <div>
        <header className={styles.header}>
          <Link className="a-exception" href={"/"}>
            {" "}
            <Image width={100} height={50} src={logo} alt={"logo"}></Image>{" "}
          </Link>
          <div className={styles.menu}>
            <div className={styles.userHandle}>
              <span>Boss</span>
              <svg className={styles.icon}>
                <use xlinkHref={"./svg/sprite.svg#chevron"}></use>
              </svg>
            </div>
            <ul className={styles.dropdown}>
              <li>
                <Link href={"/dashboard"}>Dashboard</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </ul>
          </div>
        </header>
      </div>
    </Wrapper>
  );
};

export default Header;
