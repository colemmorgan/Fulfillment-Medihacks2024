import React from "react";
import Profile from "./dashboard-components/Profile";
import Stats from "./dashboard-components/Stats";
import GameModes from "./dashboard-components/GameModes";

type DashboardAltProps = {};

const DashboardAlt: React.FC<DashboardAltProps> = () => {
  return (
    <div className="min-h-screen">
      <Profile />
      <Stats />
      <GameModes />
      
</div>
  );
};
export default DashboardAlt;





