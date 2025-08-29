
# Student Management Dashboard

A modern, responsive single-page application for managing students, built with React and TypeScript. This project was developed by Yashodip More as a prework assignment for CodeIndia Fellowship.

## Features

- **Add, Edit, and View Students**: Manage student records with name, email, enrolled course, and profile image.
- **Form Validation**: Required fields, email format, and image upload validation.
- **Course List from API**: Fetches available courses from a mock API.
- **Responsive UI**: Works beautifully on mobile and desktop.
- **Dark Mode**: Toggle between light and dark themes.
- **Student Statistics**: Dashboard with total students, most popular course, and distribution.
- **Search & Filter**: Search students by name/email and filter by course.
- **Search History**: Quick access to recent searches.
- **Pagination**: Efficient navigation for large student lists.
- **Export Data**: Download student data as CSV or JSON.
- **Mentoring Guide**: In-app and markdown guide explaining key concepts (async/await, event loop, hoisting, React best practices).

## Technologies Used

- React (with Hooks & Context API)
- TypeScript
- Custom CSS (responsive, accessible, and themed)
- LocalStorage for persistence

## Getting Started

### Prerequisites
- Node.js (v16 or above recommended)
- npm

### Installation
1. Clone the repository or download the source code.
2. Navigate to the project directory:
	```sh
	cd student-management-dashboard
	```
3. Install dependencies:
	```sh
	npm install
	```
4. Start the development server:
	```sh
	npm start
	```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
student-management-dashboard/
  src/
	 components/      # Reusable UI components
	 context/         # Global state/context providers
	 hooks/           # Custom React hooks
	 services/        # API service layer
	 types/           # TypeScript types
	 App.tsx          # Main app component
	 ...
```

## Key Concepts Demonstrated

- **Async/Await**: All API calls use async/await for clean asynchronous code.
- **Event Loop**: Mock API uses setTimeout to simulate network delay and demonstrate event loop behavior.
- **Hoisting**: Modern JS practices (const/let, arrow functions) avoid hoisting issues.
- **React Best Practices**: Functional components, hooks, context, memoization, and clean separation of concerns.

## Mentoring Guide
See [`MENTORING_GUIDE.md`](./MENTORING_GUIDE.md) for a concise explanation of how this project demonstrates key concepts for students.

## Credits
Developed by Yashodip More as a prework assignment for CodeIndia Fellowship.

## License
This project is for educational purposes.
