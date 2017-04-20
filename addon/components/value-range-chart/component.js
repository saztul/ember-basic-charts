import Ember from 'ember';
import layout from './template';

const {
  computed,
  computed: { alias },
  get,
  String: { htmlSafe },
  Component
} = Ember;

export default Component.extend({
  layout,
  classNames: [
    'ember-basic-charts',
    'value-range-chart'
  ],
  minimum:  0,
  maximum:  100,
  start:    null,
  mid:      null,
  stop:     null,

  min:      alias('minimum'),
  max:      alias('maximum'),

  hasRange: computed(
    'start',
    'stop',
    function(){
      return get(this, 'start') !== null && get(this, 'stop') !== null;
    }
  ),

  hasMid: computed(
    'mid',
    function(){
      return get(this, 'mid') !== null;
    }
  ),

  startPercent: computed(
    'minimum',
    'maximum',
    'start',
    function(){
      return this.calcPercentage(
        get(this, 'minimum'),
        get(this, 'maximum'),
        get(this, 'start')
      );
    }
  ),

  midPercent: computed(
    'minimum',
    'maximum',
    'mid',
    function(){
      return this.calcPercentage(
        get(this, 'minimum'),
        get(this, 'maximum'),
        get(this, 'mid')
      );
    }
  ),

  stopPercent: computed(
    'minimum',
    'maximum',
    'stop',
    function(){
      return 100.0 - this.calcPercentage(
        get(this, 'minimum'),
        get(this, 'maximum'),
        get(this, 'stop')
      );
    }
  ),

  rangeStyle: computed(
    'startPercent',
    'stopPercent',
    function(){
      let left = get(this, 'startPercent'),
        right  = get(this, 'stopPercent');
      return htmlSafe(`left: ${left}%;right: ${right}%;`);
    }
  ),

  lineStyle: computed(
    'midPercent',
    function(){
      let mid = get(this, 'midPercent');
      return htmlSafe(`left: ${mid}%;`);
    }
  ),

  midLabelClass: computed(
    'midPercent',
    function(){
      return get(this, 'midPercent') > 50.0 ? 'value-range-chart-left-label' : 'value-range-chart-right-label';
    }
  ),

  calcPercentage(min, max, value){
    min = parseFloat(min);
    max = parseFloat(max);
    value = parseFloat(value);
    return 100.0 / (max - min) * (value - min);
  }

});
