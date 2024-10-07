"use client";

import { BASE_URL } from "@/_config/config";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "simple-datatables";
import Swal from "sweetalert2";

export default function page() {

  const [data, setData] = useState();

  useEffect(() => {
    getCategoryData();
  }, [])

  const getCategoryData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/category/get_all_categories`);
      if (res.data.status === 1) {
        setData(res.data.data)
      }
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    if (data) {
      new DataTable("#myTable");
    }
  }, [data]);


  const handleDelete = async (id) => {

    const result = await Swal.fire({
      icon: "warning",
      width: "400px",
      title: "Are you sure?",
      allowOutsideClick: false,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Delete",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-secondary",
      }
    })

    if (result.isConfirmed) {
      try {
        const res = await axios.post(`${BASE_URL}/category/delete_category`, {
          id: id
        })
        if (res.data.status === 1) {
          toast.success(res.data.message);
          setData(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleChangeStatus = async (id, status) => {
    const result = await Swal.fire({
      icon: "warning",
      width: "400px",
      title: "Are you sure?",
      allowOutsideClick: false,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: `${status === true ? "Deactivate" : "Activate"}`,
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-secondary",
      }
    })
    if (result.isConfirmed) {
      try {
        const res = await axios.post(`${BASE_URL}/category/change_status`, {
          id: id,
          status: status
        })
        if (res.data.status === 1) {
          setData(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <div className="app-main__inner">

        <div className="row">
          <div className="col-md-12 col-xl-12">
            <div className="main-card mb-3 card">
              <div className="card-header">
                View Categories

              </div>
              <div className="table-responsive">
                <table
                  id="myTable"
                  className="align-middle mb-0 table table-borderless table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th className="text-center">sr. no.</th>
                      <th className="">Category</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data?.map((ele, ind) => (
                        <tr>
                          <td className="text-center text-muted">#{ind + 1}</td>
                          <td>
                            <div className="widget-heading "></div>
                            {ele.category_name}
                          </td>
                          <td className="text-center">
                            {
                              ele.status === true ? <div className="badge badge-warning" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Active</div> : <div className="badge badge-secondary" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Inactive</div>
                            }

                          </td>
                          <td className="text-center">
                            <Link href={{
                              pathname: "/admin/category/edit",
                              query: { id: ele._id }
                            }} className="btn btn-primary btn-sm mr-2">Edit</Link>
                            <Link href="#" className="btn btn-danger btn-sm  mr-2" onClick={() => handleDelete(ele._id)}>Delete</Link>
                            {/* {
                              ele.status === true ? <Link href="#" className="btn btn-outline-success btn-sm" onClick={() => handleStatus(ele._id, ele.status)}><i class="fas fa-check" ></i></Link> :
                                <Link href="#" className="btn btn-outline-danger btn-sm" onClick={() => handleStatus(ele._id, ele.status)}><i class="fas fa-times" style={{ padding: '2px' }} ></i></Link>
                            } */}
                          </td>
                        </tr>
                      ))
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
