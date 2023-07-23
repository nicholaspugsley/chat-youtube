import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../../../context";
import UserRoute from "../../../../../../components/routes/UserRoute";
import axios from "axios";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Divider } from "antd";

const YoutubeVideoList = () => {
  // router
  const router = useRouter();
  const { slug } = router.query;

  // context
  const {
    state: { user },
  } = useContext(Context);
  // state
  const [list, setList] = useState({});
  const [loading, setLoading] = useState("");
  // useEffect
  useEffect(() => {
    loadList();
  }, [slug]);

  const loadList = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/yt-list-one/${slug}`);
      setList(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">youtube video ideas</h1>
      <button className="btn btn-primary m-2" onClick={`/`}>
        edit
      </button>
      <button className="btn btn-danger m-2">delete</button>
      <Divider />
      <p></p>
      <p></p>

      <Divider />
      <p>Title: {list.title}</p>
      <p>List: {list.listContent}</p>
    </UserRoute>
  );
};

export default YoutubeVideoList;
