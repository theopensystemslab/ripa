import * as React from "react";
import { Link } from "react-navi";
import { v4 } from "uuid";

const Team = ({ team }) => {
  return (
    <div>
      <h1>{team.name}</h1>
      <h3>Flows</h3>
      <ul>
        {team.flows.map(flow => (
          <li key={flow.id}>
            <Link href={`/${team.name}/${flow.id}`}>{flow.id}</Link>
          </li>
        ))}

        <Link href={`/${team.name}/${v4()}`}>Add Flow</Link>
      </ul>
      <h3>Members</h3>
      <ul>
        {team.users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
      {/* <ul>
        {team.members.map(member => (
          <li key={member.id}>{JSON.stringify(member)}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Team;
