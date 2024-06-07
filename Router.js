import { Router } from "express";
import { upload } from "./multer.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";

const router = Router();
// I know i'm an idiot i kept credentials/keys inside code itself
cloudinary.config({
  cloud_name: "droes6aks",
  api_key: "918757128462197",
  api_secret: "4PySqs_aEP4iXN1zudlYbBaGw0Q",
});
router.post("/file-upload", upload.single("files"), async (req, res) => {
  try {
    console.log("file:", req.file.path);
    const fileRes = await uploadFile(req.file.path);
    console.log(fileRes);
    res.status(200).json({
      status: "success",
      message: "File uploaded successfully",
      data: fileRes.secure_url,
    });
  } catch (err) {
    console.log(err);
  }
});

const uploadFile = async (filePath) => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    fs.unlinkSync(filePath);
  }
};
export default router;
