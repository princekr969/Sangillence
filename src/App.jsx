import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout1 } from "./layouts";
import { HomePage, OlympiadPage, NEP2020, ContactUs } from "./pages";
import { OlympiadForm } from './components';

function App() {
  return (
    <BrowserRouter basename="/Sangillence"> {/* 👈 Use basename here */}
      <Routes>
        <Route path="/" element={<Layout1 />}>
          <Route index element={<HomePage />} />
          <Route path="olympiad" element={<OlympiadPage />} />
          <Route path="nep2020" element={<NEP2020/>} />
          <Route path='olympiadForm' element={<OlympiadForm/>}/>  
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="nep2020" element={<OlympiadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
