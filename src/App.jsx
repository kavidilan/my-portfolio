import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, Menu, X, Briefcase, User, Code, Star, ArrowRight } from 'lucide-react';
import myimage from './assets/myimage.jpg';
import harvestlanka from './assets/harvestlanka.png';
import echanneling from './assets/echanneling.jpg';
import CultureKart from './assets/CultureKart.png';
import Top5AI from './assets/Top5AI.png';
import spotify from './assets/spotify.png';
// --- Particle Animation Component ---
// This creates the animated background for the hero section
const ParticleCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const mouse = {
            x: null,
            y: null,
            radius: 100
        };

        window.addEventListener('mousemove', event => {
            mouse.x = event.x;
            mouse.y = event.y;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < mouse.radius + this.size){
                    if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                        this.x += 5;
                    }
                    if(mouse.x > this.x && this.x > this.size * 10){
                        this.x -= 5;
                    }
                     if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                        this.y += 5;
                    }
                    if(mouse.y > this.y && this.y > this.size * 10){
                        this.y -= 5;
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        const init = () => {
            particles = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - 0.2;
                let directionY = (Math.random() * .4) - 0.2;
                let color = 'rgba(139, 92, 246, 0.5)';
                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
        };
        
        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                                 + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    if (distance < (canvas.width/7) * (canvas.height/7)) {
                        opacityValue = 1 - (distance/20000);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        resizeCanvas();
        init();
        animate();
        
        window.addEventListener('resize', () => {
          resizeCanvas();
          init();
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', () => {});
            window.removeEventListener('mouseout', () => {});
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, width: '100%', height: '100%' }} />;
};


// Main App Component
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sections = ['home', 'about', 'projects', 'skills', 'contact'];
  
  // Effect for scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  // Effect to handle scroll-based active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentSection = 'home';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop) {
          currentSection = sectionId;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  
  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gray-900 text-gray-300 font-sans leading-relaxed tracking-wide">
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .nav-link::after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: #6D28D9;
          transition: width .3s;
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
      `}</style>
      <Header 
        sections={sections} 
        activeSection={activeSection} 
        onNavClick={handleNavClick}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main>
        <HomeSection onNavClick={handleNavClick} />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer onNavClick={handleNavClick} />
    </div>
  );
}

// Header and Navigation
const Header = ({ sections, activeSection, onNavClick, isMenuOpen, setIsMenuOpen }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const NavLinks = ({ className }) => (
        <nav className={`flex flex-col lg:flex-row gap-6 lg:gap-8 ${className}`}>
            {sections.map(section => (
                <a
                    key={section}
                    href={`#${section}`}
                    onClick={(e) => { e.preventDefault(); onNavClick(section); }}
                    className={`nav-link capitalize font-medium text-lg lg:text-base transition-colors hover:text-indigo-400 ${activeSection === section ? 'active text-indigo-400' : 'text-gray-300'}`}
                >
                    {section}
                </a>
            ))}
        </nav>
    );

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" onClick={(e) => { e.preventDefault(); onNavClick('home') }} className="text-2xl font-bold text-white flex items-center gap-2 z-50">
                    <Code className="text-indigo-500"/>
                    <span>Kav.D</span>
                </a>
                <div className="hidden lg:flex">
                    <NavLinks />
                </div>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white z-50">
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
            {/* Mobile Menu */}
            <div className={`lg:hidden fixed top-0 left-0 w-full h-full bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="h-full flex flex-col items-center justify-center">
                    <NavLinks className="text-center" />
                </div>
            </div>
        </header>
    );
};

// Section: Home
const HomeSection = ({onNavClick}) => (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
        <ParticleCanvas />
        <div className="container mx-auto px-6 z-10">
            <div className="max-w-3xl">
                <p className="text-lg text-indigo-400 mb-2 fade-in" style={{animationDelay: '100ms'}}>Hi, my name is</p>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 fade-in" style={{animationDelay: '200ms'}}>
                    Kavishka Dilshan.
                </h1>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-400 mb-8 fade-in" style={{animationDelay: '300ms'}}>
                    I build things for the web.
                </h2>
                <p className="text-lg max-w-xl text-gray-400 mb-10 fade-in" style={{animationDelay: '400ms'}}>
                    I'm passionate about technology and enjoy exploring how it can be used to solve real-world problems. I'm currently focused on learning web development and building meaningful, user-centered digital experiences.
                </p>
                <div className="fade-in" style={{animationDelay: '500ms'}}>
                    <a
                        href="#projects"
                        onClick={(e) => {e.preventDefault(); onNavClick('projects')}}
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg shadow-lg transform hover:scale-105"
                    >
                        Check out my work <ArrowRight />
                    </a>
                </div>
            </div>
        </div>
    </section>
);


// Section: About
const AboutSection = () => (
    <section id="about" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-white fade-in">
                <span className="text-indigo-400">01.</span> About Me
            </h2>
            <div className="grid lg:grid-cols-5 gap-12 items-center fade-in">
                <div className="lg:col-span-3 text-lg text-gray-400 space-y-6">
                    <p>
                       Hello! I'm Kavishka Dilshan, an enthusiastic Information Technology undergraduate passionate about exploring technology and building meaningful digital experiences. My journey into web development is ongoing, and I am continuously learning and improving my skills in frontend and related technologies..
                    </p>
                    <p>
                        I enjoy tackling challenges and expanding my knowledge in areas like web development and software solutions that can solve real-world problems. My aim is to develop clean, accessible, and user-centered applications that have a positive impact.
                    </p>
                     <p> Here are a few technologies I've been working with recently: </p>
                    <ul className="grid grid-cols-2 gap-2 text-gray-300">
                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-400"/> React</li>
                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-400"/> Java</li>
                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-400"/>Kotlin </li>
                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-400"/> Node.js</li>
                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-400"/> Tailwind CSS</li>
                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-400"/> Figma </li>
                    </ul>
                </div>
                <div className="lg:col-span-2 flex justify-center lg:justify-end">
                    <div className="relative w-72 h-72 group">
                        <div className="absolute inset-0 bg-indigo-600 rounded-lg transform transition duration-500 group-hover:rotate-6 group-hover:scale-105"></div>
                        <div className="absolute inset-0 border-2 border-indigo-400 rounded-lg transform rotate-6 transition duration-500 group-hover:rotate-0 group-hover:scale-100"></div>
                        <img 
                            src={myimage} 
                            alt="Kavishka Dilshan" 
                            className="relative w-full h-full object-cover rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Section: Projects
const ProjectsSection = () => {
    const projects = [
        {
         "title": "Harvest Lanka – Digital Marketplace Management System",
         "description": "A web application enabling farmers to connect with shop owners and sell crops directly without intermediaries. Built as an ITP project in 2025 using the MERN stack.",
         "tags": ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "MERN Stack", "Jira"],
         "imageUrl": harvestlanka,
         "liveUrl": "#",
         "codeUrl": "https://github.com/kavidilan/Digital-Marketplace-Havest-Lanka"
  },

       {
           "title": "Online e-Channeling System (Project - 2024)",
           "description": "Developed a web application that allows patients to book appointments with doctors online, manage schedules, and receive  real-time notifications. Implemented user authentication, role-based access (admin, doctor, patient), and responsive UI for better     accessibility.",
           "tags": ["Java", "HTML", "CSS", "GitHub"],
           "imageUrl": echanneling,
           "liveUrl": "#",
           "codeUrl": "https://github.com/kavidilan/Online-echanneling-system"
 },
        {
         "title": "CultureKart – (Project - 2025)",
         "description": "A collaborative Kanban-style project management app built with React. Users can create boards, lists, and cards to  organize tasks and track progress in real-time.",
         "tags": ["React", "GitHub", "Kanban", "Project Management"],
         "imageUrl": CultureKart,
         "liveUrl": "#",
         "codeUrl": "https://github.com/kavidilan/CultureKart"
}

    ];
return (
  <section id="projects" className="py-24 bg-gray-900/50">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-16 text-white fade-in">
        <span className="text-indigo-400">02.</span> Some Things I've Built
      </h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-12">
        {projects.map((project, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 fade-in">

            {/* Project Image Container */}
            <div
              className={`relative md:col-span-5 flex justify-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
            >
              <div className="relative w-72 h-72 group">
                <div className="absolute inset-0 bg-indigo-600 rounded-lg transform transition duration-500 group-hover:rotate-6 group-hover:scale-105"></div>
                <div className="absolute inset-0 border-2 border-indigo-400 rounded-lg transform rotate-6 transition duration-500 group-hover:rotate-0 group-hover:scale-100"></div>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="relative w-full h-full object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>

            {/* Project Details */}
            <div
              className={`md:col-span-7 z-10 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
            >
              <p className="text-indigo-400 mb-1 tracking-wide text-sm">Featured Project</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-3">{project.description}</p>

              {/* Project Tags */}
              <div className={`flex flex-wrap gap-3 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                {project.tags.map(tag => (
                  <span key={tag} className="text-gray-400 text-sm">{tag}</span>
                ))}
              </div>

              {/* Links */}
              <div className={`flex items-center gap-4 mt-4 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-indigo-400 transition-colors"><Github size={24}/></a>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-indigo-400 transition-colors"><ArrowRight size={24}/></a>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  </section>
);





};


// Section: Skills
const SkillsSection = () => {
    const skills = ["React", "Node.js", "Tailwind CSS", "HTML", "CSS", "Java","JavaScript","Git & GitHub", "Figma","Jira", "Power BI"];

   const blogs = [
  {
    title: "Top 5 AI Tools for Developers in 2025",
    url: "https://medium.com/@kavishkadilshan0626/top-5-ai-tools-for-developers-in-2025-96b14c0787a1",
    description: "Explore the top AI tools every developer should know in 2025, from GitHub Copilot to Codeium.",
    image: Top5AI,
  },
  {
    title: "Spotify’s Responsible AI Initiative: Where Music Meets Ethics",
    url: "https://medium.com/@kavishkadilshan0626/spotifys-responsible-ai-initiative-where-music-meets-ethics-dd94c704ad66",
    description: "How Spotify is leveraging AI responsibly in collaboration with major music labels to reshape the music industry.",
    image: spotify,
  },
  {
    title: "Building a Portfolio Website from Scratch",
    url: "https://medium.com/@yourusername/building-a-portfolio",
    description: "Step-by-step guide for creating a modern developer portfolio.",
    image: 'https://via.placeholder.com/400x200.png?text=Portfolio+Guide'
  }
];

    return (
        <section id="skills" className="py-24 bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-white fade-in">
                    <span className="text-indigo-400">03.</span> My Skills & Blogs
                </h2>

                {/* Skills Grid */}
                <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center fade-in mb-16">
                    {skills.map(skill => (
                        <div key={skill} className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 hover:-translate-y-1 transition-all duration-300">
                            <p className="font-semibold text-gray-300">{skill}</p>
                        </div>
                    ))}
                </div>

                {/* Blog Cards */}
                <div className="max-w-6xl mx-auto fade-in">
                    <h3 className="text-2xl font-bold mb-8 text-white text-center">My Blog Posts</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog, index) => (
                            <a key={index} href={blog.url} target="_blank" rel="noopener noreferrer" className="group block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="p-5">
                                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400">{blog.title}</h4>
                                    <p className="text-gray-400 text-sm">{blog.description}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


// Section: Contact
const ContactSection = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            form.reset();
            setTimeout(() => setStatus(''), 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-24">
            <div className="container mx-auto px-6 max-w-2xl text-center fade-in">
                <h2 className="text-4xl font-bold mb-4 text-white">
                    <span className="text-indigo-400">04.</span> What's Next?
                </h2>
                <h3 className="text-4xl font-bold text-white mb-4">Get In Touch</h3>
                <p className="text-gray-400 mb-12 text-lg">
                    I'm currently open to new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll get back to you!
                </p>

                <a href="mailto:johndoe@example.com" className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg shadow-lg transform hover:scale-105">
                    Say Hello
                </a>
            </div>
        </section>
    );
};

// Footer
const Footer = ({ onNavClick }) => (
    <footer className="text-center py-8 px-4">
        <div className="flex justify-center space-x-6 mb-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Github size={24} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Linkedin size={24} />
            </a>
            <a href="mailto:johndoe@example.com" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Mail size={24} />
            </a>
        </div>
        
    </footer>
);
