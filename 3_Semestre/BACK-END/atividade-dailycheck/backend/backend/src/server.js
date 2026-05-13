const express = require("express");
const cors = require("cors");

const tarefaRoutes = require("./routes/tarefaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(tarefaRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});