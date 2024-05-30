const obterTemperatura = async (temperaturesByRegion) => {
    fetch('https://tech-ocean-blue-api.vercel.app/api/v1/oceans/temperatures')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }
      return response.json();
    })
    .then(data => {
      
      // Percorrer o array de oceanos
      data.Oceans.forEach(ocean => {
          // Verificar a região do oceano e adicionar suas temperaturas ao array correspondente
          if (ocean.name.includes("Pacífico")) {
              temperaturesByRegion["pacifico"] = temperaturesByRegion["pacifico"].concat(ocean.temperatures.map(temp => temp.temperatureCelsius));
          } else if (ocean.name.includes("Atlântico")) {
              temperaturesByRegion["atlantico"] = temperaturesByRegion["atlantico"].concat(ocean.temperatures.map(temp => temp.temperatureCelsius));
          } else if (ocean.name.includes("Índico")) {
              temperaturesByRegion["indico"] = temperaturesByRegion["indico"].concat(ocean.temperatures.map(temp => temp.temperatureCelsius));
          }
      });
  
      // Função para calcular a média de um array de números
      const calculateAverage = array => array.reduce((acc, val) => acc + val, 0) / array.length;
  
      // Calcular a média de temperatura para cada região
      const averageTemperatures = {};
      for (const region in temperaturesByRegion) {
          const temperatures = temperaturesByRegion[region];
          if (temperatures.length > 0) {
              const average = calculateAverage(temperatures);
              averageTemperatures[region] = isNaN(average) ? 0 : parseFloat(average.toFixed(2));
          } else {
              averageTemperatures[region] = 0;
          }
      }
  
      const nivelTemps = {
          'atlantico': 'Normal',
          'indico': 'Normal',
          'pacifico': 'Normal',
      }
  
      if(averageTemperatures.atlantico > 28) {
          nivelTemps.atlantico = 'Alta';
      } else if(averageTemperatures.atlantico < 25) {
          nivelTemps.atlantico = 'Baixa';
      } else {
          nivelTemps.atlantico = 'Normal';
      }
  
      if(averageTemperatures.indico > 28) {
          nivelTemps.indico = 'Alta';
      } else if(averageTemperatures.indico < 10) {
          nivelTemps.indico = 'Baixa';
      } else {
          nivelTemps.indico = 'Normal';
      }
  
      if(averageTemperatures.pacifico > 28) {
          nivelTemps.pacifico = 'Alta';
      } else if(averageTemperatures.pacifico < 10) {
          nivelTemps.pacifico = 'Baixa';
      } else {
          nivelTemps.pacifico = 'Normal';
      }
  
      const pacifico = document.querySelector('.pacifico');
      const atlantico = document.querySelector('.atlantico');
      const indico = document.querySelector('.indico');
  
      pacifico.innerHTML = `Temperatura média: ${averageTemperatures.pacifico}°C (${nivelTemps.pacifico})`;
      atlantico.innerHTML = `Temperatura média: ${averageTemperatures.atlantico} (${nivelTemps.atlantico})`;
      indico.innerHTML = `Temperatura média: ${averageTemperatures.indico}°C (${nivelTemps.indico})`;
  
      if (nivelTemps.pacifico !== 'Padrão') {
          pacifico.classList.add("temp" + nivelTemps.pacifico);
      }
      
      if (nivelTemps.atlantico !== 'Padrão') {
          atlantico.classList.add("temp" + nivelTemps.atlantico);
      }
      
      if (nivelTemps.indico !== 'Padrão') {
          indico.classList.add("temp" + nivelTemps.indico);
      }    
  
      
    })
    .catch(error => {
      console.error('Houve um problema ao buscar os dados:', error);
    });
  
}

const obterLixos = async () => {
    fetch('https://tech-ocean-blue-api.vercel.app/api/v1/oceans/info')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }
      return response.json();
    })
    .then(data => {
        const trashQuantityByOcean = {
            "pacifico": 0,
            "atlantico": 0,
            "indico": 0
        };
        const mediaTempoSegundos = calcularMediaTempoEntreLixos(data.Oceans);
        document.querySelector('.mediaLixo').innerHTML = mediaTempoSegundos;

        // Percorrer o array de oceanos
        data.Oceans.forEach(ocean => {
            // Adicionar o trashQuantity ao oceano correspondente
            switch (ocean.name) {
                case "Pacífico Norte":
                case "Pacífico Sul":
                    trashQuantityByOcean["pacifico"] += ocean.trashQuantity;
                    break;
                case "Atlântico Norte":
                case "Atlântico Sul":
                    trashQuantityByOcean["atlantico"] += ocean.trashQuantity;
                    break;
                case "Índico Norte":
                case "Índico Sul":
                    trashQuantityByOcean["indico"] += ocean.trashQuantity;
                    break;
                default:
                    break;
            }
        });

        const pacifico = document.querySelector('.lixoPacifico');
        const atlantico = document.querySelector('.lixoAtlantico');
        const indico = document.querySelector('.lixoIndico');
    
        pacifico.innerHTML = `${trashQuantityByOcean['pacifico']} resíduos`;
        atlantico.innerHTML = `${trashQuantityByOcean['atlantico']} resíduos`;
        indico.innerHTML = `${trashQuantityByOcean['indico']} resíduos.`;

        // Restante do seu código para lidar com as temperaturas...
    })
    .catch(error => {
        console.error('Houve um problema ao buscar os dados:', error);
    });
  
}

const formatarTempo = (segundos) => { // Função para transformar segundos no formato: "X meses - Y dias - Z horas - W minutos"
    const meses = Math.floor(segundos / (30 * 24 * 60 * 60));
    segundos -= meses * 30 * 24 * 60 * 60;
    const dias = Math.floor(segundos / (24 * 60 * 60));
    segundos -= dias * 24 * 60 * 60;
    const horas = Math.floor(segundos / (60 * 60));
    segundos -= horas * 60 * 60;
    const minutos = Math.floor(segundos / 60);

    return `${meses} meses - ${dias} dias - ${horas} horas - ${minutos} minutos`;
};

const calcularMediaTempoEntreLixos = (oceansData) => {
    let totalLixosEncontrados = 0;
    let totalTime = 0;

    oceansData.forEach(ocean => {
        const trashs = ocean.trashs;
        if (trashs.length > 1) { // Verificar se há mais de um lixo para calcular o tempo entre eles
            for (let i = 1; i < trashs.length; i++) {
                const prevTrash = new Date(trashs[i - 1].updatedAt);
                const currentTrash = new Date(trashs[i].updatedAt);
                const diff = Math.abs(currentTrash - prevTrash); // Diferença de tempo em milissegundos
                totalTime += diff;
                totalLixosEncontrados++;
            }
        }
    });

    // Calcular a média de tempo entre os lixos encontrados em segundos
    const mediaTempoSegundos = totalLixosEncontrados === 0 ? 0 : totalTime / totalLixosEncontrados / 1000;

    // Formatar o tempo médio
    const tempoFormatado = formatarTempo(mediaTempoSegundos);

    return tempoFormatado;
};

const regions = {
    "pacifico": [],
    "atlantico": [],
    "indico": []
};

obterTemperatura(regions);
obterLixos();