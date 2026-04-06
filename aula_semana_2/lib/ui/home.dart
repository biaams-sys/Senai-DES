import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../api.dart';
import 'splash.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  List<dynamic> receitas = [];

  @override
  void initState() {
    super.initState();
    carregarReceitas();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: backSplash,
          icon: Icon(Icons.arrow_back),
        ),
        title: Text("Nossas Receitas"),
      ),
      body: GridView.builder(
        itemCount: receitas.length,
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
        ),
        itemBuilder: (context, i) => Container(
          child: Column(
            children: [
              Text(receitas[i]['nome']),
              receitas[i]['img'] != ''
                  ? Image.network(receitas[i]['img'], width: 80, height: 80)
                  : Image.asset('assets/bolo.jpg', width: 80, height: 80),
              ElevatedButton(onPressed: (){}, child: Text("Detalhes"))
            ],
          ),
        ),
      ),
    );
  }

  void carregarReceitas() async {
    try {
      final resp = await http.get(Uri.parse(Api.url));
      if (resp.statusCode == 200) {
        setState(() {
          receitas = json.decode(resp.body);
        });
      } else {
        msg("Erro de respota da API", "Codigo do erro: ${resp.statusCode}");
      }
    } catch (e) {
      msg("Erro de conexão:", e.toString());
    }
  }

  void msg(String tit, String txt) {
    if (mounted) {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: Text(tit),
          content: Text(txt),
          actions: [
            ElevatedButton(
              onPressed: Navigator.of(context).pop,
              child: Text('Ok'),
            ),
          ],
        ),
      );
    }
  }

  void backSplash() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => Splash()),
    );
  }
}
