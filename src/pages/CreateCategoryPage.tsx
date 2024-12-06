import React, { useState } from 'react';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import { saveCategory , getAllCategories } from '../services/categoryService';
import { CategoryDto } from '../types/CategoryDto';
import { toast } from 'react-toastify';

const CreateCategoryPage: React.FC = () => {

    const [formData, setFormData] = useState<CategoryDto>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value, 
      }));
    };

    const handleSubmit = async () => {
        try {
          const response = await saveCategory(formData);
          toast.success("Category saved successfully")
        } catch (error) {
          toast.error("Failed to save category")
        }
      };


  return (
    <div
      className="wrapper d-flex justify-content-center align-items-center"
      style={{ minHeight: '60vh' }}
    >
      <Card
        className="shadow-md"
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '20px',
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardBody>
          <h2 className="text-center mb-5">Create a New Category</h2>
          <Form>
            <div className="mb-4">
              <Label for="name">Category Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter category name"
                className="rounded-2"
                value={formData.name}
                onChange={handleChange}

              />
            </div>
            <Container className="text-center">
              <div className="d-flex justify-content-center gap-4">
                <Button
                  color="primary"
                  className="rounded-2 px-4 py-2"
                  style={{ fontSize: '16px' }}
                  onClick={handleSubmit}
                >
                  Create Category
                </Button>
                <Button
                  color="danger"
                  className="rounded-2 px-4 py-2"
                  style={{ fontSize: '16px' }}
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

export default CreateCategoryPage;
