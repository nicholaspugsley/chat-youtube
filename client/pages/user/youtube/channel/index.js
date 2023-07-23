import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../context";
import UserRoute from "../../../../components/routes/UserRoute";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ChannelInfo = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [channelDescription, setChannelDescription] = useState("");

  //
  const [loading, setLoading] = useState("");
  const [ideaList, setideaList] = useState({});

  const router = useRouter("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/create-channel`, {
        channelDescription,
      });
      // console.log("REGISTER RESPONSE", data);
      toast("Youtube Channel Info generated successfully.");
      setVideoStyle("");

      setLoading(false);
      // router.push(`/user/vault`);
      router.push(`/user/youtube/view/${list.slug}`);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">Youtube Channel Info</h1>
      <h2>generate a list of 52 video ideas</h2>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <p>fill in</p>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={channelDescription}
            onChange={(e) => setChannelDescription(e.target.value)}
            placeholder="Channel Description"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!channelDescription || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </UserRoute>
  );
};

export default ChannelInfo;
