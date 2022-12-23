import { Button, Card, Container, Nav, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import useFetch from "../useFetch";

const Home = ({ authenticated, userData, isPendingUser, errorUser }) => {

  const { data: post, isPending: isPostPending, error: postError, setUrl } = useFetch('http://localhost:8000/api/v1/post');

  const [posts, setPosts] = useState([]);

  window.onscroll = () => {
    if(window.scrollY + window.innerHeight > document.body.scrollHeight - 200) {
      setUrl(`http://localhost:8000/api/v1/post/?skip=${posts.length}`);
    }
  };

  useEffect(() => {
    if(post && post.result && post.result.length) {
      const newPosts = posts.slice();
      post.result.forEach(p => {
        if(!newPosts.includes(p)){
          newPosts.push(p)
        }
      });

      setPosts(newPosts);
    }
  }, [post])

  return (
    <Container>
      {postError && <div>{postError}</div>}
      {isPostPending && <div>Loading...</div>}
      {posts.map((p) =>
        <PostCard key={p._id} post={p} authenticated={authenticated}/>
      )}
    </Container>
  );
}
   
export default Home;