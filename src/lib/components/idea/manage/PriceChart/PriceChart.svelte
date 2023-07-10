<script>
    import { LayerCake, Svg } from 'layercake';
    import { scaleBand } from 'd3-scale';
  
    import Bar from './Bar.svelte';
    import AxisX from './AxisX.svelte';
    import AxisY from './AxisY.svelte';
  
    // This example loads csv data as json using @rollup/plugin-dsv
    let data =  [{
      range: "0-10",
      count: 2
    },
    {
      range: "10-20",
      count: 5
    },
    {
      range: "20-50",
      count: 6
    },
    {
      range: "90-100",
      count: 2
    },
    ]
  
    const xKey = 'count';
    const yKey = 'range';
  
    data.forEach(d => {
      d[xKey] = +d[xKey];
    });
  </script>
  
  <style>
    /*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
    .chart-container {
      width: 100%;
      height: 200px;
    }
  </style>
  
  <div class="chart-container">
    <LayerCake
      padding={{ top: 0, bottom: 20, left: 35 }}
      x={xKey}
      y={yKey}
      yScale={scaleBand().paddingInner([0.05])}
      xDomain={[0, null]}
      data={data}
    >
      <Svg>
        <AxisX
          gridlines={true}
          baseline={true}
          snapTicks={true}
        />
        <AxisY
          gridlines={false}
        />
        <Bar/>
      </Svg>
    </LayerCake>
  </div>