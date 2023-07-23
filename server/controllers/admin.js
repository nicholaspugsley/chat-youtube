import User from "../models/user";

export const currentAdmin = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("-password").exec();
    // console.log("CURRENT Admin => ", user);
    if (!user.role.includes("Admin")) {
      return res.sendStatus(403);
    } else {
      res.json({ ok: true });
    }
  } catch (err) {
    console.log(err);
  }
};
