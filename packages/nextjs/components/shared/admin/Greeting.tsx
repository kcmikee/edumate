"use client";

import { useEffect, useState } from "react";

const Greeting = ({ name }: { name: string }) => {
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay("morning 🌞");
    } else if (hour >= 12 && hour < 15) {
      setTimeOfDay("afternoon ☀️");
    } else if (hour >= 15 && hour <= 20) {
      setTimeOfDay("evening ⛅");
    } else {
      setTimeOfDay("evening ⛅");
    }
  }, []);

  return (
    <h2 className="ml-2 text-base font-medium capitalize text-color3">
      Good {timeOfDay}, {name}
    </h2>
  );
};

export default Greeting;
