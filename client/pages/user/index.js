import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";

import { SyncOutlined } from "@ant-design/icons";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [loading, setLoading] = useState(false);

  return (
    <UserRoute>
      {loading && (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-danger p-5"
        />
      )}
      <h1 className="jumbotron text-center square">Dashboard</h1>
      <h3>stats</h3>
      <ul>
        <li>list number of scripts generated</li>
        <li>list number of video ideas generated</li>
        <li>time saved</li>
      </ul>
      <h3>community maybe</h3>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </UserRoute>
  );
};

export default UserIndex;
