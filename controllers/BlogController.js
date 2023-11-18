const BlogModel = require("../model/BlogModel");
const { ListServices } = require("../serveces/ListServece");
const CloudinaryImage = require("../utility/CloudinaryImage");


exports.CreateBlog = async (req, res) => {
    try {

      const { title, description,note  } = req.body;

      if (!title) {
        return res.json({ error: "Title is required" });
      }
      if (!description) {
        return res.json({ error: "Description is required" });
      }

      if (!note) {
        return res.json({ error: "Note is required" });
      }

      const data = await new BlogModel({
        title,description,note
      }).save();
  
      return res.status(200).json({ status: "success", data: data });
    } catch (error) {
      return res.status(400).json({ status: "fail", data: error.toString() });
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
        return res
          .status(200)
          .send({ success: true, message: "Deleted!" });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "Delete fail!" });
      }
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    
  }; 