import React from "react";
import './modal.css';

const UserRating = props => {

  return (
    
      <div className={`modal ${props.show ? 'show' : '' }`} onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">
                {props.title}
            </h4>
          </div>
          <div className="modal-body">
              {props.children}
          </div>{/* 
          <div className="modal-footer">
            <button onClick={props.onClose} className="modal-button1">
              Add Rating
            </button>
          </div> */}
        </div>
      </div>
  )
};

export default UserRating;
