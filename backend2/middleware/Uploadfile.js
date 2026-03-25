import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";

const uploadPath = "./public/temp";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {

    crypto.randomBytes(5, function (err, name) {
      if (err) return cb(err);

      const fileName =
        name.toString("hex") + path.extname(file.originalname);

      cb(null, fileName);
    });

  }
});

export const upload = multer({ storage });

