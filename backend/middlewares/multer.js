import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Filtro per accettare solo immagini
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formato immagine non consentito"), false);
  }
};

// Storage per i post
const postStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "covers",
      // format: async (req, file) => "png", -> posso evitare di specificare format se voglio
      // preservare il formato originale del file caricato.
      public_id: (req, file) => {
        console.log("ciao")
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return uniqueSuffix + '-' + file.originalname
      }
    }
  })
// Storage per gli autori
const authorStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return `${uniqueSuffix}-${file.originalname}`;
    },
  },
});

const uploadPosts = multer({ storage: postStorage, fileFilter: fileFilter })
const uploadAuthors = multer({ storage: authorStorage, fileFilter: fileFilter })

export const uploadAvatar = uploadAuthors.single("avatar")
export const uploadCover = uploadPosts.single("cover")


  