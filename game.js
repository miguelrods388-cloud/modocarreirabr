const clubes = [
  { nome: "Flamengo", liga: "Brasil", forca: 85 },
  { nome: "Palmeiras", liga: "Brasil", forca: 84 },
  { nome: "Real Madrid", liga: "Europa", forca: 95 },
  { nome: "Manchester City", liga: "Europa", forca: 94 },
  { nome: "Al Hilal", liga: "Arabia", forca: 82 },
  { nome: "LA Galaxy", liga: "MLS", forca: 75 },
  { nome: "Shanghai Port", liga: "China", forca: 78 },
  { nome: "Kawasaki Frontale", liga: "Japão", forca: 79 }
];

let player = {
  nome: prompt("Nome do jogador:") || "Novo Talento",
  idade: 18,
  clube: clubes[0],
  contrato: 3,
  salario: 1,
  dinheiro: 0,
  valor: 5,
  status: "Base",
  lesao: 0,
  total: { partidas:0, gols:0, assistencias:0, titulos:0 },
  premios: 0,
  selecao: false
};

function passarAno(){

  if(player.idade >= 40){
    output("🏁 O jogador se aposentou!");
    return;
  }

  if(player.lesao > 0){
    player.lesao--;
    output("🤕 Jogador lesionado nesta temporada!");
    player.idade++;
    atualizarTela();
    return;
  }

  let desempenho = player.valor + Math.random()*10;

  let partidas = Math.floor(Math.random()*40)+10;
  let gols = Math.floor(desempenho/10);
  let assist = Math.floor(Math.random()*10);

  player.total.partidas += partidas;
  player.total.gols += gols;
  player.total.assistencias += assist;

  if(Math.random()*100 < player.clube.forca/2){
    player.total.titulos++;
  }

  if(desempenho > 80 && Math.random() > 0.7){
    player.premios++;
  }

  if(desempenho > 75 && Math.random() > 0.6){
    player.selecao = true;
  }

  if(Math.random() > 0.9){
    player.lesao = 1;
  }

  player.dinheiro += player.salario;
  player.valor += 3;
  player.idade++;
  player.contrato--;

  if(player.contrato <= 0){
    mercado();
  }

  salvarAuto();
  atualizarTela();

  output(`
    📅 Temporada concluída<br><br>
    ⚽ Partidas: ${partidas}<br>
    🥅 Gols: ${gols}<br>
    🎯 Assistências: ${assist}<br>
    🏆 Títulos totais: ${player.total.titulos}<br>
    🏅 Prêmios individuais: ${player.premios}
  `);
}

function mercado(){

  let html = "<h3>💼 Ofertas</h3>";

  clubes.forEach((clube, i)=>{
    let salario = Math.floor(player.salario + Math.random()*5);
    html += `
      ${clube.nome} (${clube.liga})<br>
      💰 Salário: €${salario}M<br>
      <button onclick="aceitar(${i},${salario})">Aceitar</button>
      <hr>
    `;
  });

  output(html);
}

function aceitar(i,sal){
  player.clube = clubes[i];
  player.salario = sal;
  player.contrato = 3;
  output("✅ Transferência concluída!");
  atualizarTela();
}

function verEstatisticas(){
  output(`
    📊 Carreira Completa<br><br>
    Partidas: ${player.total.partidas}<br>
    Gols: ${player.total.gols}<br>
    Assistências: ${player.total.assistencias}<br>
    Títulos: ${player.total.titulos}<br>
    Prêmios: ${player.premios}<br>
    Convocado Seleção: ${player.selecao ? "Sim" : "Não"}
  `);
}

function atualizarTela(){
  document.getElementById("playerCard").innerHTML = `
    <h2>${player.nome}</h2>
    Idade: ${player.idade}<br>
    Clube: ${player.clube.nome} (${player.clube.liga})<br>
    Status: ${player.status}<br>
    Valor: €${player.valor}M<br>
    Salário: €${player.salario}M<br>
    Dinheiro: €${player.dinheiro}M<br>
    Contrato: ${player.contrato} anos
  `;
}

function salvar(){
  localStorage.setItem("saveV4", JSON.stringify(player));
  alert("Salvo!");
}

function carregar(){
  let save = localStorage.getItem("saveV4");
  if(save){
    player = JSON.parse(save);
    atualizarTela();
  }
}

function salvarAuto(){
  localStorage.setItem("saveV4", JSON.stringify(player));
}

function output(texto){
  document.getElementById("output").innerHTML = texto;
}

atualizarTela();
