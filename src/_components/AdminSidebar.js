"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Menu() {
  const router = useRouter();
  const currentPath = router.pathname;

  const [activeId, setActiveId] = useState(null);
  const handleMenu = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id)); // Toggle the active state
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
                <a href="#" onClick={() => handleMenu(1)}>
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Category
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul className={activeId === 1 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                  <li>
                    <Link href="/admin/category/create">
                      <i className="metismenu-icon"></i>
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/category/view">
                      <i className="metismenu-icon"></i>
                      View
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#" onClick={() => handleMenu(2)}>
                  <i className="metismenu-icon pe-7s-diamond"></i>
                  Subcategory
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul className={activeId === 2 ? 'mm-collapse mm-show' : 'mm-collapse'}>
                  <li>
                    <Link href="/admin/subcategory/create">
                      <i className="metismenu-icon"></i>
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/subcategory/view">
                      <i className="metismenu-icon"></i>
                      View
                    </Link>
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