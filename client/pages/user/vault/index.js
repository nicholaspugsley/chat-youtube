import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context";
import UserRoute from "../../../components/routes/UserRoute";
import axios from "axios";

const VaultIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  // youtube
  const [scripts, setScripts] = useState([]);
  const [lists, setLists] = useState([]);
  //
  const [loading, setLoading] = useState();

  useEffect(() => {
    loadScripts();

    loadLists();
  }, []);

  const loadScripts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/scripts");
      setScripts(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const loadLists = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/yt-lists");
      setLists(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">Vault</h1>
      <div>
        <h1>YouTube Scripts</h1>
        {scripts && (
          <>
            {scripts.map((script) => (
              <div key={script._id} className="col-md-4">
                <a href={`/user/youtube/youtube-script/view/${script.slug}`}>
                  <p>{script.title}</p>
                </a>
              </div>
            ))}
          </>
        )}

        <h1>Youtube Video List Prompts</h1>
        {lists && (
          <>
            {lists.map((list) => (
              <div key={list._id} className="col-md-4">
                <a href={`/user/youtube/video-ideas/view/${list.slug}`}>
                  <p>{list.title}</p>
                </a>
              </div>
            ))}
          </>
        )}
      </div>
    </UserRoute>
  );
};

export default VaultIndex;
