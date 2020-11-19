import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Modal from "react-modal";

Modal.setAppElement("#root");

const UserLogout = () => {
  
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
    Swal.fire({
      icon: 'success',
      text: 'You have successfully logged out!',
      confirmButtonColor: '#1DA590',
      iconColor: '#1DA590'
    })
  }
  const toggleModal = () => {setIsOpen(!isOpen)}

  return (
    <>
      <div onClick={toggleModal}>LOGOUT</div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="user-modal"
        overlayClassName="user-modal-overlay"
        closeTimeoutMS={0}
      >
        <div className="modal-container">
          <button className="close-button-user" onClick={toggleModal}>x</button><br/>
          <div className="logout-confirmation">Are you sure you want to logout?</div>
          <div className="submit-container">
            <Link to="/"><button className="user-submit" onClick={handleLogout}>Yes, log me out</button></Link>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UserLogout;