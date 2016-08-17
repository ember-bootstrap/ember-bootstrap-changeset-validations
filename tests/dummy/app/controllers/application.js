import Ember from 'ember';
import Changeset from 'ember-changeset';
import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';
import lookupValidator from 'ember-changeset-validations';

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

  init() {
    this._super(...arguments);
    this.changeset = new Changeset(model, lookupValidator(validation), validation);
  },

  actions: {
    submit() {
      window.alert('Submitted!');
    },
    invalid() {
      window.alert('Invalid!');
    }
  }

});
