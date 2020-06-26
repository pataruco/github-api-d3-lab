import * as d3 from 'd3';

const rawData = {
  HTML: 424971,
  CSS: 676373,
  JavaScript: 2822055,
  TypeScript: 151417,
  HCL: 4433,
  Shell: 2104,
  Dockerfile: 310,
  Ruby: 179935,
  CoffeeScript: 1055,
  PHP: 100329,
  Vue: 563,
  Rust: 852,
};

const total = Object.values(rawData).reduce((total, value) => total + value, 0);

const data = Object.entries(rawData).map(([key, value]) => ({
  name: key,
  value,
}));
console.log(data);

const width = 400;
const height = 400;
const radius = 180;
const innerRadius = 70;

const color = d3
  .scaleOrdinal()
  .range([
    '#081d58',
    '#253494',
    '#225ea8',
    '#1d91c0',
    '#41b6c4',
    '#7fcdbb',
    '#c7e9b4',
    '#edf8b1',
    '#ffffd9',
  ]);

const vis = d3
  .select('#chart')
  .append('svg:svg')
  .data([data])
  .attr('width', width)
  .attr('height', height)
  .append('svg:g')
  .attr('transform', `translate(${radius * 1.1}, ${radius * 1.1})`);

const textTop = vis
  .append('text')
  .attr('dy', '.35em')
  .style('text-anchor', 'middle')
  .attr('class', 'textTop')
  .attr('y', -10);

const textBottom = vis
  .append('text')
  .attr('dy', '.35em')
  .style('text-anchor', 'middle')
  .attr('class', 'textBottom')
  .attr('y', 10);

const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius);

const arcOver = d3
  .arc()
  .innerRadius(innerRadius + 10)
  .outerRadius(radius + 10);

const pie = d3.pie().value();
