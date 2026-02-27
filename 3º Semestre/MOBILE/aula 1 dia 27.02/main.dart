void main(){
    String texto = "Alô mundo";
    int numero = 999999888888777777;
    double n = 0.33333333333333333333333333333333;
    bool ativo = false;//verdadeiro ou falso
    var coisa = "texto";
    
    //var coisa = 10;//não tipada 
    dynamic tudo = "oi";

    print(texto);
    print(numero);
    print("Real = " +n.toString());//Concatenação
    print(ativo?"Oi":"Tchau");//if ternário
    print(coisa);
    tudo = 500;
    print(tudo);
}
