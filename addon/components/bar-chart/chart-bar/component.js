import Ember from 'ember';
import layout from './template';

const {
  get,
  Component,
  computed,
  computed: { readOnly },
  String: { htmlSafe }
} = Ember;

export default Component.extend({
  layout,
  chart:          null,
  dataPoint:      null,
  attributeBindings: [
    'style',
    'orderNr:data-order'
  ],
  classNames: [
    'bar-chart-chart-bar',
  ],
  classNameBindings: [
    'valueClassNames',
  ],

  width:          readOnly('chart.barWidth'),
  chartStartsAt:  readOnly('chart.chartStartsAt'),
  maxValue:       readOnly('chart.maxValue'),
  value:          readOnly('dataPoint.value'),
  position:       readOnly('dataPoint.position'),
  label:          readOnly('dataPoint.label'),

  valueClassNames: computed(
    'maxValue',
    'value',
    function(){
      let maxValue  = get(this, 'maxValue'),
        value       = get(this, 'value'),
        percent     = 100.0 / maxValue * value,
        cn          = [ ];
      for(let i = 10; i <= 100; i += 10){
        if(percent < i) { cn.push(`bar-chart-lt-${i}`); }
        else            { cn.push(`bar-chart-gte-${i}`); }
      }
      return cn.join(' ');
    }
  ),

  orderNr: computed(
    'chartStartsAt',
    'position',
    function(){
      let position = get(this, 'position'),
        starts     = get(this, 'chartStartsAt');
      return position - starts;
    }
  ),

  style: computed(
    'orderNr',
    'width',
    'maxValue',
    'value',
    function(){
      let orderNr = parseFloat(get(this, 'orderNr')),
        width     = parseFloat(get(this, 'width')),
        maxValue  = parseFloat(get(this, 'maxValue')),
        value     = parseFloat(get(this, 'value')),
        position  = orderNr * width,
        height    = 100.0 / maxValue * value;
      return htmlSafe(`width: ${width}%; height: ${height}%; left: ${position}%`);
    }
  ),

  hoverStyle: computed(
    'orderNr',
    'width',
    function(){
      let orderNr = parseFloat(get(this, 'orderNr')),
        width     = parseFloat(get(this, 'width')),
        position  = orderNr * width;
      return htmlSafe(position < 50 ? `left: ${position}%` : `right: ${100 - position - width}%`);
    }
  ),

  mouseEnter(){
    if(this.attrs['mouse-enter']){
      this.attrs['mouse-enter'](this);
    }
  },

  mouseLeave(){
    if(this.attrs['mouse-leave']){
      this.attrs['mouse-leave'](this);
    }
  }
});