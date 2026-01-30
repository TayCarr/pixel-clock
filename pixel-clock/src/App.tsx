//App.tsx

import Clock from './components/Clock';
import './App.css'

function App() { //define react component, this function returns UI

  return (
    <div>
      <h1>Pixel Clock</h1>
      <Clock label="Adelaide" timeZone="Australia/Adelaide" city="Adelaide"/>
      
      <Clock label="Tokyo" timeZone="Asia/Tokyo" city="Tokyo" />
    </div>  
    
  );
}

export default App //export so that main.tsx can render
