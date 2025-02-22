import axios from "axios";
import React, { useState, } from "react";
import PostInput from "./PostInput";
import CommentInput from "./CommentInput";

const EditModal = ({ showEdit, handleClose, typeForm, content}) => {

  return (
    <div className={`modal fade  ${showEdit ? "show d-block" : "d-none"}`}  >
      <div className="show backdrop-modal"></div>
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content">
          <div className="modal-header m-0 pb-0 border-0">
            <h5 className="modal-title camelcase">Edit {typeForm}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body mt-0">
          {typeForm == "post" && <PostInput edit={true} value={content}/>}
          {typeForm == "comment" && <CommentInput edit={true}  value={content} />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default EditModal;