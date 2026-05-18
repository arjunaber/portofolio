import React, { useState, useEffect, useCallback } from "react";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Mengambil semua section yang punya ID
    const sections = document.querySelectorAll("section[id]");

    const observerOptions = {
      root: null,
      // Root margin disesuaikan: -15% atas dan -45% bawah
      // supaya section dianggap aktif saat mencapai area pandang utama
      rootMargin: "-15% 0px -45% 0px",
      threshold: [0, 0.25, 0.5],
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Cukup cek isIntersecting tanpa syarat ratio yang terlalu ketat
        // agar tidak bentrok dengan rootMargin
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  // Helper function dengan useCallback agar efisien
  const navLinkClass = useCallback(
    (id) =>
      activeSection === id ? "nav-link scrollto active" : "nav-link scrollto",
    [activeSection],
  );

  return (
    <header id="header" className="d-flex flex-column">
      <div className="profile">
        <img
          src="/assets/img/profile-img.jpg"
          alt="Arjunaber"
          className="img-fluid rounded-circle"
          style={{
            width: "50%",
            maxWidth: "300px",
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
        />
        <h1 className="text-light">
          <a href="#">Arjunaber</a>
        </h1>
        <div className="social-links mt-3 text-center">
          <a
            href="https://www.instagram.com/arjunaber/"
            target="_blank"
            rel="noreferrer"
            className="instagram"
          >
            <i className="bx bxl-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/arjunaber"
            target="_blank"
            rel="noreferrer"
            className="linkedin"
          >
            <i className="bx bxl-linkedin"></i>
          </a>
          <a
            href="https://github.com/arjunaber"
            target="_blank"
            rel="noreferrer"
            className="github"
          >
            <i className="bx bxl-github"></i>
          </a>
        </div>
      </div>

      <nav id="navbar" className="nav-menu navbar">
        <ul>
          <li>
            <a href="#hero" className={navLinkClass("hero")}>
              <i className="bx bx-home"></i> <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#about" className={navLinkClass("about")}>
              <i className="bx bx-user"></i> <span>About</span>
            </a>
          </li>
          <li>
            <a href="#resume" className={navLinkClass("resume")}>
              <i className="bx bx-file-blank"></i> <span>Resume</span>
            </a>
          </li>
          <li>
            <a href="#portfolio" className={navLinkClass("portfolio")}>
              <i className="bx bx-book-content"></i> <span>Portfolio</span>
            </a>
          </li>
          <li>
            <a href="#contact" className={navLinkClass("contact")}>
              <i className="bx bx-envelope"></i> <span>Contact</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Sidebar;
