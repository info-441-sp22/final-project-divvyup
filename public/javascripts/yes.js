
function test() {
    fetch(`http://localhost:3000/api/${apiVersion}/trips/add`,{
        method: "POST"
    })
    .then(response => response.json())
    .then(data => console.log(data))
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