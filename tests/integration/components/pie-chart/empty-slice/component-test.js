import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pie-chart/empty-slice', 'Integration | Component | pie chart/empty slice', {
  integration: true
});

test('it renders', function(assert) {
  this.set('pie', { radius: 10, emptyColor: '#f00' });

  this.render(hbs`{{pie-chart/empty-slice pie=pie}}`);
  let html = this.$().html();

  assert.equal(this.$().text().trim(), '',        'has no text');
  assert.ok(html.match(/fill="#f00"/),            'slice color');
  assert.ok(html.match(/m -10, 0/),               'draws path');
  assert.ok(html.match(/class="[a-z-\s]*pie-chart-slice/), 'pie-chart-slice css class');
  assert.ok(html.match(/class="[a-z-\s]*pie-chart-empty-slice/), 'pie-chart-empty-slice css class');
});
