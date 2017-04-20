import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pie-chart/pie-info', 'Integration | Component | pie chart/pie info', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{pie-chart/pie-info}}`);
  let html = this.$().html();
  assert.ok(html.match(/<li .*pie-chart-pie-info/), 'renders as list element');
});

test('it displays the percentage', function(assert) {
  this.set('slice', { percent: 10 });
  this.render(hbs`{{pie-chart/pie-info slice=slice}}`);
  assert.equal(this.$().text().trim(), '10%');
});

test('it displays the value', function(assert) {
  this.set('slice', { value: 11 });
  this.render(hbs`{{pie-chart/pie-info slice=slice}}`);
  assert.equal(this.$().text().trim(), '11');
});

test('it displays the label', function(assert) {
  this.set('slice', { label: 'foo' });
  this.render(hbs`{{pie-chart/pie-info slice=slice}}`);
  assert.equal(this.$().text().trim(), 'foo');
});

test('it displays a colored element', function(assert) {
  this.set('slice', { sliceColor: '#10BEEF' });
  this.render(hbs`{{pie-chart/pie-info slice=slice}}`);
  let html = this.$().html();
  assert.ok(html.match(/#10BEEF/), 'box color');
});
