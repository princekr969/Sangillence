import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout1 } from "./layouts";
import { HomePage, Explora, OlympiadPage, AboutPage, ContactUs, MentorshipTestPage, PhotoCapture, SoboLandingPage, SoboPage, SoboExamPage, MentorShipPage, CareersPage, StudentDashboard } from "./pages";
import { StudentLoginForm, JeePredictionForm } from './components';
import FormContainer from './components/Forms/FormContainer';
import SuccessPage from './components/Forms/SuccessPage';
import MainContainer from './components/OlympiadDashboard/MainContainer';
import FreshStudentsFormPage from './components/NewGoogleExam';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main landing / home page - redirect to Explora */}
        <Route path="/" element={<Navigate to="/explora" replace />} />
        <Route path="home" element={<Navigate to="/explora" replace />} />

        {/* Explora main page */}
        <Route path="/explora" element={<Explora />} />

        {/* Layout for rest of the site */}
        <Route path="" element={<Layout1 />}>

          <Route path="olympiad" element={<OlympiadPage />} />
          <Route path="about" element={<AboutPage/>} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="mentorship" element={<MentorShipPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="sobo" element={<SoboLandingPage />} />
          <Route path="sobo/access" element={<SoboPage />} />
          <Route path="sobo/:schoolId" element={<SoboPage />} />
          <Route path="sobo/:schoolId/EXAM_PAGE" element={<SoboExamPage />} />
          {/* <Route path='olympiadForm' element={<FormContainer/>}/>   */}
          <Route path='studentLogin' element={<StudentLoginForm/>}/> 
          {/* <Route path='photoCapture/:studentId' element={<PhotoCapture/>}/>  */}
        </Route>
          <Route path='/*' element={<HomePage/>}/>
          <Route path="jee-trajectory-predictor" element={<MentorshipTestPage />} />

        <Route path="/new/student" element={<JeePredictionForm />} />
        <Route path="/student-login" element={<StudentLoginForm />} />
        <Route path="/student-dashboard/:resultId" element={<StudentDashboard />} />
        {/* <Route path="/olympiad/test" element={<MainContainer />} /> */}
        {/* <Route path="/registration-success" element={<SuccessPage />} /> */}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
