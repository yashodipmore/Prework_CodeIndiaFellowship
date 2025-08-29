import { useState, useEffect } from 'react';

/**
 * Custom hook to handle form input state and validation
 * @param initialValues Initial form values
 * @param validate Validation function that returns validation errors
 * @returns Form state and helper functions
 * 
 * This demonstrates creating a reusable custom hook for form handling,
 * which encapsulates form state logic and validation.
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validate: (values: T) => Record<string, string>
) => {
  // State for form values, errors, and submission status
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Effect to validate form values when they change
  useEffect(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [values, validate]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Handle input blur (to track touched fields)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // Handle file input for image uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setValues({
          ...values,
          [e.target.name]: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset the form to initial values
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  // Submit the form
  const handleSubmit = async (onSubmit: (values: T) => Promise<void>) => {
    setIsSubmitting(true);
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    // Mark all fields as touched on submit
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length === 0) {
      try {
        await onSubmit(values);
        resetForm();
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleFileChange,
    handleSubmit,
    resetForm,
    setValues,
  };
};
