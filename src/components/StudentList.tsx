import React, { useState, useMemo, useEffect } from 'react';
import StudentCard from './StudentCard';
import StudentForm from './StudentForm';
import Button from './Button';
import SearchHistory from './SearchHistory';
import StudentStatistics from './StudentStatistics';
import ExportData from './ExportData';
import { useStudentManagement } from '../context/StudentManagementContext';
import { useDebounce } from '../hooks/useDebounce';
import { Student } from '../types';
import './StudentList.css';

/**
 * Component for displaying and managing the list of students
 * 
 * This component demonstrates:
 * 1. Filtering data with debounced search
 * 2. Conditional rendering
 * 3. Using context to access global state
 * 4. Managing UI state with React hooks
 */
const StudentList: React.FC = () => {
  const { students, courses, loading, error } = useStudentManagement();
  
  // State for UI management
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showStatistics, setShowStatistics] = useState(false);
  const itemsPerPage = 6; // Number of students per page

  // Debounce search term to avoid filtering on every keystroke
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Reset to first page when search term or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCourseId]);

  // Filter and paginate students based on search term and selected course
  const { filteredStudents, paginatedStudents, totalPages } = useMemo(() => {
    // Filter students
    const filtered = students.filter((student) => {
      // Filter by search term
      const matchesSearch = !debouncedSearchTerm || 
        student.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
        student.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      // Filter by selected course
      const matchesCourse = !selectedCourseId || 
        student.courseId.toString() === selectedCourseId;
      
      return matchesSearch && matchesCourse;
    });
    
    // Calculate pagination
    const total = Math.ceil(filtered.length / itemsPerPage);
    
    // Get current page of students
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = filtered.slice(start, end);
    
    return {
      filteredStudents: filtered,
      paginatedStudents: paginated,
      totalPages: total
    };
  }, [students, debouncedSearchTerm, selectedCourseId, currentPage, itemsPerPage]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Save search term to history when user submits search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Get existing history or initialize empty array
      const savedHistory = localStorage.getItem('searchHistory');
      const history = savedHistory ? JSON.parse(savedHistory) : [];
      
      // Add to history (avoiding duplicates)
      if (!history.includes(searchTerm)) {
        const newHistory = [searchTerm, ...history].slice(0, 5); // Keep only last 5
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      }
    }
  };
  
  // Select search from history
  const handleSelectSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle course filter change
  const handleCourseFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseId(e.target.value);
  };

  // Handle edit student
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  // Handle form completion
  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  // Handle form cancellation
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  // If data is still loading, show loading indicator
  if (loading) {
    return <div className="loading-container">Loading students...</div>;
  }

  // If there was an error, show error message
  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="student-list-container">
      {/* Show form or student list */}
      {showForm ? (
        <StudentForm 
          student={editingStudent || undefined}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <>
          <div className="student-list-header">
            <h2>Students</h2>
            <Button onClick={() => setShowForm(true)}>Add New Student</Button>
          </div>

          <div className="dashboard-actions">
            <Button 
              variant={showStatistics ? "primary" : "secondary"}
              onClick={() => setShowStatistics(!showStatistics)}
            >
              {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
            </Button>
          </div>
          
          {showStatistics && (
            <div className="dashboard-stats-container">
              <StudentStatistics />
              <ExportData />
            </div>
          )}
          
          <div className="filters-container">
            <form className="search-container" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <Button type="submit" variant="secondary">Search</Button>
            </form>
            
            <div className="course-filter">
              <select
                value={selectedCourseId}
                onChange={handleCourseFilterChange}
                className="course-select"
              >
                <option value="">All Courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id.toString()}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <SearchHistory onSelectSearch={handleSelectSearch} />

          {filteredStudents.length > 0 ? (
            <>
              <div className="student-cards">
                {paginatedStudents.map((student) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onEdit={() => handleEditStudent(student)}
                  />
                ))}
              </div>
              
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-button"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  <div className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </div>
                  
                  <button
                    className="pagination-button"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-students">
              {debouncedSearchTerm || selectedCourseId ? (
                <p>No students match your search criteria.</p>
              ) : (
                <p>No students found. Click "Add New Student" to add one.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentList;
