import { useEffect, useState } from 'react';
import {Container, Col, Row, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CommentsContainer from '../Components/CommentsContainer';
import PostCard from '../Components/PostCard';
import useFetch from '../useFetch';

const Post = ({ authenticated, userData, isPendingUser, errorUser, socket }) => {
  const { id } = useParams();

  const { data, isPending: isPostPending, error: postError } = useFetch('http://localhost:8000/api/v1/post/'+id);

  const [post, setPost] = useState(null);
  
  useEffect(() => {
    if(data) {
      setPost(data.result);
    }
  }, [data])

  let parser = new DOMParser();

  return (
    <Container>
      {postError && <div>{postError}</div>}
      {isPostPending && <div>Loading...</div>}
      {post && <PostCard post={post} authenticated={authenticated}/>}
      {post && 
        <CommentsContainer 
          authenticated={authenticated}
          userData={userData} 
          isPendingUser={isPendingUser} 
          errorUser={errorUser} 
          socket={socket}
        />
      }
    </Container>
  );
}
   
export default Post;