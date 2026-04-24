require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const imagemRoutes = require("./src/routes/imagem.routes");
const perfumeRoutes = require("./src/routes/perfume.routes");
const categoriaRoutes = require("./src/routes/categoria.routes"); 
const marcaRoutes = require("./src/routes/marca.routes");

app.use("/categoria", categoriaRoutes);
app.use("/marca", marcaRoutes);
app.use("/perfume", perfumeRoutes);
app.use("/imagem", imagemRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});