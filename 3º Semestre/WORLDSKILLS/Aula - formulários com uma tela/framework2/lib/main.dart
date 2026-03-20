import 'package:flutter/material.dart';
import 'dart:math';

void main() {
  runApp(MaterialApp(title: 'investimentos2026', home: App()));
}

class App extends StatefulWidget {
  const App({super.key});
  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  double investimento = 0.0;
  double taxa = 0.0;
  double meses = 0.0;
  double total = 0.0;
  double totaljuros = 0.0;
  String resultado = "";
  String resultado2 = "";

  void valorparcela() {
    setState(() {
      double taxareal = taxa / 100;

      total = investimento * meses;

      if (taxareal > 0) {
        totaljuros = investimento * (pow(1 + taxareal, meses) - 1) / taxareal;
      } else {
        totaljuros = total;
      }

      resultado = "Valor total sem juros: ${total.toStringAsFixed(2)}";

      resultado2 = "Valor total com juros: ${totaljuros.toStringAsFixed(2)}";
    });
  }

  void alert(BuildContext context, String msg) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Mensagens"),
          content: Text(msg),
          actions: [
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text("Ok"),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Simulador de Investimento",
          textAlign: TextAlign.center,
          style: TextStyle(color: Color.fromARGB(255, 255, 255, 255)),
        ),
        backgroundColor: Color.fromARGB(255, 12, 89, 0),
        centerTitle: true,
        elevation: 4.0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              "Investimento Mensal:",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 20.0,
                color: Color.fromARGB(255, 0, 102, 204),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              decoration: InputDecoration(
                labelText: "Digite o valor",
                border: OutlineInputBorder(),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    color: Color.fromARGB(255, 72, 72, 72),
                  ),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.brown, width: 2.0),
                ),
              ),
              onChanged: (value) {
                investimento = double.tryParse(value) ?? 0.0;
              },
            ),
            Text(
              "Numero de meses:",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 20.0,
                color: Color.fromARGB(255, 0, 102, 204),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              decoration: InputDecoration(
                labelText: "Quanto meses deseja investir",
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                meses = double.tryParse(value) ?? 0.0;
              },
            ),
            Text(
              "Taxa de juros ao mês (ex:5%) :",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 20.0,
                color: Color.fromARGB(255, 0, 102, 204),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              decoration: InputDecoration(
                labelText: "Digite a taxa de juros",
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                taxa = double.tryParse(value) ?? 0.0;
              },
            ),
            Padding(
              padding: EdgeInsets.symmetric(vertical: 20),
              child: Center(
                child: SizedBox(
                  width: 180,
                  height: 45,
                  child: ElevatedButton(
                    onPressed: () {
                      valorparcela();
                      showDialog(
                        context: context,
                        builder: (context) => AlertDialog(
                          title: Text("Resultado", textAlign: TextAlign.left),
                          content: Text("$resultado\n$resultado2"),
                          actions: [
                            TextButton(
                              onPressed: () => Navigator.of(context).pop(),
                              child: Text("OK"),
                            ),
                          ],
                        ),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.brown,
                      foregroundColor: Colors.white,
                      padding: EdgeInsets.zero,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(25),
                      ),
                    ),
                    child: const Text("Simular"),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
