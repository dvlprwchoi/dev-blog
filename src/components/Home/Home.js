import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

function Home() {
  const [postList, setPostList] = useState([]);
  const postsCollectionServer = collection(db, 'posts');

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
          </div>
        );
      })}
    </div>
  );
}

export default Home;
