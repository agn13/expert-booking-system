import { useState } from "react";
import { API } from "../services/api";

export default function MyBookings() {

  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchBookings = async () => {

    if (!email)
      return alert("Enter email");

    try {

      setLoading(true);

      const res = await API.get(
        `/bookings?email=${email}`
      );

      setBookings(res.data);

    }
    catch {
      setError("Failed to fetch bookings");
    }
    finally {
      setLoading(false);
    }

  };


  return (

    <div className="page">

      <div className="container">

        <h2>My Bookings</h2>

        <div className="card">

          <input
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={fetchBookings}
          >
            Search
          </button>

        </div>


        {loading && <p>Loading...</p>}

        {error && <p>{error}</p>}


        {bookings.map(booking => (

          <div key={booking._id} className="card">

            <h3>{booking.expertId?.name}</h3>

            <p>{booking.date} — {booking.timeSlot}</p>

            <span className={`status ${booking.status}`}>
              {booking.status}
            </span>

          </div>

        ))}

      </div>

    </div>

  );

}