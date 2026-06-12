const express = require("express");
const router = express.Router();

const reservaController = require("../controllers/reserva.controllers");

router.post("/cadastrar", reservaController.cadastrarReserva);
router.get("/listar/quarto/:quarto_id", reservaController.listarReservasPorQuarto);
router.get("/listar", reservaController.listarTodasReservas);
router.delete("/excluir/:id", reservaController.excluirReserva);

module.exports = router;