import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

const emojiOptions = ['😀', '❤️', '👍', '😊', '🎉', '🤔']; // Add more emojis if needed

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName }
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([...comments, { displayName, comment }]);
    setComment('');

    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment })
      });
  };

  const handleAddEmoji = (emoji) => {
    setComment(comment + emoji);
    setShowEmojiPicker(false); // Close the emoji picker
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <div className="flex items-center">
          <input
            aria-label="Add a comment"
            autoComplete="off"
            className="text-sm text-gray-base w-full py-5 px-4 mr-3"
            type="text"
            name="add-comment"
            placeholder="Add a comment..."
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            ref={commentInput}
          />
          {showEmojiPicker && (
            <div className="flex">
              {emojiOptions.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleAddEmoji(emoji)}
                  type="button"
                  aria-label={`Add ${emoji} emoji`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
          <button
            className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
            type="button"
            disabled={comment.length < 1}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😀
          </button>
        </div>
        <button
          className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object
};
