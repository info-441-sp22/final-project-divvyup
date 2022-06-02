import React from 'react'
import './ShoppingPage.css'
import {List, Input, Button} from 'reactstrap'
import { useNavigate } from 'react-router-dom'

let tripID = null
const apiVersion="v1"

function ShoppingPage() {
  getTripID(showList);
  getUsername()
  let navigate = useNavigate();
  return (
    <div className='ShoppingPage_container'>
      <div className='ShoppingPage'>
          <div className='ShoppingPage_userDetail'>
            <div id='Username'></div>
          </div>
          <div className='ShoppingPage_joinDetail'>
            Join ID: <div id='tripID'></div>
          </div>

          <div className='ShoppingPage_inputDetail'>
            <Input name="itemNameInput" id="itemNameInput" placeholder="Input item name" />
            <Input name="itemQuantityInput" id="itemQuantityInput" placeholder="Input item quantity" />
          </div>
         
         <div className='ShoppingPage_buttonDetail'>
            <Button id="addItemButton" onClick={addItem}>add item</Button>
            <Button id="refreshListButton" onClick={showList}>Refresh List</Button>
            {/* <Table hover>
              <thead>
                <tr>
                  <th> Item </th>
                  <th> Total Quantity </th>
                  <th> Your Quantity </th>
                  <th> Who is buying </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> Mark </td>
                  <td> Otto </td>
                  <td> @mdo </td>
                  <td></td>
                </tr>
                <tr>
                  <td> Jacob </td>
                  <td> Thornton </td>
                  <td> @fat </td>
                  <td></td>
                </tr>
                <tr>
                  <td> Larry </td>
                  <td> the Bird </td>
                  <td> @twitter </td>
                  <td></td>
                </tr>
              </tbody> */}
            {/* </Table> */}
            <div className="ShoppingPage_listDetail">
              <List type="inline" id="shoppingList"></List>
            </div>


         </div>


          <Button color="success"onClick={showSubtotal}>Checkout</Button>
          <div id="subtotals"></div>
          <Button id="quitGroup" color="danger" onClick={deleteUser}>Quit</Button>
      </div>
    </div>
  )

async function addItem() {
  let item = document.getElementById("itemNameInput").value;
  let quantity = document.getElementById("itemQuantityInput").value;
  console.log(tripID)
  try {
       const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        await fetch(`api/${apiVersion}/items/add?item=${item}&quantity=${quantity}&tripID=${tripID}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
        showList();
  } catch(error) {
      throw(error)
  }
}

async function showList(){
  try {
    const deleteHandler = async (id) => {
      // currently, endpoint only prints out selected item
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      await fetch(`api/${apiVersion}/items/delete?itemID=${id}`, requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
      showList();
    }
    const uploadPriceHandler = async (id, price) => {
      // currently, endpoint only prints out selected item
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      };
      await fetch(`api/${apiVersion}/items/addPrice?itemID=${id}&tripID=${tripID}&price=${price}`, requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
    }
    console.log(tripID)
    await fetch(`api/${apiVersion}/items/receipt?tripID=${tripID}`)
    .then(response => response.json())
    .then(receipt => {

      var shoppingList = document.getElementById("shoppingList")
      shoppingList.innerHTML = ''

      for (let i = 0; i < receipt.length; i++) {
        var listItem = document.createElement("div")
        listItem.className = 'items'

        var itemName = document.createElement("div")
        itemName.className = "itemName"

        var item = document.createElement("p")
        item.textContent = `Item: ${receipt[i].NameOfItem}`
        itemName.appendChild(item)

        var itemQ = document.createElement("p")
        itemQ.textContent = `Quantity:${receipt[i].Quantity}`
        itemName.appendChild(itemQ)

        var container = document.createElement("div")
        container.className = "inputItems"

        var deleteButtonItem = document.createElement("Button")
        deleteButtonItem.innerHTML = "delete"
        deleteButtonItem.className = "btn btn-secondary"
        deleteButtonItem.id = receipt[i]._id;
        deleteButtonItem.addEventListener("click", function(){
          deleteHandler(receipt[i]._id)
        });

        var priceItem = document.createElement("Input")
        priceItem.setAttribute("type", "text")
        priceItem.id = "Input" + receipt[i]._id;
        priceItem.className = "form-control priceInput"
        priceItem.placeholder = "Enter Item Subtotal"

        var uploadPriceButton = document.createElement("Button")
        uploadPriceButton.innerHTML = "Upload"
        uploadPriceButton.id = "Button" + receipt[i]._id;
        uploadPriceButton.className = "btn btn-secondary"
        uploadPriceButton.addEventListener("click", function(){
            var priceInput = document.getElementById(`Input${receipt[i]._id}`).value
            console.log(document.getElementById(`Input${receipt[i]._id}`))
            uploadPriceHandler(receipt[i]._id, priceInput)
        })

        
        // shoppingList.appendChild(deleteButtonItem);
        // shoppingList.appendChild(priceItem);
        // shoppingList.appendChild(uploadPriceButton);
        // itemList.appendChild(listItem);
        // itemList.appendChild(deleteButtonItem);
        // itemList.appendChild(priceItem);
        // itemList.appendChild(uploadPriceButton);

        container.appendChild(deleteButtonItem);
        container.appendChild(priceItem);
        container.appendChild(uploadPriceButton);
        listItem.appendChild(itemName)
        listItem.appendChild(container)

        shoppingList.appendChild(listItem);
        // itemList.appendChild(shoppingList);
      } 
    })   
  }catch(error) {
    throw(error)
  }
}

async function getTripID(callback){
  try{
    await fetch(`api/${apiVersion}/trips/tripID`)
    .then(response => response.json())
    .then(data => {
      tripID = data.tripID
      document.getElementById("tripID").innerText = ` ${data.tripID}`;
    })
    callback();
  }catch(error){
    throw(error)
  }
}

async function getUsername(){
  try{
    await fetch(`/users`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("Username").innerText = ` ${data.name}'s Shopping Cart`;
    })

  }catch(error){
    throw(error)
  }
}

async function showSubtotal() {
  try {
    document.getElementById("subtotals").innerText = ""
    await fetch(`api/${apiVersion}/trips/subtotal?tripID=${tripID}`)
    .then(response => response.json()) 
    .then(datas => {
      datas.forEach(data => {
        document.getElementById("subtotals").innerText += `${data.username}, ${data.subtotal}\n`
      })
    })
  }catch(error){
    throw(error)
  }
}


async function deleteUser(){
  try{
    const deleteHandler = async (tripID) => {
      // currently, endpoint only prints out selected item
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      await fetch(`api/${apiVersion}/trips/delete?tripID=${tripID}`, requestOptions)
    }
    deleteHandler(tripID)
    navigate("/mainpage")
  }catch(error){
    throw(error)
  }
}

}
export default ShoppingPage;