import Ember  from 'ember';
import Slice  from './slice';
import DataNormalizer  from './data-normalizer';
import layout from './template';

const {
  A,
  computed,
  computed: { max, sort, sum, map, mapBy },
  String: { htmlSafe },
  get,
  set,
  Component
} = Ember;

export default Component.extend({
  layout,
  classNames: [
    'ember-basic-charts',
    'pie-chart'
  ],
  slicesMax:      10,
  hovering:       null,
  radius:         70,
  tilt:           315.0,
  borderColor:    'rgba(255,255,255,0.5)',
  bumpBy:         5,
  otherLabel:     "Other",
  otherColor:     "#dddddd",
  emptyColor:     "#eeeeee",
  noDataMessage:  "No data",
  seedColor:      "#d13f19",

  slices:       A(),
  sortedSlices: sort('normalizedSlices', 'sortDef'),
  maxValue:     max('sliceValues'),
  pieValue:     sum('sliceValues'),
  sliceValues:  mapBy('normalizedSlices', 'value'),
  sortDef:      A([ 'value:desc' ]),

  normalizedSlices: map(
    'slices',
    function(slice) {
      return DataNormalizer.create({ content: slice });
    }
  ),

  coordinateShift: computed(
    'radius',
    function(){
      let radius  = get(this, 'radius'),
        shift     = radius + 10;
      return htmlSafe(`translate(${shift},${shift})`);
    }
  ),

  svgSize: computed(
    'radius',
    function(){
      let radius = get(this, 'radius');
      return htmlSafe((2 * radius) + 20);
    }
  ),

  consolidatedSlices: computed(
    'sortedSlices.@each.{label,color,value}',
    'slicesMax',
    'otherLabel',
    'otherColor',
    function(){
      let slicesMax   = get(this, 'slicesMax') - 1,
        sortedSlices  = get(this, 'sortedSlices'),
        label         = get(this, 'otherLabel'),
        color         = get(this, 'otherColor'),
        value         = 0.0,
        consolidated  = A();
      consolidated.addObjects(sortedSlices.slice(0, slicesMax));
      sortedSlices.slice(slicesMax).map(slice => value += parseFloat(get(slice, 'value')));
      if(value > 0.0){
        consolidated.addObject({ label, color, value });
      }
      return consolidated;
    }
  ),

  pieSlices: computed(
    'consolidatedSlices.@each.{label,color,value}',
    'colorSeed',
    function(){
      let colorSeed   = get(this, 'colorSeed'),
        sortedSlices  = get(this, 'consolidatedSlices'),
        sliceCount    = get(sortedSlices, 'length'),
        sliceNr       = 0,
        beforeValue   = 0,
        pie           = this;
      return sortedSlices.map(data => {
        let label = get(data, 'label'),
          color   = get(data, 'color'),
          value   = get(data, 'value'),
          s = Slice.create({
            sliceNr, pie, beforeValue, colorSeed, sliceCount,
            label, color, value, data
          });
        sliceNr += 1;
        beforeValue += value;
        return s;
      });
    }
  ),

  actions:{
    showHover(slice){
      set(slice, 'active', true);
      set(this, 'hovering', slice);
      this.dispatchAttrAction('slice-mouse-enter', slice);
    },
    hideHover(slice){
      set(slice, 'active', false);
      set(this, 'hovering', null);
      this.dispatchAttrAction('slice-mouse-leave', slice);
    },
    textClick(slice){
      this.dispatchAttrAction('legend-click', slice);
    },
    pieClick(slice){
      this.dispatchAttrAction('slice-click', slice);
    }
  },

  dispatchAttrAction(attr, slice){
    if(this.attrs[attr]){
      this.attrs[attr](slice);
    }
  }
});
