function bonus(){
    let valor = Number(document.getElementById('valor').value);
    let resultado = document.getElementById('resultado');
    let adicional = 0;
    if(valor > 2000){
        adicional = valor * (10 / 100);
    }   
    let valorFinal = valor + adicional;
    resultado.innerHTML =
    `adicional de R$ ${adicional.toFixed(2)} <br>Preço final de ${valorFinal.toFixed(2)}`;  
}
document.getElementById("valor").addEventListener("keypress",function(event){
    if(event.key === "Enter"){
        bonus();
    }
});

//-----------------------------------------------------------------//

function frete(){
    let valor = Number(document.getElementById('valor').value);
    let resultado = document.getElementById('resultado');
    let adicional = 0;
    if(valor >= 150){
       adicional = valor * 0
    }else if(valor <150){
        adicional = 20;
    }
    let valorFinal = valor + adicional;
      resultado.innerHTML =
    `adicional de R$ ${adicional.toFixed(2)} <br>Preço final de ${valorFinal.toFixed(2)}`;  
}

//----------------------------------------------------------------//

function gasolina(){
    let valor = Number(document.getElementById('valor').value);
    let resultado = document.getElementById('resultado');
    let desconto = 0;
    if(valor > 200){
        desconto = valor * (5 / 100);
    }else if(valor < 200){
        desconto = valor * 0
    }
    let valorFinal = valor - desconto;
    resultado.innerHTML =
    `deconto de R$ ${desconto.toFixed(2)} <br>Preço final de ${valorFinal.toFixed(2)}`;  
}

//----------------------------------------------------------------//

function taxa(){
    let valor = Number(document.getElementById('valor').value);
    let resultado = document.getElementById('resultado');
    let adicional = 0;
    if(valor > 100){
        adicional = valor * (10  / 100);
    }else if(valor <= 100){
        adicional = valor * 0
    }
    let valorFinal = valor + adicional;
     resultado.innerHTML =
    `adicional de R$ ${adicional.toFixed(2)} <br>Preço final de ${valorFinal.toFixed(2)}`;
}

//----------------------------------------------------------------//

function multa(){
    let valor = Number(document.getElementById('valor').value);
    let resultado = document.getElementById('resultado');
    let dias = document.getElementById('dias');
    let adicional = 0;
    if(valor >0){
        adicional = valor * (2 / 100);
    }
let valorFinal = valor + adicional;
     resultado.innerHTML =
    `adicional de R$ ${adicional.toFixed(2)} <br>Preço final de ${valorFinal.toFixed(2)}`;




}

//----------------------------------------------------------------//

function cashback(){
       let valor = Number(document.getElementById('valor').value);
    let resultado = document.getElementById('resultado');
    let adicional = 0;
    if(valor > 300){
        adicional = valor * (5 / 100);
    }else if(valor < 300){
        adicional = valor * 0
    }
    let valorFinal = valor - adicional;
    resultado.innerHTML =
    `adicional de R$ ${adicional.toFixed(2)} <br>Preço final de ${valorFinal.toFixed(2)}`;
}
