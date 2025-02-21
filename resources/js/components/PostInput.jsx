import React, { useState } from "react";

const PostInput = ({ onPostSubmit }) => {
    const [formData, setFormData] = useState({
        text: "",
        image: null,
    });
    const [mensagem, setMensagem] = useState("");
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
        setMensagem("");
        setErrors({});
        try {
            const response = await axios.post("/post", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMensagem(response.data.message);
            setFormData({
                text: "",
                image: null,
            });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.log(error)
                setMensagem("Something went wrong.");
            }
        }
    };

    return (
        
        <div className="post-box card mb-2 shadow">
         {mensagem && <div className="alert alert-success" role="alert">{mensagem}</div>}  
            <form onSubmit={handleSubmit}>
                <textarea
                    className="form-control border-0"
                    placeholder="O que você está pensando?"
                    value={formData.text} onChange={handleChange}
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
    );
};

export default PostInput;
