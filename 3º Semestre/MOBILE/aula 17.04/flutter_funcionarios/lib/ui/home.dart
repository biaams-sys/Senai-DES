import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../root/pallet.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  List<Map<String, dynamic>> funcionarios = [];
  int indice = 0;

  @override
  void initState() {
    super.initState();
    carregarMockupJSON();
  }

  Future<void> carregarMockupJSON() async {
    // Carrega o arquivo JSON
    final String dados = await rootBundle.loadString('assets/mockup/funcionarios.json');
    
    setState(() {
      funcionarios = List<Map<String, dynamic>>.from(json.decode(dados));
    });
  }

  @override
  Widget build(BuildContext context) {
    // Tela de carregamento enquanto o JSON não é processado
    if (funcionarios.isEmpty) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    // MAPEAMENTO CORRETO DAS VARIÁVEIS (Baseado no seu JSON real)
    final funcionario = funcionarios[indice];
    
    // Antes era 'preco', agora é 'salario'
    final double salario = (funcionario['salario'] ?? 0).toDouble();
    
    // No seu JSON o caminho da imagem está em 'avatar' e não 'img'
    final String caminhoImagem = funcionario['avatar'] ?? '';
    
    // Como não tem 'descricao', vamos usar o 'cargo' e a 'dataContatacao'
    final String cargo = funcionario['cargo'] ?? 'Funcionário';

    return Scaffold(
      appBar: AppBar(title: const Text("Funcionários da Lavanderia")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const SizedBox(height: 20),

            // Dropdown de seleção
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 40),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(30),
                color: AppColors.p1,
                boxShadow: [
                  BoxShadow(
                    color: AppColors.p2,
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: DropdownButton<Map<String, dynamic>>(
                borderRadius: BorderRadius.circular(8),
                isExpanded: true,
                underline: const SizedBox.shrink(),
                value: funcionario,
                items: funcionarios.map((f) {
                  return DropdownMenuItem<Map<String, dynamic>>(
                    value: f,
                    child: Text(f['nome']),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    indice = funcionarios.indexOf(value!);
                  });
                },
              ),
            ),

            const SizedBox(height: 20),

            Text(
              funcionario['nome'],
              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            Text(cargo, style: const TextStyle(fontSize: 16, color: Colors.grey)),

            const SizedBox(height: 20),

            // Card com imagem e detalhes
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(30),
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: AppColors.p2,
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.all(18.0),
                child: Column(
                  children: [
                    // Ajuste para carregar asset local removendo a barra inicial se necessário
                    Image.asset(
                      caminhoImagem.startsWith('/') ? caminhoImagem.substring(1) : caminhoImagem,
                      width: 200,
                      errorBuilder: (context, error, stackTrace) {
                        return const Icon(Icons.person, size: 100, color: Colors.grey);
                      },
                    ),

                    const SizedBox(height: 10),

                    Text("Salário: R\$ ${salario.toStringAsFixed(2).replaceAll('.', ',')}"),
                    const SizedBox(height: 5),
                    Text("Admissão: ${funcionario['dataContatacao']}"),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 20),

            // Botões de navegação
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                ElevatedButton(
                  onPressed: indice > 0 ? () => setState(() => indice--) : null,
                  child: const Text("Anterior"),
                ),
                ElevatedButton(
                  onPressed: indice < funcionarios.length - 1 
                      ? () => setState(() => indice++) 
                      : null,
                  child: const Text("Próximo"),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}