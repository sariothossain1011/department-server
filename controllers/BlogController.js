const { successResponse } = require("../helper/response");
const BlogModel = require("../model/BlogModel");
const { ListServices } = require("../serveces/ListServece");
const CloudinaryImage = require("../utility/CloudinaryImage");
exports.CreateBlog = async (req, res) => {
  try {
    const { title, body, image } = req.body;
    console.log("body", req.body);

    if (!title) {
      return res.json({ error: "Title is required" });
    }
    if (!body) {
      return res.json({ error: "Post body is required" });
    }
     if (!image) {
       return res.json({ error: "Image is required" });
     }

    const data = await new BlogModel({
      title,
      body,
      image,
    }).save();
console.log("data", data);
    return res.status(200).json({ status: "success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.FindBlogData = async (req, res) => {
  try {
    const data = await BlogModel.findById(req.params.id);
    if (!data) {
      return { success: "fail", message: "Not found " };
    } else {
      res.status(200).json({ success: "Success", data: data });
    }
  } catch (error) {
    res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.FindBlogList = async (req, res) => {
  const data = await ListServices(req, BlogModel);
  return res.status(200).json(data);
};

exports.UpdateBlogImage = async (req, res) => {
  try {
    const url = await CloudinaryImage(req.files.photo);

    const data = await BlogModel.findByIdAndUpdate(
      req.params.id,
      { photo: url },
      {
        new: true,
      }
    );
    res.status(200).json({ success: "Image uploaded", imageUrl: data.photo });
  } catch (error) {
    res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.UpdateBlog = async (req, res) => {
  try {
    const postBody = req.body;
    const data = await BlogModel.findByIdAndUpdate(req.params.id, postBody, {
      new: true,
    });
    if (!data) {
      return res
        .status(404)
        .send({ success: "fail", message: "Update fail !" });
    }
    res.status(200).json({ success: "success", data: data });
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};

exports.DeleteBlog = async (req, res) => {
  try {
    const user = await BlogModel.findById(req.params.id);
    if (!user) return res.status(400).send("Invalid");

    const deletedUser = await BlogModel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      return res.status(200).send({ success: true, message: "Deleted!" });
    } else {
      return res.status(400).send({ success: false, message: "Delete fail!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};


exports.PagiBlogList = async (req, res) => {
  try {
    // const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    // const searchRegExp = new RegExp(".*" + search + ".*", "i");
    // const filter = {
    //   isAdmin: { $ne: true },
    //   $or: [
    //     { name: { $regex: searchRegExp } },
    //     { email: { $regex: searchRegExp } },
    //     { phone: { $regex: searchRegExp } },
    //   ],
    // };
    const counter = await BlogModel.find().countDocuments();

    const blog = await BlogModel.find()
      .limit(limit)
      .skip((page - 1) * limit);
    if (!blog) throw createError(404, "blog not found!");

    return successResponse(res, {
      statusCode: 200,
      message: "user were returned successfully",
      payload: {
        blog,
        pagination: {
          totalPages: Math.ceil(counter / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(counter / limit ? page + 1 : null),
        },
      },
    });
  } catch (error) {
    return res.status(400).json({ success: "fail", data: error.toString() });
  }
};