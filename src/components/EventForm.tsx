import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/webhook", {
        event: "invitee.created",
        payload: {
          title,
          email,
          start_time: start,
          end_time: end,
        },
      });
      alert("Event added successfully!");
      console.log(res.data);
    } catch (err) {
      alert("Failed to add event");
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Add Event (via Calendar)</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Invitee Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Start Time:</label>
        <DatePicker
          selected={start}
          onChange={(date) => setStart(date)}
          showTimeSelect
          dateFormat="Pp"
        />
        <label>End Time:</label>
        <DatePicker
          selected={end}
          onChange={(date) => setEnd(date)}
          showTimeSelect
          dateFormat="Pp"
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}
