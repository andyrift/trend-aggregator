import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PostCard from '../Components/PostCard';
import UserProfile from '../Components/UserProfile';

const Profile = ({ authenticated, userData, isPendingUser, errorUser }) => {


  const [rec, setRec] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [recent, setRecent] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/recent', { credentials: 'include', })
      .then(res => {
          if (!res.ok) {
              throw Error('Could not fetch data');
          }
          return res.json();
      })
      .then(dat => {
          setRec(dat); 
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
    if(rec && rec.result && rec.result.length) {
      const newPosts = recent.slice();
      rec.result.forEach(p => {
        if(!newPosts.includes(p)){
          newPosts.push(p)
        }
      });

      setRecent(newPosts);
    }
  }, [rec])
  
  return (  
    <Container>
      <h2>Profile</h2>
      <div className="mt-4">
        {errorUser && <div>{errorUser}</div>}
        {isPendingUser && <div>Loading...</div>}
        {userData && userData.user && <UserProfile user={userData.user} />}
      </div>
      <h2 className="mt-5">Recently commented</h2>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {recent.map((p) =>
        <PostCard key={p._id} post={p} authenticated={authenticated}/>
      )}
    </Container>
  );
}
 
export default Profile;