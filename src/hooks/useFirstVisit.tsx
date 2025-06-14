
import { useState, useEffect } from 'react';

export const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkFirstVisit = () => {
      try {
        const hasVisited = localStorage.getItem('umpla-has-visited');
        
        if (!hasVisited) {
          setIsFirstVisit(true);
        }
      } catch (error) {
        console.error('Error checking first visit:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkFirstVisit();
  }, []);

  const markAsVisited = () => {
    try {
      localStorage.setItem('umpla-has-visited', 'true');
      setIsFirstVisit(false);
    } catch (error) {
      console.error('Error marking as visited:', error);
    }
  };

  return {
    isFirstVisit,
    isChecking,
    markAsVisited
  };
};
