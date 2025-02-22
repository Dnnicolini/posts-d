import axios from "axios";
import React, { useState, useEffect } from "react";
import { showSuccess, showError } from "../services/toastService";

const PostInput = ({ edit, value, type }) => {
    const [formData, setFormData] = useState({
        post: value?.post || "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [imageRemoved, setImageRemoved] = useState(false);

    useEffect(() => {
        setFormData({
            post: value?.post || "",
            image: null,
        });
        setImagePreview(value?.image || null);
    }, [value]);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            if (file) {
                setFormData((prev) => ({ ...prev, image: file }));
                setImagePreview(URL.createObjectURL(file));
                setImageRemoved(false);
            }
        } else {
            setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setFormData((prev) => ({ ...prev, image: null }));
        setImageRemoved(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("post", formData.post);

            if (imageRemoved && edit) {
                
                data.append("remove_image", "true");
            } else if (!imageRemoved && formData.image) {
                data.append("image", formData.image);
            }

            const url = edit ? `/update-post/${value?.uuid}` : "/create-post";
            const response = await axios.post(url, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            showSuccess(response.data.message);

            setFormData({ post: "", image: null });
            setImagePreview(null);
            setImageRemoved(false);

            window.location.reload();
        } catch (error) {
            console.log(error);
            showError(error.response?.data?.error || "Ocorreu um erro");
        }
    };

    return (
        <div className="post-box card mb-2 shadow">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="form-control border-0"
                    placeholder="What's on your mind?"
                    name="post"
                    value={formData.post}
                    onChange={handleChange}
                ></textarea>

                {imagePreview && (
                    <div className="image-preview d-flex">
                        <button type="button" className="btn btn-none p-2" onClick={handleRemoveImage}>✖</button>
                        <img src={imagePreview} alt="Preview" className="preview-img" />
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
    );
};

export default PostInput;
