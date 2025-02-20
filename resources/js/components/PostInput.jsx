import React, { useState } from "react";

const PostInput = ({ onPostSubmit }) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Converte a imagem para URL temporária
        }
    };

    const handleSubmit = () => {
        if (text.trim() || image) {
            onPostSubmit({ text, image });
            setText(""); // Limpa o campo de texto
            setImage(null); // Remove a imagem
        }
    };

    return (
        <div className="post-box card mb-2 shadow">
            <textarea
                className="form-control border-0"
                placeholder="O que você está pensando?"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>

            {/* Exibir imagem selecionada */}
            {image && (
                <div className="image-preview">
                    <img src={image} alt="Preview" className="preview-img" />
                </div>
            )}

            {/* Botões de ação */}
            <div className="post-actions d-flex justify-content-between align-items-center mt-2">
                <label className="btn btn-none align-self-center">
                <img src="/icons/addPicIcon.svg" alt="add image" width={25} />

                    <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                </label>
                <button className="btn btn-none align-self-center" onClick={handleSubmit}>
                 <img src="/icons/sendIcon.svg" alt="send" width={20} />
                </button>
            </div>
        </div>
    );
};

export default PostInput;
