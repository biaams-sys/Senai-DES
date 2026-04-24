// ignore_for_file: prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:convert';
import 'package:quiz_pop_art/ui/resultado.dart';

class Question {
  final String texto;
  final List<String> opcoes;
  final int respostaCorreta;

  Question({
    required this.texto,
    required this.opcoes,
    required this.respostaCorreta,
  });

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      texto: json['texto'],
      opcoes: List<String>.from(json['opcoes']),
      respostaCorreta: json['respostaCorreta'],
    );
  }
}

class QuizPage extends StatefulWidget {
  const QuizPage({super.key});

  @override
  State<QuizPage> createState() => _QuizPageState();
}

class _QuizPageState extends State<QuizPage> {
  List<Question> questions = [];
  int currentQuestionIndex = 0;
  int totalAcertos = 0;
  int? selectedAnswer;
  bool showResult = false;
  String resultText = '';
  Color resultColor = Colors.transparent;

  @override
  void initState() {
    super.initState();
    loadQuestions();
  }

  Future<void> loadQuestions() async {
    final String response =
        await rootBundle.loadString('assets/perguntas.json');
    final List<dynamic> data = json.decode(response);
    setState(() {
      questions = data.map((json) => Question.fromJson(json)).toList();
    });
  }

  void selectAnswer(int index) {
    setState(() {
      selectedAnswer = index;
      showResult = true;
      if (index == questions[currentQuestionIndex].respostaCorreta) {
        totalAcertos++;
        resultText = 'ACERTOU';
        resultColor = Colors.green;
      } else {
        resultText = 'ERROU';
        resultColor = Colors.red;
      }
    });
  }

  void nextQuestion() {
    setState(() {
      currentQuestionIndex++;
      selectedAnswer = null;
      showResult = false;
      resultText = '';
      resultColor = Colors.transparent;
    });
    if (currentQuestionIndex >= questions.length) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => Resultado(
            totalAcertos: totalAcertos,
            totalPerguntas: questions.length,
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (questions.isEmpty) {
      return Scaffold(
        backgroundColor: Color(0xFFF8E1E9),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(color: Color(0xFFE91E63)),
              SizedBox(height: 20),
              Text('Carregando...', style: TextStyle(color: Color(0xFFE91E63))),
            ],
          ),
        ),
      );
    }

    final currentQuestion = questions[currentQuestionIndex];

    return Scaffold(
      backgroundColor: Color(0xFFF8E1E9),
      appBar: AppBar(
        title: Text(
          'Pergunta ${currentQuestionIndex + 1}/${questions.length}',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Color(0xFFE91E63),
        elevation: 0,
      ),
      body: Padding(
        padding: EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: Color(0xFFE91E63),
                    blurRadius: 10,
                  ),
                ],
              ),
              child: Text(
                currentQuestion.texto,
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  height: 1.4,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            SizedBox(height: 40),
            if (showResult)
              Container(
                padding: EdgeInsets.all(20),
                margin: EdgeInsets.only(bottom: 30),
                decoration: BoxDecoration(
                  color: resultColor,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: resultColor),
                ),
                child: Text(
                  resultText,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: resultColor,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            Expanded(
              child: ListView.builder(
                itemCount: currentQuestion.opcoes.length,
                itemBuilder: (context, index) {
                  final isSelected = selectedAnswer == index;
                  final isCorrect = showResult && 
                      index == currentQuestion.respostaCorreta;
                  final isWrong = showResult && 
                      selectedAnswer == index && 
                      index != currentQuestion.respostaCorreta;
                  return Padding(
                    padding: EdgeInsets.only(bottom: 16),
                    child: ElevatedButton(
                      onPressed: showResult ? null : () => selectAnswer(index),
                      style: ElevatedButton.styleFrom(
                        padding: EdgeInsets.all(20),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        backgroundColor: isCorrect
                            ? Colors.green[400]
                            : isWrong
                                ? Colors.red[400]
                                : isSelected
                                    ? Color(0xFFE91E63)
                                    : Colors.white,
                        foregroundColor: isSelected || isCorrect || isWrong
                            ? Colors.white
                            : Colors.black87,
                        elevation: 4,
                      ),
                      child: Text(
                        currentQuestion.opcoes[index],
                        style: TextStyle(fontSize: 16),
                      ),
                    ),
                  );
                },
              ),
            ),
            if (showResult)
              SizedBox(
                height: 55,
                child: ElevatedButton(
                  onPressed: nextQuestion,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFFE91E63),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 5,
                  ),
                  child: Text(
                    currentQuestionIndex + 1 == questions.length 
                        ? 'VER RESULTADO FINAL' 
                        : 'CONTINUAR',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
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