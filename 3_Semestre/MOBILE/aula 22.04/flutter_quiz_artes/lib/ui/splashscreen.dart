// ignore_for_file: prefer_const_literals_to_create_immutables, prefer_const_constructors

import 'package:flutter/material.dart';
import 'dart:async';
import 'package:quiz_pop_art/ui/quiz.dart';

class PrimeiraTela extends StatefulWidget {
  const PrimeiraTela({super.key});

  @override
  State<PrimeiraTela> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<PrimeiraTela> {
  @override
  void initState() {
    super.initState();
    Timer(Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => QuizPage()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF8E1E9),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Ícone simples
            Container(
              padding: EdgeInsets.all(40),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Color(0xFFE91E63),
                    blurRadius: 10,
                  ),
                ],
              ),
              child: Icon(
                Icons.palette_outlined,
                size: 80,
                color: Color(0xFFE91E63),
              ),
            ),
            SizedBox(height: 30),
            Text(
              'POP ART',
              style: TextStyle(
                fontSize: 36,
                fontWeight: FontWeight.bold,
                color: Color(0xFFE91E63),
              ),
            ),
            SizedBox(height: 10),
            Text(
              'Quiz',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w600,
                color: Color(0xFFE91E63),
              ),
            ),
            SizedBox(height: 50),
            CircularProgressIndicator(
              color: Color(0xFFE91E63),
              strokeWidth: 4,
            ),
          ],
        ),
      ),
    );
  }
}