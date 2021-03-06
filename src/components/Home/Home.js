import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import './Home.css';
import { Link } from 'react-router-dom';

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const postsCollectionServer = collection(db, 'posts');

  const _delete = async (id) => {
    const findPostById = doc(db, 'posts', id);
    await deleteDoc(findPostById);
    window.location.pathname = '/';
  };

  // const _editPage = (id) => {
  //   // console.log(`Move to ${id} edit page`);
  //   window.location.pathname = `/edit/${id}`;
  // };

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
      {postList.map((post, index) => {
        return (
          <div key={index} className="single-post-container">
            <div className="single-post-img-div">
              <img className="single-post-img" src={post.img} />
            </div>
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
                  <Link to={`/edit/${post.id}`}>
                    <button className="edit-button icon">&#9998;</button>
                  </Link>
                  // <button
                  //   className="edit-button icon"
                  //   onClick={() => {
                  //     _editPage(post.id);
                  //     // console.log(post.id);
                  //   }}
                  // >
                  //   &#9998;
                  // </button>
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
