import React, { useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  setInterval(() => {
    setTime(new Date());
  }, 1000);

  return (
    <div className="clock">
      <h3 className="clock-title">현재 시간: </h3>
      <span>{time.toLocaleTimeString()}</span>
    </div>
  );
}

export default Clock;
