import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout1 } from "./layouts";
import { LoadingPage, HomePage, OlympiadPage, AboutPage, ContactUs, PhotoCapture, SoboPage, SoboExamPage } from "./pages";
import { StudentLoginForm } from './components';
import FormContainer from './components/RegistrationForm/FormContainer';
import SuccessPage from './components/RegistrationForm/SuccessPage';
import MainContainer from './components/OlympiadDashboard/MainContainer';

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
          <Route path='photoCapture' element={<PhotoCapture/>}/> 
          <Route path='studentLogin' element={<StudentLoginForm/>}/> 
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="sobo" element={<SoboPage />} />
          <Route path="sobo/:schoolId" element={<SoboPage />} />
          <Route path="sobo/:schoolId/EXAM_PAGE" element={<SoboExamPage />} />
        </Route>


        <Route path="/olympiad/test" element={<MainContainer />} />
        <Route path="/registration-success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
