
function test() {
    fetch(`http://localhost:3000/api/${apiVersion}/trips/add`,{
        method: "POST"
    })
    .then(response => response.json())
    .then(data => console.log(data))
}