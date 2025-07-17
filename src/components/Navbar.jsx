import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const styles = {
  navbar: {
    backgroundColor: 'rgba(49, 2, 34, 1)',
    padding: '10px 20px',
  },
  navBtn: {
    marginLeft: '15px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  navBtnHover: {
    backgroundColor: '#e1e4e8',
    color: 'black',
  }
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const [hoveredBtn, setHoveredBtn] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage")); 
    navigate("/login");
  };

  const renderNavBtn = (label, to = null, onClick = null, key) => (
    to ? (
      <Link
        to={to}
        key={key}
        style={{
          ...styles.navBtn,
          ...(hoveredBtn === key ? styles.navBtnHover : {})
        }}
        onMouseEnter={() => setHoveredBtn(key)}
        onMouseLeave={() => setHoveredBtn(null)}
      >
        {label}
      </Link>
    ) : (
      <span
        key={key}
        style={{
          ...styles.navBtn,
          ...(hoveredBtn === key ? styles.navBtnHover : {}),
          cursor: "pointer"
        }}
        onClick={onClick}
        onMouseEnter={() => setHoveredBtn(key)}
        onMouseLeave={() => setHoveredBtn(null)}
      >
        {label}
      </span>
    )
  );

  return (
    <nav style={styles.navbar}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h2 className="text-white m-0 fs-4">EMS</h2>
        <div className="d-flex">
          {renderNavBtn("Home", "/", null, "home")}
          {renderNavBtn("Employees", "/employee", null, "employees")}
          {renderNavBtn("Add", "/employeelist", null, "add")}
          {isLoggedIn
            ? renderNavBtn("Logout", null, handleLogout, "logout")
            : <>
                {renderNavBtn("Login", "/login", null, "login")}
                {renderNavBtn("Signup", "/signup", null, "signup")}
              </>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
