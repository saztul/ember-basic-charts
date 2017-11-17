import Ember  from 'ember';

const {
  computed,
  get,
  ObjectProxy
} = Ember;

export default ObjectProxy.extend({
  content: null,

  value: computed(
    'value',
    function() {
      return +get(this, 'content.value');
    }
  )
});
