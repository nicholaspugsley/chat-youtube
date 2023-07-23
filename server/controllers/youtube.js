import User from "../models/user";
import Script from "../models/script";
import List from "../models/list";
import { Configuration, OpenAIApi } from "openai";
import slugify from "slugify";
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

//// create youtube script ////
export const youtubeScript = async (req, res) => {
  try {
    // console.log(req.body);
    const {
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
    } = req.body;
    // validation
    if (!topic) return res.status(400).send("Image description is required");

    // let blogExist = await Blog.findOne({ slug }).exec();
    // if (blogExist) return res.status(400).send("Blog is taken");

    const scriptContentResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `I'm an AI YouTube script generator that crafts captivating scripts using artificial intelligence.
            Together, we'll create compelling content tailored to your topics, 
            captivating your audience and boosting your channel's success!.`,
        },
        {
          role: "user",
          content: `Compose a YouTube script on the subject of ${topic}, ensuring it is ${length} words in length. 
          The script should start with an engaging introduction that hooks the viewer and provides a brief overview 
          of what will be discussed. The body of the script should be structured into clear sections that cover the 
          main points of ${topic}. Don't forget to incorporate the following keywords: ${keywords}. The script should 
          maintain a ${tone} tone throughout and use a ${style} style of presentation. Include specific visual and 
          audio cues where necessary. Conclude the script with a summary of the main points, a call to action, and 
          a teaser for the next video. Also, include points in the script where the audience is prompted to engage, 
          such as answering a question or participating in a poll. The response should be formatted in SEO-friendly HTML, 
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
        },
      ],
      temperature: 0,
    });

    const scriptResult = scriptContentResult.data.choices[0].message.content;

    const titleResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a youtube script generator.",
        },

        {
          role: "user",
          content: `Compose a YouTube script on the subject of ${topic}, ensuring it is ${length} words in length. 
          The script should start with an engaging introduction that hooks the viewer and provides a brief overview 
          of what will be discussed. The body of the script should be structured into clear sections that cover the 
          main points of ${topic}. Don't forget to incorporate the following keywords: ${keywords}. The script should 
          maintain a ${tone} tone throughout and use a ${style} style of presentation. Include specific visual and 
          audio cues where necessary. Conclude the script with a summary of the main points, a call to action, and 
          a teaser for the next video. Also, include points in the script where the audience is prompted to engage, 
          such as answering a question or participating in a poll. The response should be formatted in SEO-friendly HTML, 
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
        },

        {
          role: "assistant",
          content: scriptResult,
        },
        {
          role: "user",
          content:
            "Generate SEO-friendly youtube video title for the above youtube script",
        },
      ],
      temperature: 0,
    });

    const title = titleResult.data.choices[0].message.content;

    const descriptionResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a youtube prompt generator.",
        },

        {
          role: "user",
          content: `Compose a YouTube script on the subject of ${topic}, ensuring it is ${length} words in length. 
          The script should start with an engaging introduction that hooks the viewer and provides a brief overview 
          of what will be discussed. The body of the script should be structured into clear sections that cover the 
          main points of ${topic}. Don't forget to incorporate the following keywords: ${keywords}. The script should 
          maintain a ${tone} tone throughout and use a ${style} style of presentation. Include specific visual and 
          audio cues where necessary. Conclude the script with a summary of the main points, a call to action, and 
          a teaser for the next video. Also, include points in the script where the audience is prompted to engage, 
          such as answering a question or participating in a poll. The response should be formatted in SEO-friendly HTML, 
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
        },

        {
          role: "assistant",
          content: scriptResult,
        },
        {
          role: "user",
          content:
            "Generate SEO-friendly youtube video description for the above youtube script",
        },
      ],
      temperature: 0,
    });

    const description = descriptionResult.data.choices[0].message.content;

    console.log("SCRIPT CONTENT: ", scriptResult);
    console.log("TITLE: ", title);
    console.log("DESCRIPTION: ", description);

    // create blog
    const script = new Script({
      length: length || "",
      topic: topic || "",
      keywords: keywords || "",
      tone: tone || "",
      style: style || "",
      //
      title: title || "",
      slug: slugify(title),
      script_type: "short-script",
      scriptContent: scriptResult || "",
      description: description || "",
      author: req.user._id,
      created: new Date(),
    });
    await script.save();
    // console.log("saved blog", blog);
    res.json(script);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

// get one youtube script
export const script = async (req, res) => {
  try {
    const script = await Script.findOne({ slug: req.params.slug }).exec();
    res.send(script);
  } catch (err) {
    console.log(err);
  }
};

// get all youtube scripts
export const scripts = async (req, res) => {
  const scripts = await Script.find({}).exec();
  res.json(scripts);
};

//// create youtube idea list ////
export const youtubeIdeaList = async (req, res) => {
  try {
    // console.log(req.body);
    const { quantity, description, audience } = req.body;
    // validation
    if (!quantity) return res.status(400).send("Image description is required");

    // let blogExist = await Blog.findOne({ slug }).exec();
    // if (blogExist) return res.status(400).send("Blog is taken");

    const videoListContentResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a youtube video idea list generator.",
        },
        {
          role: "user",
          content: `Compose a list of ${quantity} YouTube Video ideas: 
          The channels description is ${description}, 
          The list of ideas must target ${audience} audience.
          Output format is a list.`,
        },
      ],
      temperature: 0,
    });

    const listResult = videoListContentResult.data.choices[0].message.content;

    const titleResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a youtube video idea list generator.",
        },
        {
          role: "user",
          content: `Compose a list of ${quantity} YouTube Video ideas: 
          The channels description is ${description}, 
          The list of ideas must target ${audience} audience.
          Output format is a list.`,
        },

        {
          role: "assistant",
          content: listResult,
        },
        {
          role: "user",
          content: "Generate a unique title for the above list",
        },
      ],
      temperature: 0,
    });

    const title = titleResult.data.choices[0].message.content;

    console.log("LIST CONTENT: ", listResult);
    console.log("TITLE: ", title);

    // create blog
    const list = new List({
      quantity: quantity || "",
      audience: audience || "",
      title: title || "",
      slug: slugify(title),
      listContent: listResult || "",
      channel_description: description || "",
      author: req.user._id,
      created: new Date(),
    });
    await list.save();
    // console.log("saved blog", blog);
    res.json(list);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

// get one youtube idea list
export const list = async (req, res) => {
  try {
    const list = await List.findOne({ slug: req.params.slug }).exec();
    res.send(list);
  } catch (err) {
    console.log(err);
  }
};

// get all youtube idea lists
export const lists = async (req, res) => {
  const lists = await List.find({}).exec();
  res.json(lists);
};

//// create youtube script ////
export const scriptShort = async (req, res) => {
  try {
    // console.log(req.body);
    const { videoStyle, channelDescription, targetAudience } = req.body;
    // validation
    if (!videoStyle) return res.status(400).send("Video Style  is required");
    if (!channelDescription)
      return res.status(400).send("Channel Description is required");
    if (!targetAudience)
      return res.status(400).send("Target Audience is required");

    const scriptContentResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "",
        },
        {
          role: "user",
          content: ` You are an AI tasked with generating creative and engaging YouTube video ideas for an 
          ${videoStyle} channel focused on credit repair. The target audience for these videos is ${targetAudience}. 
         
          The central theme across all video ideas is ${channelDescription} "DIY Credit Repair for Beginners".   `,
        },
      ],
      temperature: 0,
    });

    const scriptResult = scriptContentResult.data.choices[0].message.content;

    const titleResult = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a youtube script generator.",
        },

        {
          role: "user",
          content: `${targetAudience} ${channelDescription} ${videoStyle}`,
        },

        {
          role: "assistant",
          content: scriptResult,
        },
        {
          role: "user",
          content:
            "Generate SEO-friendly youtube video title for the above youtube script",
        },
      ],
      temperature: 0,
    });

    const title = titleResult.data.choices[0].message.content;

    console.log("SCRIPT CONTENT: ", scriptResult);
    console.log("TITLE: ", title);

    // create script
    const script = new Script({
      script_type: "short-script",
      title: title || "",
      slug: slugify(title),
      scriptContent: scriptResult || "",
      author: req.user._id,
      created: new Date(),
    });
    await script.save();
    // console.log("saved script", script);
    res.json(script);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};
