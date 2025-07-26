import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout1 } from "./layouts";
import { LoadingPage, HomePage, OlympiadPage, AboutPage, ContactUs } from "./pages";
import FormContainer from './components/RegistrationForm/FormContainer';
import SchoolForm from './components/RegistrationForm/SchoolForm';
import SuccessPage from './components/RegistrationForm/SuccessPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" index element={<LoadingPage />} />
        <Route path="home" index element={<HomePage />} />
        <Route path="/" element={<Layout1 />}>
          <Route path="olympiad" element={<OlympiadPage />} />
          <Route path="about" element={<AboutPage/>} />
          <Route path='olympiadForm' element={<FormContainer/>}/>  
          <Route path="contactUs" element={<ContactUs />} />
        </Route>
        
        <Route path="/registration-success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
