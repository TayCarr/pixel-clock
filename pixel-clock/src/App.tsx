//App.tsx

import Clock from './components/Clock';
import './App.css'

function App() {

  return (
    <div>
      <h1>Pixel Clock</h1>
      <Clock label="New York" timeZone="America/New_York" city="New York"/>
      <Clock label="London" timeZone="Europe/London" city="London" />
      <Clock label="Tokyo" timeZone="Asia/Tokyo" city="Tokyo" />
    </div>  
    
  );
}

export default App
