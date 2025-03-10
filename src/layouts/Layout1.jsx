import React, {useEffect} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar, Footer } from '../components'

function Layout1() {
    const {pathname} = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout1
