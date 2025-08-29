import React, { useMemo } from 'react';
import Button from './Button';
import { useStudentManagement } from '../context/StudentManagementContext';
import { Student } from '../types';
import './StudentCard.css';

interface StudentCardProps {
  student: Student;
  onEdit: () => void;
}

/**
 * Component for displaying a student card
 */
const StudentCard: React.FC<StudentCardProps> = ({ student, onEdit }) => {
  const { courses, deleteStudent } = useStudentManagement();

  // Find the course name based on the course ID
  const courseName = useMemo(() => {
    const course = courses.find((c) => c.id === student.courseId);
    return course ? course.name : 'Unknown Course';
  }, [courses, student.courseId]);

  // Handle delete student
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        await deleteStudent(student.id);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  return (
    <div className="student-card">
      <div className="student-image-container">
        <img 
          src={student.profileImage} 
          alt={`${student.name}'s profile`} 
          className="student-image"
        />
      </div>
      <div className="student-details">
        <h3 className="student-name">{student.name}</h3>
        <p className="student-email">{student.email}</p>
        <div className="student-course">
          <span className="course-label">Enrolled in:</span>
          <span className="course-name">{courseName}</span>
        </div>
      </div>
      <div className="student-actions">
        <Button variant="secondary" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default StudentCard;
