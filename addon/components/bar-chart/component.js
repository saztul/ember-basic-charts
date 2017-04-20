import Ember from 'ember';
import layout from './template';

const {
  A,
  computed,
  computed: { readOnly, mapBy, min , max, sort, gt },
  String: { htmlSafe },
  get,
  set,
  Component
} = Ember;

export default Component.extend({
  layout,
  classNames: [
    'ember-basic-charts',
    'bar-chart'
  ],
  hovering:       null,

  data:           A(),
  sortDef:        A([ 'position:asc' ]),

  sortedData:     sort('data', 'sortDef'),
  dataPositions:  mapBy('data', 'position'),
  dataValues:     mapBy('data', 'value'),
  chartStartsAt:  min('dataPositions'),
  chartEndsAt:    max('dataPositions'),
  maxValue:       max('dataValues'),
  hasData:        gt('data.length', 0),

  hoverInfo:      readOnly('hovering.label'),
  startPosition:  readOnly('chartStartsAt'),
  endPosition:    readOnly('chartEndsAt'),

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
