import React from "react";

const card01 = () => {
  return (
    <div className="bg-dark-100 p-5 rounded-2xl shadow-inner shadow-light-100/10">
      <img src="/stillhere.jpeg" alt="stillHere" />
      <div className="mt-4">
        <h3>Still Here</h3>

        <div className="content">
          <div className="rating">
            <img src="/Rating.svg" alt="Rating" />
            <p>8.4</p>
          </div>
          <span>•</span>
          {/*<span>•</span>*/}
          <p className="year">2021</p>
        </div>
      </div>
    </div>
  );
};

export default card01;
