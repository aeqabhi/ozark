"use client";

import { useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import Link from "next/link";
import axios from "axios";
import { BASE_URL } from "@/_config/config";

export default function page() {
  const [categoryData, setCategoryData] = useState();
  const [subCategoryData, setsubCategoryData] = useState();


  useEffect(() => {
    getSubCategoryData();
    getCategoryData();
  }, [])

  useEffect(() => {
    if (subCategoryData && categoryData) {
      new DataTable("#myTable");
    }
  }, [subCategoryData, categoryData]);



  const getSubCategoryData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/subcategory/get_all_subcategories`);
      if (res.data.status === 1) {
        setsubCategoryData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getCategoryData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/category/get_all_categories`);
      if (res.data.status === 1) {
        setCategoryData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }


  const getCategoryById = (id) => {
    const category = categoryData?.find(ele => ele._id === id);
    return category ? category.category_name : "unknown category !"
  }


  const handleDelete = async (id) => {
    try {
      const res = await axios.post(`${BASE_URL}/subcategory/delete_subcategory`, { id: id });
      if (res.data.status == 1) {
        setsubCategoryData(res.data.data)
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
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
                View Subcategories

              </div>
              <div className="table-responsive">
                <table
                  id="myTable"
                  className="align-middle mb-0 table table-borderless table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Category Name</th>
                      <th >Subategory Name</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      subCategoryData?.map((ele, ind) => (
                        <tr>
                          <td className="text-center text-muted">#{ind + 1}</td>
                          <td>{getCategoryById(ele.category_id)}</td>
                          <td>{ele.subcategory_name}</td>
                          <td className="text-center">
                            <div className="badge badge-warning">Active</div>
                          </td>
                          <td className="text-center">
                            <Link href={{
                              pathname: "/admin/subcategory/edit",
                              query: { id: ele._id }
                            }} className="btn btn-primary btn-sm mr-2">Edit</Link>
                            <Link href="#" className="btn btn-danger btn-sm" onClick={() => handleDelete(ele._id)}>Delete</Link>
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
