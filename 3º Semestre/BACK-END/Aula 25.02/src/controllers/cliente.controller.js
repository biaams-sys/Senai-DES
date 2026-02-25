const db = require("../data/connection");

const cadastrarClientes = async (req, res) => {
    const { nomeCompleto, CPF, email, CNH } = req.body;

    const nomeerrado = validarNome(nomeCompleto);
    if (nomeerrado !== true) {
        return res.status(400).json({ erro: nomeerrado });
    }

    const CPFerrado = validarCPF(CPF);
    if (CPFerrado !== true) {
        return res.status(400).json({ erro: CPFerrado });
    }

    const emailErrado = validarEmail(email);
    if (emailErrado !== true) {
        return res.status(400).json({ erro: emailErrado });
    }

    if (!validarCNH(CNH)) {
        return res.status(400).json({ erro: "CNH deve começar com número." });
    }

    const [clientes] = await db.query("SELECT * FROM clientes");

    if (clientes.some(cliente => cliente.email === email.trim())) {
        return res.status(400).json({ erro: "Email já cadastrado." });
    }
    const [novoCliente] = await db.query(
        "INSERT INTO clientes VALUES (DEFAULT, ?, ?, ?, ?)",
        [nomeCompleto, CPF, email, CNH]
    );

    const cliente = {
        id: novoCliente.insertId,
        nomeCompleto,
        CPF,
        email,
        CNH
    };

    return res.status(201).json(cliente);
};

function validarNome(nomeCompleto) {
    nomeCompleto = nomeCompleto.trim();

    if (nomeCompleto.length === 0) {
        return "O nome completo é obrigatório.";
    }

    let partes = nomeCompleto.split(" ").filter(parte => parte.length > 0);

    if (partes.length < 2) {
        return "Digite nome e sobrenome.";
    }

    return true;
}

function validarCPF(CPF) {
    CPF = CPF.replace(/[.-]/g, "");

    if (CPF.length === 0) {
        return "CPF é obrigatório.";
    }

    if (CPF.length !== 11) {
        return "CPF deve ter 11 dígitos.";
    }

    return true;
}


function validarEmail(email) {
    email = email.trim();

    if (!email.includes("@")) {
        return "Email deve conter @.";
    }

    const pontos = email.split(".").length - 1;

    if (pontos < 1) {
        return "Email deve conter pelo menos um ponto.";
    }

    return true;
}

function validarCNH(cnh) {
    let caracteres = cnh.trim().split("");
    let primeiro = caracteres[0];

    return primeiro >= "0" && primeiro <= "9";
}

const novoCliente = await db.query("INSERT INTO clientes VALUES (DEFAULT, ?, ?, ?,?)", [nomeCompleto, CPF, email, CNH]);

    const cliente = {
        id: novoCliente[0].insertId,
        nomeCompleto: nomeCompleto,
        CPF: CPF,
        email: email,
        CNH: CNH
    }
    res.json(cliente).status(201).end();

const listarClientes = async (req, res) => {
    const [clientes] = await db.query("SELECT * FROM clientes");
    return res.status(200).json(clientes);
};


const buscarClientes = async (req, res) => {
    const { id } = req.params;

    const [cliente] = await db.query(
        "SELECT * FROM clientes WHERE id = ?",
        [id]
    );

    if (cliente.length === 0)
        return res.status(404).json({ erro: "Cliente não encontrado" });

    return res.status(200).json(cliente[0]);
};



const atualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nomeCompleto, CPF, email, CNH } = req.body;

    const [clienteExiste] = await db.query(
        "SELECT * FROM clientes WHERE id = ?",
        [id]
    );

    if (clienteExiste.length === 0)
        return res.status(404).json({ erro: "Cliente não encontrado" });

    await db.query(
        "UPDATE clientes SET nomeCompleto = ?, CPF = ?, email = ?, CNH = ? WHERE id = ?",
        [nomeCompleto, CPF, email, CNH, id]
    );

    return res.status(200).json({ mensagem: "Cliente atualizado" });
};



const excluirCliente = async (req, res) => {
    const { id } = req.params;

    const [clienteExiste] = await db.query(
        "SELECT * FROM clientes WHERE id = ?",
        [id]
    );

    if (clienteExiste.length === 0)
        return res.status(404).json({ erro: "Cliente não encontrado" });

    await db.query(
        "DELETE FROM clientes WHERE id = ?",
        [id]
    );

    return res.status(200).json({ mensagem: "Cliente deletado" });
};


module.exports = {
    cadastrarClientes,
    listarClientes,
    buscarClientes,
    atualizarCliente,
    excluirCliente

}