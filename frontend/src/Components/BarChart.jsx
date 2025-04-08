import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarCharts = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialiser le graphique
    const chartInstance = echarts.init(chartRef.current);
    
    // Configuration du graphique similaire à l'exemple
    const option = {
      title: {
        text: 'Graphique à barres avec couleur basée sur les données',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Valeur',
          type: 'bar',
          barWidth: '60%',
          data: [
            { value: 10, itemStyle: { color: '#c23531' } },
            { value: 52, itemStyle: { color: '#2f4554' } },
            { value: 200, itemStyle: { color: '#61a0a8' } },
            { value: 334, itemStyle: { color: '#d48265' } },
            { value: 390, itemStyle: { color: '#91c7ae' } },
            { value: 330, itemStyle: { color: '#749f83' } },
            { value: 220, itemStyle: { color: '#ca8622' } }
          ]
        }
      ]
    };

    // Appliquer la configuration et rendre le graphique
    chartInstance.setOption(option);

    // Gérer le redimensionnement
    const handleResize = () => {
      chartInstance.resize();
    };
    window.addEventListener('resize', handleResize);

    // Nettoyer lors du démontage du composant
    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow dark:bg-gray-800">
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default BarCharts;