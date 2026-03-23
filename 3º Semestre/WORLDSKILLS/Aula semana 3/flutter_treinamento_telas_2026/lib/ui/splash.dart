import 'dart:async';
import 'package:flutter/material.dart';
import 'login.dart';

class Splash extends StatefulWidget {
  const Splash({super.key});

  @override
  State<Splash> createState() => _SplashState();
}

class _SplashState extends State<Splash> with TickerProviderStateMixin {
  late AnimationController _escala;
  double _es = 0.1;

  @override
  void initState() {
    super.initState();
    _escala = AnimationController(vsync: this, duration: Duration(seconds: 3))
      ..addListener(() {
        setState(() {
          _es = _escala.value;
        });
      });
    _escala.forward();

    Timer(Duration(seconds: 3), () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Login())));
  }

  @override
  void dispose() {
    super.dispose();
    _escala.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Transform.scale(
        scale: _es,
        child: Center(child: Image.asset('./assets/papelaria.png', width: 200)),
      ),
    );
  }
}
