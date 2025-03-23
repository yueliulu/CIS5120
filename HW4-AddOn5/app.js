const app = document.getElementById("app");

const cityTemps = {
    "Philadelphia": 3,
    "New York": -1,
    "Boston": -5,
    "New Haven": -4,
    "Beijing": -6
};

const cityMessages = {
    "Philadelphia": ["Will stop raining in 40 mins.", "Cloudy conditions expected."],
    "New York": ["Rain expected to continue.", "Windy conditions."],
    "Boston": ["Clear skies, nice day.", "Low chance of rain today."],
    "New Haven": ["Overcast skies.", "Possible rain later."],
    "Beijing": ["High pollution levels.", "Stay indoors if possible."]
};

const cityDressing = {
    "Philadelphia": "./assets/dressing_helper.png",
    "New York": "./assets/dressing_helper.png",
    "Boston": "./assets/dressing_helper2.png",
    "New Haven": "./assets/dressing_helper.png",
    "Beijing": "./assets/dressing_helper2.png"
};

const cityTempHour = {
    "Philadelphia": [2, 4, 6, 6, 7],
    "New York": [-2, -2, -1, 0, 2],
    "Boston": [-6, -4, -4, -5, -5],
    "New Haven": [-4, -2, -1, 0, 2],
    "Beijing": [-6, -6, -4, -5, -6]
};

const cityTempWeek = {
    "Philadelphia": [5, 2, 0, 8, 9, 1, 3],
    "New York": [0, 2, 4, 0, -2, 1, 3],
    "Boston": [-6, -8, -6, -5, -7, 1, -3],
    "New Haven": [5, 2, 0, 8, 9, 1, 3],
    "Beijing": [-6, -8, -6, -5, -7, -1, -3]
};

const cityBackgrounds = {
    "Philadelphia": "./assets/rain.png",
    "New York": "./assets/rain.png",
    "Boston": "./assets/sunny.png",
    "New Haven": "./assets/sunny.png",
    "Beijing": "./assets/sunny.png"
};

function App() {
    const [selectedCity, setSelectedCity] = React.useState("Philadelphia");
    const [currentTempC, setCurrentTempC] = React.useState(cityTemps["Philadelphia"]);
    const [unit, setUnit] = React.useState("C");

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
        setCurrentTempC(cityTemps[selectedCity]);
    };

    const handleTempUnitChange = (event) => {
        const newUnit = event.target.value;
        setUnit(newUnit);
    };

    function celsiusToFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }

    function fahrenheitToCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }

    const tempInSelectedUnit = unit === "F"
        ? celsiusToFahrenheit(currentTempC)
        : currentTempC;

    const hourlyTemps = cityTempHour[selectedCity].map(temp =>
        unit === "F" ? celsiusToFahrenheit(temp) : temp
    );

    const weeklyTemps = cityTempWeek[selectedCity].map(temp =>
        unit === "F" ? celsiusToFahrenheit(temp) : temp
    );

    const messages = cityMessages[selectedCity];
    const dressingImage = cityDressing[selectedCity];
    const backgroundImage = cityBackgrounds[selectedCity];

    return (
        <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="section">
                <div className="flex">
                    <h2>Location</h2>
                    <select className="select" id="city-select" onChange={handleCityChange} value={selectedCity}>
                        {Object.keys(cityTemps).map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="section">
                <div className="flex">
                    <h2>Current Temperature</h2>
                    <select className="select" id="temp-unit" onChange={handleTempUnitChange} value={unit}>
                        <option value="C">°C</option>
                        <option value="F">°F</option>
                    </select>
                </div>
                <div className="temp-display" id="current-temp">
                    {tempInSelectedUnit.toFixed(1)}°{unit}
                </div>
            </div>

            <div className="section">
                <div className="flex">
                    <div className="message-box">
                        {messages.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </div>
                    <div className="message-figure">
                        <img src={dressingImage} alt="Dressing helper" />
                    </div>
                </div>
            </div>

            <div className="section">
                <h2>Hourly Forecast</h2>
                <div className="temp-container-h">
                    {hourlyTemps.map((temp, index) => (
                        <div className="temp-hour" key={index}>
                            <span>{`0${index + 10}:00 AM`}</span>
                            <span>{temp.toFixed(1)}°{unit}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2>Weekly Forecast</h2>
                <div className="temp-container-v">
                    {weeklyTemps.map((temp, index) => (
                        <div className="next-week-day" key={index}>
                            <span>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span>
                            <span>{temp.toFixed(1)}°{unit}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="menu-bar">
                <div className="menu-item">
                    <img src="./assets/UV.png" alt="UV Index" />
                    <span>UV Index</span>
                </div>
                <div className="menu-item">
                    <img src="./assets/wind_speed.png" alt="Wind Speed" />
                    <span>Wind Speed</span>
                </div>
                <div className="menu-item">
                    <img src="./assets/humidity.png" alt="Humidity" />
                    <span>Humidity</span>
                </div>
                <div className="menu-item">
                    <img src="./assets/visibility.png" alt="Visibility" />
                    <span>Visibility</span>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(app);
root.render(<App />);
