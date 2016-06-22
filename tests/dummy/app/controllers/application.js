import Ember from 'ember';
import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';

const model = Ember.Object.extend({
  name: ''
}).create();

const validation = {
  name: [
    validatePresence(true),
    validateLength({ min: 4 })
  ]
};

export default Ember.Controller.extend({

  model,
  validation,

  actions: {
    submit() {
      window.alert('Submitted!');
    },
    invalid() {
      window.alert('Invalid!');
    }
  }

});
