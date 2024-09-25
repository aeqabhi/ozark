"use client";

import { BASE_URL } from "@/_config/config";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "simple-datatables";

export default function page() {

  const [data, setData] = useState();

  useEffect(() => {
    getCategoryData();
  },[])

  const getCategoryData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/enquiry/get_enquiry`);
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
    try {
      const res = await axios.post(`${BASE_URL}/category/delete_blog`, {
        id: id
      })
      console.log(res.data);
      if (res.data.status === 1) {
        toast.success(res.data.message);
        setData(res.data.data);
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
                View Enquiries

              </div>
              <div className="table-responsive">
                <table
                  id="myTable"
                  className="align-middle mb-0 table table-borderless table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th className="text-center">sr. no.</th>
                      <th className="text-center">name</th>
                      <th className="text-center">email</th>
                      <th className="text-center">phone</th>
                      <th className="text-center">subject</th>
                      <th className="text-center">message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data?.map((ele, ind) => (
                        <tr>
                          <td className="text-center text-muted">#{ind + 1}</td>
                          <td>
                            <div className="widget-heading"></div>
                            {ele.name}
                          </td>
                          <td>
                            <div className="widget-heading"></div>
                            {ele.email}
                          </td>
                          <td>
                            <div className="widget-heading"></div>
                            {ele.phone}
                          </td>
                          <td>
                            <div className="widget-heading"></div>
                            {ele.subject}
                          </td>
                          <td>
                            <div className="widget-heading"></div>
                            {ele.message}
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
