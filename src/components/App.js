
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import Login from "./Login";
import SignUp from "./SignUp";
import ProtectedRoute from "../ProtectedRoute";
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

  const Header = () => {
    const location = useLocation();
    return (
      <header>
        <h1 id="Logo1">Weather App</h1>
        <nav>
          {location.pathname !== "/login" && !user && <Link to="/login" className="button-34">Login</Link>}
          {location.pathname !== "/signup" && !user && <Link to="/signup" className="button-34">Sign Up</Link>}
          {user && <button className="button-34" onClick={handleLogout}>Logout</button>}
        </nav>
        {user && <p id="UserName">Welcome, {user.email.split('@')[0]}</p>}
      </header>
    );
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
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
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
