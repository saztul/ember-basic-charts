import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pie-chart', 'Integration | Component | pie chart', {
  integration: true
});

test('it renders with no data', function(assert) {
  this.render(hbs`{{pie-chart}}`);
  let html = this.$().html();
  assert.equal(this.$().text().trim(), 'No data');
  assert.ok(html.match(/class="[a-z-\s]*pie-chart-empty-slice/), 'pie-chart-empty-slice css class');
});

test('it renders with a single data point', function(assert) {
  this.set('data', [{ value: 11, label: 'One' }]);
  this.render(hbs`{{pie-chart slices=data radius=10}}`);
  let html = this.$().html(),
    text = this.$().text().trim();
  assert.ok(text.match(/One/),  'label');
  assert.ok(text.match(/11/),   'value');
  assert.ok(text.match(/100%/), 'percentage');

  assert.equal(this.$('.pie-chart-slice').length, 1);
  assert.ok(html.match(/a 10,10 0 1,1 20,0/),  'draws positive circle half');
  assert.ok(html.match(/a 10,10 0 1,1 -20,0/), 'draws negative circle half');
});

// multi entry
test('it renders with a multiple data points', function(assert) {
  this.set('data', [
    { value: 11, label: 'One' },
    { value: 22, label: 'Two' },
    { value: 33, label: 'Three' },
    { value: 44, label: 'Four' }
  ]);
  this.render(hbs`{{pie-chart slices=data}}`);
  let text = this.$().text().trim();
  assert.ok(text.match(/One/),    'label');
  assert.ok(text.match(/Two/),    'label');
  assert.ok(text.match(/Three/),  'label');
  assert.ok(text.match(/Four/),   'label');
  assert.ok(text.match(/11/),     'value');
  assert.ok(text.match(/22/),     'value');
  assert.ok(text.match(/33/),     'value');
  assert.ok(text.match(/44/),     'value');
  assert.ok(text.match(/10%/),    'percentage');
  assert.ok(text.match(/20%/),    'percentage');
  assert.ok(text.match(/30%/),    'percentage');
  assert.ok(text.match(/40%/),    'percentage');

  assert.equal(this.$('.pie-chart-slice').length, 4);
});

// multi entry with string data
test('it renders with multiple data points stringified', function(assert) {
  this.set('data', [
    { value: '11', label: 'One' },
    { value: '22', label: 'Two' },
    { value: '33', label: 'Three' },
    { value: '44', label: 'Four' }
  ]);
  this.render(hbs`{{pie-chart slices=data}}`);
  let text = this.$().text().trim();
  assert.ok(text.match(/One/),    'label');
  assert.ok(text.match(/Two/),    'label');
  assert.ok(text.match(/Three/),  'label');
  assert.ok(text.match(/Four/),   'label');
  assert.ok(text.match(/11/),     'value');
  assert.ok(text.match(/22/),     'value');
  assert.ok(text.match(/33/),     'value');
  assert.ok(text.match(/44/),     'value');
  assert.ok(text.match(/10%/),    'percentage');
  assert.ok(text.match(/20%/),    'percentage');
  assert.ok(text.match(/30%/),    'percentage');
  assert.ok(text.match(/40%/),    'percentage');

  assert.equal(this.$('.pie-chart-slice').length, 4);
});

// limited multi entry
test('it renders with a limited set of multiple data points', function(assert) {
  this.set('data', [
    { value: 11, label: 'One' },
    { value: 22, label: 'Two' },
    { value: 33, label: 'Three' },
    { value: 44, label: 'Four' }
  ]);
  this.render(hbs`{{pie-chart slices=data slicesMax=3 }}`);
  let text = this.$().text().trim();
  assert.notOk(text.match(/One/), 'label');
  assert.notOk(text.match(/Two/), 'label');
  assert.ok(text.match(/Other/),  'label');
  assert.ok(text.match(/Three/),  'label');
  assert.ok(text.match(/Four/),   'label');
  assert.notOk(text.match(/11/),  'value');
  assert.notOk(text.match(/22/),  'value');
  assert.ok(text.match(/33/),     'value');
  assert.ok(text.match(/44/),     'value');
  assert.notOk(text.match(/10%/), 'percentage');
  assert.notOk(text.match(/20%/), 'percentage');
  assert.ok(text.match(/30%/),    'percentage');
  assert.ok(text.match(/40%/),    'percentage');

  assert.equal(this.$('.pie-chart-slice').length, 3);
});
