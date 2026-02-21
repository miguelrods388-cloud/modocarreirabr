let player = {
  nome: "Novo Jogador",
  idade: 18,
  clube: "Clube da Base",
  liga: "Brasil",
  status: "Jovem da Base",
  atributos: {
    tecnico: 65,
    fisico: 70,
    mental: 60
  },
  temporada: {
    partidas: 0,
    gols: 0,
    assistencias: 0
  },
  total: {
    partidas: 0,
    gols: 0,
    assistencias: 0,
    titulos: 0
  }
};

function atualizarTela() {
  document.getElementById("playerInfo").innerHTML = `
    <strong>${player.nome}</strong><br>
    Idade: ${player.idade}<br>
    Clube: ${player.clube}<br>
    Status: ${player.status}
  `;
}

function passarAno() {

  if(player.idade >= 70){
    document.getElementById("output").innerHTML =
      "🏁 O jogador se aposentou automaticamente aos 70 anos!";
    return;
  }

  let desempenho = Math.random() * player.atributos.tecnico;

  player.temporada.partidas = Math.floor(Math.random() * 50);
  player.temporada.gols = Math.floor(desempenho / 10);
  player.temporada.assistencias = Math.floor(Math.random() * 10);

  player.total.partidas += player.temporada.partidas;
  player.total.gols += player.temporada.gols;
  player.total.assistencias += player.temporada.assistencias;

  if(desempenho > 60){
    player.total.titulos += 1;
  }

  player.idade++;

  ajustarStatus();
  ajustarDeclinio();

  document.getElementById("output").innerHTML = `
    📅 Temporada concluída! <br><br>
    Partidas: ${player.temporada.partidas}<br>
    Gols: ${player.temporada.gols}<br>
    Assistências: ${player.temporada.assistencias}<br>
    Títulos na carreira: ${player.total.titulos}
  `;

  atualizarTela();
}

function ajustarStatus(){
  if(player.total.gols > 200){
    player.status = "Lenda";
  } else if(player.total.gols > 100){
    player.status = "Ícone";
  } else if(player.total.gols > 50){
    player.status = "Superestrela";
  }
}

function ajustarDeclinio(){
  if(player.idade > 35){
    player.atributos.fisico -= 2;
  }
  if(player.idade > 40){
    player.atributos.fisico -= 3;
  }
}

function mercado(){

  let ofertas = [];

  if(player.idade >= 35){
    ofertas.push("Proposta da Saudi Pro League");
    ofertas.push("Proposta da MLS");
  } else {
    ofertas.push("Proposta de clube europeu médio");
  }

  document.getElementById("output").innerHTML =
    "💼 Ofertas recebidas:<br><br>" + ofertas.join("<br>");
}

function verEstatisticas(){
  document.getElementById("output").innerHTML = `
    📊 Estatísticas Totais<br><br>
    Partidas: ${player.total.partidas}<br>
    Gols: ${player.total.gols}<br>
    Assistências: ${player.total.assistencias}<br>
    Títulos: ${player.total.titulos}
  `;
}

function salvar(){
  localStorage.setItem("savePlayer", JSON.stringify(player));
  alert("Jogo salvo!");
}

function carregar(){
  let save = localStorage.getItem("savePlayer");
  if(save){
    player = JSON.parse(save);
    atualizarTela();
    alert("Save carregado!");
  }
}

atualizarTela();
