"use client";

import { useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import Link from "next/link";
import axios from "axios";
import { BASE_URL } from "@/_config/config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function page() {
  const [testimonialsData, setTestimonialsData] = useState();

  useEffect(() => {
    getTestimonialsData();
  }, [])

  const getTestimonialsData = async () => {
    const res = await axios.get(`${BASE_URL}/testimonials/get_testimonials`);
    if (res.data.status === 1) {
      setTestimonialsData(res.data.data);
    }
  }

  useEffect(() => {
    if (testimonialsData) {
      new DataTable("#myTable");
    }
  }, [testimonialsData]);


  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure !",
        icon: "warning",
        width: "400px",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        showConfirmButton: true,
        confirmButtonText: "Delete",
        allowOutsideClick: false,
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-secondary"
        }
      })

      if (result.isConfirmed) {
        const res = await axios.post(`${BASE_URL}/testimonials/delete_testimonials`, { id: id })
        if (res.data.status === 1) {
          toast.success(res.data.message);
          setTestimonialsData(res.data.data);
        } else {
          toast.err(res.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangeStatus = async (id, status) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure !",
        icon: "warning",
        width: "400px",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        showConfirmButton: true,
        confirmButtonText: `${status ? "Decticate" : "Activate"}`,
        allowOutsideClick: false,
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-secondary"
        }
      })

      if (result.isConfirmed) {
        const res = await axios.post(`${BASE_URL}/testimonials/change_status`, { id: id, status: status });
        console.log(res.data);
        if (res.data.status === 1) {
          // toast.success(res.data.message);
          setTestimonialsData(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="app-main__inner">

        <div className="row">
          <div className="col-md-12 col-xl-12">
            <div className="main-card mb-3 card">
              <div className="card-header">
                View Testimonial

              </div>
              <div className="table-responsive">
                <table
                  id="myTable"
                  className="align-middle mb-0 table table-borderless table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Name</th>
                      <th className="">Designation</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      testimonialsData?.map((ele, ind) =>
                        <tr>
                          <td className="text-center text-muted">#{ind + 1}</td>
                          <td>{ele.name}</td>
                          <td>{ele.designation}</td>

                          <td className="text-center">
                            {
                              ele.status === true ? <div className="badge badge-warning" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Active</div> : <div className="badge badge-secondary" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Inactive</div>
                            }

                          </td>
                          <td className="text-center">
                            <Link href={{
                              pathname: "/admin/testimonials/edit",
                              query: { id: ele._id }
                            }} className="btn btn-primary btn-sm mr-2">Edit</Link>
                            <Link href="#" className="btn btn-danger btn-sm" onClick={() => handleDelete(ele._id)}>Delete</Link>
                          </td>
                        </tr>)
                    }




                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
