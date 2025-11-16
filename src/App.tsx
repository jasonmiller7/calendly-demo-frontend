import { useState } from "react";
import EventList from "./components/EventList";
import StoredEventList from "./components/StoredEventList";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<"calendly" | "dashboard">("calendly");

  return (
    <div className="app-container">
      <h1 className="app-title">Calendly Integration</h1>

      {/* Tab Navigation */}
      <div className="tab-nav">
        <button
          className={activeTab === "calendly" ? "tab active" : "tab"}
          onClick={() => setActiveTab("calendly")}
        >
          Calendly UI
        </button>
        <button
          className={activeTab === "dashboard" ? "tab active" : "tab"}
          onClick={() => setActiveTab("dashboard")}
        >
          Admin Dashboard
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "calendly" && (
          <div className="calendly-embed">
            <iframe
              src="https://calendly.com/jason-miller-vc/new-meeting" // 🔑 replace with your Calendly link
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="dashboard">
            <div className="card">
              <h2>Stored Events (MongoDB)</h2>
              <StoredEventList />
            </div>
            <div className="card">
              <h2>Calendly Events (API)</h2>
              <EventList />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
