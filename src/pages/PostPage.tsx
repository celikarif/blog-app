import React, { useEffect, useState } from 'react';
import { PostDto } from '../types/PostDto';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, CardImg, Button, Row, Col, Badge } from 'reactstrap';
import { deletePost, fetchAllPosts } from '../services/postService';
import { toast } from 'react-toastify';

const PostPage: React.FC = () => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const allPosts = await fetchAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  }, []);

  const goToDetails = (id?: number) => {
    if (id) {
      navigate(`/post/${id}`);
    }
  };

  const goToEdit = (id?: number) => {
    if (id) {
      navigate(`/editPost/${id}`); 
    }
  };

  const handleDelete = async (id?: number) => {
    if (id) {
      try {
        await deletePost(id);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        toast.success('Post deleted successfully');
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Failed to delete post');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4"> Blogs</h1>
      <Row>
        {posts.map((post) => (
          <Col md={4} className="mb-4" key={post.id}>
            <Card>
              <CardImg
                top
                src={
                  post.imageUrl
                    ? `${process.env.REACT_APP_BACKEND_URL}/images/${post.imageUrl}`
                    : 'https://via.placeholder.com/150'
                }
                alt={post.title}
              />
              <CardBody>
                <CardTitle tag="h5">{post.title}</CardTitle>
                <CardText className="d-flex justify-content-between align-items-center">
              {post.categoryDtoList?.map((category, index) => (
               <Badge key={index} color="primary" className="me-1">
                   {category.name}
               </Badge>   ))}
               <Badge color="secondary" className="ms-2">
                   {post.userDto?.name || 'Unknown Author'}
                </Badge>
              </CardText>
                <CardText>{post.content?.slice(0, 80)}...</CardText>
                <div className="d-flex justify-content-center gap-2 mt-2">
              <Button color="primary" size="sm" onClick={() => goToDetails(post.id)}>
                                 Read More
              </Button>
              <Button color="warning" size="sm" onClick={() => goToEdit(post.id)}>
                                  Edit
              </Button>
              <Button color="danger" size="sm" onClick={() => handleDelete(post.id)}>
                                  Delete
               </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PostPage;
