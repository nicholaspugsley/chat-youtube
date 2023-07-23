import { useState, useEffect } from "react";
import Link from "next/link";

const AdminNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link href="/admin">
        <a className={`nav-link ${current === "/admin" && "active"}`}>
          Dashboard
        </a>
      </Link>
      <Link href="/admin/platform-stats">
        <a
          className={`nav-link ${
            current === "/admin/platform-stats" && "active"
          }`}
        >
          Platform Stats
        </a>
      </Link>

      <Link href="/admin/kpi">
        <a className={`nav-link ${current === "/admin/kpi" && "active"}`}>
          KPIs
        </a>
      </Link>
    </div>
  );
};

export default AdminNav;
