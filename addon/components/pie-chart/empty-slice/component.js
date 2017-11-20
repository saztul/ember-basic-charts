import { readOnly } from '@ember/object/computed';
import PieSlice from '../pie-slice/component';

export default PieSlice.extend({
  startAngle: 0.0,
  sliceAngle: 360.0,
  stroke:     0,
  radiusBump: 0,
  pie:        null,

  classNames: [
    'pie-chart-slice',
    'pie-chart-empty-slice'
  ],

  radius:     readOnly('pie.radius'),
  fill:       readOnly('pie.emptyColor'),
});
