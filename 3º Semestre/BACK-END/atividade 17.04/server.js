require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const imagemRoutes = require("./src/routes/imagem.routes");

app.use("/imagem", imagemRoutes);

const perfumeRoutes = require("./src/routes/perfume.routes");

app.use("/perfume", perfumeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});