import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PostCardMinimalistic from './PostCardMinimalistic';

const SideFavorites = ({ authenticated, userData, isPendingUser, errorUser }) => {

  const [fav, setDat] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/favorites/?quantity=6', { credentials: 'include', })
      .then(res => {
          if (!res.ok) {
              throw Error('Could not fetch data');
          }
          return res.json();
      })
      .then(dat => {
          setDat(dat); 
          setIsPending(false);
          setError(null);
      })
      .catch(err => {
          if(err.name === 'AbortError') {
              console.log('fetch aborted');
          } else {
              setIsPending(false);
              setError(err.message);
          }                
      });
  }, [])

  useEffect(() => {
    if(fav && fav.result && fav.result.length) {
      const newPosts = favorites.slice();
      fav.result.forEach(p => {
        newPosts.push(p)
      });

      setFavorites(newPosts);
    }
  }, [fav])
  
  return (  
    <Container>
      {authenticated && !!favorites.length && 
      <Link className="text-decoration-none link-dark" to='/favorites'>
      <h3>Favorites</h3>
      </Link>}
      
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {favorites.map((p) =>
        <PostCardMinimalistic key={p._id} post={p}/>
      )}
    </Container>
  );
}
 
export default SideFavorites;