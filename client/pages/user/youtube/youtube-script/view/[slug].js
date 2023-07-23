import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../../context";
import UserRoute from "../../../../../components/routes/UserRoute";
import axios from "axios";

import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Divider } from "antd";

const YoutubeScriptShow = () => {
  // router
  const router = useRouter();
  const { slug } = router.query;

  // context
  const {
    state: { user },
  } = useContext(Context);
  // state
  const [script, setScript] = useState({});
  const [loading, setLoading] = useState("");
  //useEffect
  useEffect(() => {
    loadScript();
  }, [slug]);

  const loadScript = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/script-one/${slug}`);
      setScript(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">youtube script</h1>
      <button className="btn btn-primary m-2" onClick={`/`}>
        edit
      </button>
      <button className="btn btn-danger m-2">delete</button>
      <Divider />

      <p>Title: {script.title}</p>
      <p>Length: {script.length}</p>
      <p>Topic: {script.topic}</p>
      <p>Keywords: {script.keywords}</p>
      <p>Author: {script.author}</p>
      <Divider />
      <h3>Video Script: </h3>
      <p>{script.scriptContent}</p>
      {/* <div dangerouslySetInnerHTML={{ __html: script.scriptContent || "" }} /> */}
      <h3>Video Description:</h3>
      <p>{script.description}</p>
    </UserRoute>
  );
};

export default YoutubeScriptShow;
