import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PostCard from '../Components/PostCard';
import useFetch from '../useFetch';

const Profile = ({ authenticated, userData, isPendingUser, errorUser }) => {

  const { data: post, isPending: isPostPending, error: postError, setUrl } = useFetch('http://localhost:8000/api/v1/favorites');

  const [posts, setPosts] = useState([]);

  window.onscroll = () => {
    if(window.scrollY + window.innerHeight > document.body.scrollHeight - 200) {
      setUrl(`http://localhost:8000/api/v1/favorites/?skip=${posts.length}`);
    }
  };

  const onUnFavorite = (post) => {
    setPosts(posts.filter(p => { return p._id !== post._id}))
  }

  useEffect(() => {
    if(post && post.result && post.result.length) {
      const newPosts = posts.slice();
      post.result.forEach(p => {
        newPosts.push(p)
      });

      setPosts(newPosts);
    }
  }, [post])
  
  return (  
    <Container>
      <h2>Favorites</h2>
      {postError && <div>{postError}</div>}
      {isPostPending && <div>Loading...</div>}
      {posts.map((p) =>
        <PostCard key={p._id} post={p} onUnFavorite={onUnFavorite}  authenticated={authenticated}/>
      )}
    </Container>
  );
}
 
export default Profile;