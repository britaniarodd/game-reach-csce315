import React from "react";

export function StatBox(props) {
    return (
        <div className="flex justify-center">
            <div className="stats shadow">
                {React.Children.map(props.children, child => {
                    return (
                        <div className="stat bg-slate-800">
                            <div className="stat-figure text-secondary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block w-8 h-8 stroke-current"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    //d="M13 16h-1v-4h-1m1-4h.01M21 12a9 100 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="stat-title text-white">{child.props.title}</div>
                            <div className="stat-value text-white">{child.props.value}</div>
                            <div className="stat-desc text-white">{child.props.description}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function StatElement() {
    return (
        <React.Fragment></React.Fragment>
    );
}