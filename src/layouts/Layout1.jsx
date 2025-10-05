import React, {useEffect} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar, Footer } from '../components'

function Layout1() {
    const {pathname} = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

  // Only show Navbar if not on the landing page
  const isLandingPage = pathname === "/";
  const isExamPage = /^\/sobo\/[^/]+\/EXAM_PAGE$/.test(pathname);

  return (
    <>
        {!isLandingPage && !isExamPage && <Navbar/>}
        <Outlet/>
        {!isExamPage && <Footer/>}
    </>
  )
}

export default Layout1
