import React from "react";

export function StatBox(props) {
    return (
        <div className="flex justify-center">
            <div className="stats shadow">
                {React.Children.map(props.children, child => {
                    return (
                        <div className="stat bg-slate-800">
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