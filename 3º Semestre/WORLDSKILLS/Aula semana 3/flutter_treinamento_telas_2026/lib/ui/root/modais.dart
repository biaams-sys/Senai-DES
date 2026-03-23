import 'package:flutter/material.dart';
import './colors.dart';

abstract class Mod {
  static void msg(BuildContext context, String msg) {
    showDialog(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: Text("Mensagem", style: TextStyle(color: AppColors.p5)),
        content: Text(msg, style: TextStyle(color: AppColors.p5)),
        backgroundColor: AppColors.p2,
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.of(context).pop(),
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.p3),
            child: Text("OK", style: TextStyle(backgroundColor: AppColors.p3)),
          ),
        ],
      ),
    );
  }


  static bool confirm(BuildContext context, String msg) {
    bool ok = false;
    showDialog(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: Text("Mensagem", style: TextStyle(color: AppColors.p5)),
        content: Text(msg, style: TextStyle(color: AppColors.p5)),
        backgroundColor: AppColors.p2,
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.of(context).pop(),
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.p3),
            child: Text("Não", style: TextStyle(backgroundColor: AppColors.p3)),
          ),
          ElevatedButton(
            onPressed: () { 
              Navigator.of(context).pop(); 
              ok = true;
            },
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.p3),
            child: Text("Sim", style: TextStyle(backgroundColor: AppColors.p3)),
          ),
        ],
      ), 
    );
    return ok;
  }
}