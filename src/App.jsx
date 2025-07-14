import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout1 } from "./layouts";
import { HomePage, OlympiadPage, NEP2020, ContactUs } from "./pages";
import FormContainer from './components/RegistrationForm/FormContainer';
import SchoolForm from './components/RegistrationForm/SchoolForm';
import SuccessPage from './components/RegistrationForm/SuccessPage';

function App() {
  return (
    <BrowserRouter> {/* 👈 Use basename here */}
      <Routes>
        <Route path="/" element={<Layout1 />}>
          <Route index element={<HomePage />} />
          <Route path="olympiad" element={<OlympiadPage />} />
          <Route path="nep2020" element={<NEP2020/>} />
          <Route path='olympiadForm' element={<FormContainer/>}/>  
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="nep2020" element={<OlympiadPage />} />
        </Route>
        
        {/* Standalone routes for school registration */}
        <Route path="/school-registration" element={<SchoolForm />} />
        <Route path="/registration-success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
