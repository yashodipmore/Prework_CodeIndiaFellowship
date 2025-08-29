import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import MentoringGuide from './components/MentoringGuide';
import Footer from './components/Footer';
import { StudentManagementProvider } from './context/StudentManagementContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

/**
 * Main App component
 * 
 * This serves as the entry point for our application and
 * wraps the entire app with the StudentManagementProvider.
 */
const App: React.FC = () => {
  // State to toggle between the student list and mentoring guide
  const [showGuide, setShowGuide] = useState(false);

  return (
    <ThemeProvider>
      <AppContent showGuide={showGuide} setShowGuide={setShowGuide} />
    </ThemeProvider>
  );
};

/**
 * App content component wrapped with theme provider
 */
const AppContent: React.FC<{
  showGuide: boolean;
  setShowGuide: (show: boolean) => void;
}> = ({ showGuide, setShowGuide }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`app ${theme}-theme`}>
      <StudentManagementProvider>
        <Navbar />
        <main className="main-content">
          <div className="view-toggle">
            <button
              className={!showGuide ? 'active' : ''}
              onClick={() => setShowGuide(false)}
            >
              Student Dashboard
            </button>
            <button
              className={showGuide ? 'active' : ''}
              onClick={() => setShowGuide(true)}
            >
              Mentoring Guide
            </button>
          </div>
          
          {showGuide ? <MentoringGuide /> : <StudentList />}
        </main>
        <Footer />
      </StudentManagementProvider>
    </div>
  );
};

export default App;
