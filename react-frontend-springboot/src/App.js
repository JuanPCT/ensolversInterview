
import './App.css';
import ItemComponent from "./components/ItemComponent";
import {useEffect} from "react";

function App() {
    useEffect(() => {
        document.title = "Spring Boot React App"
    }, [])
  return (
    <div className="App">
        <ItemComponent />
    </div>
  );
}

export default App;
