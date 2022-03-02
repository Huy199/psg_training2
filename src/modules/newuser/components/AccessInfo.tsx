import React from "react";

export default function AccessInfo() {
  return (
    <div>
      <h6>Access Information</h6>
      <form style={{ marginLeft: "128px" }}>
        <div>
          <div className="mb-3 row m-auto">
            <label className="form-label col col-2">First Name*</label>
            <div className="col col-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label className="form-label col col-2">Last Name*</label>
            <div className="col col-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label className="form-label col col-2">Email*</label>
            <div className="col col-3">
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label className="form-label col col-2">Password*</label>
            <div className="col col-3">
              <input
                type="password"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label className="form-label col col-2">Confirm password*</label>
            <div className="col col-3">
              <input
                type="password"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label className="form-label col col-2">Type*</label>
            <div className="col col-3">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option value="10">Individual</option>
                <option value="100">Business</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row m-auto">
            <label className="form-label col col-2">PaymentRails ID</label>
          </div>
        </div>
      </form>
    </div>
  );
}
