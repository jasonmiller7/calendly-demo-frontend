import { useState } from "react";
import { getStoredEvents } from "../api/events";
import "./EventList.css";

type StoredEvent = {
  event: string;
  payload: {
    name?: string;
    email?: string;
    reschedule_url?: string;
    cancel_url?: string;
    scheduled_event?: {
      uri?: string;
      name?: string;
      start_time?: string;
      end_time?: string;
      location?: { join_url?: string; type?: string };
    };
    [key: string]: unknown;
  };
};

function formatDate(val?: string): string {
  if (!val) return "N/A";
  const d = new Date(val);
  return d.toLocaleString();
}

export default function StoredEventList() {
  const [events, setEvents] = useState<StoredEvent[]>([]);

  const fetchStored = async () => {
    try {
      const res = await getStoredEvents();
      setEvents(res.data.collection || []);
      console.log("Stored events fetched:", res.data);
    } catch (err) {
      console.error("Error fetching stored events:", err);
    }
  };

  return (
    <div className="component-container">
      <h2>Stored Events (MongoDB)</h2>
      <button onClick={fetchStored}>Fetch Stored Events</button>
      {events.length === 0 ? (
        <p>No stored events yet.</p>
      ) : (
        <table className="event-table">
          <thead>
            <tr>
              <th>Event Type</th>
              <th>Invitee</th>
              <th>Email</th>
              <th>Start</th>
              <th>End</th>
              <th>Zoom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, i) => (
              <tr key={i}>
                <td>{ev.event}</td>
                <td>{ev.payload?.name || "N/A"}</td>
                <td>{ev.payload?.email || "N/A"}</td>
                <td>{formatDate(ev.payload?.scheduled_event?.start_time)}</td>
                <td>{formatDate(ev.payload?.scheduled_event?.end_time)}</td>
                <td>
                  {ev.payload?.scheduled_event?.location?.join_url ? (
                    <a
                      href={ev.payload.scheduled_event.location.join_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Zoom
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  {ev.payload?.reschedule_url ? (
                    <a
                      href={ev.payload.reschedule_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Reschedule
                    </a>
                  ) : (
                    "N/A"
                  )}
                  {" | "}
                  {ev.payload?.cancel_url ? (
                    <a
                      href={ev.payload.cancel_url}
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
