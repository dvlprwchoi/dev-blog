import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase-config';

function Create({ isAuth }) {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');

  const postsCollectionServer = collection(db, 'posts');

  let navigate = useNavigate();

  const _create = async () => {
    await addDoc(postsCollectionServer, {
      title,
      postText,
      authorName: auth.currentUser.displayName,
      authorId: auth.currentUser.uid,
    });
    navigate('/');
  };

  console.log(title, postText);
  return (
    <div className="create main">
      <div className="create-title">
        <h2>Create a post</h2>
      </div>
      <div className="create-post-inputs">
        {/* <form> */}
        <div className="input-title-div">
          <label htmlFor="title">Title: </label>
          <input
            className="post-title-input-box"
            type="text"
            name="title"
            placeholder="Add title..."
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-text-div">
          <label htmlFor="post">Post: </label>
          <textarea
            className="post-text-input-area"
            name="post"
            placeholder="Add post..."
            required
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
        </div>
        <div className="submit-button-div">
          {isAuth && (
            <button className="submit-button button" onClick={_create}>
              Submit
            </button>
          )}
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default Create;
