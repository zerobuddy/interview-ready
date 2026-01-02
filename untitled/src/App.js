import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import HolidayView from "./components/HolidayView";
import CalendarThreeMonth from "./components/CalendarThreeMonth";


function App() {
  const [country, setCountry] = useState("US");
  return (
      <div className="app">
        <header className="app-header">
          <span>📅 Calendar</span>

          <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
          >
            <option value="IN">India</option>
            <option value="US">USA</option>
            <option value="UK">UK</option>
          </select>
        </header>


          <CalendarThreeMonth />

        <HolidayView country={country} />
      </div>
  );
}

export default App;
