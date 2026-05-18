import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import Sidebar from "./Sidebar";

function App() {
  // --- STATE MANAGEMENT ---
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [heroText, setHeroText] = useState("");

  // Portfolio States
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const currentYear = new Date().getFullYear();
  const age = currentYear - 2002;

  // --- EFFECT: Efek Mengetik di Section Hero ---
  useEffect(() => {
    const words = ["a Full Stack Developer.", "a Programmer."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setHeroText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setHeroText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Berhenti sebentar di akhir kata
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      timeout = setTimeout(type, typeSpeed);
    };

    type();
    return () => clearTimeout(timeout);
  }, []);

  // --- EFFECT: Inisialisasi Google reCAPTCHA Window ---
  useEffect(() => {
    window.recaptchaCallback = (token) => setRecaptchaToken(token);
    window.recaptchaExpired = () => setRecaptchaToken("");
    return () => {
      delete window.recaptchaCallback;
      delete window.recaptchaExpired;
    };
  }, []);

  // --- DATA: Daftar Portfolio ---
  const portfolioData = [
    {
      id: 1,
      title: "AGA Smart Farming",
      category: "IOT",
      img: "assets/img/aga-farming.png",
      description:
        "Building Smart Farming and IoT solutions using Arduino IDE integrated with Laravel based web platforms. Features vision-based pest detection and real-time soil monitoring.",
      moreImages: [
        "assets/img/aga-farming.png",
        "assets/img/aga-1.png",
        "assets/img/aga-2.png",
      ],
    },
    {
      id: 2,
      title: "TAKATO.id",
      category: "WEB",
      img: "assets/img/takato.png",
      description:
        "Projects (2025): Independently designed and developed a responsive villa reservation management system and grand scheduling platform using a full-stack development approach.",
      moreImages: ["assets/img/takato.png", "assets/img/takato-1.png"],
    },
    {
      id: 3,
      title: "MyBTP V2 (Super Apps)",
      category: "WEB",
      img: "assets/img/mybtp-v2.png",
      description:
        "Projects (2025): Developed a centralized super application that integrated multiple systems and services into a single unified platform to improve accessibility and operational efficiency.",
      moreImages: ["assets/img/mybtp-v2.png", "assets/img/mybtp-v2-alt.png"],
    },
    {
      id: 4,
      title: "MyBTP V1",
      category: "WEB",
      img: "assets/img/mybtp-v1.png",
      description:
        "Projects (2024): Successfully migrated thousands of student and lecturer records from multiple Telkom University campuses into a centralized system.",
      moreImages: ["assets/img/mybtp-v1.png", "assets/img/mybtp-v1-alt.png"],
    },
    {
      id: 5,
      title: "Talentern",
      category: "WEB",
      img: "assets/img/talentern.png",
      description:
        "Projects (2023): Developed a web-based internship management system for Telkom University to manage and monitor internship students efficiently.",
      moreImages: ["assets/img/talentern.png", "assets/img/talentern-alt.png"],
    },
  ];

  // Logic untuk Auto-Slide Gambar di dalam Modal (1 detik)
  useEffect(() => {
    let interval;
    if (selectedProject && selectedProject.moreImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImgIndex((prevIndex) =>
          prevIndex === selectedProject.moreImages.length - 1
            ? 0
            : prevIndex + 1,
        );
      }, 1000); // 1000ms = 1 detik
    }
    return () => clearInterval(interval);
  }, [selectedProject]);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setCurrentImgIndex(0); // Reset index ke gambar pertama saat buka modal
  };

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Konfigurasi template EmailJS Anda
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_USER_ID")
      .then(() => {
        alert("Pesan berhasil dikirim!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error("Gagal mengirim pesan:", err);
        alert("Gagal mengirim pesan, silakan coba lagi.");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <main id="main" className="flex-grow-1">
        {/* ======= Hero Section ======= */}
        <section
          id="hero"
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="hero-container">
            <h1>Samuel Arjuna Queen Bernard</h1>
            <p>
              I'm <span className="typed">{heroText}</span>
              <span className="typed-cursor">|</span>
            </p>
          </div>
        </section>

        {/* ======= About Section ======= */}
        <section id="about" className="about">
          <div className="container">
            <div className="section-title">
              <h2>About</h2>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <img
                  src="assets/img/profile-img.jpg"
                  className="img-fluid"
                  alt="Profile"
                />
              </div>
              <div className="col-lg-8 pt-4 pt-lg-0 content">
                <h3>Full Stack Developer</h3>
                <div className="row mt-3">
                  <div className="col-lg-6">
                    <ul>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Birthday : </strong>{" "}
                        <span className="ms-2">28 May 2002</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Nationality:</strong>{" "}
                        <span className="ms-2"> Indonesian</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Phone :</strong>{" "}
                        <span className="ms-2">+62-8121-4831-823</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>City :</strong>{" "}
                        <span className="ms-2">Bandung, Indonesia</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Age :</strong>{" "}
                        <span className="ms-2">{age}</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Degree :</strong>{" "}
                        <span className="ms-2">
                          Bachelor Information Systems
                        </span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Email:</strong>{" "}
                        <span className="ms-2">arjunaaber2@gmail.com</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Job Opportunity :</strong>{" "}
                        <span
                          style={{ color: "green", fontWeight: "bold" }}
                          className="ms-2"
                        >
                          Open
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="mt-3">
                  Certified Full-Stack Developer with over 2 years of experience
                  in designing, developing, and optimizing scalable web-based
                  systems. Skilled in end-to-end application development using
                  Laravel, Python, and MySQL, with a strong focus on database
                  security, application performance, and system scalability.
                  Experienced in building Smart Farming and IoT solutions using
                  Arduino IDE integrated with Laravel based web platforms.
                  Passionate about creating efficient digital solutions that
                  deliver real-world impact and seamless user experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======= Skills Section ======= */}
        <section id="skills" className="skills section-bg">
          <div className="container">
            <div className="section-title">
              <h2>Skills</h2>
            </div>

            <div className="row skills-content">
              {/* Kolom Kiri */}
              <div className="col-lg-6">
                <div className="progress">
                  <span className="skill">
                    {" "}
                    PHP (Laravel) <i className="val">90%</i>{" "}
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>

                <div className="progress">
                  <span className="skill">
                    {" "}
                    Git <i className="val">80%</i>{" "}
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>

                <div className="progress">
                  <span className="skill">
                    {" "}
                    JavaScript <i className="val">80%</i>{" "}
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>

                <div className="progress">
                  <span className="skill">
                    {" "}
                    MySQL <i className="val">75%</i>{" "}
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>

                <div className="progress">
                  <span className="skill">
                    {" "}
                    RESTful API <i className="val">60%</i>{" "}
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="col-lg-6">
                <div className="progress">
                  <span className="skill">
                    {" "}
                    Arduino <i className="val">60%</i>{" "}
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>

                <div className="progress">
                  <span className="skill">
                    {" "}
                    Node.js <i className="val">55%</i>{" "}
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      style={{ width: "55%" }}
                    ></div>
                  </div>
                </div>

                <div className="progress">
                  <span className="skill">
                    {" "}
                    Express.js <i className="val">55%</i>{" "}
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      style={{ width: "55%" }}
                    ></div>
                  </div>
                </div>

                <div className="progress">
                  <span className="skill">
                    {" "}
                    Solidity (Web3) <i className="val">40%</i>{" "}
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>

                <div className="progress">
                  <span className="skill">
                    {" "}
                    Spring Boot <i className="val">20%</i>{" "}
                  </span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======= Resume Section ======= */}
        <section id="resume" className="resume">
          <div className="container">
            <div className="section-title">
              <h2>Resume</h2>
              <p>
                Certified Full-Stack Developer with over 2 years of experience
                in designing, developing, and optimizing scalable web-based
                systems and IoT solutions.
              </p>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <h3 className="resume-title">Summary</h3>
                <div className="resume-item pb-0">
                  <h4>Samuel Arjuna Queen Bernard</h4>
                  <p>
                    <em>
                      Full-Stack Developer skilled in end-to-end application
                      development using Laravel, Python, and MySQL, with a
                      strong focus on database security and system performance.
                    </em>
                  </p>
                  <ul>
                    <li>Jl. Bojongsoang No.26, Lengkong, Bojongsoang</li>
                    <li>+6281214831823</li>
                    <li>arjunaaber2@gmail.com</li>
                  </ul>
                </div>

                <h3 className="resume-title">Education</h3>
                <div className="resume-item">
                  <h4>Bachelor of Information Systems</h4>
                  <h5>2024 - 2026 (Expected)</h5>
                  <p>
                    <em>Telkom University, Bandung</em>
                  </p>
                  <p>GPA: 3.37 / 4.00</p>
                </div>
                <div className="resume-item">
                  <h4>Diploma in Information Systems</h4>
                  <h5>2021 - 2024</h5>
                  <p>
                    <em>Telkom University, Bandung</em>
                  </p>
                  <p>
                    GPA: 3.57 / 3.99 — <strong>Cum Laude</strong>
                  </p>
                </div>

                <h3 className="resume-title">Certifications & Key Projects</h3>
                <div className="resume-item">
                  <h4>BNSP Certified Web Developer</h4>
                  <h5>2025</h5>
                  <p>
                    <em>National Professional Certification Agency (BNSP)</em>
                  </p>
                </div>
                <div className="resume-item">
                  <h4>MyBTP V2 (Super Apps)</h4>
                  <h5>2025</h5>
                  <p>
                    Developed a centralized super application that integrated
                    multiple systems and services into a single unified platform
                    to improve accessibility and operational efficiency.
                  </p>
                </div>
                <div className="resume-item">
                  <h4>AGA Smart Farming System</h4>
                  <h5>2026</h5>
                  <p>
                    Integrated vision-based pest detection and soil moisture
                    monitoring using IoT sensors and LLMs for precision
                    agriculture.
                  </p>
                </div>
              </div>

              <div className="col-lg-6">
                <h3 className="resume-title">Professional Experience</h3>
                <div className="resume-item">
                  <h4>Full stack Developer</h4>
                  <h5>Jul 2024 - Aug 2025</h5>
                  <p>
                    <em>Bandung Techno Park - Bandung, Indonesia</em>
                  </p>
                  <ul>
                    <li>
                      Developed Intellectual Property Management modules for
                      MyBTP Superapps v2 across four campus locations.
                    </li>
                    <li>
                      Designed the system architecture for Etalasequ.com, a
                      research marketplace platform for academic initiatives.
                    </li>
                    <li>
                      Automated data analysis processes using Python to improve
                      reporting efficiency and accuracy.
                    </li>
                    <li>
                      Optimized MySQL databases to support thousands of active
                      users seamlessly.
                    </li>
                  </ul>
                </div>

                <div className="resume-item">
                  <h4>Full stack Developer (Independent Project)</h4>
                  <h5>Aug 2025 - Dec 2025</h5>
                  <p>
                    <em>TAKATO.id - Bogor, Indonesia</em>
                  </p>
                  <ul>
                    <li>
                      Independently designed and developed a responsive villa
                      reservation management system and scheduling platform.
                    </li>
                    <li>
                      Built a corporate profile website for the client’s
                      restaurant business to strengthen digital presence.
                    </li>
                    <li>
                      Managed the entire deployment process, including database
                      integration and hosting on the takato.id domain.
                    </li>
                  </ul>
                </div>

                <div className="resume-item">
                  <h4>Full stack Developer (Internship)</h4>
                  <h5>Sep 2023 - Jul 2024</h5>
                  <p>
                    <em>Techno Infinity - Bandung, Indonesia</em>
                  </p>
                  <ul>
                    <li>
                      Developed the Master Data module for the Talentern App to
                      manage internship records.
                    </li>
                    <li>
                      Performed debugging and system performance optimization to
                      ensure application stability.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======= Portfolio Section ======= */}
        <section id="portfolio" className="portfolio section-bg">
          <div className="container">
            <div className="section-title">
              <h2>Portfolio</h2>
              <p>
                A showcase of my recent work in Web Development and Internet of
                Things.
              </p>
            </div>

            {/* Filter Tabs Kontrol */}
            <div className="row mb-4">
              <div className="col-12 d-flex justify-content-center">
                <ul
                  className="list-inline text-center"
                  style={{ cursor: "pointer" }}
                >
                  <li
                    className={`list-inline-item mx-3 ${activeFilter === "ALL" ? "text-primary fw-bold text-decoration-underline" : "text-secondary"}`}
                    onClick={() => setActiveFilter("ALL")}
                  >
                    All
                  </li>
                  <li
                    className={`list-inline-item mx-3 ${activeFilter === "WEB" ? "text-primary fw-bold text-decoration-underline" : "text-secondary"}`}
                    onClick={() => setActiveFilter("WEB")}
                  >
                    Web Development
                  </li>
                  <li
                    className={`list-inline-item mx-3 ${activeFilter === "IOT" ? "text-primary fw-bold text-decoration-underline" : "text-secondary"}`}
                    onClick={() => setActiveFilter("IOT")}
                  >
                    Internet of Things
                  </li>
                </ul>
              </div>
            </div>

            {/* Grid Konten Portfolio */}
            <div className="row">
              {portfolioData
                .filter(
                  (item) =>
                    activeFilter === "ALL" || item.category === activeFilter,
                )
                .map((item) => (
                  <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                    <div className="card h-100 shadow-sm border-0">
                      <img
                        src={item.img}
                        className="card-img-top"
                        alt={item.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                          <h5 className="card-title fw-bold mb-2">
                            {item.title}
                          </h5>
                          <p className="card-text text-muted small">
                            {item.description}
                          </p>
                        </div>
                        <button
                          className="btn btn-outline-primary btn-sm mt-3 w-100"
                          onClick={() => handleOpenModal(item)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* ======= Contact Section ======= */}
        <section id="contact" className="contact section-bg">
          <div className="container">
            <div className="section-title">
              <h2>Contact</h2>
              <p>
                I'm available for new projects and collaborations. Feel free to
                reach out through any of the channels below.
              </p>
            </div>

            <div className="row justify-content-center text-center mb-5">
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="info-item-full p-3 shadow-sm rounded bg-white h-100">
                  <i className="bi bi-geo-alt fs-3 text-primary"></i>
                  <h4 className="mt-2 fw-bold small">Location</h4>
                  <p className="text-muted mb-0 small">
                    Jl. Bojongsoang No.26, Bandung, Indonesia
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="info-item-full p-3 shadow-sm rounded bg-white h-100">
                  <i className="bi bi-envelope fs-3 text-primary"></i>
                  <h4 className="mt-2 fw-bold small">Email</h4>
                  <p className="text-muted mb-0 small">arjunaaber2@gmail.com</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="info-item-full p-3 shadow-sm rounded bg-white h-100">
                  <i className="bi bi-phone fs-3 text-primary"></i>
                  <h4 className="mt-2 fw-bold small">Call</h4>
                  <p className="text-muted mb-0 small">+62 812 1483 1823</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="info-item-full p-3 shadow-sm rounded bg-white h-100">
                  <i className="bi bi-linkedin fs-3 text-primary"></i>
                  <h4 className="mt-2 fw-bold small">LinkedIn</h4>
                  <p className="mb-0 small">
                    <a
                      href="https://linkedin.com/in/arjunaber"
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      arjunaber
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ======= Footer ======= */}
      <footer id="footer">
        <div className="container">
          <div className="copyright">© Copyright {currentYear}</div>
          <div className="credits">Maintained by ARJUNABER</div>
        </div>
      </footer>

      {/* ======= Project Detail Modal (Auto-Slide Images) ======= */}
      {selectedProject && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <h5 className="modal-title fw-bold">{selectedProject.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProject(null)}
                  style={{
                    border: "none",
                    background: "none",
                    fontSize: "1.5rem",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div
                  className="text-center mb-3"
                  style={{
                    height: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <img
                    src={selectedProject.moreImages[currentImgIndex]}
                    className="img-fluid rounded"
                    alt={`${selectedProject.title} step`}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                {/* Indikator Titik Slideshow */}
                <div className="d-flex justify-content-center mb-3">
                  {selectedProject.moreImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`mx-1 rounded-circle ${idx === currentImgIndex ? "bg-primary" : "bg-secondary"}`}
                      style={{
                        width: "10px",
                        height: "10px",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                      onClick={() => setCurrentImgIndex(idx)}
                    ></span>
                  ))}
                </div>
                <h6 className="fw-bold">
                  Category:{" "}
                  <span className="badge bg-secondary ms-1">
                    {selectedProject.category}
                  </span>
                </h6>
                <p className="mt-3 text-muted" style={{ lineHeight: "1.6" }}>
                  {selectedProject.description}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
