import React from "react";

const Post = ({ image, content, user, link }) => {
    return (
        <div className="card mb-3 border-0 shadow p-0  ">
            <div className="card-header d-flex align-items-center">
                <img src={user.avatar} alt="User Avatar" className="post-avatar" />
                <span className="post-username">{user.name}</span>
            </div>
            <div className="post-image-container">

                {image && <img src={image} alt="Post Image" className="post-image" />}
            </div>
            <div className="card-body">
                <div className="card-text">
                    <p className="post-text">{content}</p>
                </div>
                <div>
                    <button className="btn btn-none post-icon">
                        <img src="/icons/likeIcon.svg" alt="like" width={20} />
                    </button>
                    <button className="btn btn-none ms-2 post-icon">
                        <img src="/icons/commentIcon.svg" alt="comment" width={20} />
                    </button>
                    <a href={link} className="btn btn-none ms-2 post-icon">
                        <img src="/icons/shareIcon.svg" alt="share" width={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Post;