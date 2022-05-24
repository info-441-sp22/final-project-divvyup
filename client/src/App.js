import logo from './logo.svg';
import './App.css';

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

const deleteTrip = () => {
  console.log("deleted trip")

}

const joinTrip =  () => {
  console.log("joined trip")
}

const addItem = () => {
  console.log("added item")
}

const showReceipt = () => {
  console.log("show receipt")
}



function App() {
  return (
    <div className="App">
      <h1>Express</h1>
      <p>Welcome to Express</p>
      <h3>login</h3>
      <a href="/signin">Log in</a> <br />
      <a href="/signout">Log out</a> <br />
      <button onClick={test}>Host New Group</button><br />
      <button onClick={deleteTrip}>Delete Group</button><br />
      <div id="joinID"></div>
      <p> Join a session</p>
      <input type="text" id="idInput"/>
      <button onClick={joinTrip}>Join</button>
  
      <div>
        <p> Add Items to cart </p>
        <input id="itemName"></input>
        <input id="itemQuantity"></input>
        <button onClick={addItem}>add item</button>
        <button onClick={showReceipt}>show receipt</button>
        <div id="receipt"></div>
      </div>
    </div>
  );
}

export default App;
