import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(title: 'bitola2026', home: App()));
}

class App extends StatefulWidget {
  const App({super.key});
  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  double cobre = 0.0;
  double distancia = 0.0;
  double corrente = 0.0;
  double tensao127 = 2.54;
  double tensao220 = 4.4;
  double recomendacao1 = 0.0;
  double recomendacao2 = 0.0;
  String resultado = "";
  String resultado2 = "";

  void valorparcela() {
    setState(() {
      cobre = 0.0172;
      recomendacao1 = (2 * cobre * distancia * corrente) / tensao127;
      recomendacao2 = (2 * cobre * distancia * corrente) / tensao220;

      List<double> bitolasComerciais = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50];

      double encontrarComercial(double calculado) {
        return bitolasComerciais.firstWhere(
          (b) => b >= calculado,
          orElse: () => calculado,
        );
      }

      double bitola127 = encontrarComercial(recomendacao1);
      double bitola220 = encontrarComercial(recomendacao2);

      resultado =
          "A bitola recomendada para tensão 127V é: ${bitola127.toStringAsFixed(2)}";

      resultado2 =
          "A bitola recomendada para tensão 220V é: ${bitola220.toStringAsFixed(2)}";
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
          "Calculadora debitola(mm2)",
          textAlign: TextAlign.center,
          style: TextStyle(color: Color.fromARGB(255, 255, 255, 255)),
        ),
        backgroundColor: Color.fromARGB(255, 63, 5, 162),
        centerTitle: true,
        elevation: 4.0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              "Elétrica residencial de cabos de cobre:",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 20.0,
                color: Color.fromARGB(255, 0, 102, 204),
              ),
            ),
            Text(
              "Distância em metros:",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 20.0,
                color: Color.fromARGB(255, 0, 102, 204),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              decoration: InputDecoration(
                labelText: "Digite a distância",
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
                distancia = double.tryParse(value) ?? 0.0;
              },
            ),
            Text(
              "Corrente:",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 20.0,
                color: Color.fromARGB(255, 0, 102, 204),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              decoration: InputDecoration(
                labelText: "Digite a corrente em amperes",
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                corrente = double.tryParse(value) ?? 0.0;
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
                      backgroundColor: Color.fromARGB(255, 63, 5, 162),
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
