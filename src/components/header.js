import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';

export default function Header() {
  const { user: loggedInUser } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postContent, setPostContent] = useState({
    text: '',
    image: null,
  });

  const handlePostClick = () => {
    setIsCreatingPost(true);
  };

  const handleTextChange = (e) => {
    setPostContent({ ...postContent, text: e.target.value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setPostContent({ ...postContent, image: imageFile });
  };

  const handleSubmitPost = async () => {
    // Implement logic to upload the post with text and image to your backend
    // Example using Firebase Storage:
    // 1. Upload the image to storage
    // 2. Get the URL of the uploaded image
    // 3. Save the post with text and image URL to your database
    // 4. Close the post creation modal
    setIsCreatingPost(false);
    setPostContent({ text: '', image: null });
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push(ROUTES.LOGIN);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" />
              </Link>
            </h1>
            <div className="relative inline-block text-gray-500 mr-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Implement search functionality if needed
                }}
              >
                <input
                  type="text"
                  className="bg-gray-background text-sm text-gray-base w-56 px-4 py-1 h-8 rounded-sm focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Search"
                />
                <button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
                  <svg
                    className="w-4 h-4 text-gray-base"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 21l4.35-4.35M12 6a6 6 0 1000 12 6 6 0 000-12z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className="text-gray-700 text-center flex items-center align-items">
            {loggedInUser ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>

                {/* Add the + button */}
                <button
                  type="button"
                  title="Create Post"
                  onClick={handlePostClick}
                  className="w-8 h-8 mr-6 text-black-light cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-full h-full text-black-light"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>

                {/* Logout button */}
                <button
                  type="button"
                  title="Sign Out"
                  onClick={handleLogout}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleLogout();
                    }
                  }}
                >
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013-3v1"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {isCreatingPost && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl mb-4">Create a New Post</h2>
            <textarea
              className="w-full p-2 border border-gray-400 rounded mb-2"
              placeholder="Write your post..."
              value={postContent.text}
              onChange={handleTextChange}
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            <button
              className="bg-blue-medium text-white font-semibold px-4 py-2 rounded hover:bg-blue-dark"
              onClick={handleSubmitPost}
            >
              Post
            </button>
            <button
              className="ml-2 text-gray-base hover:text-gray-600"
              onClick={() => setIsCreatingPost(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
