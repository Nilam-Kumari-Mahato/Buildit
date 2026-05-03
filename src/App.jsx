import { BrowserRouter , Routes , Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Validate from "./pages/Validate";
import Results from "./pages/Results";
import History from "./pages/History";
import Navbar from "./components/Navbar";

function App() {
  return( 
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/validate" element={<Validate />} />
        <Route path="/results" element={<Results />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
