function bonus() {
        let salario = Number(document.getElementById('salario').value);
        let resultado = document.getElementById('resultado');
        let bonus = 0;
        if (salario > 2000)
            bonus = salario * 10/ 100;
        let salarioComBonus = Number(salario + bonus);
        resultado.innerHTML = `Bônus de R$ ${bonus.toFixed(2)} <br>Salario final R$ ${salarioComBonus.toFixed(2)}`;
    }

function frete() {
        let compra = Number(document.getElementById('compra').value);
        let resultado = document.getElementById('resultado');
        let frete = 20;
        if (compra >= 150)
            frete = frete - 20;
        let compraTotal = Number(compra + frete);
        resultado.innerHTML = `Frete R$ ${frete.toFixed(2)} <br>Valor final R$ ${compraTotal.toFixed(2)}`;
    }

function desconto() {
        let combustivel = Number(document.getElementById('combustivel').value);
        let resultado = document.getElementById('resultado');
        let desconto = 0;
        if (combustivel > 200)
            desconto = combustivel * 5/ 100;
        let combustivelComDesconto = Number(combustivel - desconto);
        resultado.innerHTML = `Desconto de R$ ${desconto.toFixed(2)} <br>Salario final R$ ${combustivelComDesconto.toFixed(2)}`;
    }

 function taxa() {
        let conta = Number(document.getElementById('conta').value);
        let resultado = document.getElementById('resultado');
        let taxa = 0;
        if (conta > 100)
            taxa = conta * 10/ 100;
        let contaComTaxa = Number(conta + taxa);
        resultado.innerHTML = `Taxa de % ${taxa.toFixed(2)} <br>Conta final R$ ${contaComTaxa.toFixed(2)}`;
    }

 function multa() {
        let mensalidade = Number(document.getElementById('mensalidade').value);
        let dias = Number(document.getElementById('dias').value);
        let resultado = document.getElementById('resultado');
        let multa = 0;
        if (dias > 0)
            multa = mensalidade * 2/ 100;
        let multaPorDia = Number(mensalidade + multa);
        resultado.innerHTML = `Multa de ${multa.toFixed(2)} <br>Valor final R$ ${multaPorDia.toFixed(2)}`;
    }
function cash() {
        let liquido = Number(document.getElementById('liquido').value);
        let resultado = document.getElementById('resultado');
        let cash = 0;
        if (liquido > 300)
            cash = liquido * 5/ 100;
        let liquidoComCash = Number(liquido - cash);
        resultado.innerHTML = `Cashback de ${cash.toFixed(2)} <br>Conta final R$ ${liquidoComCash.toFixed(2)}`;
    }