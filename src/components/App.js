import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import Login from "./Login";
import SignUp from "./SignUp";
import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "../styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });
  const [user, setUser] = useState(null);

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setQuery("");
      setWeather({ ...weather, loading: true });
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

      await axios
        .get(url)
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setQuery("");
          console.log("error", error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=Rabat&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user);
        setUser(user);
      } else {
        console.log("No user logged in");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        setUser(null);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Weather App</h1>
          <nav>
            <Link to="/">Home</Link>
            {!user && <Link to="/login">Login</Link>}
            {!user && <Link to="/signup">Sign Up</Link>}
            {user && <button onClick={handleLogout}>Logout</button>}
          </nav>
          {user && <p id="UserName">Welcome, {user.email.split('@')[0]}</p>}
        </header>

        <Routes>
          <Route path="/" element={
            <>
              <SearchEngine query={query} setQuery={setQuery} search={search} />
              {weather.loading && (
                <>
                  <br />
                  <br />
                  <h4>Searching..</h4>
                </>
              )}
              {weather.error && (
                <>
                  <br />
                  <br />
                  <span className="error-message">
                    <span style={{ fontFamily: "font" }}>
                      Sorry city not found, please try again.
                    </span>
                  </span>
                </>
              )}
              {weather && weather.data && weather.data.condition && (
                <Forecast weather={weather} toDate={toDate} />
              )}
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
