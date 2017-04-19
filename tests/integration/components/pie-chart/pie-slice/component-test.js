import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pie-chart/pie-slice', 'Integration | Component | pie chart/pie slice', {
  integration: true
});

test('it renders a slice', function(assert) {
  this.set('slice', {
    radius: 10,
    startAngle: 0.0,
    sliceAngle: 90.0,
    sliceColor: '#0f0',
    radiusBump: 0
  });

  this.render(hbs`{{pie-chart/pie-slice slice=slice}}`);
  let html = this.$().html();

  assert.equal(this.$().text().trim(), '',                  'has no text');
  assert.ok(html.match(/fill="#0f0"/),                      'slice color');
  assert.ok(html.match(/M 0 0 L 10 0 A 10 10 0 0 1 0\.00000[0-9]* 10 Z/), 'draws path');
  assert.ok(html.match(/class="[a-z-\s]*pie-chart-slice/),  'pie-chart-slice css class');
});

test('it renders a circle', function(assert) {
  this.set('slice', {
    radius: 10,
    startAngle: 0.0,
    sliceAngle: 360.0,
    sliceColor: '#00f',
    radiusBump: 0
  });

  this.render(hbs`{{pie-chart/pie-slice slice=slice}}`);
  let html = this.$().html();

  assert.equal(this.$().text().trim(), '',                  'has no text');
  assert.ok(html.match(/fill="#00f"/),                      'slice color');
  assert.ok(html.match(/m -10, 0/),                         'cicle start');
  assert.ok(html.match(/a 10,10 0 1,1 20,0/),               'draws positive circle half');
  assert.ok(html.match(/a 10,10 0 1,1 -20,0/),              'draws negative circle half');
  assert.ok(html.match(/class="[a-z-\s]*pie-chart-slice/),  'pie-chart-slice css class');
});
