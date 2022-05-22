
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
    try {
        await fetchJSON(`api/${apiVersion}/items/add?item=${item}&quantity=${quantity}&tripID=${tripID}`, {
            method: "POST"
        })
    } catch(error) {
        throw(error)
    }
}