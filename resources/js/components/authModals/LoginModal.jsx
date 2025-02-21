import axios from "axios";
import React, { useState, } from "react";

const LoginModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setErrors({});

    try {
      const response = await axios.post("/login", formData);
      setMensagem(response.data.message);


    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMensagem(error.response.data.error);
      } else if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setMensagem("Something went wrong.");
      }
    }
  };
  return (
    <div className={`modal fade  ${show ? "show d-block" : "d-none"}`}  >
      <div className="show backdrop-modal"></div>
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            {mensagem && <div className="alert alert-danger">{mensagem}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <div className="text-danger">{errors.email[0]}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <div className="text-danger">{errors.password[0]}</div>}
              </div>
              <button type="submit" className="btn btn-success w-100">Save</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginModal;