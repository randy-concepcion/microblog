// src/components/Navbar.jsx
import React from "react";

function Navbar() {
    return (
        <div className="w3-bar w3-black">
            <a className="w3-bar-item w3-button" href="/">
                Quickr
            </a>
            <div style={{ float: "right" }}>
                <a className="w3-bar-item w3-button" href="/login"> // Updated
                    Login
                </a>
                <a className="w3-bar-item w3-button" href="/register"> // Updated
                    Register
                </a>
            </div>
        </div>
    );
}

export default Navbar;
