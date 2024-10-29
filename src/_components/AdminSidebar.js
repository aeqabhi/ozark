"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Menu() {
  const router = useRouter();
  const currentPath = router.pathname;

  const [activeId, setActiveId] = useState(null);
  const [activeSubId, setActiveSubId] = useState(null);

  const handleMenu = (id) => {
    console.log(id);
    setActiveId((prevId) => (prevId === id ? null : id)); // Toggle the active state
  };

  const handleSubMenu = (id) => {
    setActiveSubId((prevId) => (prevId === id ? null : id)); // Toggle sub-dropdown
  };

  return (
    <>
      <div className="app-sidebar sidebar-shadow">
        <div className="app-header__logo">
          <div className="logo-src"></div>
          <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                className="hamburger close-sidebar-btn hamburger--elastic"

              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              className="hamburger hamburger--elastic mobile-toggle-nav"

            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              type="button"
              className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
            >
              <span className="btn-icon-wrapper">
                <i className="fa fa-ellipsis-v fa-w-6"></i>
              </span>
            </button>
          </span>
        </div>
        <div className="scrollbar-sidebar ps--active-y">
          <div className="app-sidebar__inner">
            <ul className="vertical-nav-menu mt-4">
              {/* <li className="app-sidebar__heading">Dashboards</li> */}
              <li>
                <Link href="/admin" className={currentPath === '/backend' ? 'mm-active' : ''}>
                  {/* <i className="metismenu-icon pe-7s-rocket"></i> */}
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Dashboard
                </Link>
              </li>

              <li>
                <a href="#" onClick={() => handleMenu(6)}>
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Banner
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul className={activeId === 6 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                  <li>
                    <Link href="/admin/banner/create">
                      <i className="metismenu-icon"></i>
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/banner/view">
                      <i className="metismenu-icon"></i>
                      View
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#" onClick={() => handleMenu(5)}>
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Services
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul className={activeId === 5 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                  <li>
                    <Link href="/admin/services/create">
                      <i className="metismenu-icon"></i>
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/services/view">
                      <i className="metismenu-icon"></i>
                      View
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#" onClick={() => handleMenu(7)}>
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  About us
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>

                <ul className={activeId === 7 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                  <li>
                    <Link href="/admin/about-us/our-story">
                      <i className="metismenu-icon"></i>
                      Our story
                    </Link>
                  </li>

                  <li>
                    <a href="#" onClick={() => handleSubMenu(8)}>
                      <i className="metismenu-icon pe-7s-diamond"></i>
                      Leadership team
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                    </a>
                    <ul className={activeSubId === 8 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                      <li>
                        <Link href="/admin/about-us/team/create">
                          <i className="metismenu-icon"></i>
                          Create
                        </Link>
                      </li>
                      <li>
                        <Link href="/admin/about-us/team/view">
                          <i className="metismenu-icon"></i>
                          View
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link href="/admin/about-us/vision-and-values">
                      <i className="metismenu-icon"></i>
                      Vision & Values
                    </Link>
                  </li>

                  <li>
                    <a href="#" onClick={() => handleSubMenu(9)}>
                      <i className="metismenu-icon pe-7s-diamond"></i>
                      Partners
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                    </a>
                    <ul className={activeSubId === 9 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                      <li>
                        <Link href="/admin/about-us/team">
                          <i className="metismenu-icon"></i>
                          Create
                        </Link>
                      </li>
                      <li>
                        <Link href="/admin/services/view">
                          <i className="metismenu-icon"></i>
                          View
                        </Link>
                      </li>
                    </ul>
                  </li>

                </ul>
              </li>

              <li>
                <a href="#" onClick={() => handleMenu(3)}>
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Testimonials
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul className={activeId === 3 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                  <li>
                    <Link href="/admin/testimonials/create">
                      <i className="metismenu-icon"></i>
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/testimonials/view">
                      <i className="metismenu-icon"></i>
                      View
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#" onClick={() => handleMenu(4)}>
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Blogs
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul className={activeId === 4 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                  <li>
                    <Link href="/admin/blogs/create">
                      <i className="metismenu-icon"></i>
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/blogs/view">
                      <i className="metismenu-icon"></i>
                      View
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link href="/admin/enquiry" className={currentPath === '/backend' ? 'mm-active' : ''}>
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Enquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}