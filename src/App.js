import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const lightTheme = {
  background: '#f4f4f4',
  text: '#333',
  headerBackground: '#fff',
  headerText: '#333',
  link: '#007BFF',
  sectionBackground: '#fff',
  sectionBorder: '#333',
  footerBackground: '#333',
  footerText: '#fff',
  navBackground: '#fff',
  navBorder: '#333',
};

const darkTheme = {
  background: '#121212',
  text: '#e0e0e0',
  headerBackground: '#1e1e1e',
  headerText: '#e0e0e0',
  link: '#4e89c7',
  sectionBackground: '#1e1e1e',
  sectionBorder: '#4e89c7',
  footerBackground: '#000',
  footerText: '#bbb',
  navBackground: '#1e1e1e',
  navBorder: '#4e89c7',
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s, color 0.3s;
  }
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.headerBackground};
  color: ${({ theme }) => theme.headerText};
  padding: 0.5em 1em;
  text-align: center;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s;
  
  @media (max-width: 768px) {
    padding: 0.5em;
  }
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 1.5em;
  
  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const P = styled.p`
  margin: 0;
  font-size: 1em;
  
  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const Nav = styled.nav`
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
  align-items: center;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    margin: 0;
    transition: opacity 0.3s ease-in-out;

    li {
      margin: 0 1em;

      a {
        color: ${({ theme }) => theme.text};
        text-decoration: none;
        padding: 0.5em;
        border: 1px solid ${({ theme }) => theme.navBorder};
        border-radius: 5px;
        transition: background-color 0.3s, color 0.3s;

        &:hover {
          background-color: ${({ theme }) => theme.link};
          color: #fff;
        }
      }
    }
  }

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.text};
    font-size: 1.5em;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 20px;
  }

  @media (max-width: 768px) {
    button {
      font-size: 1.2em;
      top: 10px;
      right: 10px;
    }

    ul {
      display: ${props => (props.menuOpen ? 'flex' : 'none')};
      flex-direction: column;
      position: absolute;
      top: 60px;
      right: 0;
      background: ${({ theme }) => theme.navBackground};
      width: 100%;
      border-radius: 5px;
    }
    
    li {
      margin: 0;
      text-align: center;
    }
  }
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Section = styled.section`
  background: ${({ theme }) => theme.sectionBackground};
  margin: 1em 0;
  padding: 1em;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  border-left: 5px solid ${({ theme }) => theme.sectionBorder};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  opacity: 1;
  transform: translateY(0);

  &.fade {
    opacity: 0;
    transform: translateY(20px);
  }

  @media (max-width: 768px) {
    padding: 0.5em;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1em 0;
  background-color: ${({ theme }) => theme.footerBackground};
  color: ${({ theme }) => theme.footerText};
  transition: background-color 0.3s, color 0.3s;

  @media (max-width: 768px) {
    padding: 0.5em 0;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.2em;
  cursor: pointer;
  position: absolute;
  top: 15px;
  left: 20px;

  @media (max-width: 768px) {
    font-size: 1em;
    left: 10px;
    top: 10px;
  }
`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('fade');
        } else {
          entry.target.classList.add('fade');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      observer.observe(section);
    });
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Header>
        <H1>Pranav J.S.</H1>
        <P>Full Stack Developer</P>
        <Nav menuOpen={menuOpen}>
          <button onClick={toggleMenu}>&#9776;</button>
          <ul>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About Me</a></li>
            <li><a href="#interests" onClick={() => setMenuOpen(false)}>Interests & Hobbies</a></li>
            <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact Me</a></li>
          </ul>
        </Nav>
        <Button onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
      </Header>
      <Container>
        <Section id="about" className="section">
          <h2>About Me</h2>
          <P>
            I am a passionate developer with 2.5 years experience in the IT industry and have worked with technologies and programming languages like C#, ASP.NET, frontend frameworks like React and Angular, and database technologies like SQL. I also have experience with NoSQL databases like MongoDB and have expertise in CI/CD pipelines, deploying, creating, and releasing pipelines in Azure DevOps.
          </P>
        </Section>
        <Section id="projects" className="section">
          <h2>Projects</h2>
          <h3>Movie Ticket Booking</h3>
          <P><strong>Technology used:</strong> React, DotNet Web API 6, MongoDB, GitHub Actions, C#</P>
          <P>This application was designed to have users based on the role of the user and users will be logged in based on the role (Admin & Normal User). Implementation of end-to-end JWT Authentication and Authorization across multiple platforms, ensuring seamless user authentication, secure content access, and token validity, and improved overall system integrity. The application includes functionality allowing the admin to add, remove, and manage movies in their theater screens. Users can select the theater and the movies to book their tickets.</P>
        </Section>
        <Section id="interests" className="section">
          <h2>Interests & Hobbies</h2>
          <ul>
            <li>Playing indoor and outdoor games</li>
            <li>Video games</li>
            <li>Chess</li>
            <li>Photography</li>
            <li>Video editing</li>
          </ul>
        </Section>

        <Section id="contact" className="section">
          <h2>Contact Me</h2>
          <P>Email: <a href="mailto:pranavjs2610@gmail.com">pranavjs2610@gmail.com</a></P>
          <P>Phone: <a href="tel:6381520133">6381520133</a></P>
          <P>LinkedIn: <a href="https://www.linkedin.com/in/pranav-js" target="_blank" rel="noopener noreferrer">linkedin.com/in/pranav-js</a></P>
        </Section>
      </Container>
      <Footer>
        <P>&copy; 2024 Pranav J.S. All rights reserved.</P>
      </Footer>
    </ThemeProvider>
  );
}

export default App;
