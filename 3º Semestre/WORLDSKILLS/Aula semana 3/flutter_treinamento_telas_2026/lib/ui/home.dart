import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_treinamento_telas_2026/ui/root/colors.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  List<dynamic> produtos = [];
  @override
  void initState() {
    super.initState();
    carregarJSON();
  }

  void carregarJSON() async {
    String dados = await rootBundle.loadString('assets/dados/produtos.json');
    setState(() {
      produtos = json.decode(dados);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('papelaria'),
        actions: [ElevatedButton(onPressed: () {}, child: Text("Escuro"))],
      ),
      body: Center(
        child: ListView.builder(
          itemBuilder: (context, index) => Container(
            decoration: BoxDecoration(
              color: AppColors.p1,
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                BoxShadow(
                  color: AppColors.p5,
                  spreadRadius: 2,
                  blurRadius: 5,
                  offset: Offset(0, 3),
                ),
              ],
            ),
            margin: EdgeInsets.all(10),
            child: Padding(
              padding: EdgeInsets.all(12.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  CircleAvatar(
                    child: Image.network(
                      produtos[index]['img'] == ''
                          ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Item_sem_imagem.svg/1280px-Item_sem_imagem.svg.png'
                          : produtos[index]['img'],
                    ),
                  ),
                  Text(produtos[index]['nome']),
                  Text(
                    'R\$ ${produtos[index]['preco'].toStringAsFixed(2).replaceAll('.', ',')}',
                  ),
                ],
              ),
            ),
          ),
          itemCount: produtos.length,
        ),
      ),
    );
  }
}
