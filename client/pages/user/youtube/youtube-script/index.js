import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../context";
import UserRoute from "../../../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const YoutubeScript = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [topic, setTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [purpose, setPurpose] = useState("");
  const [length, setLength] = useState("");
  const [keypoints, setKeypoints] = useState("");
  const [style, setStyle] = useState("");
  const [tone, setTone] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [cta, setCta] = useState("");
  const [keywords, setKeywords] = useState("");

  const [loading, setLoading] = useState("");
  const [script, setScript] = useState({});

  const router = useRouter("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.table({ topic, keywords });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/create-youtube-script`, {
        topic,
        targetAudience,
        purpose,
        length,
        keypoints,
        style,
        tone,
        outputFormat,
        cta,
        keywords,
      });
      // console.log("REGISTER RESPONSE", data);

      toast("Youtube Script generated successfully.");
      setTopic("");
      setTargetAudience("");
      setPurpose("");
      setLength("");
      setKeypoints("");
      setStyle("");
      setTone("");
      setOutputFormat("");
      setCta("");
      setKeywords("");

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
        long form - Youtube Script Generator
      </h1>
      <div className="container">
        <div className="row"></div>
        <div className="col-md-4 offset-md-4 pb-5">
          <form onSubmit={handleSubmit}>
            <p>topic</p>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="video topic"
              required
            />
            <p>target audience</p>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="target audeince"
              required
            />
            <p>purpose</p>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="purpose"
              required
            />
            <p>length</p>
            <p>word count: slow is 100 wpm || average is 130 wpm</p>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Enter length of script in word count"
              required
            />
            <p>key points</p>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={keypoints}
              onChange={(e) => setKeypoints(e.target.value)}
              placeholder="key points"
              required
            />
            <p>style (storytelling, direct address, interview-style, etc.)</p>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder="Enter style"
              required
            />
            <p>
              Indicate the desired tone (informative, humorous, serious, casual,
              etc.)
            </p>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              placeholder="Enter tone"
              required
            />
            <p>format </p>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              placeholder="format"
              required
            />
            <p>cta</p>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              placeholder="Enter call to action"
              required
            />

            <p>keywords</p>
            <input
              type="text"
              className="form-control mb-4 p-4"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords seperated by a comma"
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

export default YoutubeScript;
