import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Heart from "react-heart"

const PostCard = ({ authenticated, post, onUnFavorite }) => {

  let parser = new DOMParser();
  const [favorite, setFavorite] = useState(!!post.favorite);

  useEffect(() => {
    
  }, [favorite])

  const handleSubmit = (e) => {
    if(favorite && onUnFavorite) {
      onUnFavorite(post);
    }
    fetch('http://localhost:8000/api/v1/favorite/',
    { 
      credentials: 'include', 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favorite: !favorite,
        id: post._id
      })
    })
      .then(res => {
          if (!res.ok) {
              throw Error('Could not fetch data');
          }
          return res.json();
      })
      .then(data => {
          
      })
      .catch(err => {
          if(err.name === 'AbortError') {
              console.log('fetch aborted');
          } else {
              
          }                
      });
      setFavorite(!favorite)
  }

  return (
    <div className="mt-4 border-bottom">
      <Row>
        <Col>
          <Link className="text-decoration-none link-dark" to={"/post/" +  post._id}>
            <h1>{post.query}</h1>
          </Link>
        </Col>
        {authenticated &&
        <Col xs={1}>
          <div className='mt-2'>
          <Heart isActive={favorite} onClick={handleSubmit} />
          </div>
        </Col>}
      </Row>
      
      <Row className="mt-2">
        <Col>
          <img src={post.image} alt="Image" />
        </Col>
        <Col md="auto" className='d-flex align-items-end'>
          
          <p className='mb-0'>
            <span>Source: </span>
            <span>
              <a className="link-secondary" target="_blank" href={post.articleUrl}>
                {post.articleSource}
              </a>
            </span>
          </p>
        </Col>
      </Row>

      <Link className="text-decoration-none link-dark" to={"/post/" +  post._id}>
      <h4 className="mt-3">{parser.parseFromString(`<!doctype html><body>${post.articleTitle}`, 'text/html').body.textContent}</h4>
      </Link>

      <p>{parser.parseFromString(`<!doctype html><body>${post.articleSnippet}`, 'text/html').body.textContent}</p>

      <Row className="mt-4">
      <Col><p className='text-secondary'>Traffic: {post.traffic}</p></Col>
      <Col md="auto"><p className='text-secondary'>{post.date}</p></Col>
      </Row>
      
    </div>
  );
}
   
export default PostCard;