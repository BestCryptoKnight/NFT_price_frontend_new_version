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

    let tmpData = props.sales.map(({ Date, sales, price, volume }) => ({ time: Date, sales, value: price, volume }));
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

    temp0 += temp0 < 0.01 ? 0.003 : temp0 < 0.1 ? 0.03 : temp0 < 1 ? 0.3 : 1;
    let n = temp0 < 10 ? 6 : temp0 < 20 ? 5 : 3;

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
    toolTip.style = `width: 150px; height: 88px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
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
        let volume, sales;
        for (var i = 0; i < tmpData.length; i++) {
          if (dateToString(tmpData[i].time) == dateStr) {
            sales = tmpData[i].sales;
            volume = tmpData[i].volume;
          }
        }
        toolTip.innerHTML = `
          <div style="font-siZe: 12px; color: ${'white'}">
            Price Floor: <i class="fab fa-ethereum"></i>${Math.round(100 * price) / 100}
          </div>
          <div style="font-siZe: 12px; color: ${'white'}">
            Volume: <i class="fab fa-ethereum"></i>${Math.round(100 * volume) / 100}
          </div>
          <div style="font-size: 12px; color: ${'white'}">
            Sales: ${Math.round(100 * sales) / 100}
          </div>
          <div style="font-siZe: 12px; color: ${'white'}">
            Date: ${dateStr}
          </div>
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
          2 +
          'px'
        toolTip.style.top = param.point.y + 600 + 'px'
      }
    })

    chart.timeScale().fitContent()
    setChart(chart);

  }, [filterButtonSelected])

  return (
    <div className='chart-container'>
      <div className='chart-header'>
        <div className='d-flex'>
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
