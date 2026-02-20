import { socket } from "../services/socket";
import { useParams } from "react-router-dom";
import { API } from "../services/api";
import { useEffect, useState, useCallback } from "react";

export default function ExpertDetail() {

  const { id } = useParams();

  const [expert, setExpert] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchExpert = useCallback(async () => {

  try {

    setLoading(true);

    const res = await API.get(`/experts/${id}`);

    setExpert(res.data.expert);
    setBookedSlots(res.data.bookedSlots);

  }
  catch {
    setError("Failed to load expert");
  }
  finally {
    setLoading(false);
  }

}, [id]);


  useEffect(() => {

  fetchExpert();

  socket.on("slotBooked", (data) => {

    if (data.expertId.toString() === id) {

      setBookedSlots(prev => [
        ...prev,
        { date: data.date, timeSlot: data.timeSlot }
      ]);

    }

  });

  return () => socket.off("slotBooked");

}, [fetchExpert, id]);


  const isBooked = (date, slot) =>
    bookedSlots.some(
      b => b.date === date && b.timeSlot === slot
    );


  const handleSlotClick = (date, slot) => {

    setSelectedDate(date);
    setSelectedSlot(slot);
    setShowForm(true);

  };


  if (loading)
    return (
      <div className="page">
        <div className="container">
          Loading expert...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="page">
        <div className="container">{error}</div>
      </div>
    );


  return (

    <div className="page">

      <div className="container">

        <div className="card">

          <h2>{expert.name}</h2>

          <p><strong>Category:</strong> {expert.category}</p>
          <p><strong>Experience:</strong> {expert.experience} years</p>
          <p><strong>Rating:</strong> ⭐ {expert.rating}</p>

        </div>


        <h3>Available Slots</h3>

        {expert.availableSlots.map((day, index) => (

          <div key={index} className="card">

            <h4>{day.date}</h4>

            {day.slots.map((slot, i) => {

              const booked = isBooked(day.date, slot);

              return (

                <button
                  key={i}
                  className={`btn ${booked ? "btn-disabled" : "btn-primary"}`}
                  disabled={booked}
                  onClick={() => handleSlotClick(day.date, slot)}
                >
                  {slot}
                </button>

              );

            })}

          </div>

        ))}


        {showForm && (

          <BookingForm
            expertId={id}
            date={selectedDate}
            timeSlot={selectedSlot}
            refresh={fetchExpert}
            closeForm={() => setShowForm(false)}
          />

        )}

      </div>

    </div>

  );

}


function BookingForm({
  expertId,
  date,
  timeSlot,
  refresh,
  closeForm
}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);


  const handleSubmit = async () => {

    if (!name || !email || !phone)
      return alert("Fill required fields");

    try {

      setSubmitting(true);

      await API.post("/bookings", {
        expertId,
        name,
        email,
        phone,
        date,
        timeSlot,
        notes
      });

      alert("Booking successful");

      refresh();
      closeForm();

    }
    catch (err) {

      alert(err.response?.data?.message);

    }
    finally {
      setSubmitting(false);
    }

  };


  return (

    <div className="card">

      <h3>Book Slot</h3>

      <p>{date} — {timeSlot}</p>

      <input
        placeholder="Name"
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        placeholder="Phone"
        onChange={e => setPhone(e.target.value)}
      />

      <textarea
        placeholder="Notes"
        onChange={e => setNotes(e.target.value)}
      />

      <button
        className="btn btn-secondary"
        disabled={submitting}
        onClick={handleSubmit}
      >
        {submitting ? "Booking..." : "Confirm Booking"}
      </button>

    </div>

  );

}