import React from 'react'

const Footer = () => {
    return (
        <footer class="footer-wrapper footer-tblayout8" data-bg-src="assets/img/bg/footer-bg-tb8.jpg">
            <div class="overlay"></div>
            <img src="assets/img/shape/tb8-shape-10.png" alt="shape" class="shape position-absolute top-0 start-0" />
            <div class="footer-top">
                <div class="container">
                    <div class="footer-top-wrap">
                        <div class="row g-4 align-items-center justify-content-between">
                            <div class="col-sm-auto">
                                <div class="footer-top-logo">
                                    <a href="index.html"><img src="assets/img/logo-white.png" alt="TechBiz"
                                        class="logo" /></a>
                                </div>
                            </div>
                            <div class="col-sm-auto">
                                <div class="footer-social">
                                    <a href="https://www.facebook.com/ozarkandco/"><i class="fab fa-facebook-f"></i></a>
                                    <a href="https://in.linkedin.com/company/the-ozark-co?trk=public_profile_topcard-current-company"><i class="fab fa-linkedin"></i></a>
                                    <a href="https://www.instagram.com/ozarkandco/"><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-md-6 col-lg-4 col-xl-auto">
                            <div class="widget footer-widget">
                                <h3 class="widget_title">About Us</h3>
                                <div class="vs-widget-about">
                                    <p class="footer-text">We safeguard the secrecy of the data with greatest care so as to entail best quality output in record time for our clients.</p>
                                    <form class="newsletter-form2">
                                        <input class="form-control" type="email" placeholder="Your Email Address" />
                                        <button type="submit" class="vs-btn mask-style1">
                                            <i class="far fa-angle-right"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-auto">
                            <div class="widget widget_nav_menu  footer-widget">
                                <h3 class="widget_title">Service Links</h3>
                                <div class="menu-all-pages-container">
                                    <ul class="menu">
                                        <li><a href="service.html">Accounts & Taxation</a></li>
                                        <li><a href="service.html">Finance</a></li>
                                        <li><a href="service.html">IT Services</a></li>
                                        <li><a href="service.html">Other Services</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-auto">
                            <div class="widget widget_nav_menu  footer-widget">
                                <h3 class="widget_title">Quick Links</h3>
                                <div class="menu-all-pages-container">
                                    <ul class="menu">
                                        <li><a href="about-us.html">About</a></li>
                                        <li><a href="contact.html">Contact</a></li>
                                        <li><a href="terms.html">Terms & Conditions</a></li>
                                        <li><a href="privay.html">Privacy Policy</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-auto">
                            <div class="widget footer-widget v2">
                                <h4 class="widget_title">Connect Us</h4>
                                <div class="footer-info-list">
                                    <p class="info"><i class="fal fa-map-marker-alt"></i>846/1, Ghitorni, Nr. Metro Pillar-115, Delhi-110030</p>
                                    <p class="info"><i class="fal fa-envelope"></i>
                                        <a href="mailto:info@theozarkco.com">info@theozarkco.com</a>
                                    </p>
                                    <p class="info">
                                        <i class="fal fa-phone-alt"></i>
                                        <a href="tel:+917982760010">+91-7982760010</a>
                                    </p>
                                </div>
                            </div>
                            <div class="widget-image">
                                <img src="assets/img/contact/contact-8-1.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="copyright-wrap">
                <div class="container">
                    <p class="copyright-text">Copyright <i class="fal fa-copyright"></i> 2024 <a class="text-white"
                        href="index.html"> By The Ozark & Co.</a> || All Rights Reserved || Design & Developed By <a class="text-white"
                            href="https://www.coderworldlabs.com/"> CWL Technology Pvt. Ltd.</a></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer