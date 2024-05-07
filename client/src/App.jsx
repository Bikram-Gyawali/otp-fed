import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerifyOTP from "./Pages/VerifyOTP";
import OTPSuccess from "./Pages/OTPSuccess";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<VerifyOTP />} />
            <Route path="/success" element={<OTPSuccess />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
