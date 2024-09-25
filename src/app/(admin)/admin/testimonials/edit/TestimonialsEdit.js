"use client"
import { BASE_URL } from "@/_config/config";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function TestimonialsEdit() {

  const [inputData, setInputData] = useState();
  const [imageData, setImageData] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  }

  const handleImageData = (e) => {
    setImageData(e.target.files[0]);
  }


  useEffect(() => {
    getTestimonialById();
  }, [])

  const getTestimonialById = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/testimonials/get_one_testimonials`, {
        id: id
      })
      if (res.data.status === 1) {
        setInputData(res.data.data)
      }
    } catch (err) {
      console.log(err);
    }
  }



  const updateTestimonial = async (e) => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("name", inputData?.name)
      formdata.append("designation", inputData?.designation)
      formdata.append("content", inputData?.content)
      formdata.append("image", imageData);
      formdata.append("id", id);
      const res = await axios.post(`${BASE_URL}/testimonials/update_testimonials`, formdata);
      console.log(res.data);
      if (res.data.status === 1) {
        toast.success(res.data.message);
        router.push("/admin/testimonials/view")
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
                Edit Testimonial
              </div>

              <div className="card-body">
                <form >
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Client Name
                        </label>
                        <input
                          name="name"
                          placeholder="Enter the client name"
                          type="text"
                          className="form-control"
                          onChange={handleInputChange}
                          value={inputData?.name}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Designation
                        </label>
                        <input
                          name="designation"
                          placeholder="Enter the designation"
                          type="text"
                          className="form-control"
                          onChange={handleInputChange}
                          value={inputData?.designation}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Content
                        </label>
                        <input
                          name="content"
                          placeholder="Enter the content"
                          type="text"
                          className="form-control"
                          onChange={handleInputChange}
                          value={inputData?.content}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative form-group">
                        <label>
                          Image
                        </label>
                        <input
                          onChange={handleImageData}
                          name="image"
                          placeholder="Enter the short description"
                          type="file"
                          className="form-control"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                  <button className="mt-2 btn btn-primary" onClick={updateTestimonial}>Update </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
