const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
// 🧱 Pilar estrutural 
let estudantes = [
  { nome: "jamille", idade: 20, notas: [7] },
  { nome: "felipe", idade: 22, notas: [3] },
  { nome: "braz", idade: 19, notas: [6] },
  { nome: "gabriel", idade: 21, notas: [9] },
  { nome: "ronaldo", idade: 34, notas: [6.5] }
];
// 📝 Função pra calcular a média
function calcularMedia(notas) {
  return notas.reduce((acc, nota) => acc + nota, 0) / notas.length;
}
// 🕵🏽‍♂️ Função verificadora 
function verificarSituacao(media) {
  if (media >= 7) return "Aprovado";
  if (media >= 5) return "Recuperação";
  return "Reprovado";
}
// 🎲 Validar dados
function validarEstudante(nome, idade, notas) {
  if (!nome || typeof nome !== "string" || nome.trim() === "") return false;
  if (typeof idade !== "number" || idade <= 0 || isNaN(idade)) return false;
  if (!Array.isArray(notas) || notas.length === 0) return false;
  if (notas.some(n => typeof n !== "number" || n < 0 || n > 10 || isNaN(n))) return false;
  return true;
}
// ➕ Adicionar novos estudantes
function adicionarEstudante(nome, idade, notas) {
  if (!validarEstudante(nome, idade, notas)) {
    console.log("❌ Dados inválidos. Verifique nome, idade e notas.");
    return;
  }
  estudantes.push({ nome, idade, notas });
  console.log("✅ Estudante adicionado com sucesso!");
}
// 📄 Listar estudantes
function listarEstudantes() {
  if (estudantes.length === 0) {
    console.log("Nenhum estudante cadastrado.");
    return;
  }

  estudantes.forEach(estudante => {
    const media = calcularMedia(estudante.notas);
    const situacao = verificarSituacao(media);
    console.log(`👤 ${estudante.nome} | Idade: ${estudante.idade} | Média: ${media.toFixed(2)} | Situação: ${situacao}`);
  });
}
// 🔎 Buscar por nomes
function buscarEstudante(nomeBusca) {
  const encontrados = estudantes.filter(e =>
    e.nome.toLowerCase().includes(nomeBusca.toLowerCase())
  );

  if (encontrados.length === 0) {
    console.log("🔎 Nenhum estudante encontrado.");
    return;
  }

  encontrados.forEach(e => {
    const media = calcularMedia(e.notas);
    console.log(`👤 ${e.nome} | Média: ${media.toFixed(2)}`);
  });
}
// 📈 Estatísticas da turma
function estatisticasTurma() {
  if (estudantes.length === 0) {
    console.log("Nenhum estudante para calcular estatísticas.");
    return;
  }
  const medias = estudantes.map(e => calcularMedia(e.notas));
  const mediaGeral = medias.reduce((acc, m) => acc + m, 0) / medias.length;
  const melhorEstudante = estudantes.reduce((melhor, atual) => {
    const mediaAtual = calcularMedia(atual.notas);
    return mediaAtual > calcularMedia(melhor.notas) ? atual : melhor;
  }, estudantes[0]);

  console.log(`📊 Média geral da turma: ${mediaGeral.toFixed(2)}`);
  console.log(`🏅 Melhor estudante: ${melhorEstudante.nome} - Média: ${calcularMedia(melhorEstudante.notas).toFixed(2)}`);
}
// 📺 Menu interativo
function menu() {
  console.log(`
🖥️ MENU
1 - Adicionar estudante
2 - Listar estudantes
3 - Buscar estudante por nome
4 - Estatísticas da turma
0 - Sair
`);
  readline.question("Escolha uma opção: ", opcao => {
    switch (opcao.trim()) {
      case "1":
        readline.question("Nome: ", nome => {
          readline.question("Idade: ", idadeStr => {
            const idade = parseInt(idadeStr.trim());
            readline.question("Notas (separadas por vírgula): ", notasStr => {
              const notas = notasStr.split(",").map(n => parseFloat(n.trim()));
              adicionarEstudante(nome.trim(), idade, notas);
              menu();
            });
          });
        });
        break;
      case "2":
        listarEstudantes();
        menu();
        break;
      case "3":
        readline.question("Nome para buscar: ", nomeBusca => {
          buscarEstudante(nomeBusca.trim());
          menu();
        });
        break;
      case "4":
        estatisticasTurma();
        menu();
        break;
      case "0":
        console.log("👋 Encerrando...");
        readline.close();
        break;
      default:
        console.log("❌ Opção inválida.");
        menu();
    }
  });
}
// 🔰 Inicia o programa
menu();