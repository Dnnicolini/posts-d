import axios from "axios";
import React, { useState } from "react";
import { showSuccess, showError } from "../services/toastService";

const PostInput = () => {
    const [formData, setFormData] = useState({
        post: "",
        image: null,
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({
                ...formData,
                image: e.target.files[0],
            });
            setImage(URL.createObjectURL(e.target.files[0])); // Converte a imagem para URL temporária

        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/create-post", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            showSuccess(response.data.message);
            setFormData({
                post: "",
                image: null,
            });
            window.location.reload();
            setImage(null);
        } catch (error) {
            showError(error.response.data.error);
        }
    };

    return (
        <>

            <div className="post-box card mb-2 shadow">
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="form-control border-0"
                        placeholder="What's on your mind?"
                        name="post"
                        value={formData.post} onChange={handleChange}
                    ></textarea>

                    {image && (
                        <div className="image-preview">
                            <img src={image} alt="Preview" className="preview-img" />
                        </div>
                    )}

                    <div className="post-actions d-flex justify-content-between align-items-center mt-2">
                        <label className="btn btn-none align-self-center">
                            <img src="/icons/addPicIcon.svg" alt="add image" width={25} />
                            <input type="file" accept="image/*" name="image" onChange={handleChange} hidden />
                        </label>
                        <button className="btn btn-none align-self-center" type="submit">
                            <img src="/icons/sendIcon.svg" alt="send" width={20} />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PostInput;
