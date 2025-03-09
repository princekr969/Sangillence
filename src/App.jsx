import { Navbar, VideoSection, Carousel, Footer } from "./components"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Layout1 } from "./layouts"
import { HomePage, OlympiadPage } from "./pages"


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
     
        <Route path="/" element={<Layout1/>}>
          <Route path='' element={<HomePage/>}></Route>
          <Route path='olympiad' element={<OlympiadPage/>}></Route>
          <Route path='contactUs' element={<OlympiadPage/>}></Route>
          <Route path='nep2020' element={<OlympiadPage/>}></Route>
        </Route>
     
      )
    )

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
