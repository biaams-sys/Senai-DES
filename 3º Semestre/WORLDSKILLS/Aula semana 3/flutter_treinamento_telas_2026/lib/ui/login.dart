import 'dart:convert';

import 'package:flutter/material.dart';
import '../ui/splash.dart';
import 'package:http/http.dart' as http;
import '../api.dart';
import 'home.dart';
import 'root/colors.dart';
import 'root/modais.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  bool olho = true;
  String mock = API.url;
  String email = 'ana@email.com';
  String senha = 'senha123';
  List<dynamic> usuarios = [];
  late TextEditingController _email, _senha;

  @override
  void initState() {
    super.initState();
    _email = TextEditingController(text: email);
    _senha = TextEditingController(text: senha);
    carregarAPIMock();
  }

  void carregarAPIMock() async {
    try {
      final resp = await http.get(Uri.parse(mock));
      if (resp.statusCode == 200) {
        usuarios = json.decode(resp.body);
      } else {
        if (mounted) {
          Mod.msg(context, 'erro ao carregar dados da API');
        }
      }
    } catch (e) {
      if (mounted) {
        Mod.msg(context, 'erro ao carregar dados da API: $e');
      }
    }
  }

  void entrar() {
    int indice = -1;
    indice = usuarios.indexWhere((e) => e['email'] == email);
    if (indice != -1) {
      if (usuarios[indice]['senha'] == senha) {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => Home()),
        );
      } else {
        if (mounted) {
          Mod.msg(context, "Senha não confere");
        }
      }
    } else {
      if (mounted) {
        Mod.msg(context, "E-mail nao encontrado");
      }
    }
  }

  void gotoSplash() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => Splash()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/fundo.jpg'),
            fit: BoxFit.cover,
            colorFilter: ColorFilter.mode(
              Color.fromRGBO(0, 0, 0, 0.2),
              BlendMode.dstATop,
            ),
          ),
        ),
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              spacing: 20,
              children: [
                GestureDetector(
                  onTap: gotoSplash,
                  child: Text("Papelaria", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),)),
                TextField(
                  controller: _email,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'E-mail',
                  ),
                  onChanged: (value) {
                    email = value;
                  },
                ),
                TextField(
                  controller: _senha,
                  obscureText: olho,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Senha',
                    suffixIcon: IconButton(
                      onPressed: () {
                        setState(() {
                          olho = !olho;
                        });
                      },
                      icon: Icon(
                        olho ? Icons.visibility_off : Icons.visibility,
                      ),
                    ),
                  ),
                  onChanged: (value) {
                    senha = value;
                  },
                ),
                ElevatedButton(
                  onPressed: () => entrar(),
                  child: Text("Entrar"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
