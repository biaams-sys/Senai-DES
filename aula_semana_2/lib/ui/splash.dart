import 'package:flutter/material.dart';
import 'home.dart';
class Splash extends StatefulWidget {
  const Splash({super.key});

  @override
  State<Splash> createState() => _SplashState();
}

class _SplashState extends State<Splash> {
  void gotoHome(){
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context)=>Home()));
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          spacing: 40,
          children: [
            Image.asset("assets/bolo.jpg", width: 200,),
            ElevatedButton(onPressed: gotoHome, child: Text("Entrar"))
          ],
        ),
      ),
    );
  }
}
