const express = require("express");
const router = express.Router();

const tarefaController = require("../controllers/tarefaController");

router.get("/tarefas", tarefaController.listar);
router.post("/tarefas", tarefaController.criar);
router.delete("/tarefas/:id", tarefaController.deletar);

module.exports = router;