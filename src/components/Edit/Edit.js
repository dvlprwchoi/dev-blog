import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

function Edit({ isAuth, editPostId }) {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  // console.asdflog(editPostId);
  let navigate = useNavigate();

  const _update = async () => {
    const editPostRef = doc(db, 'posts', editPostId);
    await updateDoc(editPostRef, { title, postText });
    // navigate('/');
    // console.log(editPostId);
    // console.log(e);
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    } else if (isAuth) {
      console.log(editPostId);
    }
  }, []);

  // console.log(title, postText);
  return (
    <div className="edit main">
      <div className="edit-title">
        <h2>Edit a post</h2>
      </div>
      <div className="edit-post-inputs">
        {/* <form> */}
        <div className="input-title-div">
          <label htmlFor="title">Title: </label>
          <input
            className="post-title-input-box"
            type="text"
            name="title"
            placeholder="Add"
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
        <div className="update-button-div">
          {isAuth && (
            <button className="update-button button" onClick={_update}>
              Update
            </button>
          )}
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default Edit;
