//App.tsx

import Clock from './components/Clock';
import './App.css'
import { useState } from 'react';



function App() { //define react component, this function returns UI

  
  const cities = [
    {label: "Edmonton", timeZone: "America/Edmonton", city: "Edmonton" },
    {label: "Adelaide", timeZone: "Australia/Adelaide", city: "Adelaide" },
    {label: "London", timeZone: "Europe/London", city: "London" },
    {label: "Tokyo", timeZone: "Asia/Tokyo", city: "Tokyo" },
    {label: "Sydney", timeZone: "Australia/Sydney", city: "Sydney" },
    {label: "Warsaw", timeZone: "Europe/Warsaw", city: "Warsaw" },
    {label: "Hong Kong", timeZone: "Asia/Hong_Kong", city: "Hong Kong" },
    {label: "Madrid", timeZone: "Europe/Madrid", city: "Madrid" },
    {label: "Durban", timeZone: "Africa/Johannesburg", city: "Durban" },
    
  ];
  const [selectedCity, setSelectedCity] = useState(cities[0]); //store current city, default is first in list

  //TODO style for dropdown, clock, weather text
  return (
    <div>
      <ul>
      <select 
        value = {selectedCity.city}
        onChange={(e) => {
          const city = cities.find(c => c.city === e.target.value);
          if (city) setSelectedCity(city);
        }}
      >
        {cities.map((c) => (
          <option key={c.city} value={c.city}>
            {c.label}
          </option>
        ))}

      </select>
      </ul>
      <Clock label={selectedCity.label} timeZone={selectedCity.timeZone} city={selectedCity.city} />
    </div>  
    
  );
}

export default App //export so that main.tsx can render

