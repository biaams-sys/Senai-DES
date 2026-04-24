const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname);
    const nomeArquivo = Date.now() + extensao;

    cb(null, nomeArquivo);
  }
});

const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo não permitido"), false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;