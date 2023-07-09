import React, { useContext } from 'react';
import { UserContext } from './Components/UserContext';
import UserProfile from './Components/Profiledata';

const App = () => {
  
  const { users, loading } = useContext(UserContext);

  if (loading) {
    return <div className="spinner"></div>
  }

  return (
    <div className="profiles-container">
      {users.map(user => (
        <UserProfile key={user.id} user={user} />
      ))}
    </div> 
  );
  };

export default App;