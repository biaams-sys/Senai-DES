class Animal{
    int id=0;
    String nome='';
    String especie='';
    String raca='';
    double peso=0.0;
    //metodos
    Animal(this.id, this.nome, this.especie, this.raca, this.peso);
    String tudoJunto(){
        return "$id, $nome, $especie, $raca ,$peso";
    }
}

void main (){
    Animal boi = new Animal(1, "Bandido", "Bovino", "Nelori", 499.9);
    Animal vaca = new Animal(2, "Bandida", "Bovino", "Nelori", 599.9);
    Animal gato = new Animal(3, "Forasteiro", "Felino", "Persa", 90.9);
    Animal rata = new Animal(4, "Sujinha", "Roedor", "Camundongo", 4.9);
    Animal panda = new Animal(5, "Fofinha", "Ursos", "Panda-vermelho", 999.9);
    Animal cachorro = new Animal(6, "Amigo", "Canino", "Beagle", 90.9);
    Animal papagaio = new Animal(7, "Tagarela", "Passaros", "Papagaio-verdadeiro", 500.9);
    print(boi.tudoJunto());
    print(vaca.tudoJunto());
    print(gato.tudoJunto());
    print(rata.tudoJunto());
    print(panda.tudoJunto());
    print(cachorro.tudoJunto());
    print(papagaio.tudoJunto());
}