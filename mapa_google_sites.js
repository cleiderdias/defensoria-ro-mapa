// Este arquivo contém o código para incorporar o mapa no Google Sites
// usando a API do Google Maps e dados da planilha do Google Sheets

// Configuração para o mapa do Google
function initMap() {
  // Coordenadas centrais de Rondônia
  const rondonia = { lat: -10.83, lng: -63.34 };
  
  // Criar o mapa
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: rondonia,
    mapTypeId: "roadmap",
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
  });

  // Carregar os dados da planilha publicada
  // Substitua o URL abaixo pelo URL da sua planilha publicada
  const sheetUrl = "SUBSTITUA_PELO_URL_DA_PLANILHA_PUBLICADA";
  
  // Função para carregar os dados
  loadMapData(map, sheetUrl);
}

// Função para carregar dados da planilha
function loadMapData(map, sheetUrl) {
  // Aqui você usaria a API do Google Sheets para carregar os dados
  // Como exemplo, vamos usar dados estáticos
  
  const municipios = [
    {
      nome: "Porto Velho",
      lat: -8.7619,
      lng: -63.9004,
      status: "Não iniciada",
      tipoServico: "",
      dataInicio: "",
      previsaoTermino: "",
      responsavel: "",
      observacoes: ""
    },
    {
      nome: "Ji-Paraná",
      lat: -10.8777,
      lng: -61.9322,
      status: "Em andamento",
      tipoServico: "Reforma",
      dataInicio: "01/05/2025",
      previsaoTermino: "01/08/2025",
      responsavel: "Eng. Silva",
      observacoes: "Obra em fase inicial"
    },
    {
      nome: "Ariquemes",
      lat: -9.9135,
      lng: -63.0407,
      status: "Concluída",
      tipoServico: "Manutenção elétrica",
      dataInicio: "01/01/2025",
      previsaoTermino: "01/03/2025",
      responsavel: "Eng. Santos",
      observacoes: "Finalizada dentro do prazo"
    },
    {
      nome: "Vilhena",
      lat: -12.7502,
      lng: -60.1488,
      status: "Atrasada",
      tipoServico: "Construção",
      dataInicio: "01/02/2025",
      previsaoTermino: "01/04/2025",
      responsavel: "Eng. Oliveira",
      observacoes: "Atraso devido a problemas com materiais"
    },
    {
      nome: "Cacoal",
      lat: -11.4343,
      lng: -61.4562,
      status: "Em licitação",
      tipoServico: "Ampliação",
      dataInicio: "",
      previsaoTermino: "",
      responsavel: "Setor de Licitações",
      observacoes: "Processo em andamento"
    }
  ];
  
  // Mapear status para cores
  const statusCores = {
    "Não iniciada": "#808080",
    "Em andamento": "#FFA500",
    "Concluída": "#008000",
    "Atrasada": "#FF0000",
    "Em licitação": "#0000FF",
    "Paralisada": "#800080"
  };
  
  // Adicionar marcadores para cada município
  municipios.forEach(municipio => {
    // Criar conteúdo da janela de informações
    const contentString = `
      <div class="info-window">
        <h4>${municipio.nome}</h4>
        <table>
          <tr>
            <td>Status:</td>
            <td>${municipio.status}</td>
          </tr>
          <tr>
            <td>Tipo de Serviço:</td>
            <td>${municipio.tipoServico}</td>
          </tr>
          <tr>
            <td>Data de Início:</td>
            <td>${municipio.dataInicio}</td>
          </tr>
          <tr>
            <td>Previsão de Término:</td>
            <td>${municipio.previsaoTermino}</td>
          </tr>
          <tr>
            <td>Responsável:</td>
            <td>${municipio.responsavel}</td>
          </tr>
          <tr>
            <td>Observações:</td>
            <td>${municipio.observacoes}</td>
          </tr>
        </table>
      </div>
    `;
    
    // Criar janela de informações
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 270
    });
    
    // Criar marcador
    const marker = new google.maps.Marker({
      position: { lat: municipio.lat, lng: municipio.lng },
      map: map,
      title: municipio.nome,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: statusCores[municipio.status] || "#808080",
        fillOpacity: 0.7,
        strokeColor: "#333333",
        strokeWeight: 1,
        scale: 10
      }
    });
    
    // Adicionar evento de clique
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  });
}
