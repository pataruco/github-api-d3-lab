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

interface LanguageDatum {
  name: string;
  value: number;
}

const data = Object.entries(rawData).map(([key, value]) => ({
  name: key,
  value,
}));

const width = 400;
const height = 400;

const colors = [
  '#081d58',
  '#253494',
  '#225ea8',
  '#1d91c0',
  '#41b6c4',
  '#7fcdbb',
  '#c7e9b4',
  '#edf8b1',
  '#ffffd9',
];

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
  .attr('font-size', 12)
  .attr('text-anchor', 'middle')
  .selectAll('text')
  .data(arcs)
  .join('text')
  // @ts-expect-error
  .attr('transform', (d) => `translate(${arcLabel().centroid(d)})`)
  .call((text) =>
    text
      .append('tspan')
      .attr('y', '-0.4em')
      .attr('font-weight', 'bold')
      // @ts-expect-error
      .text((d) => d.data.name),
  )
  .call((text) =>
    text
      .filter((d) => d.endAngle - d.startAngle > 0.25)
      .append('tspan')
      .attr('x', 0)
      .attr('y', '0.7em')
      .attr('fill-opacity', 0.7)
      // @ts-expect-error
      .text((d) => d.data.value.toLocaleString()),
  );
