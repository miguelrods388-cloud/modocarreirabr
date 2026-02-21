// =============================
// BASE DE CLUBES
// =============================

const clubes = [
  { nome: "Flamengo", liga: "Brasil", forca: 85 },
  { nome: "Palmeiras", liga: "Brasil", forca: 84 },
  { nome: "Real Madrid", liga: "Europa", forca: 95 },
  { nome: "Barcelona", liga: "Europa", forca: 92 },
  { nome: "Manchester City", liga: "Europa", forca: 94 },
  { nome: "Al Hilal", liga: "Arabia", forca: 82 },
  { nome: "LA Galaxy", liga: "MLS", forca: 75 },
  { nome: "Shanghai Port", liga: "China", forca: 78 },
  { nome: "Kawasaki Frontale", liga: "Japão", forca: 79 }
];

// =============================
// CRIAÇÃO DE JOGADOR
// =============================

let player = null;

function criarJogador(){
  const nome = prompt("Nome do jogador:");
  player = {
    nome: nome || "Novo Talento",
    idade: 18,
    clube: clubes[0],
    status: "Base",
    contrato: 3,
    salario: 1,
    dinheiro: 0,
    valor: 5,
    emprestimo: 0,
    atributos: {
      tecnico: 65,
      fisico: 70,
      mental: 60
    },
    total: {
      partidas: 0,
      gols: 0,
      assistencias: 0,
      titulos: 0
    }
  };
  atualizarTela();
}

criarJogador();

// =============================
// TEMPORADA
// =============================

function passarAno(){

  if(player.idade >= 40){
    output("🏁 O jogador se aposentou!");
    return;
  }

  let desempenho = (player.atributos.tecnico + player.atributos.mental) / 2;
  let partidas = Math.floor(Math.random()*40)+10;
  let gols = Math.floor(desempenho/10 + Math.random()*5);
  let assist = Math.floor(Math.random()*10);

  player.total.partidas += partidas;
  player.total.gols += gols;
  player.total.assistencias += assist;

  if(Math.random()*100 < player.clube.forca/2){
    player.total.titulos++;
  }

  player.dinheiro += player.salario;

  evoluir();
  declinio();
  ajustarStatus();

  player.idade++;
  player.contrato--;

  if(player.contrato <= 0){
    mercado();
  }

  if(player.emprestimo > 0){
    player.emprestimo--;
    if(player.emprestimo === 0){
      output("📢 Fim do empréstimo. Você retornou ao clube.");
    }
  }

  salvarAuto();

  output(`
    📅 Temporada Finalizada<br><br>
    Clube: ${player.clube.nome}<br>
    Partidas: ${partidas}<br>
    Gols: ${gols}<br>
    Assistências: ${assist}<br>
    Salário recebido: €${player.salario}M<br>
    Dinheiro total: €${player.dinheiro}M
  `);

  atualizarTela();
}

// =============================
// EVOLUÇÃO / DECLÍNIO
// =============================

function evoluir(){
  if(player.idade <= 28){
    player.atributos.tecnico += 2;
    player.valor += 3;
  }
}

function declinio(){
  if(player.idade > 33){
    player.atributos.fisico -= 2;
    player.valor -= 2;
  }
}

// =============================
// STATUS
// =============================

function ajustarStatus(){
  if(player.total.gols > 300) player.status = "Lenda";
  else if(player.total.gols > 200) player.status = "Ídolo";
  else if(player.total.gols > 100) player.status = "Estrela";
  else if(player.total.gols > 50) player.status = "Titular";
  else if(player.total.gols > 20) player.status = "Promessa";
}

// =============================
// MERCADO COM ACEITAR/RECUSAR
// =============================

function mercado(){

  let ofertasHTML = "<h3>💼 Ofertas Recebidas</h3>";

  clubes.forEach((clube, index) => {
    let valorOferta = Math.floor(player.valor + Math.random()*10);
    let salarioOferta = Math.floor(player.salario + Math.random()*5);

    ofertasHTML += `
      <br>
      ${clube.nome} (${clube.liga})<br>
      💰 Transferência: €${valorOferta}M<br>
      💵 Salário: €${salarioOferta}M<br>
      <button onclick="aceitar(${index}, ${salarioOferta})">Aceitar</button>
      <button onclick="recusar()">Recusar</button>
      <hr>
    `;
  });

  if(player.idade >= 35){
    ofertasHTML += "<br>🌎 Oferta especial da MLS e Arabia disponível!";
  }

  output(ofertasHTML);
}

function aceitar(index, salario){
  player.clube = clubes[index];
  player.salario = salario;
  player.contrato = 3;
  output("✅ Transferência aceita!");
  atualizarTela();
}

function recusar(){
  output("❌ Você recusou as ofertas.");
}

// =============================
// UTILIDADES
// =============================

function atualizarTela(){
  if(!player) return;

  document.getElementById("playerInfo").innerHTML = `
    <strong>${player.nome}</strong><br>
    Idade: ${player.idade}<br>
    Clube: ${player.clube.nome} (${player.clube.liga})<br>
    Status: ${player.status}<br>
    Valor: €${player.valor}M<br>
    Salário: €${player.salario}M<br>
    Dinheiro: €${player.dinheiro}M<br>
    Contrato: ${player.contrato} anos
  `;
}

function verEstatisticas(){
  output(`
    📊 Carreira<br><br>
    Partidas: ${player.total.partidas}<br>
    Gols: ${player.total.gols}<br>
    Assistências: ${player.total.assistencias}<br>
    Títulos: ${player.total.titulos}
  `);
}

function salvar(){
  localStorage.setItem("saveV3", JSON.stringify(player));
  alert("Jogo salvo!");
}

function carregar(){
  let save = localStorage.getItem("saveV3");
  if(save){
    player = JSON.parse(save);
    atualizarTela();
    alert("Save carregado!");
  }
}

function salvarAuto(){
  localStorage.setItem("saveV3", JSON.stringify(player));
}

function output(texto){
  document.getElementById("output").innerHTML = texto;
}
