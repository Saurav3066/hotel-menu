import React, { useCallback } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import './css/header.css';

const Header = ({
  searchTerm,
  setSearchTerm,
  clearSearchTerm,
  selectedSubmenu,
  setFilteredItems,
  handleSearch,
  starterData,
  fullCourseData,
  beverageData,
  dessertData,
}) => {
  const memoizedHandleSearch = useCallback(() => {
    handleSearch(
      selectedSubmenu,
      starterData,
      fullCourseData,
      beverageData,
      dessertData,
      setFilteredItems
    );
  },[
    selectedSubmenu,
    starterData,
    fullCourseData,
    beverageData,
    dessertData,
    setFilteredItems,
  ]);

  return (
    <AppBar position="static">
      <Toolbar>
        <div className="company-info-container">
          <Typography variant="h6" component="div">
            Company Name
          </Typography>
          <img src="logo.png" alt="Logo" className="company-logo" />
        </div>
        <div className="search-container">
          <InputBase
            placeholder="Search for food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                memoizedHandleSearch();
              }
            }}
            className="search-input"
          />
          <div className="search-icons">
            <IconButton
              color="inherit"
              onClick={memoizedHandleSearch}
              style={{ display: searchTerm ? 'block' : 'none' }}
            >
              <SearchIcon />
            </IconButton>
            {searchTerm && (
              <IconButton color="inherit" onClick={clearSearchTerm}>
                <ClearIcon />
              </IconButton>
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
