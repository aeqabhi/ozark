
"use client"
import { useState,useEffect, useRef } from "react";
import { BASE_URL } from "@/_config/config";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



export default function page() {
    const [inputData, setInputData] = useState({});
  

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/about/vision_values`);
            console.log(res.data);
            if (res.data.status == 1) {
                setInputData(res.data.data);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleInputData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData({ ...inputData, [name]: value });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // const formdata = new FormData();
            // formdata.append("vision_heading", inputData.vision_heading);
            // formdata.append("vision_content", inputData.vision_content);
            // formdata.append("values_heading", inputData.values_heading);
            // formdata.append("values_content", inputData.values_content);
            const res = await axios.post(`${BASE_URL}/about/vision_values`, inputData)
            if (res.data.status === 1) {
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
                                vision and values
                            </div>

                            <div className="card-body">
                                <form >
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Vision Heading
                                                </label>
                                                <input
                                                    onChange={handleInputData}
                                                    name="vision_heading"
                                                    placeholder="Enter the heading"
                                                    type="text"
                                                    className="form-control"
                                                    value={inputData.vision_heading}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Values Heading
                                                </label>
                                                <input
                                                    onChange={handleInputData}
                                                    name="values_heading"
                                                    placeholder="Enter the heading"
                                                    type="text"
                                                    className="form-control"
                                                    value={inputData.values_heading}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Vision Content
                                                </label>
                                                <input
                                                    onChange={handleInputData}
                                                    name="vision_content"
                                                    type="text"
                                                    placeholder="Enter the title"
                                                    className="form-control"
                                                    value={inputData.vision_content}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Values Content
                                                </label>
                                                <input
                                                    onChange={handleInputData}
                                                    name="values_content"
                                                    type="text"
                                                    placeholder="Enter the title"
                                                    className="form-control"
                                                    value={inputData.values_content}
                                                />
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <button className="mt-2 px-3 btn btn-primary" onClick={handleSubmit}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
