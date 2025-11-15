import React, { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TutorialModal from './components/TutorialModal';
import PageTransition from './components/PageTransition';
import Header from './components/Header';

export default function Layout({ children, currentPageName }) {
  const [showTutorial, setShowTutorial] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevPage, setPrevPage] = useState(currentPageName);
  
  // Pages that should not show header or tutorial button
  const isLandingPage = currentPageName === 'Landing';
  const showHeader = !isLandingPage;
  const showTutorialButton = !['Landing', 'FAQ', 'PrivacyPolicy', 'TermsOfService', 'Referral', 'Profile'].includes(currentPageName);
  
  useEffect(() => {
    if (prevPage !== currentPageName) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevPage(currentPageName);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentPageName, prevPage]);
  
  return (
    <div className="relative min-h-screen">
      <PageTransition isTransitioning={isTransitioning} />
      
      {/* Header - show on all pages except Landing */}
      {showHeader && <Header />}
      
      {children}
      
      {/* Floating Tutorial Button - hide on certain pages */}
      {showTutorialButton && (
        <Button
          onClick={() => setShowTutorial(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl hover:shadow-2xl transition-all z-40"
          title="View Tutorial"
        >
          <HelpCircle className="w-6 h-6 text-white" />
        </Button>
      )}
      
      {/* Tutorial Modal */}
      <TutorialModal 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
      />
    </div>
  );
}