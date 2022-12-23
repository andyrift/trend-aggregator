import { useEffect, useState } from 'react';
import {Container, Nav, Col, Row, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';

const PostCardMicromalistic = ({ post, onUnFavorite }) => {

  let parser = new DOMParser();

  return (
    <div className="mt-3 border-bottom">
      <Row>
        <Col>
          <Link className="text-decoration-none link-dark" to={"/post/" +  post._id}>
            <h5>{post.query}</h5>
          </Link>
        </Col>
      </Row>

      <Row className="mt-0">
      <Col><p className='text-secondary'>Traffic: {post.traffic}</p></Col>
      </Row>
      
    </div>
  );
}
   
export default PostCardMicromalistic;