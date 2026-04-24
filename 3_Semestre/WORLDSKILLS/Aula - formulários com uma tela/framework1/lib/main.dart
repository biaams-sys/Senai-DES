import 'package:flutter/material.dart';
import 'dart:math';

void main() {
  runApp(MaterialApp(title: 'financiamento2026', home: App()));
}

class App extends StatefulWidget {
  const App({super.key});
  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  double financiamento = 0.0;
  double taxa = 0.0;
  double numparcelas = 0.0;
  double demais = 0.0;
  double parcela = 0.0;
  double total = 0.0;
  String resultado = "";
  String resultado2 = "";

  void valorparcela() {
    setState(() {
      double taxaDecimal = taxa / 100;

      if (taxaDecimal == 0) {
        parcela = (financiamento + demais) / numparcelas;
      } else {
        parcela =
            (financiamento + demais) *
            (taxaDecimal * pow(1 + taxaDecimal, numparcelas)) /
            (pow(1 + taxaDecimal, numparcelas) - 1);
      }

      resultado = "Valor da parcela: ${parcela.toStringAsFixed(2)}";

      total = parcela * numparcelas;
      resultado2 = "Valor total a ser pago: ${total.toStringAsFixed(2)}";
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
          "Simulador de Financiamento",
          textAlign: TextAlign.center,
          style: TextStyle(color: Color.fromARGB(255, 255, 255, 255)),
        ),
        backgroundColor: Colors.brown,
        centerTitle: true,
        elevation: 4.0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              "Valor de financiamento:",
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
                financiamento = double.tryParse(value) ?? 0.0;
              },
            ),
            Text(
              "Taxa de juros ao mês:",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 20.0,
                color: Color.fromARGB(255, 0, 102, 204),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              decoration: InputDecoration(
                labelText: "Digite a taxa de juros (EX: 0.02)",
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                taxa = double.tryParse(value) ?? 0.0;
              },
            ),
            Text(
              "Número de parcelas:",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 20.0,
                color: Color.fromARGB(255, 0, 102, 204),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              decoration: InputDecoration(
                labelText: "Digite o número de parcelas",
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                numparcelas = double.tryParse(value) ?? 0.0;
              },
            ),
            Text(
              "Demais taxas e custos:",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 20.0,
                color: Color.fromARGB(255, 0, 102, 204),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              decoration: InputDecoration(
                labelText: "Digite o total de taxas e custos adicionais",
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                demais = double.tryParse(value) ?? 0.0;
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
                    child: const Text("Calcular"),
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
