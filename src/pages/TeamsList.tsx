import * as React from "react";
import { Link } from "react-navi";

const TeamsList = ({ teams }) => {
  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            <Link href={`/${team.name}`}>{team.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsList;
