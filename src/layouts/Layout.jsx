import React from "react";
import styles from "./Layout.module.css";
function Layout({ children }) {
  return (
    <div>
      <header className={styles.header}>
        <h1>React Crypto monitoring APP</h1>
        <p>
          <a href="https://github.com/rasoulbagheri">Github</a>
        </p>
      </header>
      {children}
      <footer className={styles.footer}>Developed by rasoul bagheri </footer>
    </div>
  );
}

export default Layout;
