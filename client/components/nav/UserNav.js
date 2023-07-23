import { useState, useEffect } from "react";
import Link from "next/link";

const UserNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link href="/user">
        <a className={`nav-link ${current === "/user" && "active"}`}>
          Dashboard
        </a>
      </Link>

      <Link href="/user/vault">
        <a className={`nav-link ${current === "/user/vault" && "active"}`}>
          Vault
        </a>
      </Link>

      <Link href="/user/youtube">
        <a className={`nav-link ${current === "/user/youtube" && "active"}`}>
          Youtube Tools
        </a>
      </Link>
    </div>
  );
};

export default UserNav;
