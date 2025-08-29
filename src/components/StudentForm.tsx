import React, { useMemo } from 'react';
import FormInput from './FormInput';
import SelectInput from './SelectInput';
import ImageUpload from './ImageUpload';
import Button from './Button';
import { useForm } from '../hooks/useForm';
import { useStudentManagement } from '../context/StudentManagementContext';
import { Student } from '../types';
import './StudentForm.css';

interface StudentFormProps {
  student?: Student;
  onSuccess: () => void;
  onCancel: () => void;
}

/**
 * Component for adding or editing a student
 * 
 * This component demonstrates:
 * 1. Form validation with controlled components
 * 2. Handling file uploads
 * 3. Using context for global state
 * 4. Using custom hooks for form handling
 */
const StudentForm: React.FC<StudentFormProps> = ({ student, onSuccess, onCancel }) => {
  const { courses, addStudent, updateStudent } = useStudentManagement();

  // Initial form values - use student data if provided (edit mode) or empty values (add mode)
  const initialValues = useMemo(() => ({
    id: student?.id || '',
    name: student?.name || '',
    email: student?.email || '',
    courseId: student?.courseId?.toString() || '',
    profileImage: student?.profileImage || '',
  }), [student]);

  // Form validation function
  const validate = (values: typeof initialValues) => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    } else if (values.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    // Course validation
    if (!values.courseId) {
      errors.courseId = 'Course is required';
    }

    // Profile image validation
    if (!values.profileImage) {
      errors.profileImage = 'Profile image is required';
    }

    return errors;
  };

  // Use our custom form hook
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleFileChange,
    handleSubmit,
  } = useForm(initialValues, validate);

  // Handle form submission
  const onSubmit = async (formValues: typeof initialValues) => {
    try {
      if (student) {
        // Edit mode - update existing student
        await updateStudent({
          id: formValues.id,
          name: formValues.name,
          email: formValues.email,
          courseId: Number(formValues.courseId),
          profileImage: formValues.profileImage,
        });
      } else {
        // Add mode - create new student
        await addStudent({
          name: formValues.name,
          email: formValues.email,
          courseId: Number(formValues.courseId),
          profileImage: formValues.profileImage,
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  // Prepare course options for the select input
  const courseOptions = useMemo(() => {
    return courses.map(course => ({
      value: course.id.toString(),
      label: course.name,
    }));
  }, [courses]);

  return (
    <form className="student-form" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(onSubmit);
    }}>
      <h2>{student ? 'Edit Student' : 'Add New Student'}</h2>
      
      <FormInput
        id="name"
        name="name"
        label="Full Name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
        placeholder="Enter full name"
        required
      />
      
      <FormInput
        id="email"
        name="email"
        label="Email Address"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
        placeholder="Enter email address"
        required
      />
      
      <SelectInput
        id="courseId"
        name="courseId"
        label="Enrolled Course"
        options={courseOptions}
        value={values.courseId}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.courseId}
        touched={touched.courseId}
        required
      />
      
      <ImageUpload
        id="profileImage"
        name="profileImage"
        label="Profile Image"
        value={values.profileImage}
        onChange={handleFileChange}
        error={errors.profileImage}
        touched={touched.profileImage}
        required
      />
      
      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : student ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;
