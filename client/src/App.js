
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse, Nav, NavLink, Button} from 'reactstrap'

const tempID = "628c6c0f3b8adbfca80804b9"

const apiVersion = "v1"

const test = () => {
  console.log("host new group")
  fetch(`http://localhost:3000/api/${apiVersion}/trips/add`,{
    method: "POST"
})
.then(response => {
  response.json().then((data) => {
      console.log(JSON.stringify(data.ID))
      document.getElementById("joinID").innerText=`Join ID: ${data.ID}`;
  }).catch((err) => {
      console.log(err)
  })
})
}

const signIn = () => {
  fetch("signin")
    .then(res => res.text())
    .then(res => this.setState({ apiResponse: res}))
    .catch(err => 
      console.log(err))
}

function App() {
  return (
    <div>
    <Navbar
      color="light"
      expand="md"
      light
    >
    <NavbarBrand href="/">
      DivvyUp
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="ms-auto"
        navbar
      >
        <NavItem>
          <NavLink href="">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="">
            How to use  
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="">
            About Us
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/signin">
            Test
            {/* <a href="signin" className="btn btn-primary" role="button">Log in</a>
            <a href="/users/">See Login Info</a>
            <Button color="primary" onClick={signIn}>Sign-In</Button> */}
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
</div>
  );
}

export default App;
