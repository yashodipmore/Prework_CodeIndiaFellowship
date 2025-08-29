import React, { useState, useEffect } from 'react';
import './SearchHistory.css';

interface SearchHistoryProps {
  onSelectSearch: (term: string) => void;
}

/**
 * Component for displaying and managing search history
 */
const SearchHistory: React.FC<SearchHistoryProps> = ({ onSelectSearch }) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Add a search term to history
  const addToHistory = (term: string) => {
    if (!term.trim()) return;
    
    // Remove if exists and add to beginning (most recent)
    const newHistory = [
      term,
      ...searchHistory.filter(item => item !== term)
    ].slice(0, 5); // Keep only 5 most recent searches
    
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Clear all search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Handle clicking on a search term
  const handleSelectSearch = (term: string) => {
    onSelectSearch(term);
  };

  // If no history, don't render
  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <div className="search-history">
      <div className="search-history-header">
        <h4>Recent Searches</h4>
        <button className="clear-history" onClick={clearHistory}>
          Clear
        </button>
      </div>
      <ul className="search-history-list">
        {searchHistory.map((term, index) => (
          <li key={index}>
            <button 
              className="history-item" 
              onClick={() => handleSelectSearch(term)}
            >
              {term}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
