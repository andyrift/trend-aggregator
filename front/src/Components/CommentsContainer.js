import { useEffect, useState } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import useFetch from '../useFetch';
import Comment from './Comment';

const CommentsContainer = ({ authenticated, userData, isPendingUser, errorUser, socket }) => {

  const { id } = useParams();

  const [comments, setComments] = useState([])

  const [comment, setComment] = useState('');
  const [pendingComment, setPendingComment] = useState(null);

  const { data: oldComments, isPending: isOldPending, error: oldError, setUrl } = useFetch('http://localhost:8000/api/v1/comments/'+id);

  window.onscroll = () => {
    if(window.scrollY + window.innerHeight > document.body.scrollHeight - 200) {
      setUrl('http://localhost:8000/api/v1/comments/'+id+'/?skip='+comments.length);
    }
  };

  const appendComments = (comm) => {
    comm.id = comments.length + 1;
    let c = comments.slice();
    c.unshift(comm)
    setComments(c);
  }

  useEffect(() => {
    if(pendingComment) {
      appendComments(pendingComment);
    }
  }, [pendingComment])

  useEffect(() => {
    if(oldComments && oldComments.result) {
      let curr = comments.slice();
      oldComments.result.forEach(c => {
        if(!curr.includes(c)) {
          curr.push(c);
        }
      })
      setComments(curr);
    }
  }, [oldComments])


  useEffect(() => {
    socket.emit('joinComments', { id });
    socket.on('message', msg => {
      setPendingComment(msg);
    });
    
    return () => {
      socket.off('message');
    };
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(comment.length) {
      if(userData && userData.user) {
        socket.emit('chatMessage', { message: comment, post_id: id });
      }
      setComment('');
    }
  }

  return (
    <div className='mt-5'>
      <h4 className='mb-4'>Comments</h4>
      {authenticated &&
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control 
              value={comment}
              type="text"
              autoComplete="off" 
              onChange={e=>{
                setComment(e.target.value);
              }}
            />
          </Col>
          <Col md="auto">
            <Button onClick={handleSubmit}>Send</Button>
          </Col>
        </Row>
      </Form>}
      <Row className='mt-2'>
        <Col>
        {comments.map((comment) =>
        <Comment key={comment._id} comment={comment} />
        )}
        </Col>
      </Row>
      {isOldPending && <div>Loading...</div>}
      {oldError && <div>{oldError}</div>}
    </div>
  );
}
   
export default CommentsContainer;