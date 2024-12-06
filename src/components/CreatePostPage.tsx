import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import { getAllCategories } from '../services/categoryService';
import { fetchAllUsers } from '../services/userService'; // Yeni eklendi
import { fetchPostById, savePost, updatePost } from '../services/postService';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CategoryDto } from '../types/CategoryDto';
import { UserDto } from '../types/UserDto'; // Yeni eklendi
import JoditEditor from 'jodit-react';
import { PostDto } from '../types/PostDto';

const CreatePostPage: React.FC = () => {
  const editor = useRef(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [users, setUsers] = useState<UserDto[]>([]); // Yeni eklendi
  const [formData, setFormData] = useState<PostDto>({
    title: '',
    content: '',
    categoryDtoList: [],
    userDto: undefined, 
  });

  useEffect(() => {
    const fetchCategoriesAndUsers = async () => {
      try {
        const categoryList = await getAllCategories();
        setCategories(categoryList);

        const userList = await fetchAllUsers(); 
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching categories or users:', error);
        toast.error('Failed to load categories or users');
      }
    };

    const fetchPostData = async () => {
      if (id) {
        try {
          const post = await fetchPostById(parseInt(id));
          setFormData(post);
          setContent(post.content || '');

          if (post.categoryDtoList && post.categoryDtoList.length > 0) {
            const selectedCategory = post.categoryDtoList[0];
            setFormData((prevData) => ({
              ...prevData,
              categoryDtoList: [selectedCategory],
            }));
          }

          if (post.userDto) {
            setFormData((prevData) => ({
              ...prevData,
              userDto: post.userDto,
            }));
          }
        } catch (error) {
          console.error('Error fetching post data:', error);
          toast.error('Failed to load post data');
        }
      }
    };

    fetchCategoriesAndUsers();
    if (id) fetchPostData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (id === 'category') {
      const selectedCategory = categories.find((cat) => cat.id === parseInt(value));
      if (selectedCategory) {
        setFormData((prevData) => ({
          ...prevData,
          categoryDtoList: [selectedCategory],
        }));
      }
    } else if (id === 'user') {
      const selectedUser = users.find((user) => user.id === parseInt(value));
      if (selectedUser) {
        setFormData((prevData) => ({
          ...prevData,
          userDto: selectedUser,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const stripHtmlTags = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleSubmit = async () => {
    const plainTextContent = stripHtmlTags(content);
    const payload = {
      ...formData,
      content: plainTextContent,
    };

    try {
      if (id) {
        await updatePost(payload);
        toast.success('Post updated successfully');
      } else {
        await savePost(payload);
        toast.success('Post created successfully');
      }
      navigate('/posts');
    } catch (error) {
      console.error('Error saving/updating Post:', error);
      toast.error('Failed to save/update Post');
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      content: '',
      categoryDtoList: [],
      userDto: undefined,
    });
    setContent('');
  };

  const isDisabled =
  !formData.title ||
  !content ||
  formData.categoryDtoList?.length === 0 ||
  !formData.userDto;

  return (
    <div
      className="wrapper d-flex justify-content-center align-items-center"
      style={{ minHeight: '60vh' }}
    >
      <Card
        className="shadow-md"
        style={{
          width: '100%',
          maxWidth: '1300px',
          padding: '5px',
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardBody>
          <h2 className="text-center mb-5">{id ? 'Edit Post' : 'Create a New Post'}</h2>
          <Form>
            <div className="mb-4">
              <Label for="title">Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter post title"
                className="rounded-2"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label for="content">Content</Label>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>
            <div className="mb-4">
              <Label for="category">Category</Label>
              <Input
                type="select"
                id="category"
                className="rounded-2"
                value={formData.categoryDtoList?.[0]?.id || ''}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Input>
            </div>
            <div className="mb-4">
              <Label for="user">User</Label>
              <Input
                type="select"
                id="user"
                className="rounded-2"
                value={formData.userDto?.id || ''}
                onChange={handleChange}
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Input>
            </div>
            <div className="mb-4">
              <Label for="image">Upload Image</Label>
              <Input
                type="file"
                id="image"
                className="rounded-2"
                onChange={handleFileUpload}
              />
            </div>

            <Container className="text-center">
              <div className="d-flex justify-content-center gap-4">
                <Button
                  color="primary"
                  className="rounded-2 px-4 py-2 text-center"
                  style={{ fontSize: '16px' }}
                  onClick={handleSubmit}
                  disabled={isDisabled}
                >
                  {id ? 'Update Post' : 'Create Post'}
                </Button>
                <Button
                  color="danger"
                  className="rounded-2 px-4 py-2 text-center"
                  style={{ fontSize: '16px' }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreatePostPage;
