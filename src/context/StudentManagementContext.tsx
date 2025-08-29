import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Student, Course } from '../types';
import { apiService } from '../services/api';

// Define what our context will contain
interface StudentManagementContextType {
  students: Student[];
  courses: Course[];
  loading: boolean;
  error: string | null;
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  updateStudent: (student: Student) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
}

// Create the context
const StudentManagementContext = createContext<StudentManagementContextType | undefined>(undefined);

// Props for our provider component
interface StudentManagementProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps app and makes student data available to any
 * child component that calls the useStudentManagement hook.
 * 
 * This demonstrates the use of React Context to create a global state
 * that can be accessed throughout the application.
 */
export const StudentManagementProvider: React.FC<StudentManagementProviderProps> = ({ children }) => {
  // State to track students, courses, loading state, and errors
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch students and courses when the provider loads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch data in parallel to optimize loading time
        const [fetchedStudents, fetchedCourses] = await Promise.all([
          apiService.getStudents(),
          apiService.getCourses(),
        ]);
        
        setStudents(fetchedStudents);
        setCourses(fetchedCourses);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to add a new student
  const addStudent = async (student: Omit<Student, 'id'>) => {
    setLoading(true);
    try {
      const newStudent = await apiService.addStudent(student);
      setStudents((prevStudents) => [...prevStudents, newStudent]);
    } catch (err) {
      console.error('Error adding student:', err);
      setError('Failed to add student. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to update a student
  const updateStudent = async (student: Student) => {
    setLoading(true);
    try {
      await apiService.updateStudent(student);
      setStudents((prevStudents) =>
        prevStudents.map((s) => (s.id === student.id ? student : s))
      );
    } catch (err) {
      console.error('Error updating student:', err);
      setError('Failed to update student. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a student
  const deleteStudent = async (id: string) => {
    setLoading(true);
    try {
      await apiService.deleteStudent(id);
      setStudents((prevStudents) => prevStudents.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Error deleting student:', err);
      setError('Failed to delete student. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create the value object that will be provided to consumers
  const value = {
    students,
    courses,
    loading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
  };

  return (
    <StudentManagementContext.Provider value={value}>
      {children}
    </StudentManagementContext.Provider>
  );
};

/**
 * Custom hook for accessing the student management context
 * This makes it easy for components to access the context
 */
export const useStudentManagement = (): StudentManagementContextType => {
  const context = useContext(StudentManagementContext);
  if (context === undefined) {
    throw new Error('useStudentManagement must be used within a StudentManagementProvider');
  }
  return context;
};
