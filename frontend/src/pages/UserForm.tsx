// src/pages/UserForm.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createUser, updateUser, fetchUsers, selectCurrentUser, selectUserStatus, selectUserError } from '../store/userSlice';
import { AppDispatch } from '../store';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoaderSpinner';


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const UserForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const user = useSelector(selectCurrentUser);
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);

  useEffect(() => {
    if (id) {
      dispatch(fetchUsers());
    }
  }, [dispatch, id]);

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
  };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      if (id) {
        await dispatch(updateUser({
            id: parseInt(id), ...values,
            createdAt: '',
            updatedAt: ''
        })).unwrap();
      } else {
        await dispatch(createUser({
          ...values,
          createdAt: '',
          updatedAt: ''
        })).unwrap();
      }
      navigate('/users');
    } catch (err) {
      console.error('Failed to save user:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{id ? 'Edit User' : 'Create User'}</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="max-w-md">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (id ? 'Update User' : 'Create User')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;