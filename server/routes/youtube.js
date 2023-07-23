import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import {
  youtubeScript,
  scripts,
  script,
  //
  youtubeIdeaList,
  list,
  lists,
  //

  //
  scriptShort,
} from "../controllers/youtube";

// youtube script
router.post("/create-youtube-script", requireSignin, youtubeScript);
router.get("/script-one/:slug", requireSignin, script);
router.get("/scripts", requireSignin, scripts);

// youtube video idea list
router.post("/create-youtube-video-ideas", requireSignin, youtubeIdeaList);
router.get("/yt-list-one/:slug", requireSignin, list);
router.get("/yt-lists", requireSignin, lists);

// youtube shorts
router.post("/create-youtube-script-short", requireSignin, scriptShort);
// router.get("/short-script-one/:slug", requireSignin, script);
// router.get("/short-scripts", requireSignin, scripts);

module.exports = router;
