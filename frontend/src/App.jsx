import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import SchedulePickup from './components/SchedulePickup/SchedulePickup';
import Contacts from './components/Contacts/Contacts';
import Feed from './components/Feed/Feed';
import AboutUs from './components/AboutUs/AboutUs';
import Auth from './components/Auth/Auth';
import { InView } from 'react-intersection-observer';
import { HashLink as Link } from 'react-router-hash-link';
import './App.css';

const ScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

const App = () => {
  const [animated, setAnimated] = useState({
    home: false,
    services: false,
    about: false,
    news: false,
    contact: false,
  });

  const handleInView = (inView, section) => {
    if (inView) {
      setAnimated(prev => ({ ...prev, [section]: true }));
    } else {
      setAnimated(prev => ({ ...prev, [section]: false }));
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <ScrollToTopOnMount />
            <div className="app">
              <InView onChange={(inView) => handleInView(inView, 'home')}>
                {({ ref }) => (
                  <div
                    id="home"
                    ref={ref}
                    className={animated.home ? 'fade-in-up' : 'hidden'}
                  >
                    <HeroSection />
                  </div>
                )}
              </InView>
              <InView onChange={(inView) => handleInView(inView, 'services')}>
                {({ ref }) => (
                  <div
                    id="services"
                    ref={ref}
                    className={animated.services ? 'fade-in-up' : 'hidden'}
                  >
                    <SchedulePickup />
                  </div>
                )}
              </InView>
              <InView onChange={(inView) => handleInView(inView, 'about')}>
                {({ ref }) => (
                  <div
                    id="about"
                    ref={ref}
                    className={animated.about ? 'fade-in-up' : 'hidden'}
                  >
                    <AboutUs />
                  </div>
                )}
              </InView>
              <InView onChange={(inView) => handleInView(inView, 'news')}>
                {({ ref }) => (
                  <div
                    id="news"
                    ref={ref}
                    className={animated.news ? 'fade-in-up' : 'hidden'}
                  >
                    <Feed />
                  </div>
                )}
              </InView>
              <InView onChange={(inView) => handleInView(inView, 'contact')}>
                {({ ref }) => (
                  <div
                    id="contact"
                    ref={ref}
                    className={animated.contact ? 'fade-in-up' : 'hidden'}
                  >
                    <Contacts />
                  </div>
                )}
              </InView>
            </div>
          </>
        } />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
