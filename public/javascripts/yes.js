
async function test() {
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

async function deleteTrip(tripID) {
    try {
        fetch(`api/${apiVersion}/trips/delete?tripID=${tripID}`, {
            method: "DELETE"
        })
        .then(response => {
            response.json().then((response) => {
                console.log(response)
            })
        }).catch(err => {
            console.log(err)
        })
    } catch(error) {
        throw(error)
    }
}

async function joinTrip() {
    let tripID = document.getElementById("idInput").value;
    console.log(tripID)
    try {
        await fetchJSON(`api/${apiVersion}/trips/addUser`, {
            method: "POST",
            body:{tripID: tripID}
        })
    } catch(error) {
        throw(error)
    }
}

async function addItem(tripID) {
    let item = document.getElementById("itemName").value;
    let quantity = document.getElementById("itemQuantity").value;
    console.log(tripID)
    try {
        await fetchJSON(`api/${apiVersion}/items/add?item=${item}&quantity=${quantity}&tripID=${tripID}`, {
            method: "POST"
        })
    } catch(error) {
        throw(error)
    }
}

async function showReceipt(tripID){
    try {
        let receipt = await fetchJSON(`api/${apiVersion}/items/receipt?tripID=${tripID}`)
        document.getElementById("receipt").innerText = ''
        let receiptDiv = document.getElementById("receipt")
        var button
        var uploadPriceButton 
        for (let i = 0; i < receipt.length; i++) {
            document.getElementById("receipt").innerHTML += `${receipt[i].NameOfItem}:${receipt[i].Quantity}
            <br />`
            button = document.createElement('button');
            button.className = "btn"
            button.id = receipt[i]._id;
            button.innerText = "Buy"
            receiptDiv.appendChild(button);

            // uploadPriceButton = document.createElement('button');
            // uploadPriceButton.id = "upload" + receipt[i]._id;
            // uploadPriceButton.innerText = "Upload Price"
            // uploadPriceButton.addEventListener("click", async function(){
            //     console.log("button clicked")
            //     await fetchJSON(`api/${apiVersion}/items/addPrice?itemID=${receipt[i]._id}`, {
            //         method: "POST"
            //     })
            // })
            // receiptDiv.appendChild(uploadPriceButton);
        }
        const buttons = document.querySelectorAll('.btn') 
        buttons.forEach(function(currentBtn) {
            let i = 0
            currentBtn.addEventListener('click', async function() {
                console.log(receipt[i].NameOfItem + " clicked")
                await fetchJSON(`api/${apiVersion}/items/bought?itemID=${receipt[i]._id}`, {
                    method: "POST"
                })
            })
            i++
        })
    }catch(error) {
        throw(error)
    }
}