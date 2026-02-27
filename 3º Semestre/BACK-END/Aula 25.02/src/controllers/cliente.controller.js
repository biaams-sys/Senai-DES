const db = require("../data/prisma");

const cadastrarClientes = async (req, res) => {
    const { nomeCompleto, CPF, email, CNH } = req.body;
    
    if (!nomeCompleto || !CPF || !email || !CNH)
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });

    const nomeValido = validarNome(nomeCompleto);
    if (nomeValido !== true)
        return res.status(400).json({ erro: nomeValido });

    const cpfValido = validarCPF(CPF);
    if (cpfValido !== true)
        return res.status(400).json({ erro: cpfValido });

    const emailValido = validarEmail(email);
    if (emailValido !== true)
        return res.status(400).json({ erro: emailValido });

    if (!validarCNH(CNH))
        return res.status(400).json({ erro: "CNH inválida." });

    const novoCliente = await db.cliente.create({
        data: { nomeCompleto, CPF, email, CNH }
    });

    res.status(201).json(novoCliente).end();
};

const listarClientes = async (req, res) => {
    const clientes = await db.cliente.findMany();

    res.status(200).json(clientes).end();
};

const buscarClientes = async (req, res) => {
    const { id } = req.params;

    const cliente = await db.cliente.findUnique({
        where: { id: Number(id) }
    });

    if (!cliente)
        return res.status(404).json({ erro: "Cliente não encontrado" });

    res.status(200).json(cliente).end();
};

const atualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nomeCompleto, CPF, email, CNH } = req.body;

    const cliente = await db.cliente.findUnique({
        where: { id: Number(id) }
    });

    if (!cliente)
        return res.status(404).json({ erro: "Cliente não encontrado" });

    const clienteAtualizado = await db.cliente.update({
        where: { id: Number(id) },
        data: { nomeCompleto, CPF, email, CNH }
    });

    res.status(200).json(clienteAtualizado).end();
};

const excluirCliente = async (req, res) => {
    const { id } = req.params;

    const cliente = await db.cliente.findUnique({
        where: { id: Number(id) }
    });

    if (!cliente)
        return res.status(404).json({ erro: "Cliente não encontrado" });

    const clienteDeletado = await db.cliente.delete({
        where: { id: Number(id) }
    });

    res.status(200).json(clienteDeletado).end();
};

function validarNome(nomeCompleto) {
    nomeCompleto = nomeCompleto.trim();

    if (nomeCompleto.length === 0)
        return "O nome completo é obrigatório.";

    let partes = nomeCompleto.split(" ").filter(parte => parte.length > 0);

    if (partes.length < 2)
        return "Digite nome e sobrenome.";

    return true;
}

function validarCPF(CPF) {
    CPF = CPF.replace(/[.-]/g, "");

    if (CPF.length === 0)
        return "CPF é obrigatório.";

    if (CPF.length !== 11)
        return "CPF deve ter 11 dígitos.";

    return true;
}

function validarEmail(email) {
    email = email.trim();

    if (!email.includes("@"))
        return "Email deve conter @.";

    const pontos = email.split(".").length - 1;

    if (pontos < 1)
        return "Email deve conter pelo menos um ponto.";

    return true;
}

function validarCNH(cnh) {
    let caracteres = cnh.trim().split("");
    let primeiro = caracteres[0];

    return primeiro >= "0" && primeiro <= "9";
}

module.exports = {
    cadastrarClientes,
    listarClientes,
    buscarClientes,
    atualizarCliente,
    excluirCliente
};