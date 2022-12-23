import { useEffect, useState } from 'react';
import {Container, Nav, Col, Row, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';

const PostCardMinimalistic = ({ post, onUnFavorite }) => {

  let parser = new DOMParser();

  return (
    <div className="mt-4 border-bottom">
      <Row>
        <Col>
          <Link className="text-decoration-none link-dark" to={"/post/" +  post._id}>
            <h4>{post.query}</h4>
          </Link>
        </Col>
      </Row>

      <Link className="text-decoration-none link-dark" to={"/post/" +  post._id}>
      <h6 className="mt-1">{parser.parseFromString(`<!doctype html><body>${post.articleTitle}`, 'text/html').body.textContent}</h6>
      </Link>

      <Row className="mt-2">
      <Col md={12}><p className='mb-0 text-secondary'>Traffic: {post.traffic}</p></Col>
      <Col md={12}><p className='text-secondary'>{post.date}</p></Col>
      </Row>
      
    </div>
  );
}
   
export default PostCardMinimalistic;