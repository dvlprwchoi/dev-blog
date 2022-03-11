import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function Edit({ isAuth }) {
  const [form, setForm] = useState({
    title: '',
    postText: '',
  });

  let navigate = useNavigate();
  const params = useParams();
  const id = params.id.toString();
  // console.log(id);
  const editPostRef = doc(db, 'posts', id);

  useEffect(() => {
    const _fetchData = async () => {
      const editPostSnap = await getDoc(editPostRef);
      const editPostData = editPostSnap.data();
      // if (editPostSnap.exists()) {
      //   console.log('Item data:', editPostData);
      // } else {
      //   console.log('No such item!');
      // }
      setForm(editPostData);
    };
    _fetchData();

    return;
    // if (!isAuth) {
    //   navigate('/login');
    // } else if (isAuth) {
    //   // console.log(editPostId);
    // }
  }, [params.id, navigate]);

  const _updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const _edit = async (e) => {
    e.preventDefault();
    const editedPost = {
      title: form.title,
      postText: form.postText,
    };

    await updateDoc(editPostRef, editedPost);
    navigate('/');
  };

  return (
    <div className="edit main">
      <div className="edit-title">
        <h2>Edit a post</h2>
      </div>
      <div className="edit-post-inputs">
        <form onSubmit={_edit}>
          <div className="input-title-div">
            <label htmlFor="title">Title: </label>
            <input
              className="post-title-input-box"
              type="text"
              name="title"
              // placeholder="Add"
              value={form.title}
              required
              onChange={(e) => _updateForm({ title: e.target.value })}
            />
          </div>
          <div className="input-text-div">
            <label htmlFor="post">Post: </label>
            <textarea
              className="post-text-input-area"
              name="post"
              // placeholder="Add post..."
              value={form.postText}
              required
              onChange={(e) => _updateForm({ postText: e.target.value })}
            ></textarea>
          </div>
          <div className="update-button-div">
            {isAuth && <button className="update-button button">Update</button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
