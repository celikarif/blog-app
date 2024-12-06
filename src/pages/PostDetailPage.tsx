import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostDto } from '../types/PostDto';
import { fetchPostById } from '../services/postService';
import { Card, CardBody, CardTitle, CardText, CardImg, Container, Button, Input, Badge, ListGroup, ListGroupItem } from 'reactstrap';
import { CommentDto } from '../types/CommentDto';
import { fetchCommentsByPostId, saveComment, deleteCommentById, updateComment } from '../services/commentService';
import { toast } from 'react-toastify';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDto | null>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentDto[] | null>(null);
  const [editingComment, setEditingComment] = useState<CommentDto | null>(null);

  const getPostAndComments = async () => {
    if (id) {
      try {
        const post = await fetchPostById(parseInt(id));
        setPost(post);

        const postComments = await fetchCommentsByPostId(parseInt(id));
        setComments(postComments || []);
      } catch (error) {
        console.error('Error fetching post or comments:', error);
      }
    }
  };

  const refreshComments = async () => {
    if (id) {
      try {
        const postComments = await fetchCommentsByPostId(parseInt(id));
        setComments(postComments || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
  };

  useEffect(() => {
    getPostAndComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    try {
      const newComment: CommentDto = {
        content: comment,
        postDto: { id: parseInt(id!) },
      };

      await saveComment(newComment);
      setComment('');
      await refreshComments();
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteCommentById(commentId);
      await refreshComments();
      toast.success('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditComment = (comment: CommentDto) => {
    setEditingComment(comment);
    setComment(comment.content || '');
  };

  const handleUpdateComment = async () => {
    if (!editingComment || !comment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    try {
      const updatedComment: CommentDto = {
        ...editingComment,
        content: comment,
      };

      await updateComment(updatedComment);
      setEditingComment(null);
      setComment('');
      await refreshComments();
      toast.success('Comment updated successfully');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <Container className="mt-5">
      {post ? (
        <Card>
          <CardImg
            top
            src={
              post.imageUrl
                ? `${process.env.REACT_APP_BACKEND_URL}/images/${post.imageUrl}`
                : 'https://via.placeholder.com/600x300'
            }
            alt={post.title}
          />
          <CardBody>
            <CardTitle tag="h2">{post.title}</CardTitle>
            <CardText>
              {post.categoryDtoList?.map((category, index) => (
                <Badge key={index} color="secondary" className="me-1">
                  {category.name}
                </Badge>
              ))}
            </CardText>
            <CardText className="mt-3">{post.content}</CardText>
            <hr />
            <h5>Comments</h5>
            <ListGroup className="mb-4">
              {(comments || []).map((comment, index) => (
                <ListGroupItem
                  key={index}
                  className="d-flex flex-column"
                  style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '10px',
                    padding: '15px',
                  }}
                >
                  <div className="d-flex justify-content-between">
                 
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString()
                        : ''}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>{comment.content}</div>
                    <div className="d-flex">
                      <Button
                        color="warning"
                        size="sm"
                        onClick={() => handleEditComment(comment)}
                        style={{
                          marginRight: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FaEdit style={{ fontSize: '16px' }} />
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleDeleteComment(comment.id!)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FaTrashAlt style={{ fontSize: '16px' }} />
                      </Button>
                    </div>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
            <h5>{editingComment ? 'Edit Comment' : 'Add a Comment'}</h5>
            <Input
              type="textarea"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-3"
            />
            <Button
              color={editingComment ? 'warning' : 'success'}
              onClick={editingComment ? handleUpdateComment : handleCommentSubmit}
            >
              {editingComment ? 'Update Comment' : 'Post Comment'}
            </Button>
          </CardBody>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default PostDetailPage;
