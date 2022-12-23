import { Row, Col, Image } from "react-bootstrap";

const UserProfile = ({ user }) => {

  return (
    <div>
      <Row>
        <Col md="auto">
        <Image referrerPolicy="no-referrer" src={user.picture} alt="ProfilePicture" />
        </Col>
        <Col>
          <h4 className="mt-0">{user.displayName}</h4>
          <p className="mb-2">{user.email}</p>
          <p className="mt-0">Joined {(new Date(user.createdAt)).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </Col>
      </Row>
    </div>
  );
}
   
export default UserProfile;