import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import './Home.css';

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const postsCollectionServer = collection(db, 'posts');

  const _delete = async (id) => {
    const findPostById = doc(db, 'posts', id);
    await deleteDoc(findPostById);
    window.location.pathname = '/';
  };

  const _editPage = async (id) => {
    console.log('Move to edit page');
    window.location.pathname = '/edit';
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionServer);
      setPostList(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      // console.log(postList);
    };
    getPosts();
  }, []);
  return (
    <div className="home main">
      {postList.map((post) => {
        return (
          <div className="single-post-container">
            <div className="single-post-title">
              <h2>{post.title}</h2>
            </div>
            <div className="single-post-text">{post.postText}</div>
            <div className="single-post-author-name">
              <h3>{post.authorName}</h3>
            </div>
            <div className="icon-div">
              <div className="delete-button-div">
                {isAuth && post.authorId === auth.currentUser.uid && (
                  <button
                    className="delete-button icon"
                    onClick={() => {
                      _delete(post.id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
              <div className="edit-button-div">
                {isAuth && post.authorId === auth.currentUser.uid && (
                  <button
                    className="edit-button icon"
                    onClick={() => {
                      _editPage(post.id);
                    }}
                  >
                    &#9998;
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
