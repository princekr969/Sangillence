import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout1 } from "./layouts";
import { HomePage, OlympiadPage } from "./pages";

function App() {
  return (
    <BrowserRouter basename="/Sangillence"> {/* 👈 Use basename here */}
      <Routes>
        <Route path="/" element={<Layout1 />}>
          <Route index element={<HomePage />} />
          <Route path="olympiad" element={<OlympiadPage />} />
          <Route path="contactUs" element={<OlympiadPage />} />
          <Route path="nep2020" element={<OlympiadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
