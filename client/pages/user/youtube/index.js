import { useContext } from "react";
import { Context } from "../../../context";
import UserRoute from "../../../components/routes/UserRoute";

const IndexYoutubeTools = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">Yotube Tools</h1>
      <div className="container-fluid">
        <div className="col">
          <a href="/user/tools/super-prompt">
            <div class="card  text-white bg-dark">
              <div class="card-body">Super Prompt</div>
            </div>
          </a>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h1>Live Tool</h1>
          </div>
          <div className="col-md-4">
            <h1>Building Phase</h1>
            <div class="card">
              <a href="/user/youtube/youtube-script">
                <div class="card-body">(long form) script generator </div>
              </a>
            </div>
            <div class="card">
              <a href="/user/youtube/youtube-short">
                <div class="card-body">(short form) script generator </div>
              </a>
            </div>
            <div class="card">
              <a href="/user/youtube/video-ideas">
                <div class="card-body">video idea generator</div>
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <h1>Idea Phase</h1>
            <div class="card">
              <a href="/user/youtube/channel">
                <div class="card-body">channel info</div>
              </a>
            </div>
            <div class="card">
              <a href="/user/youtube/ads">
                <div class="card-body">yt ADs</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default IndexYoutubeTools;
