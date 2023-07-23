import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../context";
import UserRoute from "../../../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const YoutubeShort = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [keywords, setKeywords] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [style, setStyle] = useState("");
  const [length, setLength] = useState("");

  const [loading, setLoading] = useState("");
  const [script, setScript] = useState({});

  const router = useRouter("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.table({ topic, keywords });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/create-youtube-script-short`, {
        topic,
        keywords,
        tone,
        style,
        length,
      });
      // console.log("REGISTER RESPONSE", data);

      toast("Youtube Script generated successfully.");
      setTopic("");
      setKeywords("");
      setLength("");
      setTone("");
      setStyle("");
      setLoading(false);
      router.push(`/user/vault`);
      // router.push(`/user/tools/blog/view/${blog._id}`);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">
        Youtube Shorts - Script Generator
      </h1>
      <div className="container">
        <div className="row"></div>
        <div className="col-md-4 offset-md-4 pb-5">
          <form onSubmit={handleSubmit}>
            <h5>word count: slow is 100 wpm || average is 130 wpm</h5>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Enter length of script in word count"
              required
            />
            <h5>topic</h5>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter youtube script topic"
              required
            />
            <h5>keywords</h5>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords seperated by a comma"
              required
            />
            <h5>
              Indicate the desired tone (informative, humorous, serious, casual,
              etc.)
            </h5>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              placeholder="Enter tone"
              required
            />
            <h5>
              {" "}
              style (storytelling, direct address, interview-style, etc.)
            </h5>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder="Enter style"
              required
            />

            <button
              type="submit"
              className="btn btn-block btn-primary"
              disabled={
                !tone || !style || !keywords || !topic || !length || loading
              }
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </UserRoute>
  );
};

export default YoutubeShort;
