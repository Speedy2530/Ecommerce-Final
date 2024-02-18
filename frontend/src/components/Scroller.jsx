import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Scroller() {
  const { pathname } = useLocation();

  window.onload = function() {
    // Check if the current page is one of the excluded pages
    var excludedPages = ['/', '/page/1', '/page/2']; // Add the paths of excluded pages
    var currentPage = window.location.pathname;
    
    if (!excludedPages.includes(currentPage)) {
      window.scrollTo(0, 0); // Scroll to the top if the page is not excluded
    }
  }

  useEffect(() => {
    window.onload()
  }, [pathname]) }

export default Scroller;
