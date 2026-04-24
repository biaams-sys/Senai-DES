import 'package:flutter/material.dart';

abstract class Mod {
  static void msg(BuildContext context, String msg) {
    showDialog(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: Text("Mensagem"),
        content: Text(msg),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text("OK"),
          ),
        ],
    ),
    );
  }
}