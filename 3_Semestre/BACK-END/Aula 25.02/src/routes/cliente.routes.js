const express = require("express");
const router = express.Router();

const clientesController = require("../controllers/cliente.controller");

router.get("/cliente", clientesController.listarClientes);
router.get("/clientes/:id", clientesController.buscarClientes);
router.post("/clientes/cadastro", clientesController.cadastrarClientes);
router.delete("/cliente/excluir/:id", clientesController.excluirCliente);
router.put("/cliente/atualizar/:id", clientesController.atualizarCliente);

module.exports = router;