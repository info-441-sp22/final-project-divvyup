import React, {useState} from 'react'
import './MyNavbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse, Nav, NavLink} from 'reactstrap'

function MyNavbar() {
  const [nav, setNav] = useState(false);
  const toggleNav = () => setNav(!nav);

  const [test, setTest] = useState(false)
  

  async function checkLogin() {
    await fetch("/users")
    .then(response => response.json())
    .then(data => {
      if (data.name != null) {
        setTest(true)
      } else {
        setTest(false)
      }
    })
  }
  checkLogin()
  return (
    <Navbar color="light" expand="md" light>
      <NavbarBrand href="/">DivvyUp</NavbarBrand>
      <NavbarToggler onClick={toggleNav} />
      <Collapse isOpen={nav} navbar>
        <Nav className="ms-auto" navbar >

          <NavItem><NavLink href="/">Home</NavLink></NavItem>

          <NavItem><NavLink href="/HowTo">How to use</NavLink></NavItem>

          <NavItem><NavLink href="/about">About Us</NavLink></NavItem>
           {test ?
            <NavItem><NavLink href='signout'>Sign Out</NavLink></NavItem>
           :
           <NavItem><NavLink href='/signin'>Sign In</NavLink></NavItem>
           }

      </Nav>
    </Collapse>
  </Navbar>
  )
  
}

export default MyNavbar