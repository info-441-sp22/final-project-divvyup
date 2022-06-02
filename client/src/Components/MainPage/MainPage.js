import React, {useState} from 'react'
import './MainPage.css'
import {Button, Input, Modal, ModalBody, ModalFooter} from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
// import {displayError} from '../Utils/utils.js'

const apiVersion = "v1"


function MainPage() {
    let navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    return (
        <div className='MainPage_container'>
            <div className='MainPage'>
                {/* server blows up if the same person makes more than 1 trip */} 
                <div className="TitlePage">DivvyUp</div>
                <Link to='shoppingpage'><Button id='MainPage_CreateTrip' onClick={createNewTrip}>Host New Group</Button></Link>
                <div>
                    <Button id='MainPage_JoinTrip' onClick={toggleModal}>
                        Join Group
                    </Button>
                    <div id="errorInfo" className="alert alert-danger fade show" role="alert" style={{opacity:0}}></div>
                    <Modal isOpen={modal}>
                        {/* <ModalHeader> Modal title </ModalHeader> */}
                        <ModalBody>  
                            <Input name="tripIDInput" id="tripIDInput" placeholder="Input TripID" />
                        </ModalBody>
                        <ModalFooter>
                            <Link to='shoppingpage'>
                                <Button color="primary" onClick={joinTrip}>
                                    Join Group
                                </Button>
                            </Link>
                            {' '}
                            <Button onClick={toggleModal}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
                
            {/* server blows up if the same person makes more than 1 trip */}
            
        </div>
  )

    async function createNewTrip(){
        await fetch(`api/${apiVersion}/trips/add`,{
            method: "POST"
        })
        .then(response => {
            response.json().then((data) => {
                let tripID = JSON.stringify(data.ID)
                if (tripID) {
                    console.log(tripID)
                    navigate("/shoppingpage");
                } else {
                    navigate("/mainpage")  
                    alert("Please log in to create a group.")
                }

            }).catch((err) => {
                alert("Something broke")
                console.log(err)
            })
        })
        
    }

    async function joinTrip(){
        let tripID = document.getElementById("tripIDInput").value;
        console.log(tripID)
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tripID: tripID })
            };
            await fetch(`api/${apiVersion}/trips/addUser`, requestOptions)
                .then(response => response.json())
                .then(data  => {
                    if (data.status === "error") {
                        navigate("/mainpage")
                        alert(data.error)
                    } else {
                        navigate("/shoppingpage")
                    }
                    
                });
            
        } catch(error) {
            throw(error)
        }
    }
}



export default MainPage