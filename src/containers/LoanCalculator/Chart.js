import React, { useEffect, useRef } from 'react';



import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import 'd3-transition';

const margin = { top: 20, right: 20, bottom: 20, left: 80 },
  fullWidth = 800,
  fullHeight = 300,
  width = fullWidth - margin.left - margin.right,
  height = fullHeight - margin.top - margin.bottom;

const x = scaleLinear().range([0, width]);

const y = scaleLinear().range([0, height]);

const actual = line()
  .x((d, i) => x(i + (d.partial / 12 || 1) - 1))
  .y(d => y(d.balance));

const baseline = line()
  .x((d, i) => x(i))
  .y(d => y(d.baseline));

export default ({ payments }) => {
  const chart = useRef(null);

  useEffect(() => {
    const chartEl = select(chart.current);
    x.domain([0, payments.length - 1]);
    y.domain([payments[0].balance, 0]);

    chartEl
      .select('.x')
      .call(axisBottom(x).ticks(Math.min(payments.length, 30)));

    chartEl.select('.y').call(axisLeft(y));

    chartEl
      .select('.baseline')
      .transition()
      .attr('d', baseline(payments));

    chartEl
      .select('.actual')
      .transition()
      .attr('d', actual(payments));
  }, [payments]);

  return (
    <svg
      ref={chart}
      height="100%"
      width="100%"
      viewBox={`0 0 ${fullWidth} ${fullHeight}`}
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
        <g className="axis x" transform={`translate(0, ${height})`} />
        <g className="axis y" />
        <path className="line baseline" />
        <path className="line actual" />
      </g>
    </svg>
  );
};
