import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './App.css';
import ParticalBg from './ParticalBg';
import ParticalBg1 from './ParticalBg1';
import Sliders from './Sliders';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mobileAppImage from './mobileapp.png';
import OnlineVotingImage from './OnlineVoting.png';
import { createAutoScroll } from './autoScroll.js';


import WordCloudComponent from "./WordCloudComponent";

// Intro Animation Component
const IntroAnimation = ({ onComplete }) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const images = imageRef.current;
    const container = containerRef.current;

    if (!images || !container || hasAnimated) return;

    const animation = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 1000,
      complete: () => {
        const rect = images.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        onComplete({
          top: rect.top - containerRect.top,
          left: rect.left - containerRect.left,
          width: rect.width,
          height: rect.height,
        });
        setHasAnimated(true);
      },
    });

    animation.add({
      targets: images,
      scale: [1, 0.7],
    });
  }, [onComplete, hasAnimated]);

  return (
    <div ref={containerRef} className="intro-container">
      <img ref={imageRef} src="myProfile.jpg" alt="Intro Image" className="intro-image" />
    </div>
  );
};

// Main Website Component
const MainWebsite = ({ initialImagePosition, onTransitionComplete }) => {
  const containerRef = useRef(null);
  const profileImageRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isBioVisible, setIsBioVisible] = useState(false);
  const projectsRef = useRef(null);
  const bioRef = useRef(null); 
  const ConRef = useRef(null); // Added reference for the bio section

  const handleGlowClick = (sectionRef) => {
    if (sectionRef.current) {
      // Add the glow class to trigger the animation
      sectionRef.current.classList.add('glow');
      
      // Remove the glow class after animation duration (3 seconds)
      setTimeout(() => {
        sectionRef.current.classList.remove('glow');
      }, 3000); // 3s to match the animation duration
    }
  };

  useEffect(() => {
    if (!containerRef.current || !profileImageRef.current || !initialImagePosition || hasAnimated) return;

    const image = profileImageRef.current;
    const container = containerRef.current;
    const imageParent = image.parentElement;
    const finalRect = image.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Set initial styles
    image.style.position = 'fixed';
    image.style.top = `${initialImagePosition.top + containerRect.top}px`;
    image.style.left = `${initialImagePosition.left + containerRect.left}px`;
    image.style.width = `${initialImagePosition.width}px`;
    image.style.height = `${initialImagePosition.height}px`;
    image.style.borderRadius = '20px';
    image.style.zIndex = '1';

    // Fade in the container
    container.style.opacity = '1';
    
    // Calculate the transform values
    const x = `${finalRect.top}px`;

    anime({
      targets: image,
      top: x,
      left: finalRect.left,
      width: finalRect.width,
      height: finalRect.height,
      borderRadius: '20px',
      easing: 'easeInQuad',
      duration: 1000,
      complete: () => {
        image.style.opacity = '1';
        image.style.position = 'absolute';
        image.style.top = '0';
        image.style.left = '0';
        image.style.width = '100%';
        image.style.height = '100%';
        image.style.zIndex = '1';

        setTimeout(() => {
          imageParent.style.transform = 'translateY(0px)';
          setIsBioVisible(true);
        }, 1000); 
        onTransitionComplete();
      },
    });

    // Fade in and slide up other elements
    anime({
      targets: Array.from(containerRef.current.children).filter(
        (el) => el !== image.parentElement
      ),
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutQuad',
      duration: 1000,
      delay: anime.stagger(100),
    });
  }, [initialImagePosition, onTransitionComplete]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
      {
        title:(
          <div>
            TrendPlay (Android app){" "}
            <a
              href="https://github.com/abhikay18/GameLibrary"
              target="_blank"
              style={{ textDecoration: "none", color: "blue" }}
            >
              <i>Link</i>
            </a>
          </div>
        ),
        image: mobileAppImage,
        content:( <div>
        <h5>Project Description</h5>
        <p>
          <strong>Description:</strong>
          <br />
          An Android application designed to list trending games, categorize them by genres, and recommend games to users based on their preferences and play history. Built using Android Studio and Firebase, the app provides a seamless and personalized gaming experience.
        </p>

        <h5>Key Features</h5>
        <ul>
          <li>Displays trending games with a smooth user interface categorized by genres such as Action, Adventure, and Puzzle.</li>
          <li>Recommends games based on user preferences and past behavior using an intelligent algorithm.</li>
          <li>Built using Android Studio and Firebase for seamless data storage and sync across devices.</li>
          <li>Offers real-time game search functionality, allowing users to filter games based on popularity, genre, and ratings.</li>
          <li>Notifies users about new game releases and updates through in-app notifications.</li>
          <li>Ensures compatibility with a wide range of Android devices and screen sizes through responsive design.</li>
        </ul>

        <h5>Additional Features & Achievements</h5>
        <ul>
          <li>Implemented a recommendation algorithm achieving 85% accuracy in suggesting games based on user preferences and past behavior.</li>
          <li>Designed a clean, user-friendly interface to help users discover and explore games effortlessly.</li>
          <li>Integrated Firebase to store and sync user data securely across devices.</li>
          <li>Achieved seamless integration with Google Play Store APIs to fetch up-to-date game information.</li>
          <li>Conducted user testing to ensure a smooth experience across various Android versions and devices.</li>
        </ul>
      </div>
    )
      },
      {
        title: (
          <div>
            Online Voting System (C++){" "}
            <a
              href="https://github.com/abhikay18/Online-Voting-System.git"
              target="_blank"
              style={{ textDecoration: "none", color: "blue" }}
            >
              <i>Link</i>
            </a>
          </div>
        ),
        image: OnlineVotingImage,
        content: (
          <div>
            <h5>Project Description</h5>
            <p>
              <strong>Description:</strong>
              <br />
              The Online Voting System is designed to provide a secure, efficient, and user-friendly platform for managing voter, candidate, and voting data. The system allows users to cast their votes in a secure online environment, with admins managing voter and candidate data. It includes features such as admin control, data storage, and an efficient voting process.
            </p>
    
            <h5>Key Features</h5>
            <ul>
              <li>Admin panel for managing voter, candidate, and poll data.</li>
              <li>Secure login system for admin access and vote casting.</li>
              <li>Dynamic data storage using file handling and vectors for efficient management of large data.</li>
              <li>Ability for users to cast votes for their preferred candidates.</li>
              <li>Enhanced user interface with text coloring and interactive console outputs.</li>
            </ul>
    
            <h5>Additional Features & Achievements</h5>
            <ul>
              <li>Implemented key OOP concepts such as inheritance, polymorphism, and file handling.</li>
              <li>Created a secure and efficient voting process ensuring privacy and data integrity.</li>
              <li>Developed using C++ with OOP principles for structured and maintainable code.</li>
              <li>Utilized vectors and file handling to store and manage large amounts of data.</li>
              <li>Optimized performance and ensured user-friendly interface through console text coloring.</li>
            </ul>
          </div>
        )
      }
    ];

      // Auto-scroll effect every 5 seconds
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 30000); // 5000ms = 5 seconds
    
        // Clear the interval on component unmount
        return () => clearInterval(interval);
      }, [slides.length]);
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
    

    const sliderRef = useRef();

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Auto slide speed
    arrows: false, // Hide arrows
  };

  const wordsProgramming = [
    { text: "Java", value: 100 },
    { text: "C", value: 90 },
    { text: "C++", value: 80 },
    { text: "Python", value: 70 },
  ];

  const wordsDatabases = [
    { text: "MySQL", value: 100 },
    { text: "PostgreSQL", value: 80 },
    { text: "MongoDB", value: 70 },
    { text: "Firebase", value: 60 },
    { text: "Oracle", value: 50 },
  ];

  const wordsWeb = [
    { text: "HTML", value: 100 },
    { text: "CSS", value: 90 },
    { text: "React", value: 80 },
    { text: "JavaScript", value: 70 },
    { text: "TypeScript", value: 55 },
    { text: "Node.js", value: 60 },
  ];

  const wordsDevTools = [
    { text: "Docker", value: 100 },
    { text: "Android Studio", value: 80 },
    { text: "Git", value: 70 },
    { text: "AWS", value: 80 },
    { text: "PowerBI", value: 60 },
    { text: "VSCode", value: 50 },
  ];

  const wordsOS = [
    { text: "Linux", value: 100 },
    { text: "Windows", value: 80 },
    { text: "Ubuntu", value: 60 },
    { text: "CentOS", value: 50 },
  ];

  const contactInfoElement = ConRef.current?.querySelector('.contact-info'); // Using ref to access the DOM element
        
  if (contactInfoElement) {
      const cleanup = createAutoScroll(contactInfoElement, {
          scrollSpeed: 0.3,
          pauseOnHover: true
      });}


  return (
    <div ref={containerRef} className="container">
      <header className="header">
        <h1><i>ABHISHEK</i> KUMAR</h1>
        <nav>
        <a href="#" onClick={() => handleGlowClick(projectsRef)} className="glow-link">
        PROJECTS
      </a>
      <a href="#" onClick={() => handleGlowClick(bioRef)} className="glow-link">
        SKILLS
      </a>
          <a href="#" onClick={() => handleGlowClick(ConRef)} className="glow-link">CERTIFICATION</a>
        </nav>
        <ParticalBg1 id="particles1-section1" />
      </header>

      <div className="intro">
        <ParticalBg id="particles-section5" />
        <h2>Software Developer</h2>
        <h2><i>Full-Stack Developer</i></h2>
        <h2>Cloud Solutions Architect</h2>
      </div>
      
      <div className="profile-image-container">
        <img ref={profileImageRef} src="myProfile1.png" alt="Profile" className="profile-image" />
        <ParticalBg id="particles-section7" />
      </div>

      <div ref={bioRef} className="bio">
          <div className="bio-text">
          {isBioVisible && (
            <Slider {...settings}>
              <div>
                <h3>Programming Languages</h3>
                <WordCloudComponent words={wordsProgramming} />
              </div>
              <div>
                <h3>Databases</h3>
                <WordCloudComponent words={wordsDatabases} />
              </div>
              <div>
                <h3>Web Development</h3>
                <WordCloudComponent words={wordsWeb} />
              </div>
              <div>
                <h3>Developer Tools</h3>
                <WordCloudComponent words={wordsDevTools} />
              </div>
              <div>
                <h3>Operating Systems</h3>
                <WordCloudComponent words={wordsOS} />
              </div>
            </Slider>
            )}
          </div>
          <ParticalBg id="particles-section2" />
        </div>
      

        <div ref={projectsRef} className="projects">
     <ParticalBg id="particles-section3" />
      <div className="projects-header">
      <h3>Projects</h3>
        </div>
      <div className="projects-slider-container">
      <Sliders slides={slides} />
      </div>
      </div>




      <div className="contact" ref={ConRef}>
    <ParticalBg id="particles-section4" />
    <h2>Achievements & Certificates</h2>
    <div className="contact-info">
        <ul>
          <br></br>
          <br></br>
            <li>Earned 24+ Google Cloud badges through <a href="https://www.cloudskillsboost.google/public_profiles/24bc114b-126d-44c8-9278-9216d8abf0b5" target="_blank">Google Cloud Skills Boost</a>, demonstrating expertise in cloud technologies, AI, and machine learning solutions.</li>
            <li>AWS APAC's Solutions Architecture on<a href="https://drive.google.com/file/d/1mjIw9iHgpFuZ9qQ3ICoWy51N6KqrnXNE/view?usp=sharing" target="_blank">Forage</a>.</li>
            <li>Achieved 2nd rank on the TANCET Entrance Exam for MCA in 2023.</li>
            <li>Gemini for Data Scientists and Analysts <a href="https://www.cloudskillsboost.google/public_profiles/24bc114b-126d-44c8-9278-9216d8abf0b5/badges/12017564" target="_blank">(Completion Badge in Google Cloud Skills Boost)</a>.</li>
            <li>Develop GenAI Apps with Gemini and Streamlit <a href="https://www.credly.com/badges/8eee7b63-f78f-47f9-a5f6-5785f9013a45/public_url" target="_blank">(Skill Badge in Google Cloud Skills Boost)</a>.</li>
            <li>Gemini for Security Engineers <a href="https://www.cloudskillsboost.google/public_profiles/24bc114b-126d-44c8-9278-9216d8abf0b5/badges/12085957" target="_blank">(Skill Badge in Google Cloud Skills Boost)</a>.</li>
            <li>HackOn with Amazon <a href="https://unstop.com/certificate-preview/988f8b60-48d6-4eaa-8e82-64e5f05f8427?utm_campaign=site-emails" target="_blank">(Unstop)</a>.</li>
        </ul>
    </div>
</div>


      <footer className="footer">
        <ParticalBg id="particles-section6" />
        <a href="https://github.com/abhikay18" target="_blank">GitHub</a>
        <a href="http://www.linkedin.com/in/abhikay18" target="_blank">LinkedIn</a>
        <a href="mailto:abhishek.kay18@gmail.com" target="_blank">Email</a>
        <a href="https://drive.google.com/file/d/1fn2h7z-7w1I4cXLf0_-o7aTD1QkCxGjk/view?usp=sharing" target="_blank">Resume</a>
      </footer>
    </div>
  );
};

// App Component
const App = () => {
  const [showMain, setShowMain] = useState(false);
  const [initialImagePosition, setInitialImagePosition] = useState(null);
  const [transitionComplete, setTransitionComplete] = useState(false);


  const handleIntroComplete = (imageRect) => {
    setInitialImagePosition(imageRect);
    setShowMain(true);
  };

  const handleTransitionComplete = () => {
    setTransitionComplete(true);
  };


  return (
    <div className="app">
      {!transitionComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      {showMain && (
        <MainWebsite
          initialImagePosition={initialImagePosition}
          onTransitionComplete={handleTransitionComplete}
        />
      )}
    </div>
  );
};


export default App;