import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import PostPage from '../pages/PostPage';
import CreatePostPage from '../components/CreatePostPage';
import CreateUserPage from '../pages/CreateUserPage';
import LoginPage from '../pages/LoginPage';
import CreateCategoryPage from '../pages/CreateCategoryPage';
import PostDetailPage from '../pages/PostDetailPage';
import CategoryPage from '../pages/CategoryPage';
import AuthorPage from '../pages/AuthorPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/register" element={<CreateUserPage />} />
        <Route path="/createPost" element={<CreatePostPage />} />
     {/*    <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/createCategory" element={<CreateCategoryPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/editPost/:id" element={<CreatePostPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/authors" element={<AuthorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
