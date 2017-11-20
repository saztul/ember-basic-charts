import { A } from '@ember/array';
import {
  map,
  gt,
  sort,
  max,
  min,
  mapBy,
  readOnly
} from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import { set, get, computed } from '@ember/object';
import Component from '@ember/component';
import layout from './template';
import DataNormalizer  from './data-normalizer';

export default Component.extend({
  layout,
  classNames: [
    'ember-basic-charts',
    'bar-chart'
  ],
  hovering:       null,

  data:           A(),
  sortDef:        A([ 'position:asc' ]),

  sortedData:     sort('normalizedData', 'sortDef'),
  dataPositions:  mapBy('normalizedData', 'position'),
  dataValues:     mapBy('normalizedData', 'value'),
  chartStartsAt:  min('dataPositions'),
  chartEndsAt:    max('dataPositions'),
  maxValue:       max('dataValues'),
  hasData:        gt('data.length', 0),

  hoverInfo:      readOnly('hovering.label'),
  startPosition:  readOnly('chartStartsAt'),
  endPosition:    readOnly('chartEndsAt'),

  normalizedData: map(
    'data',
    function(bar) {
      return DataNormalizer.create({ content: bar });
    }
  ),

  hoverStyle: computed(
    'hovering.hoverStyle',
    function(){
      return get(this, 'hovering.hoverStyle') || htmlSafe('display:none;');
    }
  ),

  barWidth: computed(
    'startPosition',
    'endPosition',
    function(){
      let startPosition = get(this, 'startPosition'),
        endPosition     = get(this, 'endPosition'),
        slices = endPosition - startPosition;
      return 100.0 / (slices + 1);
    }
  ),

  actions:{
    showHover(bar){
      set(this, 'hovering', bar);
    },
    hideHover(){
      set(this, 'hovering', null);
    }
  }
});
