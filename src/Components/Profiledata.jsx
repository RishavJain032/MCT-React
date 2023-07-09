
import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios'
import { MdFavorite, MdEdit, MdDelete } from 'react-icons/md';
import Modal from 'react-modal';
const API_ROOT_URL = 'https://avatars.dicebear.com/v2';


const Profiledata = ({ user }) => {

const { users, setUsers } = useContext(UserContext);


  const [liked, setLiked] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleLikeClick = () => {
    setLiked(!liked);
  };
  const openEditModal = () => {
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  const handleSave= async (e) => {

    e.preventDefault(); 

    const { name, value } = e.target;

    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    try {
        
        await axios.put(`https://jsonplaceholder.typicode.com/users/${editedUser.id}`, editedUser);
        
              const updatedUsers = users.map(u => (u.id === editedUser.id ? editedUser : u));
              setUsers(updatedUsers);
    
              closeEditModal();

            } catch (error) {
              console.error('Error updating user:', error);
            }
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this profile?');
    if (confirmDelete) {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${editedUser.id}`);
      

            const updatedUsers = users.filter(u => u.id !== editedUser.id);
            setUsers(updatedUsers);
      

          } catch (error) {
            console.error('Error deleting user:', error);
          }
    }
  };

  return (
    <div className="profile-card">
      <img src={`${API_ROOT_URL}/avataaars/${user.name}.svg?options[mood][]=happy`} alt="Avatar" className="avatar" />
      <h2>Name: {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {`${user.address.street}, ${user.address.city}`}</p>
      <p>Website: {user.website}</p>
      <p>Company: {user.company.name}</p>
      <div className="actions">
        <button className={`action-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
          <MdFavorite />
        </button>
        <button className="action-button" onClick={openEditModal}>
          <MdEdit />
        </button>
        <button className="action-button" onClick={handleDeleteClick}>
          <MdDelete />
        </button>
      </div>
      <Modal
        isOpen={editModalOpen}
        onRequestClose={closeEditModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Edit Profile</h2>
        <form onSubmit={handleSave}>
          <label>
            Name:
            <input type="text" name="name" value={editedUser.name} onChange={handleEditChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={editedUser.email} onChange={handleEditChange} />
          </label>
          <label>
            Phone:
            <input type="tel" name="phone" value={editedUser.phone} onChange={handleEditChange} />
          </label>
          <label>
            Website:
            <input type="text" name="website" value={editedUser.website} onChange={handleEditChange} />
          </label>
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
};

export default Profiledata;