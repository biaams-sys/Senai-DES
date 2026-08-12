let indiceAlterar = -1;
let grafico;


function abrirCadastro() {

    indiceAlterar = -1;

    document.getElementById("data").value = "";
    document.getElementById("combustivel").value = "";
    document.getElementById("litros").value = "";
    document.getElementById("valor_pago").value = "";
    document.getElementById("quilometragem").value = "";

    document.getElementById("modal").style.display = "block";
}


function fecharCadastro() {

    document.getElementById("modal").style.display = "none";

}


function cadastrar() {

    let data = document.getElementById("data").value;
    let combustivel = document.getElementById("combustivel").value;
    let litros = document.getElementById("litros").value;
    let valorPago = document.getElementById("valor_pago").value;
    let quilometragem = document.getElementById("quilometragem").value;


    let abastecimento = {
        "data": data,
        "combustivel": combustivel,
        "litros": parseFloat(litros),
        "valor_pago": parseFloat(valorPago),
        "quilometragem": parseFloat(quilometragem)
    };


    let lista = localStorage.getItem("abastecimentos");


    if (lista == null) {

        lista = [];

    } else {

        lista = JSON.parse(lista);

    }


    if (indiceAlterar == -1) {

        lista.push(abastecimento);

    } else {

        lista[indiceAlterar] = abastecimento;

    }


    localStorage.setItem(
        "abastecimentos",
        JSON.stringify(lista)
    );


    fecharCadastro();

    recuperarCadastro();

}


function recuperarCadastro() {

    let lista = localStorage.getItem("abastecimentos");

    if (lista == null) {
        lista = [];
    } else {
        lista = JSON.parse(lista);
    }

    let tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    let totalLitros = 0;
    let totalValor = 0;

    let somaConsumo = 0;
    let quantidadeConsumo = 0;


    lista.forEach((abastecimento, indice) => {

        let linha = document.createElement("tr");

        let tdData = document.createElement("td");
        let tdCombustivel = document.createElement("td");
        let tdLitros = document.createElement("td");
        let tdValor = document.createElement("td");
        let tdKm = document.createElement("td");
        let tdPreco = document.createElement("td");
        let tdConsumo = document.createElement("td");
        let tdExcluir = document.createElement("td");

        let btExcluir = document.createElement("button");


        tdData.innerHTML =
            abastecimento.data;

        tdCombustivel.innerHTML =
            abastecimento.combustivel;

        tdLitros.innerHTML =
            abastecimento.litros.toFixed(2);

        tdValor.innerHTML =
            "R$ " + abastecimento.valor_pago.toFixed(2);

        tdKm.innerHTML =
            abastecimento.quilometragem;


        let preco =
            abastecimento.valor_pago /
            abastecimento.litros;

        tdPreco.innerHTML =
            "R$ " + preco.toFixed(2);


        if (lista.length == 1) {

            tdConsumo.innerHTML = "-";

        } else if (indice == 0) {

            let proximo =
                lista[indice + 1];

            let distancia =
                proximo.quilometragem -
                abastecimento.quilometragem;

            let consumo =
                distancia /
                abastecimento.litros;

            tdConsumo.innerHTML =
                consumo.toFixed(2) + " km/L";

            somaConsumo =
                somaConsumo + consumo;

            quantidadeConsumo =
                quantidadeConsumo + 1;

        } else {

            let anterior =
                lista[indice - 1];

            let distancia =
                abastecimento.quilometragem -
                anterior.quilometragem;

            let consumo =
                distancia /
                abastecimento.litros;

            tdConsumo.innerHTML =
                consumo.toFixed(2) + " km/L";

            somaConsumo =
                somaConsumo + consumo;

            quantidadeConsumo =
                quantidadeConsumo + 1;

        }


        btExcluir.innerHTML = "Excluir";

        btExcluir.addEventListener("click", function (event) {

            event.stopPropagation();

            excluirAbastecimento(indice);

        });


        tdExcluir.appendChild(btExcluir);


        linha.appendChild(tdData);
        linha.appendChild(tdCombustivel);
        linha.appendChild(tdLitros);
        linha.appendChild(tdValor);
        linha.appendChild(tdKm);
        linha.appendChild(tdPreco);
        linha.appendChild(tdConsumo);
        linha.appendChild(tdExcluir);


        linha.addEventListener("click", function () {

            alterarAbastecimento(indice);

        });


        tbody.appendChild(linha);


        totalLitros =
            totalLitros + abastecimento.litros;

        totalValor =
            totalValor + abastecimento.valor_pago;

    });


    let precoMedio = 0;

    if (totalLitros > 0) {

        precoMedio =
            totalValor / totalLitros;

    }


    let consumoMedio = 0;

    if (quantidadeConsumo > 0) {

        consumoMedio =
            somaConsumo / quantidadeConsumo;

    }


    document.getElementById("precoMedio").innerHTML =
        "R$ " + precoMedio.toFixed(2);

    document.getElementById("consumoMedio").innerHTML =
        consumoMedio.toFixed(2) + " km/L";


    fazerGrafico(lista);

}

function excluirAbastecimento(indice) {

    let lista =
        localStorage.getItem("abastecimentos");


    lista = JSON.parse(lista);


    lista.splice(indice, 1);


    localStorage.setItem(
        "abastecimentos",
        JSON.stringify(lista)
    );


    recuperarCadastro();

}


function alterarAbastecimento(indice) {

    let lista =
        localStorage.getItem("abastecimentos");


    lista = JSON.parse(lista);


    let abastecimento =
        lista[indice];


    indiceAlterar = indice;


    document.getElementById("data").value =
        abastecimento.data;

    document.getElementById("combustivel").value =
        abastecimento.combustivel;

    document.getElementById("litros").value =
        abastecimento.litros;

    document.getElementById("valor_pago").value =
        abastecimento.valor_pago;

    document.getElementById("quilometragem").value =
        abastecimento.quilometragem;


    document.getElementById("modal").style.display =
        "block";

}


function fazerGrafico(lista) {

    let abastecimentos = [];
    let precos = [];


    lista.forEach((abastecimento, indice) => {

        abastecimentos.push(indice + 1);


        let preco =
            abastecimento.valor_pago /
            abastecimento.litros;


        precos.push(preco);

    });


    let canvas =
        document.getElementById("grafico");


    if (grafico != null) {

        grafico.destroy();

    }


    grafico = new Chart(canvas, {

        type: "bar",

        data: {

            labels: abastecimentos,

            datasets: [{

                label: "Preço por litro",

                data: precos,

                backgroundColor: "#1565c0"

            }]

        },

        options: {

            responsive: true

        }

    });

}


recuperarCadastro();