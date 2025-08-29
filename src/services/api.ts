import { Student, Course } from '../types';

const API_DELAY = 500; // Simulating network delay

// Mock data for students
const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    courseId: 2,
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    courseId: 1,
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
];

// Mock data for courses
const MOCK_COURSES: Course[] = [
  { id: 1, name: 'HTML Basics' },
  { id: 2, name: 'CSS Mastery' },
  { id: 3, name: 'JavaScript Pro' },
  { id: 4, name: 'React In Depth' },
];

/**
 * API service to handle student and course data
 * This is a mock implementation that simulates API calls
 * In a real app, this would make actual HTTP requests to a backend
 */
export const apiService = {
  /**
   * Get all students
   * @returns Promise that resolves to an array of students
   * 
   * This function demonstrates using async/await to handle asynchronous operations.
   * Even though we're using mock data, we wrap it in a Promise and use setTimeout
   * to simulate a network request.
   */
  getStudents: async (): Promise<Student[]> => {
    // Simulate network delay using setTimeout and Promise
    // This demonstrates how the JavaScript event loop works with async operations
    return new Promise((resolve) => {
      setTimeout(() => {
        // Getting data from localStorage if available
        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
          resolve(JSON.parse(storedStudents));
        } else {
          // Using mock data if nothing is in localStorage
          resolve([...MOCK_STUDENTS]);
        }
      }, API_DELAY);
    });
  },

  /**
   * Get all courses
   * @returns Promise that resolves to an array of courses
   * 
   * Another example of async/await with the event loop.
   * In a real app, this would fetch from an actual API endpoint.
   */
  getCourses: async (): Promise<Course[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_COURSES]);
      }, API_DELAY);
    });
  },

  /**
   * Add a new student
   * @param student The student to add (without an ID)
   * @returns Promise that resolves to the added student with an ID
   */
  addStudent: async (student: Omit<Student, 'id'>): Promise<Student> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get existing students from localStorage or use mock data
        const storedStudents = localStorage.getItem('students');
        const students: Student[] = storedStudents
          ? JSON.parse(storedStudents)
          : [...MOCK_STUDENTS];

        // Create a new student with a generated ID
        const newStudent: Student = {
          ...student,
          id: Date.now().toString(),
        };

        // Add to the list and update localStorage
        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));
        
        resolve(newStudent);
      }, API_DELAY);
    });
  },

  /**
   * Update an existing student
   * @param student The student to update
   * @returns Promise that resolves to the updated student
   */
  updateStudent: async (student: Student): Promise<Student> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get existing students from localStorage or use mock data
        const storedStudents = localStorage.getItem('students');
        const students: Student[] = storedStudents
          ? JSON.parse(storedStudents)
          : [...MOCK_STUDENTS];

        // Find and update the student
        const updatedStudents = students.map((s) =>
          s.id === student.id ? student : s
        );
        
        // Update localStorage
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        
        resolve(student);
      }, API_DELAY);
    });
  },

  /**
   * Delete a student
   * @param id The ID of the student to delete
   * @returns Promise that resolves when the student is deleted
   */
  deleteStudent: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get existing students from localStorage or use mock data
        const storedStudents = localStorage.getItem('students');
        const students: Student[] = storedStudents
          ? JSON.parse(storedStudents)
          : [...MOCK_STUDENTS];

        // Filter out the student to delete
        const updatedStudents = students.filter((s) => s.id !== id);
        
        // Update localStorage
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        
        resolve();
      }, API_DELAY);
    });
  },
};
