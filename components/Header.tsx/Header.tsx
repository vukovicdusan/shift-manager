import React from "react";
import Wrapper from "../Wrapper";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <Wrapper>
      <div>
        <header className={styles.header}>
          <div>Logo</div>
          <div>User</div>
        </header>
      </div>
    </Wrapper>
  );
};

export default Header;
