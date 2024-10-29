
"use client"
import { useState, useRef, useEffect } from "react";
import { BASE_URL } from "@/_config/config";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



export default function page() {
    const [inputData, setInputData] = useState({});
    const [imageData, setImageData] = useState();
    const router = useRouter();

    useEffect(() => {
        getStoryData();
    }, [])

    const getStoryData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/about/story`);
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

    const handleImageData = (e) => {
        setImageData(e.target.files[0]);
    }


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formdata = new FormData();
            formdata.append("heading", inputData.heading);
            formdata.append("content", inputData.content);
            formdata.append("id", inputData._id);
            formdata.append("image", imageData );
            const res = await axios.post(`${BASE_URL}/about/story`, formdata)
            console.log(res.data);
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
                                Our story
                            </div>

                            <div className="card-body">
                                <form >
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Heading
                                                </label>
                                                <input
                                                    onChange={handleInputData}
                                                    name="heading"
                                                    placeholder="Enter the heading"
                                                    type="text"
                                                    className="form-control"
                                                    value={inputData.heading}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Content
                                                </label>
                                                <textarea name="content" id="" className="form-control" placeholder="Content" onChange={handleInputData} value={inputData.content}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image
                                                </label>
                                                <input
                                                    onChange={handleImageData}
                                                    name="image"
                                                    placeholder="Enter the short description"
                                                    type="file"
                                                    accept="image/*"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <img src={imageData ? URL.createObjectURL(imageData) : inputData.image} alt="" width="100px" />
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
