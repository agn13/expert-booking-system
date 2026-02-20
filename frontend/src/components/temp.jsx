import { Link, useLocation } from "react-router-dom";

export default function Navbar() {

  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path;

  return (

    <div style={{
      backgroundColor: "#2196F3",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>

      <div style={{
        fontSize: "20px",
        fontWeight: "bold"
      }}>
        Expert Booking
      </div>

      <div>

        <Link
          to="/"
          style={{
            marginRight: "15px",
            color: "white",
            textDecoration: "none",
            fontWeight: isActive("/") ? "bold" : "normal"
          }}
        >
          Experts
        </Link>

        <Link
          to="/my-bookings"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: isActive("/my-bookings") ? "bold" : "normal"
          }}
        >
          My Bookings
        </Link>

      </div>

    </div>

  );

}