"use client"

import "@/_style/admin.css"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function AdminLoginLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
