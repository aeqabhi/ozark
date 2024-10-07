"use client"

import { useState, useRef } from "react";
import { BASE_URL } from "@/_config/config";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(()=>import('jodit-react'),{ssr:false})


const page = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config = {
        height: 400,
    };
    const [inputData, setInputData] = useState({});
    const [imageData, setImageData] = useState();
    const router = useRouter();

    const handleInputData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData({ ...inputData, [name]: value });
    }

    const handleImageData = (e) => {
        setImageData(e.target.files[0]);
    }

    console.log(inputData);
    const handleCreateService = async (e) => {
        try {
            e.preventDefault();
            const formdata = new FormData();
            formdata.append("service_name", inputData?.service_name);
            formdata.append("service_url", inputData?.service_url);
            formdata.append("short_description", inputData?.short_description);
            formdata.append("image", imageData);
            formdata.append("title", inputData?.title);
            formdata.append("meta_description", inputData?.meta_description);
            formdata.append("description", content);
            const res = await axios.post(`${BASE_URL}/services/create_service`, formdata)
            console.log(res.data);
            if (res.data.status === 1) {
                toast.success(res.data.message);
                router.push("/admin/services/view")
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <div className="app-main__inner">
                <div className="row">
                    <div className="col-md-12 col-xl-12">
                        <div className="main-card mb-3 card">
                            <div className="card-header">
                                Create Service

                            </div>

                            <div className="card-body">
                                <form >
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Service Name
                                                </label>
                                                <input
                                                    onChange={handleInputData}
                                                    name="service_name"
                                                    placeholder="Enter the service name"
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Service URL
                                                </label>
                                                <input
                                                    onChange={handleInputData}
                                                    name="service_url"
                                                    type="text"
                                                    placeholder="Enter the service url"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Short Description
                                                </label>
                                                <input
                                                    onChange={handleInputData}
                                                    name="short_description"
                                                    placeholder="Enter the short description"
                                                    type="text"
                                                    className="form-control"
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
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Meta Title
                                                </label>
                                                <input
                                                    onChange={handleInputData}
                                                    name="title"
                                                    placeholder="Enter the short description"
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Meta Description
                                                </label>
                                                <input
                                                    onChange={handleInputData}
                                                    name="meta_description"
                                                    placeholder="Enter the short description"
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Description
                                                </label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={content}
                                                    config={config}
                                                    tabIndex={1}
                                                    onChange={(newContent) => setContent(newContent)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="mt-2 px-3 btn btn-primary" onClick={handleCreateService}>Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default page