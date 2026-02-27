const db = require("../data/prisma");

const carros = [];

const cadastrarCarro = async (req, res) => {
    const { placa, marca, modelo, ano } = req.body;

    const validacaoPlaca = placacerta(placa);
    if (validacaoPlaca !== true)
        return res.status(400).json({ erro: validacaoPlaca });

    const validacaoMarca = marcacerta(marca);
    if (validacaoMarca !== true)
        return res.status(400).json({ erro: validacaoMarca });

    const validacaoModelo = modelocerta(modelo);
    if (validacaoModelo !== true)
        return res.status(400).json({ erro: validacaoModelo });

    const validacaoAno = anocerto(ano);
    if (validacaoAno !== true)
        return res.status(400).json({ erro: validacaoAno });

    const validacaoDuplicidade = placadupla(placa);
    if (validacaoDuplicidade !== true)
        return res.status(400).json({ erro: validacaoDuplicidade });

    const carro = await db.carro.create({
        data: { placa, marca, modelo, ano }
    });

    res.status(201).json(carro).end();
};


const listarCarro = async (req, res) => {
    const carros = await db.carro.findMany();

    res.status(200).json(carros).end();
};


const buscarCarro = async (req, res) => {
    const { id } = req.params;

    const carro = await db.carro.findUnique({
        where: { id: Number(id) }
    });

    if (!carro)
        return res.status(404).json({ erro: "Carro não encontrado" });

    res.status(200).json(carro).end();
};


const atualizarCarro = async (req, res) => {
    const { id } = req.params;
    const { placa, marca, modelo, ano } = req.body;

    const carroExiste = await db.carro.findUnique({
        where: { id: Number(id) }
    });

    if (!carroExiste)
        return res.status(404).json({ erro: "Carro não encontrado" });

    const carroAtualizado = await db.carro.update({
        where: { id: Number(id) },
        data: { placa, marca, modelo, ano }
    });

    res.status(200).json(carroAtualizado).end();
};


const excluirCarro = async (req, res) => {
    const { id } = req.params;

    const carroExiste = await db.carro.findUnique({
        where: { id: Number(id) }
    });

    if (!carroExiste)
        return res.status(404).json({ erro: "Carro não encontrado" });

    const carroDeletado = await db.carro.delete({
        where: { id: Number(id) }
    });

    res.status(200).json(carroDeletado).end();
};



function placacerta(placa) {
    placa = placa.trim();

    if (placa.length !== 7)
        return "A placa deve ter exatamente 7 caracteres.";

    if (placa.includes(" "))
        return "A placa não pode conter espaços.";

    placa = placa.toUpperCase();
    return true;
}

function marcacerta(marca) {
    marca = (marca || "").trim();
if (!marca) return "Marca é obrigatória.";

    if (marca.length === 0)
        return "O nome da marca é obrigatório!";

    const palavras = marca.split(" ");
    const marcaFormatada = palavras.map(palavra => {
        if (palavra === "") return "";
        return palavra[0].toUpperCase() + palavra.slice(1).toLowerCase();
    }).join(" ");

    marca = marcaFormatada;
    return true;
}

function modelocerta(modelo) {
    modelo = modelo.trim();

    if (modelo.length === 0)
        return "O nome do modelo é obrigatório!";

    const palavras = modelo.split(" ");
    const modeloFormatado = palavras.map(palavra => {
        if (palavra === "") return "";
        return palavra[0].toUpperCase() + palavra.slice(1).toLowerCase();
    }).join(" ");

    modelo = modeloFormatado;
    return true;
}

function anocerto(ano) {
    ano = String(ano).trim();

    if (ano.length !== 4)
        return "O ano deve ter exatamente 4 dígitos.";

    const letras = ano.split("");
    const temLetra = letras.some(function(numero) {
        return numero < "0" || numero > "9";
    });

    if (temLetra)
        return "O ano não pode conter letras.";

    return true;
}

function placadupla(placa) {
    placa = placa.trim().toUpperCase();

    const placaExiste = carros.some(function(carro) {
        return carro.placa === placa;
    });

    if (placaExiste)
        return "Já existe um carro com essa placa.";

    carros.push({ placa });
    return true;
}

module.exports = {
    cadastrarCarro,
    listarCarro,
    buscarCarro,
    atualizarCarro,
    excluirCarro
};