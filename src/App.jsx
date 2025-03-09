import { Navbar, VideoSection, Carousel, Footer } from "./components"
import { createBrowserRouter, createRoutesFromElements, BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import { Layout1 } from "./layouts"
import { HomePage, OlympiadPage } from "./pages"


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <BrowserRouter basename={"https://princekr969.github.io/Sangillence"}>
  {/* Routes Here */}
      <Routes>
        <Route path="/" element={<Layout1/>}>
          <Route path='' element={<HomePage/>}></Route>
          <Route path='olympiad' element={<OlympiadPage/>}></Route>
          <Route path='contactUs' element={<OlympiadPage/>}></Route>
          <Route path='nep2020' element={<OlympiadPage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

     
      )
    )

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
