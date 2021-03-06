import { get, computed } from '@ember/object';
import ObjectProxy from '@ember/object/proxy';

export default ObjectProxy.extend({
  content: null,

  value: computed(
    'content.value',
    function() {
      let value = +get(this, 'content.value');
      return isNaN(value) ? 0 : value;
    }
  ),

  position: computed(
    'content.position',
    function() {
      let position = +get(this, 'content.position');
      return isNaN(position) ? 1 : position;
    }
  )
});
