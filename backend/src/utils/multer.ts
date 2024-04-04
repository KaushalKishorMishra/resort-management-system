import multer from "multer";
import { Utils } from "./utils";

const storageOptions = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/banner");
  },
  filename: (req, file, callback) => {
    const randomNumber = Utils.generateOTP();
    const uniquePrefix = Date.now() + "-" + randomNumber;
    callback(null, uniquePrefix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export class Multer {
  public pMulter = multer({ storage: storageOptions, fileFilter: fileFilter });
}
