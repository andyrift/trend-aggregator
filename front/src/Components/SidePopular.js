import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import PostCardMicromalistic from './PostCardMicromalistic';

const SidePopular = ({ authenticated, userData, isPendingUser, errorUser }) => {

  const [pop, setPop] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [popular, setPopular] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/popular/?quantity=6', { credentials: 'include', })
      .then(res => {
          if (!res.ok) {
              throw Error('Could not fetch data');
          }
          return res.json();
      })
      .then(dat => {
          setPop(dat); 
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
    if(pop && pop.result && pop.result.length) {
      const newPosts = popular.slice();
      pop.result.forEach(p => {
        newPosts.push(p)
      });

      setPopular(newPosts);
    }
  }, [pop])
  
  return (  
    <Container>
      <h3>Popular</h3>
      
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {popular.map((p) =>
        <PostCardMicromalistic key={p._id} post={p}/>
      )}
    </Container>
  );
}
 
export default SidePopular;