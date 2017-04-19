import Ember from 'ember';
import layout from './template';

const {
  get,
  computed,
  computed: { readOnly },
  String: { htmlSafe },
  Component
} = Ember;

export default Component.extend({
  layout,
  tagName:            'li',
  slice:              null,
  classNameBindings:  [ 'active:pie-chart-active' ],
  classNames:         [ 'pie-chart-pie-info' ],
  attributeBindings:  [ 'title' ],

  active: readOnly('slice.active'),
  title:  readOnly('slice.label'),
  color:  readOnly('slice.sliceColor'),

  colorStyle: computed(
    'color',
    function(){
      let color = get(this, 'color');
      return htmlSafe(`background: ${color};`);
    }
  ),

  mouseEnter(){
    if(this.attrs['mouse-enter']){
      let slice = get(this, 'slice');
      this.attrs['mouse-enter'](slice);
    }
  },

  mouseLeave(){
    if(this.attrs['mouse-leave']){
      let slice = get(this, 'slice');
      this.attrs['mouse-leave'](slice);
    }
  },

  click(){
    if(this.attrs['click']){
      let slice = get(this, 'slice');
      this.attrs['click'](slice);
    }
  }
});
