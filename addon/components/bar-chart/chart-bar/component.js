import Component from '@ember/component';
import { computed, get, getWithDefault } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import layout from './template';

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
      let maxValue  = getWithDefault(this, 'maxValue', 0) || 0,
        value       = getWithDefault(this, 'value', 0) || 0,
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
      let orderNr = parseFloat(getWithDefault(this, 'orderNr', 0)) || 0,
        width     = parseFloat(getWithDefault(this, 'width', 0)) || 0,
        maxValue  = parseFloat(getWithDefault(this, 'maxValue', 0)) || 0,
        value     = parseFloat(getWithDefault(this, 'value', 0)) || 0,
        position  = orderNr * width,
        height    = maxValue === 0 ? 0 : 100.0 / maxValue * value;
      return htmlSafe(`width: ${width}%; height: ${height}%; left: ${position}%`);
    }
  ),

  hoverStyle: computed(
    'orderNr',
    'width',
    function(){
      let orderNr = parseFloat(getWithDefault(this, 'orderNr', 0)) || 0,
        width     = parseFloat(getWithDefault(this, 'width', 0)) || 0,
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