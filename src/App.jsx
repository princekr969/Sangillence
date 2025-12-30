import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout1 } from "./layouts";
import { LoadingPage, HomePage, OlympiadPage, AboutPage, ContactUs,MentorshipTestPage, PhotoCapture, SoboPage, SoboExamPage, MentorShipPage } from "./pages";
import { StudentLoginForm } from './components';
import FormContainer from './components/RegistrationForm/FormContainer';
import SuccessPage from './components/RegistrationForm/SuccessPage';
import MainContainer from './components/OlympiadDashboard/MainContainer';
import FreshStudentsFormPage from './components/NewGoogleExam';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" index element={<LoadingPage />} />
        <Route path="home" index element={<HomePage />} />
        <Route path="/" element={<Layout1 />}>
          <Route path="olympiad" element={<OlympiadPage />} />
          <Route path="about" element={<AboutPage/>} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="mentorship" element={<MentorShipPage />} />
          {/* <Route path="sobo" element={<SoboPage />} /> */}
          {/* <Route path='olympiadForm' element={<FormContainer/>}/>   */}
          <Route path='studentLogin' element={<StudentLoginForm/>}/> 
          {/* <Route path='photoCapture/:studentId' element={<PhotoCapture/>}/>  */}
          {/* <Route path="sobo/:schoolId" element={<SoboPage />} /> */}
          {/* <Route path="sobo/:schoolId/EXAM_PAGE" element={<SoboExamPage />} /> */}
        </Route>
          <Route path='/*' element={<HomePage/>}/>
          <Route path="jee-trajectory-predictor" element={<MentorshipTestPage />} />

        {/* <Route path="/new/student" element={<FreshStudentsFormPage />} /> */}
        {/* <Route path="/olympiad/test" element={<MainContainer />} /> */}
        {/* <Route path="/registration-success" element={<SuccessPage />} /> */}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
