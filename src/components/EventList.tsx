import { useState } from "react";
import { getCalendlyEvents } from "../api/events";
import "./EventList.css";

interface CalendlyEvent {
  uri?: string;
  name?: string;
  start_time?: string;
  end_time?: string;
  location?: { join_url?: string; type?: string } | string | null;
  reschedule_url?: string;
  cancel_url?: string;
  [key: string]: unknown;
}

export default function EventList() {
  const [events, setEvents] = useState<CalendlyEvent[]>([]);

  const fetchEvents = async () => {
    const res = await getCalendlyEvents();
    setEvents(res.data.collection || []);
  };

  const formatDate = (val?: string) => {
    if (!val) return "N/A";
    const d = new Date(val);
    return d.toLocaleString();
  };

  const renderLocation = (loc: CalendlyEvent["location"]) => {
    if (!loc) return "N/A";
    if (typeof loc === "string") return loc;
    const url = (loc as { join_url?: string })?.join_url;
    return url ? (
      <a href={url} target="_blank" rel="noopener noreferrer">
        Join Zoom
      </a>
    ) : "N/A";
  };

  return (
    <div className="component-container">
      <h2>Calendly Events (API)</h2>
      <button onClick={fetchEvents}>Fetch Events</button>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table className="event-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start</th>
              <th>End</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, i) => (
              <tr key={i}>
                <td>{ev.name || "N/A"}</td>
                <td>{formatDate(ev.start_time)}</td>
                <td>{formatDate(ev.end_time)}</td>
                <td>{renderLocation(ev.location)}</td>
                <td>
                  {ev.reschedule_url ? (
                    <a
                      href={ev.reschedule_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Reschedule
                    </a>
                  ) : (
                    "N/A"
                  )}
                  {" | "}
                  {ev.cancel_url ? (
                    <a
                      href={ev.cancel_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cancel
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
