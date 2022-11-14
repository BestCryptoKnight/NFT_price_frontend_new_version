import React, { useEffect, useState } from 'react'

const filterButton = [
  { label: 'All', day: 100000000 },
  { label: '30 Days', day: 30 },
  { label: '60 Days', day: 60 },
  { label: '90 Days', day: 90 }
]

const SalesChart = (props) => {
  const [filterButtonSelected, setFilterButtonSelected] = useState(100000000);
  const [gchart, setChart] = useState(null);

  useEffect(async () => {
    const { createChart } = await import('lightweight-charts');
    const data = [
      { time: '2018-10-19', value: 2.19, volume: 0 },
      { time: '2018-10-22', value: 5.87, volume: 71 },
      { time: '2018-10-23', value: 5.83, volume: 0 },
      { time: '2018-10-24', value: 5.78, volume: 71 },
      { time: '2018-10-25', value: 5.82, volume: 0 },
      { time: '2018-10-26', value: 5.81, volume: 0 },
      { time: '2018-10-29', value: 5.82, volume: 0 },
      { time: '2018-10-30', value: 5.71, volume: 71 },
      { time: '2018-10-31', value: 5.82, volume: 71 },
      { time: '2018-11-01', value: 5.72, volume: 71 },
      { time: '2018-11-02', value: 5.74, volume: 0 },
      { time: '2018-11-05', value: 5.81, volume: 71 },
      { time: '2018-11-06', value: 5.75, volume: 10 },
      { time: '2018-11-07', value: 3.73, volume: 71 },
      { time: '2018-11-08', value: 1.75, volume: 0 },
      { time: '2018-11-09', value: 2.75, volume: 71 },
      { time: '2019-02-04', value: 7, volume: 71 },
      { time: '2019-02-05', value: 6, volume: 0 },
      { time: '2019-02-06', value: 5, volume: 10 },
      { time: '2019-02-07', value: 4, volume: 71 },
      { time: '2019-02-08', value: 43, volume: 0 },
      { time: '2019-02-11', value: 42, volume: 71 },
      { time: '2019-02-12', value: 41.2, volume: 0 },
      { time: '2019-02-13', value: 41, volume: 71 },
      { time: '2019-02-14', value: 41, volume: 71 },
      { time: '2019-02-15', value: 40.2, volume: 71 },
      { time: '2019-02-19', value: 41, volume: 71 },
      { time: '2019-02-20', value: 40, volume: 0 },
      { time: '2019-02-21', value: 39.6, volume: 71 },
      { time: '2019-02-22', value: 39, volume: 14 },
      { time: '2019-02-25', value: 38.6, volume: 71 },
      { time: '2019-02-26', value: 36, volume: 0 },
      { time: '2019-02-27', value: 35, volume: 0 },
      { time: '2019-02-28', value: 37, volume: 0 },
      { time: '2019-03-01', value: 38, volume: 0 },
      { time: '2019-03-04', value: 39, volume: 71 },
      { time: '2019-03-05', value: 40, volume: 23 },
      { time: '2019-03-06', value: 41.2, volume: 71 },
      { time: '2019-03-07', value: 40.5, volume: 0 },
      { time: '2019-03-08', value: 40.3, volume: 0 },
      { time: '2019-03-11', value: 40.3, volume: 0 },
      { time: '2019-03-12', value: 40.2, volume: 71 },
      { time: '2019-03-13', value: 40, volume: 18 },
      { time: '2019-03-14', value: 40, volume: 15 },
      { time: '2019-03-15', value: 39.6, volume: 0 },
      { time: '2019-03-18', value: 43, volume: 0 },
      { time: '2019-03-19', value: 42.8, volume: 0 },
      { time: '2019-03-20', value: 42.6, volume: 0 },
      { time: '2019-03-21', value: 42.5, volume: 73 },
      { time: '2019-03-22', value: 42.9, volume: 71 },
      { time: '2019-03-25', value: 43, volume: 71 },
      { time: '2019-03-26', value: 42.7, volume: 34 },
      { time: '2019-03-27', value: 42.8, volume: 23 },
      { time: '2019-03-28', value: 42.6, volume: 5 },
      { time: '2019-03-29', value: 42.9, volume: 156 },
      { time: '2019-04-01', value: 42.9, volume: 15 },
      { time: '2019-04-02', value: 49.6, volume: 134 },
      { time: '2019-04-03', value: 46.5, volume: 69 },
      { time: '2019-04-04', value: 43.5, volume: 28 },
      { time: '2019-04-05', value: 42.6, volume: 5 },
      { time: '2019-04-08', value: 27.6, volume: 23 },
      { time: '2019-04-09', value: 29.6, volume: 6 },
      { time: '2019-04-10', value: 32.5, volume: 5 },
      { time: '2019-04-11', value: 33.5, volume: 2 },
      { time: '2019-04-12', value: 33.6, volume: 0 },
      { time: '2019-04-15', value: 34.2, volume: 17 },
      { time: '2019-04-16', value: 36, volume: 15 },
      { time: '2019-04-17', value: 41.2, volume: 30 },
      { time: '2019-04-18', value: 41.6, volume: 20 },
      { time: '2019-04-22', value: 42.3, volume: 40 },
      { time: '2019-04-23', value: 42, volume: 25 },
      { time: '2019-04-24', value: 41.3, volume: 17 },
      { time: '2019-04-25', value: 41.2, volume: 0 },
      { time: '2019-04-26', value: 41.2, volume: 0 }
    ];

    let tmpData = data;
    // let lastTime = new Date();
    let lastTime = new Date(tmpData[tmpData.length - 1].time);
    lastTime.setDate(lastTime.getDate() - filterButtonSelected);
    tmpData = tmpData.filter((data) => {
      let tmpDate = new Date(data.time);
      return tmpDate.getTime() >= lastTime.getTime();
    })

    const chartOptions = {
      layout: {
        textColor: 'white',
        background: { type: 'solid', color: '#FFFFFF00' },
      },
    }

    if (gchart) {
      gchart.remove();
    }

    const chart = createChart(
      document.getElementById('chart-panel'),
      chartOptions,
    )

    const areaSeries = chart.addAreaSeries({
      lineColor: '#2962FF00',
      lineWidth: 0,
      crosshairMarkerBackgroundColor: '#2962FF',
      topColor: '#1053FF',
      bottomColor: 'rgba(0, 0, 0, 0)',
    })

    areaSeries.createPriceLine({
      price: tmpData[tmpData.length - 1].value,
      color: '#2962FF',
      lineWidth: 1,
      lineStyle: 3, // LineStyle.Dashed
      axisLabelVisible: false,
      title: 'min price',
    })

    areaSeries.setData(tmpData)

    let temp = 0, temp0 = 0;
    for (var i = 0; i < tmpData.length; i++) {
      tmpData[i].volume > temp && (temp = tmpData[i].volume)
      tmpData[i].value > temp0 && (temp0 = tmpData[i].value)
    }

    temp0 += temp0 < 10 ? 1 : temp0 < 20 ? 3 : 20;

    let data2 = [], obj;
    for (i = 0; i < tmpData.length; i++) {
      const dateStr = dateToString(tmpData[i].time)
      if (tmpData[i].volume === 0) {
        obj = {
          time: dateStr,
          value: 0,
        }
      } else {
        obj = {
          time: dateStr,
          value: (tmpData[i].volume / temp) * temp0 / 15,
        }
      }
      data2.push(obj)
    }

    const histogramSeries = chart.addHistogramSeries({
      autoscaleInfoProvider: () => ({
        priceRange: {
          minValue: 0,
          maxValue: temp0,
        },
      }),
      color: '#01E50A',
      priceScaleId: 'right',
      priceLineVisible: false,
      lastValueVisible: false,
      base: 0
    })

    histogramSeries.setData(data2)

    chart.applyOptions({
      timeScale: {
        fixLeftEdge: true,
        fixRightEdge: true,
        borderVisible: false,
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0, // leave some space for the legend
          bottom: 0,
        },
        borderVisible: false,
      },
      crosshair: {
        // hide the horizontal crosshair line
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        // hide the vertical crosshair label
        vertLine: {
          labelVisible: false,
        },
      },
      // hide the grid lines
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: 'rgba(255, 255, 255, 0.1)',
          visible: true,
        },
      },
    })

    const container = document.getElementById('chart-panel')

    function dateToString(date) {
      return `${date.year}-${date.month}-${date.day}`
    }

    const toolTipWidth = 80
    const toolTipHeight = 80
    const toolTipMargin = 15

    // Create and style the tooltip html element
    const toolTip = document.createElement('div')
    toolTip.style = `width: 96px; height: 80px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
    toolTip.style.background = 'black'
    toolTip.style.color = 'white'
    toolTip.style.borderColor = '#2962FF'
    container.appendChild(toolTip)

    // update tooltip
    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = 'none'
      } else {
        const dateStr = dateToString(param.time)
        toolTip.style.display = 'block'
        const price = param.seriesPrices.get(areaSeries)
        let volume
        for (var i = 0; i < tmpData.length; i++) {
          if (dateToString(tmpData[i].time) == dateStr) volume = tmpData[i].volume
        }
        toolTip.innerHTML = `
          <div style="font-siZe: 12px; color: ${'white'}">
            price: ${Math.round(100 * price) / 100}
          </div>
          <div style="font-siZe: 12px; color: ${'white'}">
            Volume: ${Math.round(100 * volume) / 100}
          </div>
          <br />
          <div style="font-siZe: 12px; color: ${'white'}">${dateStr}</div>
        `

        const y = param.point.y
        let left = param.point.x + toolTipMargin
        if (left > container.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth
        }

        let top = y + toolTipMargin
        if (top > container.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin
        }

        toolTip.style.left =
          (window.innerWidth - container.clientWidth) / 2 +
          param.point.x -
          47 +
          'px'
        toolTip.style.top = param.point.y - 10 + 'px'
      }
    })

    chart.timeScale().fitContent()
    setChart(chart);

  }, [filterButtonSelected])

  return (
    <div className='chart-container'>
      <div className='chart-header'>
        <div>
          {filterButton.map((button, index) => {
            return (
              <button
                className={'button-filter' + (filterButtonSelected === button.day ? ' selected' : '')}
                onClick={() => setFilterButtonSelected(button.day)}
                key={index}
              >
                {button.label}
              </button>
            )
          })}
        </div>
        <button className='button-price-floor'>Price Floor</button>
      </div>
      <div id="chart-panel" className='chart-panel' />
    </div>
  )

}

export default SalesChart;
