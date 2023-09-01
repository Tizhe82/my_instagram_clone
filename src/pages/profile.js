import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const history = useHistory();
  const [editedUser, setEditedUser] = useState({}); // State to hold edited user data

  useEffect(() => {
    async function checkUserExists() {
      const [fetchedUser] = await getUserByUsername(username);
      if (fetchedUser?.userId) {
        setUser(fetchedUser);
        setEditedUser(fetchedUser); // Initialize editedUser with fetched data
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const saveProfile = () => {
    // You should implement the logic to save the edited profile data here
    console.log("Saving profile data:", editedUser);
    // You can send a request to your backend API to save the data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile
          user={user}
          isEditMode={isEditMode}
          editedUser={editedUser}
          handleInputChange={handleInputChange}
        />
        {isEditMode ? (
          <div>
            <button
              onClick={saveProfile}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Save Profile
            </button>
            <button
              onClick={toggleEditMode}
              className="bg-red-500 hover:bg-red-600 text-blue font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 ml-2"
            >
              Cancel Edit
            </button>
          </div>
        ) : (
          <button
            onClick={toggleEditMode}
            className="bg-blue-500 hover:bg-blue-600 text-blue font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  ) : null;
}
