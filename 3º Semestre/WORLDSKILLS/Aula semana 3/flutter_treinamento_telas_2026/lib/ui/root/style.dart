import 'package:flutter/material.dart';
import 'colors.dart';

abstract class AppSt {
  static ThemeData temaClaro = ThemeData.light().copyWith(
    textTheme: TextTheme(
      titleMedium: TextStyle(
        color: AppColors.p5,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      titleLarge: TextStyle(
        color: AppColors.p5,
        fontSize: 24,
        fontWeight: FontWeight.bold,
      ),
      titleSmall: TextStyle(
        color: AppColors.p5,
        fontSize: 16,
        fontWeight: FontWeight.bold,
      ),
      bodyMedium: TextStyle(color: AppColors.p5, fontSize: 16),
      labelMedium: TextStyle(color: AppColors.p5, fontSize: 16),
      displayMedium: TextStyle(color: AppColors.p5, fontSize: 16),
      headlineMedium: TextStyle(color: AppColors.p5, fontSize: 16),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ButtonStyle(
        foregroundColor: WidgetStateProperty.all(AppColors.p2),
        backgroundColor: WidgetStateProperty.all(AppColors.p5),
        textStyle: WidgetStateProperty.all(
          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
      ),
    ),
    dialogTheme: DialogThemeData(
      backgroundColor: AppColors.p2
    ),
  );

  static ThemeData temaEscuro = ThemeData.dark().copyWith(
    textTheme: TextTheme(
      titleMedium: TextStyle(
        color: AppColors.p1,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      titleLarge: TextStyle(
        color: AppColors.p1,
        fontSize: 24,
        fontWeight: FontWeight.bold,
      ),
      titleSmall: TextStyle(
        color: AppColors.p1,
        fontSize: 16,
        fontWeight: FontWeight.bold,
      ),
      bodyMedium: TextStyle(color: AppColors.p1, fontSize: 16),
      labelMedium: TextStyle(color: AppColors.p1, fontSize: 16),
      displayMedium: TextStyle(color: AppColors.p1, fontSize: 16),
      headlineMedium: TextStyle(color: AppColors.p1, fontSize: 16),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ButtonStyle(
        foregroundColor: WidgetStateProperty.all(AppColors.p5),
        backgroundColor: WidgetStateProperty.all(AppColors.p1),
        textStyle: WidgetStateProperty.all(
          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
      ),
    ),
    dialogTheme: DialogThemeData(
      backgroundColor: AppColors.p5
    ),
  );
}
