import React, { Component } from "react";
import "./navBar.css";

class navBar extends Component {
  state = {};
  render() {
    return (
      <nav className="flex bg-purple-600 align-middle px-12 py-2 items-center">
        <div className="flex flex-col">
          <a
            className="font-mono font-bold text-5xl text-black hover:no-underline hover:text-white transition ease-in-out duration-200"
            href="/AboutPage"
          >
            GR
          </a>
        </div>
        <div className="flex flex-col  justify-center items-center align-middle">
          <ul className="list-none flex gap-8 h-full flex-1 mb-0">
            <li className="">
              <a
                className="font-mono font-bold text-2xl text-black hover:no-underline hover:text-white transition ease-in-out duration-200"
                href="/dashboard"
              >
                Dashboard <span className="sr-only"></span>
              </a>
            </li>
            <li>
              <a
                className="font-mono font-bold text-2xl text-black hover:no-underline hover:text-white transition ease-in-out duration-200"
                href="/findConnections"
              >
                Find Connections
              </a>
            </li>
            <li>
              <a
                className="font-mono font-bold text-2xl text-black hover:no-underline hover:text-white transition ease-in-out duration-200"
                href="/viewConnections"
              >
                View Connections
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default navBar;
