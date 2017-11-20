import { readOnly } from '@ember/object/computed';
import EmberObject, { get, computed } from '@ember/object';

export default EmberObject.extend({
  label:        '',
  color:        '',
  beforeValue:  0,
  value:        0,
  sliceNr:      0,
  sliceCount:   0,
  data:         null,
  pie:          null,
  active:       false,

  bumpBy:       readOnly('pie.bumpBy'),
  pieValue:     readOnly('pie.pieValue'),
  radius:       readOnly('pie.radius'),
  tilt:         readOnly('pie.tilt'),
  borderColor:  readOnly('pie.borderColor'),
  seedColor:    readOnly('pie.seedColor'),

  sliceColor: computed(
    'color',
    'sliceNr',
    'seedColor',
    'sliceCount',
    function(){
      let color       = get(this, 'color'),
        seedColor     = get(this, 'seedColor'),
        sliceNr       = +get(this, 'sliceNr') + 1,
        sliceCount    = +get(this, 'sliceCount') + 1,
        shadeBy       = 0.8 / sliceCount * sliceNr,
        colorRx       = /(#(?:[0-9a-f]{2}){2,4}|#[0-9a-f]{3}|(?:rgba?|hsla?)\((?:\d+%?(?:deg|rad|grad|turn)?(?:,|\s)+){2,3}[\s/]*[\d.]+%?\))/i;
        // color regex
        // @see https://gist.github.com/olmokramer/82ccce673f86db7cda5e
      if(!color || !`${color}`.match(colorRx)){
        color = this.shadeColor2(seedColor, shadeBy);
      }
      return color;
    }
  ),

  radiusBump: computed(
    'active',
    'bumpBy',
    function(){
      return get(this, 'active') ? get(this, 'bumpBy') : 0.0;
    }
  ),

  percent: computed(
    'value',
    'pieValue',
    function(){
      let value   = get(this, 'value'),
        pieValue  = get(this, 'pieValue');
      return Math.round(100.0 / pieValue * value);
    }
  ),

  sliceAngle: computed(
    'value',
    'pieValue',
    function(){
      let value   = get(this, 'value'),
        pieValue  = get(this, 'pieValue');
      return 360.0 / pieValue * value;
    }
  ),

  startAngle: computed(
    'beforeValue',
    'pieValue',
    'tilt',
    function(){
      let beforeValue = get(this, 'beforeValue'),
        pieValue      = get(this, 'pieValue'),
        tilt          = get(this, 'tilt');
      return (360.0 / pieValue * beforeValue) + +tilt;
    }
  ),

  // @see http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  shadeColor2(color, percent) {
    let f = parseInt(`${color}`.slice(1),16),
      t   = percent < 0 ? 0 : 255,
      p   = percent < 0 ? percent * -1 : percent,
      R   = f>>16,
      G   = f>>8&0x00FF,
      B   = f&0x0000FF;
    return "#" + (0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }
});
