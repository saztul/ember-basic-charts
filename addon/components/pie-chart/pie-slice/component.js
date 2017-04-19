import Ember from 'ember';

const {
  get,
  computed,
  computed: { readOnly },
  String: { htmlSafe },
  Component
} = Ember;

export default Component.extend({
  slice:              null,
  tagName:            'path',

  classNames:         [ 'pie-chart-slice' ],
  attributeBindings:  [ 'draw:d', 'fill', 'stroke' ],

  fill:               readOnly('slice.sliceColor'),
  startAngle:         readOnly('slice.startAngle'),
  sliceAngle:         readOnly('slice.sliceAngle'),
  stroke:             readOnly('slice.borderColor'),
  radiusBump:         readOnly('slice.radiusBump'),

  radius: computed(
    'slice.radius',
    'radiusBump',
    function(){
      return parseFloat(get(this, 'slice.radius')) + parseFloat(get(this, 'radiusBump'));
    }
  ),

  isCircle: computed(
    'sliceAngle',
    function(){
      return parseFloat(get(this, 'sliceAngle')) === 360.0;
    }
  ),

  draw: computed(
    'startAngle',
    'sliceAngle',
    'radius',
    function(){
      let startAngle  = parseFloat(get(this, 'startAngle')),
        sliceAngle    = parseFloat(get(this, 'sliceAngle')),
        radius        = parseFloat(get(this, 'radius')),
        start         = this.mapCoordinate(radius, startAngle),
        path,
        draw;
      if(sliceAngle === 360.0){
        path = this.drawCircle(radius);
        draw = htmlSafe(`M 0 0 ${path}`);
      }
      else{
        path = this.drawArc(startAngle, sliceAngle, radius);
        draw = htmlSafe(`M 0 0 L ${start} ${path} Z`);
      }
      return htmlSafe(draw);
    }
  ),

  drawArc(startAngle, sliceAngle, radius){
    let angle     = startAngle + sliceAngle,
      largeArc    = sliceAngle > 180.0 ? 1 : 0,
      coordinate  = this.mapCoordinate(radius, angle);
    return `A ${radius} ${radius} 0 ${largeArc} 1 ${coordinate}`;
  },

  drawCircle(radius){
    radius = this.formatNumber(radius);
    return `
      m -${radius}, 0
      a ${radius},${radius} 0 1,1 ${radius * 2},0
      a ${radius},${radius} 0 1,1 -${radius * 2},0
    `;
  },

  mapCoordinate(radius, angle){
    let rads = this.toRadians(angle % 360.0),
      x      = this.formatNumber(radius * Math.cos(rads)),
      y      = this.formatNumber(radius * Math.sin(rads));
    return `${x} ${y}`;
  },

  toRadians(angle) {
    return angle * (Math.PI / 180.0);
  },

  formatNumber(number){
    return `${number.toFixed(16)}`.replace(/\.?0+$/,"");
  },

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
