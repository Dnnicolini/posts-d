import axios from "axios";
import React, { useState } from "react";
import { showSuccess, showError } from "../../services/toastService";

const RegisterModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    username: "",
    avatar: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setFormData({
        ...formData,
        avatar: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await axios.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showSuccess(response.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        username: "",
        avatar: null,
      });
      handleClose();
      window.location.reload();

    } catch (error) {
      showError(error.response.data.error);


    }
  };

  return (
    <div className={`modal fade  ${show ? "show d-block" : "d-none"}`}  >
      <div className="show backdrop-modal"></div>
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title">Sign Up</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                {errors.name && <div className="text-danger">{errors.name[0]}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
                {errors.username && <div className="text-danger">{errors.username[0]}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                {errors.email && <div className="text-danger">{errors.email[0]}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                {errors.password && <div className="text-danger">{errors.password[0]}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Avatar</label>
                <input type="file" className="form-control" required accept="image/*" name="avatar" onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-success w-100">Save</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RegisterModal;