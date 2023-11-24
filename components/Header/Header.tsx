"use client";
import React, { useEffect } from "react";
import Wrapper from "../Wrapper";
import styles from "./Header.module.css";
import useLogin from "@/hooks/useLogin";
import Link from "next/link";
import logo from "@/public/img/logo.png";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { isAdmin } from "@/helpers/workerHandlers/isAdmin";
import { nameExtractor } from "@/helpers/workerHandlers/nameExtractor";
import { capitalize } from "@/helpers/capitalize";
import { useAppSelector } from "@/store/hooks";

const Header = () => {
  const [, , , logoutHandler, ,] = useLogin();
  const [isAuthorized, , user] = useAuth();
  const { isLoggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    isAuthorized();
    return () => isAuthorized();
  }, []);

  let name: string | null = user.email ? nameExtractor(user?.email) : null;

  return (
    <Wrapper>
      <div>
        <header className={styles.header}>
          <Link className="a-exception" href={"/"}>
            {" "}
            <Image
              width={100}
              height={50}
              src={logo}
              alt={"logo"}
              priority
            ></Image>{" "}
          </Link>
          {isLoggedIn ? (
            <div className={styles.menu}>
              <div className={styles.userHandle}>
                <span>{capitalize(name)}</span>
                <svg className={styles.icon}>
                  <use xlinkHref={"./svg/sprite.svg#chevron"}></use>
                </svg>
              </div>
              <ul className={styles.dropdown}>
                {isAdmin(user.uid) ? (
                  <li>
                    <Link href={"/dashboard"}>Dashboard</Link>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </header>
      </div>
    </Wrapper>
  );
};

export default Header;
