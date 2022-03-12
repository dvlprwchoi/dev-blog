import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase-config';
import FileBase64 from 'react-file-base64';

function Create({ isAuth }) {
  const [form, setForm] = useState({
    title: '',
    img: '',
    postText: '',
  });
  // const [title, setTitle] = useState('');
  // const [img, setImg] = useState('');
  // const [postText, setPostText] = useState('');

  const postsCollectionServer = collection(db, 'posts');
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, []);

  const _updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const _create = async (e) => {
    e.preventDefault();
    await addDoc(postsCollectionServer, {
      title: form.title,
      img: form.img,
      postText: form.postText,
      authorName: auth.currentUser.displayName,
      authorId: auth.currentUser.uid,
    });
    navigate('/');
  };

  // console.log(title, postText);
  return (
    <div className="create main">
      <div className="create-title">
        <h2>Create a post</h2>
      </div>
      <div className="create-post-inputs">
        <form onSubmit={_create}>
          <div className="input-title-div">
            <label htmlFor="title">Title: </label>
            <input
              className="post-title-input-box"
              type="text"
              name="title"
              placeholder="Add title..."
              value={form.title}
              required
              onChange={(e) => _updateForm({ title: e.target.value })}
            />
          </div>
          <div className="input-img-div">
            <p className="label-for-post-img">Image:</p>
            <img
              src={form.img}
              alt={`Image of ${form.title}`}
              style={{ width: '50%' }}
            />
            <FileBase64
              className="post-img-input-box"
              multiple={false}
              onDone={({ base64 }) => _updateForm({ img: base64 })}
            />
          </div>
          <div className="input-text-div">
            <label htmlFor="post">Post: </label>
            <textarea
              className="post-text-input-area"
              name="post"
              placeholder="Add post..."
              value={form.postText}
              required
              onChange={(e) => _updateForm({ postText: e.target.value })}
            ></textarea>
          </div>
          <div className="submit-button-div">
            {isAuth && <button className="submit-button button">Submit</button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
