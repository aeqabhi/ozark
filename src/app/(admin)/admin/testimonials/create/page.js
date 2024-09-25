"use client"
import { BASE_URL } from "@/_config/config";
import axios from "axios";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function page() {

    const [inputData, setInputData] = useState();
    const [imageData, setImageData] = useState();
    const router = useRouter();

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData({ ...inputData, [name]: value });
    }

    const handleImageData = (e) => {
        setImageData(e.target.files[0]);
    }
    

    const createTestimonial = async (e) => {
        try {
            e.preventDefault();
            const formdata = new FormData();
            formdata.append("name", inputData?.client_name)
            formdata.append("designation", inputData?.designation)
            formdata.append("content", inputData?.content)
            formdata.append("image", imageData);
            const res = await axios.post(`${BASE_URL}/testimonials/create_testimonial`, formdata);
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
                                Create Testimonial
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
                                                    name="client_name"
                                                    placeholder="Enter the client name"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={handleInputChange}
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
                                    <button className="mt-2 btn btn-primary" onClick={createTestimonial}>Create </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
