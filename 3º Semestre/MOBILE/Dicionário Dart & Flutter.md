Dicionário Dart & Flutter

StatefulWidget: Widget dinâmico que consegue mudar o que exibe na tela em resposta a eventos ou alterações de dados.

StatelessWidget: Um widget estático que não requer estado mutável (não muda depois de criado).

setState((){}): O gatilho da mudança. É a função que avisa ao Flutter: "Ei, a informação mudou, redesenhe a tela agora!".

key: Identificador único usado para preservar o estado de um widget ou para que o Flutter saiba exatamente qual elemento mover quando a interface muda.

(BuildContext context) → Widget: Função que recebe as informações do sistema (contexto) e retorna as instruções de desenho para construir a interface visual.

Class: Funciona como um "molde" para a criação de objetos e definição de outras estruturas.

@override: Serve para dizer que você está reescrevendo um método que já existe na classe pai.

_MainAppState: Classe que gerencia os dados dinâmicos e a interface principal, controlando o que muda na tela enquanto o app roda.

void dispose(): Função que "desliga" e limpa recursos da memória (como controllers) quando um widget é removido da tela.

Scaffold: A estrutura básica (o esqueleto) que segura a barra de ferramentas, o corpo e as mensagens do app.

AppBar: A barra no topo da tela que geralmente contém o título e botões de ação.

Column: Organiza os widgets um embaixo do outro (vertical).

Row: Organiza os widgets um ao lado do outro (horizontal).

Center: Widget que coloca seu "filho" exatamente no meio do espaço disponível.

Padding: Cria um espaçamento interno (respiro) entre a borda do widget e o seu conteúdo.

SizedBox: Widget de tamanho fixo usado para criar espaços vazios ou forçar dimensões específicas.

Container: Widget versátil para aplicar cores, bordas, margens e sombras.

SingleChildScrollView: Habilita a rolagem da tela. Essencial para o app não "quebrar" quando o teclado abre.

mainAxisAlignment: Define como os widgets são distribuídos ao longo do eixo principal (horizontal na Row, vertical na Column).

GlobalKey<FormState>(): Chave mestra que permite acessar, validar e limpar um formulário de qualquer lugar do código.

TextEditingController: Objeto que controla o texto dentro de um campo; serve para ler o que foi digitado ou limpar o campo via código.

TextFormField: Campo de texto com suporte integrado para validação.

InputDecoration: Define a aparência visual do campo (bordas, ícones e cores).

labelText: O título que "flutua" para o topo quando o campo é clicado.

hintText: Texto de dica que desaparece ao começar a digitar.

prefixIcon / suffixIcon: Ícones no início ou no fim do campo.

validator: Função que analisa o texto e retorna um erro se os dados forem inválidos.

String? (parâmetro): O texto digitado (pode ser nulo).

String? (retorno): Retorna a mensagem de erro ou null se estiver tudo certo.

obscureText: Oculta os caracteres (usado para senhas). true mostra pontos, false mostra o texto.

ElevatedButton: Botão com relevo e sombra para ações principais.

onPressed: Função executada ao clicar.

child: O conteúdo dentro do botão (texto ou ícone).

currentState: Propriedade da chave que permite dar ordens ao widget (como .validate() ou .reset()).

Navigator.push: Comando para abrir uma nova tela, colocando-a no topo da "pilha".

MaterialPageRoute: Define a animação de transição entre telas seguindo o padrão do sistema.

ScaffoldMessenger / showSnackBar: Conjunto usado para exibir mensagens rápidas (SnackBars) no rodapé da tela.

final String: Uma variável de texto que só pode ser definida uma vez e nunca mais alterada