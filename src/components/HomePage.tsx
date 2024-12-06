import React from 'react';
import { Button, Card, CardBody, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Welcome to the Blog Dashboard</h1>
    <br />
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm" style={{ borderRadius: '10px' }}>
            <CardBody className="text-center">
              <CardTitle tag="h4">Manage Posts</CardTitle>
              <CardText className="text-muted">
                Create, view, edit, or delete blog posts.
              </CardText>
              <Button color="primary" onClick={() => handleNavigate('/posts')} className="me-2">
                View Posts
              </Button>
              <Button color="success" onClick={() => handleNavigate('/createPost')}>
                Add Post
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm" style={{ borderRadius: '10px' }}>
            <CardBody className="text-center">
              <CardTitle tag="h4">Manage Categories</CardTitle>
              <CardText className="text-muted">
                Create, view, or delete categories.
              </CardText>
              <Button color="primary" onClick={() => handleNavigate('/categories')} className="me-2">
                View Categories
              </Button>
              <Button color="success" onClick={() => handleNavigate('/createCategory')}>
                Add Category
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm" style={{ borderRadius: '10px' }}>
            <CardBody className="text-center">
              <CardTitle tag="h4">Manage Authors</CardTitle>
              <CardText className="text-muted">
                View the list of authors or add a new author.
              </CardText>
              <Button color="primary" onClick={() => handleNavigate('/authors')} className="me-2">
                View Authors
              </Button>
              <Button color="success" onClick={() => handleNavigate('/register')}>
                Add Author
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
