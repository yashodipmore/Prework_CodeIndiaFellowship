import React from 'react';
import './MentoringGuide.css';

/**
 * Component that displays the mentoring guide for this project
 */
const MentoringGuide: React.FC = () => {
  return (
    <div className="guide-container">
      <h2>Student Management Dashboard: Key Concepts Guide</h2>

      <section className="guide-section">
        <h3>Async/Await & JavaScript Event Loop</h3>
        <p>
          This project demonstrates asynchronous JavaScript through the mock API service:
        </p>
        <ul>
          <li>
            <strong>Promise-based API:</strong> The <code>apiService</code> uses async/await syntax to handle asynchronous operations, making the code cleaner and more readable.
          </li>
          <li>
            <strong>Event Loop Demonstration:</strong> The <code>setTimeout</code> in the API service simulates network delays, showing how the JavaScript event loop handles deferred tasks without blocking the main thread.
          </li>
          <li>
            <strong>Parallel Requests:</strong> <code>Promise.all</code> in the context provider fetches students and courses simultaneously, demonstrating efficient resource loading.
          </li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>React Hooks & State Management</h3>
        <p>
          The project leverages React's modern functional components and hooks:
        </p>
        <ul>
          <li>
            <strong>useState:</strong> Used for managing component-local state such as form values and UI state (search terms, filters).
          </li>
          <li>
            <strong>useEffect:</strong> Used for side effects like API calls, with proper dependency arrays to control when effects run.
          </li>
          <li>
            <strong>useMemo:</strong> Prevents unnecessary recalculations for filtered lists and derived values, improving performance.
          </li>
          <li>
            <strong>useContext:</strong> Provides global state access without prop drilling via the <code>StudentManagementContext</code>.
          </li>
          <li>
            <strong>Custom Hooks:</strong> <code>useForm</code> and <code>useDebounce</code> demonstrate code reusability and separation of concerns.
          </li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Form Handling & Validation</h3>
        <p>
          The form implementation showcases:
        </p>
        <ul>
          <li>
            <strong>Controlled Components:</strong> Form inputs maintain their state in React, making validation and handling easier.
          </li>
          <li>
            <strong>Real-time Validation:</strong> Errors are displayed as users interact with the form, improving the UX.
          </li>
          <li>
            <strong>Field-level Validation:</strong> Each field has specific validation rules (email format, required fields).
          </li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>UI/UX Best Practices</h3>
        <p>
          The project implements several UI/UX best practices:
        </p>
        <ul>
          <li>
            <strong>Responsive Design:</strong> The layout adjusts for different screen sizes using CSS media queries.
          </li>
          <li>
            <strong>Loading States:</strong> Feedback is provided during async operations.
          </li>
          <li>
            <strong>Error Handling:</strong> Error states are gracefully displayed to users.
          </li>
          <li>
            <strong>Search & Filter:</strong> Demonstrates efficient data manipulation with debouncing to prevent performance issues.
          </li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Component Architecture</h3>
        <p>
          The project demonstrates a well-structured component hierarchy:
        </p>
        <ul>
          <li>
            <strong>Reusable Components:</strong> Button, FormInput, etc. are designed to be reused across the app.
          </li>
          <li>
            <strong>Separation of Concerns:</strong> Components have distinct responsibilities, making the codebase maintainable.
          </li>
          <li>
            <strong>Styled Components:</strong> Each component has its own CSS file, making styles modular and scoped.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default MentoringGuide;
