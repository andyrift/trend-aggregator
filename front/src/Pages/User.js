import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import UserProfile from '../Components/UserProfile';
import useFetch from '../useFetch';

const Profile = ({ authenticated, userData }) => {
  const { id } = useParams();

  const history = useHistory();  

  useEffect(() => {
    if(userData && userData.user && id == userData.user._id){
      history.push('/profile');
    }
  }, [])

  useEffect(() => {
    if(userData && userData.user && id == userData.user._id){
      history.push('/profile');
    }
  }, [authenticated])

  const { data: user, isPending: isUserPending, error: userError } = useFetch('http://localhost:8000/api/v1/user/' + id);
  
  return (  
    <Container>
      <h2>User</h2>
      <div className="mt-4">
        {userError && <div>{userError}</div>}
        {isUserPending && <div>Loading...</div>}
        {user && user.result && <UserProfile user={user.result} />}
      </div>
    </Container>
  );
}
 
export default Profile;