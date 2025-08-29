import React from 'react';
import Button from './Button';
import { useStudentManagement } from '../context/StudentManagementContext';
import './ExportData.css';

/**
 * Component for exporting student data in different formats
 */
const ExportData: React.FC = () => {
  const { students, courses } = useStudentManagement();

  // Function to export data as CSV
  const exportCSV = () => {
    // Prepare data with course names instead of IDs for better readability
    const data = students.map(student => {
      const course = courses.find(c => c.id === student.courseId);
      return {
        id: student.id,
        name: student.name,
        email: student.email,
        course: course ? course.name : 'Unknown',
        profileImage: student.profileImage
      };
    });

    // Create CSV content
    const headers = ['ID', 'Name', 'Email', 'Course', 'Profile Image URL'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.id,
        `"${row.name}"`, // Use quotes to handle commas in names
        `"${row.email}"`,
        `"${row.course}"`,
        `"${row.profileImage}"`
      ].join(','))
    ].join('\\n');
    
    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `students_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to export data as JSON
  const exportJSON = () => {
    // Prepare data with course names instead of IDs for better readability
    const data = students.map(student => {
      const course = courses.find(c => c.id === student.courseId);
      return {
        id: student.id,
        name: student.name,
        email: student.email,
        course: course ? course.name : 'Unknown',
        courseId: student.courseId,
        profileImage: student.profileImage
      };
    });

    // Create a blob and trigger download
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `students_export_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="export-container">
      <h3>Export Data</h3>
      <p>Export student data for backup or analysis</p>
      <div className="export-buttons">
        <Button variant="secondary" onClick={exportCSV}>
          Export as CSV
        </Button>
        <Button variant="secondary" onClick={exportJSON}>
          Export as JSON
        </Button>
      </div>
    </div>
  );
};

export default ExportData;
