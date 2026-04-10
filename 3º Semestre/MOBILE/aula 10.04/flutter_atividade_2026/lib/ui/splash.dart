import 'package:flutter/material.dart';
import 'home.dart';

class SplashScreen extends StatefulWidget {
   const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {

  late AnimationController _controller;
  late Animation<double> _animation;

  final TextEditingController nomeController = TextEditingController();
  final TextEditingController idadeController = TextEditingController();

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      vsync: this,
      duration:  Duration(seconds: 2),
    );

    _animation = Tween<double>(begin: -300, end: 0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );

    _controller.forward();
  }

  void irParaHome() {
    String nome = nomeController.text;
    String idade = idadeController.text;

    Navigator.push(
      context,
      PageRouteBuilder(
        transitionDuration:  Duration(milliseconds: 700),
        pageBuilder: (_, _, _) =>
            HomePage(nome: nome, idade: idade),
        transitionsBuilder: (_, animation, _, child) {
          return FadeTransition(
            opacity: animation,
            child: child,
          );
        },
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding:  EdgeInsets.all(20),
        child: Column(
          children: [
             SizedBox(height: 60),

            AnimatedBuilder(
              animation: _animation,
              builder: (context, child) {
                return Transform.translate(
                  offset: Offset(0, _animation.value),
                  child: child,
                );
              },
              child: Image.asset(
                '/foto.png',
                height: 140,
              ),
            ),

             SizedBox(height: 40),

            TextField(
              controller: nomeController,
              decoration:  InputDecoration(
                labelText: "Nome",
                border: OutlineInputBorder(),
              ),
            ),

             SizedBox(height: 20),

            TextField(
              controller: idadeController,
              keyboardType: TextInputType.number,
              decoration:  InputDecoration(
                labelText: "Idade",
                border: OutlineInputBorder(),
              ),
            ),

             SizedBox(height: 30),

            ElevatedButton(
              onPressed: irParaHome,
              child:  Text("Entrar"),
            )
          ],
        ),
      ),
    );
  }
}