import * as d3 from 'd3';
import { LanguagesPerRepo } from './github';

const width = 400;
const height = 400;

const renderChart = (rawData: LanguagesPerRepo): void => {
  const total = Object.values(rawData).reduce(
    (total, value) => total + value,
    0,
  );

  const data = Object.entries(rawData).map(([key, value]) => ({
    name: key,
    value: ((value * 100) / total).toFixed(2), // percent
  }));

  const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(
      d3
        .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
        .reverse(),
    );

  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);

  const arcLabel = () => {
    const radius = (Math.min(width, height) / 2) * 0.8;
    return d3.arc().innerRadius(radius).outerRadius(radius);
  };

  const pie = d3
    .pie()
    .sort(null)
    // @ts-expect-error
    .value((d) => d.value);

  // @ts-expect-error
  const arcs = pie(data);

  const svg = d3
    .select('#js-d3-chart')
    .append('svg:svg')
    .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

  // @ts-expect-error
  svg
    .append('g')
    .attr('stroke', 'white')
    .selectAll('path')
    .data(arcs)
    .join('path')
    .on('mouseover', function (d) {
      d3.selectAll('g.text')
        .append('text')
        // @ts-expect-error
        .attr('transform', `translate(${arcLabel().centroid(d)})`)
        .call((text) =>
          text
            .append('tspan')
            .attr('x', '0')
            .attr('y', '-0.4em')
            .attr('font-weight', 'bold')
            // @ts-expect-error
            .text(d.data.name)
            .transition()
            .duration(100),
        )
        .call((text) =>
          text
            .append('tspan')
            .attr('x', 0)
            .attr('y', '0.7em')
            .attr('fill-opacity', 0.7)
            // @ts-expect-error
            .text(`${d.data.value.toLocaleString()}%`)
            .transition()
            .duration(100),
        );

      d3.select(this)
        .transition()
        .duration(100)
        .attr('transform', 'scale(1.009)');
    })
    .on('mouseout', function () {
      d3.selectAll('g.text > text').remove();
      d3.select(this).transition().duration(100).attr('transform', 'scale(1)');
    })
    // @ts-expect-error
    .attr('fill', (d) => color(d.data.name))
    // @ts-expect-error
    .attr('d', arc)
    .append('title')
    // @ts-expect-error
    .text((d) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

  svg
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('text-anchor', 'middle')
    .attr('class', 'text');
};

export default renderChart;
