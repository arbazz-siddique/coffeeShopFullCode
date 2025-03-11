import React from 'react'


const  AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="section-content">
        <div className="about-image-wrapper">
        <img src={"./about-image.jpg"} alt="About" className="about-image" />
          
        </div>
        <div className="about-details">
          <h2 className="section-title">About Us</h2>
          <p className="text">
            At Coffee House in Kathmandu, Nepal, we pride ourselves on being a go-to destination for coffee lovers and conversation seekers alike. We're dedicated to providing an exceptional coffee experience in a cozy and inviting atmosphere, where guests can relax, unwind, and enjoy their time in comfort.
          </p>
          <div className="social-link-list">
            <a href="#" className="social-link">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection