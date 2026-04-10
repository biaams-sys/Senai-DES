import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  final String nome;
  final String idade;

  const HomePage({
    super.key,
    required this.nome,
    required this.idade,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Home"),
      ),
      body: Center(
        child: Text(
          "Nome: $nome\nIdade: $idade",
          style: const TextStyle(fontSize: 22),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}