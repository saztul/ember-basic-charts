import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bar-chart', 'Integration | Component | bar chart', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{bar-chart}}`);
  let html = this.$().html();
  assert.ok(html.match(/bar-chart-legend-left/),    '.bar-chart-legend-left');
  assert.ok(html.match(/bar-chart-legend-bottom/),  '.bar-chart-legend-bottom');
  assert.ok(html.match(/bar-chart-bars/),           '.bar-chart-bars');
});

test('it has left legend', function(assert) {
  this.set('data', [ { value: 1 }, { value: 5 } ]);
  this.render(hbs`{{bar-chart data=data}}`);
  assert.equal(this.$('.bar-chart-max-value').text(), '5', 'max-value');
  assert.equal(this.$('.bar-chart-min-value').text(), '0', 'min-value');
});

test('it handles string data in left legend', function(assert) {
  this.set('data', [ { value: '1' }, { value: '5' } ]);
  this.render(hbs`{{bar-chart data=data}}`);
  assert.equal(this.$('.bar-chart-max-value').text(), '5', 'max-value');
  assert.equal(this.$('.bar-chart-min-value').text(), '0', 'min-value');
});

test('it handles string data in bottom legend', function(assert) {
  this.set('data', [ { position: '9' }, { position: '16' } ]);
  this.render(hbs`{{bar-chart data=data}}`);
  assert.equal(this.$('.bar-chart-start').text(),  '9', 'start');
  assert.equal(this.$('.bar-chart-end').text(),   '16', 'end');
});

test('it has bottom legend', function(assert) {
  this.set('data', [ { position: 9 }, { position: 16 } ]);
  this.render(hbs`{{bar-chart data=data}}`);
  assert.equal(this.$('.bar-chart-start').text(),  '9', 'start');
  assert.equal(this.$('.bar-chart-end').text(),   '16', 'end');
});

test('it displays bars', function(assert) {
  this.set('data', [ { position: 9 }, { position: 16 } ]);
  this.render(hbs`{{bar-chart data=data}}`);
  assert.equal(this.$('.bar-chart-chart-bar').length, 2, 'bar count');
});

