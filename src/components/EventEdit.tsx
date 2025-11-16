import { useState } from "react";
import axios from "axios";

interface EventEditProps {
  eventId: string;
  currentStart?: string;
  currentEnd?: string;
  onUpdated?: () => void;
}

export default function EventEdit({
  eventId,
  currentStart,
  currentEnd,
  onUpdated,
}: EventEditProps) {
  const [startTime, setStartTime] = useState(currentStart || "");
  const [endTime, setEndTime] = useState(currentEnd || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`http://localhost:5000/events/${eventId}`, {
        start_time: startTime,
        end_time: endTime,
      });
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error("Error updating event:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.5rem" }}>
      <label>
        Start Time
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>
      <label>
        End Time
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Meeting"}
      </button>
    </form>
  );
}
