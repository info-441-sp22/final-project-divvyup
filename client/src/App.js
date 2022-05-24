
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, NavbarBrand, NavItem } from 'reactstrap'

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

function App() {
  return (
    <div className="App">
        <h1>hello</h1>
        <Navbar>
          <NavbarBrand>
            DivvyUp
          </NavbarBrand>
          <NavItem>
            Home
          </NavItem>
          <NavItem>
            How to use
          </NavItem>
          <NavItem>
            About us
          </NavItem>
        </Navbar>
    </div>
  );
}

export default App;
