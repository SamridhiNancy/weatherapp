import "./App.css";
import Navbar from "./components/Weather";
import Sidebar from "./components/Sidebar";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <div className="flex bg-black">
      <div className="w-screen h-screen">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
