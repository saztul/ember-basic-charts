import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('value-range-chart', 'Integration | Component | value range chart', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{value-range-chart}}`);
  assert.equal(this.$('.value-range-chart-minimum-label').text().trim(),   '0', 'min-value');
  assert.equal(this.$('.value-range-chart-maximum-label').text().trim(), '100', 'max-value');
});

test('min and max can be changed', function(assert) {
  this.render(hbs`{{value-range-chart min=30 max=90}}`);
  assert.equal(this.$('.value-range-chart-minimum-label').text().trim(), '30', 'min-value');
  assert.equal(this.$('.value-range-chart-maximum-label').text().trim(), '90', 'max-value');
});

test('range start and stop labels', function(assert) {
  this.render(hbs`{{value-range-chart start=33 stop=77}}`);
  assert.equal(this.$('.value-range-chart-start').text().trim(), '33', 'min-value');
  assert.equal(this.$('.value-range-chart-stop').text().trim(),  '77', 'max-value');
});

test('range bar', function(assert) {
  this.render(hbs`{{value-range-chart start=20 stop=70}}`);
  let style = this.$('.value-range-chart-range').attr('style');
  assert.ok(style.match(/left:\s*20%/),  'left');
  assert.ok(style.match(/right:\s*30%/), 'right');
});

test('rmid line label', function(assert) {
  this.render(hbs`{{value-range-chart mid=60}}`);
  assert.equal(this.$('.value-range-chart-mid-label').text().trim(), '60', 'mid-value');
});

test('range bar', function(assert) {
  this.render(hbs`{{value-range-chart mid=40}}`);
  let style = this.$('.value-range-chart-line').attr('style');
  assert.ok(style.match(/left:\s*40%/),  'left');
});