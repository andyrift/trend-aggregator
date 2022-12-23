import useFetch from "../useFetch";
import { Button, Card, Container, Nav, Col, Row, Image, Fade } from 'react-bootstrap'
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  return (
    <Fade in={true} appear={true} style={{opacity: "75%"}} className="comment" onEnter={(e) => {e.style.opacity = 100}}>
      <Container className="mt-4 border-start border-secondary">
      <Row>
        <Col className="p0" xs="1">
          <Image referrerPolicy="no-referrer" className="w-100 p0" roundedCircle src={comment.picture} alt="" />
        </Col>
        <Col>
          <Row className="pt-1">
            <Col data-mdb-animation-show-on-load="false" className="m-0 p-0">
            <Link className="text-decoration-none link-dark" to={"/user/" +  comment.user_id}>
                <h5 className="text-wrap text-break">{comment.displayName}</h5>
            </Link>
            </Col>  
            <Col md="auto">
              <p className="text-secondary">
                {(new Date(comment.createdAt)).toLocaleDateString([], { 
                  month: 'short', 
                  day: 'numeric' ,
                  hour: 'numeric',
                  minute: 'numeric' 
                })}
              </p>
            </Col>  
          </Row>
        </Col>
        
      </Row>
      <p className="text-wrap text-break">{comment.message}</p>
    </Container>

    </Fade>
    
  );
}
   
export default Comment;