import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../context";
import UserRoute from "../../../../components/routes/UserRoute";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const YoutubeVideoIdeas = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [channelDescription, setChannelDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [videoStyle, setVideoStyle] = useState("");

  //
  const [loading, setLoading] = useState("");
  const [ideaList, setideaList] = useState({});

  const router = useRouter("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.table({ topic, keywords });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/create-youtube-video-ideas-v2`, {
        videoStyle,
        channelDescription,
        targetAudience,
      });
      // console.log("REGISTER RESPONSE", data);
      toast("Youtube Video Ideas generated successfully.");
      setVideoStyle("");
      setChannelDescription("");
      setTargetAudience("");
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
      <h1 className="jumbotron text-center square">
        Generate a list of video ideas V2
      </h1>
      <h2>generate a list of 52 video ideas</h2>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <p>
            What is the channel's primary theme or focus (e.g., technology,
            cooking, fashion, travel, etc.)?
          </p>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={channelDescription}
            onChange={(e) => setChannelDescription(e.target.value)}
            placeholder="Channel Description"
            required
          />
          <p>Who is the target audience?</p>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="Target Audience"
            required
          />
          <p>
            What's the style of the videos? Are they tutorials, reviews, vlogs,
            educational videos, etc.?
          </p>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={videoStyle}
            onChange={(e) => setVideoStyle(e.target.value)}
            placeholder="Video Style"
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

export default YoutubeVideoIdeas;
