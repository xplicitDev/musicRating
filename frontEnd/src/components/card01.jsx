import React from "react";

const card01 = () => {
  return (
    <div className="p-5 rounded-2xl z-30">
      <img src="/stillHere.jpeg" alt="stillHere" />
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

      <img src="/kshama.jpeg" alt="kshama" />
      <div className="mt-4">
        <h3>Kshama</h3>

        <div className="content">
          <div className="rating">
            <img src="/Rating.svg" alt="Rating" />
            <p>9.5</p>
          </div>
          <span>•</span>
          {/*<span>•</span>*/}
          <p className="year">2024</p>
        </div>
      </div>

      <img src="/LunchBreak.jpeg" alt="lunchbreak" />
      <div className="mt-4">
        <h3>Lunch Break</h3>

        <div className="content">
          <div className="rating">
            <img src="/Rating.svg" alt="Rating" />
            <p>9.0</p>
          </div>
          <span>•</span>
          {/*<span>•</span>*/}
          <p className="year">2023</p>
        </div>
      </div>
    </div>
  );
};

export default card01;
