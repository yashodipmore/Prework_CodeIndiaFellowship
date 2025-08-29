import React, { useMemo } from 'react';
import { useStudentManagement } from '../context/StudentManagementContext';
import './StudentStatistics.css';

/**
 * Component to display statistics about students
 */
const StudentStatistics: React.FC = () => {
  const { students, courses } = useStudentManagement();

  // Calculate statistics using useMemo for performance
  const statistics = useMemo(() => {
    // Total number of students
    const totalStudents = students.length;
    
    // Students per course
    const studentsPerCourse = courses.map(course => {
      const count = students.filter(student => student.courseId === course.id).length;
      return {
        courseName: course.name,
        count,
        percentage: totalStudents ? Math.round((count / totalStudents) * 100) : 0
      };
    });
    
    // Sort by count descending
    studentsPerCourse.sort((a, b) => b.count - a.count);
    
    // Most popular course
    const mostPopularCourse = studentsPerCourse[0]?.courseName || 'None';
    
    return {
      totalStudents,
      studentsPerCourse,
      mostPopularCourse
    };
  }, [students, courses]);

  return (
    <div className="statistics-container">
      <h2>Student Statistics</h2>
      
      <div className="stat-cards">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="stat-value">{statistics.totalStudents}</div>
        </div>
        
        <div className="stat-card">
          <h3>Most Popular Course</h3>
          <div className="stat-value">{statistics.mostPopularCourse}</div>
        </div>
      </div>
      
      <h3>Students per Course</h3>
      <div className="course-stats">
        {statistics.studentsPerCourse.map((course) => (
          <div key={course.courseName} className="course-stat">
            <div className="course-stat-header">
              <span>{course.courseName}</span>
              <span>{course.count} students ({course.percentage}%)</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${course.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentStatistics;
