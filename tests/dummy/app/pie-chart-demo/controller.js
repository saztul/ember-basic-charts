import Ember from 'ember';

export default Ember.Controller.extend({
  singleEntry: [
    { "label":"Single", "value":10 }
  ],
  multiEntry: [
    { "label":"One",    "value":1 },
    { "label":"Two",    "value":2 },
    { "label":"Three",  "value":3 },
    { "label":"Four",   "value":4 },
    { "label":"Five",   "value":5, "color": '#006' }
  ],
});
