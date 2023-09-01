// UserProfile.js
import React from 'react';

export default function UserProfile({ user, isEditMode, editedUser, handleInputChange }) {
  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

      {isEditMode ? (
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={editedUser.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
        </div>
      ) : null}
    </div>
  );
}
