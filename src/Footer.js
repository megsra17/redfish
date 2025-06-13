import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container text-white py-5">
      <div className="container-fluid">
        <div className="row justify-content-between align-items-end">
          {/* Left section */}
          <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
            <p className="text-muted small">
              Like what you see?
              <br />
              Contact us for enquiries
              <br />
              or just to say hola!
            </p>
            <h1 className="display-3 fw-bold">
              HELLO
              <br />
              @REDFISH.COM <span className="arrow ms-2">→</span>
            </h1>
          </div>

          {/* Right section */}
          <div className="col-lg-5 col-md-12 d-flex flex-column align-items-end text-end">
            <div>
              <p className="h4">
                START
                <br />
                YOUR PROJECT
              </p>
              <button className="btn btn-outline-light btn-lg mt-3 rounded-pill px-5">
                NOW
              </button>
            </div>

            <div className="mt-5 w-100 d-flex flex-column align-items-end">
              <span className="small text-muted">PRIVACY AND COOKIES</span>
              <div className="d-flex gap-3 mt-2">
                <a href="#" className="text-white text-decoration-none">
                  IG
                </a>
                <a href="#" className="text-white text-decoration-none">
                  BE
                </a>
                <a href="#" className="text-white text-decoration-none">
                  IN
                </a>
                <a href="#" className="text-white text-decoration-none">
                  DB
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
