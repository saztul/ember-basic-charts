import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bar-chart/chart-bar', 'Integration | Component | bar chart/chart bar', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{bar-chart/chart-bar}}`);
  assert.ok(this.$().html().match(/<div .*bar-chart-chart-bar/), 'renders as div');
});

test('it has a data-order attribute', function(assert) {
  this.set('chart', { chartStartsAt: 5 });
  this.set('dataPoint', { position: 11 });
  this.render(hbs`{{bar-chart/chart-bar chart=chart dataPoint=dataPoint}}`);
  assert.ok(this.$().html().match(/data-order="6"/), 'data-order');
});

// calculates classes for percentages
test('it builds class names for percentages (greater than or equal)', function(assert) {
  this.set('chart', { maxValue: 10 });
  this.set('dataPoint', { value: 10 });
  this.render(hbs`{{bar-chart/chart-bar chart=chart dataPoint=dataPoint}}`);
  let html = this.$().html();
  assert.ok(html.match(/bar-chart-gte-10/), 'gte-10');
  assert.ok(html.match(/bar-chart-gte-20/), 'gte-20');
  assert.ok(html.match(/bar-chart-gte-30/), 'gte-30');
  assert.ok(html.match(/bar-chart-gte-40/), 'gte-40');
  assert.ok(html.match(/bar-chart-gte-50/), 'gte-50');
  assert.ok(html.match(/bar-chart-gte-60/), 'gte-60');
  assert.ok(html.match(/bar-chart-gte-70/), 'gte-70');
  assert.ok(html.match(/bar-chart-gte-80/), 'gte-80');
  assert.ok(html.match(/bar-chart-gte-90/), 'gte-90');
  assert.ok(html.match(/bar-chart-gte-100/), 'gte-100');
  assert.notOk(html.match(/bar-chart-lt-10/), 'lt-10');
  assert.notOk(html.match(/bar-chart-lt-20/), 'lt-20');
  assert.notOk(html.match(/bar-chart-lt-30/), 'lt-30');
  assert.notOk(html.match(/bar-chart-lt-40/), 'lt-40');
  assert.notOk(html.match(/bar-chart-lt-50/), 'lt-50');
  assert.notOk(html.match(/bar-chart-lt-60/), 'lt-60');
  assert.notOk(html.match(/bar-chart-lt-70/), 'lt-70');
  assert.notOk(html.match(/bar-chart-lt-80/), 'lt-80');
  assert.notOk(html.match(/bar-chart-lt-90/), 'lt-90');
  assert.notOk(html.match(/bar-chart-lt-100/), 'lt-100');
});

test('it builds class names for percentages (less than)', function(assert) {
  this.set('chart', { maxValue: 10 });
  this.set('dataPoint', { value: 0 });
  this.render(hbs`{{bar-chart/chart-bar chart=chart dataPoint=dataPoint}}`);
  let html = this.$().html();
  assert.ok(html.match(/bar-chart-lt-10/), 'lt-10');
  assert.ok(html.match(/bar-chart-lt-20/), 'lt-20');
  assert.ok(html.match(/bar-chart-lt-30/), 'lt-30');
  assert.ok(html.match(/bar-chart-lt-40/), 'lt-40');
  assert.ok(html.match(/bar-chart-lt-50/), 'lt-50');
  assert.ok(html.match(/bar-chart-lt-60/), 'lt-60');
  assert.ok(html.match(/bar-chart-lt-70/), 'lt-70');
  assert.ok(html.match(/bar-chart-lt-80/), 'lt-80');
  assert.ok(html.match(/bar-chart-lt-90/), 'lt-90');
  assert.ok(html.match(/bar-chart-lt-100/), 'lt-100');
  assert.notOk(html.match(/bar-chart-gte-10/), 'gte-10');
  assert.notOk(html.match(/bar-chart-gte-20/), 'gte-20');
  assert.notOk(html.match(/bar-chart-gte-30/), 'gte-30');
  assert.notOk(html.match(/bar-chart-gte-40/), 'gte-40');
  assert.notOk(html.match(/bar-chart-gte-50/), 'gte-50');
  assert.notOk(html.match(/bar-chart-gte-60/), 'gte-60');
  assert.notOk(html.match(/bar-chart-gte-70/), 'gte-70');
  assert.notOk(html.match(/bar-chart-gte-80/), 'gte-80');
  assert.notOk(html.match(/bar-chart-gte-90/), 'gte-90');
  assert.notOk(html.match(/bar-chart-gte-100/), 'gte-100');
});


// style height
test('it computes bar height (50%)', function(assert) {
  this.set('chart', { maxValue: 10 });
  this.set('dataPoint', { value: 5 });
  this.render(hbs`{{bar-chart/chart-bar chart=chart dataPoint=dataPoint}}`);
  assert.ok(this.$().html().match(/height:\s*50%;/), '50%');
});

test('it computes bar height (33%)', function(assert) {
  this.set('chart', { maxValue: 10 });
  this.set('dataPoint', { value: 10.0/3.0 });
  this.render(hbs`{{bar-chart/chart-bar chart=chart dataPoint=dataPoint}}`);
  assert.ok(this.$().html().match(/height:\s*33[0-9.]+%;/), '33.3%');
});

test('it computes bar height (100%)', function(assert) {
  this.set('chart', { maxValue: 10 });
  this.set('dataPoint', { value: 10 });
  this.render(hbs`{{bar-chart/chart-bar chart=chart dataPoint=dataPoint}}`);
  assert.ok(this.$().html().match(/height:\s*100%;/), '100%');
});

test('it computes bar height (100%)', function(assert) {
  this.set('chart', { maxValue: 10 });
  this.set('dataPoint', { value: 0 });
  this.render(hbs`{{bar-chart/chart-bar chart=chart dataPoint=dataPoint}}`);
  assert.ok(this.$().html().match(/height:\s*0%;/), '0%');
});

// style width
test('it computes bar width', function(assert) {
  this.set('chart', { barWidth: 99 });
  this.render(hbs`{{bar-chart/chart-bar chart=chart}}`);
  assert.ok(this.$().html().match(/width:\s*99%;/), '99');
});
