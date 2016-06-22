import Ember from 'ember';
import BsForm from 'ember-bootstrap/components/bs-form';

const { computed, RSVP, on, observer } = Ember;

export default BsForm.extend({
  
  hasValidator: computed.notEmpty('model.validate'),

  validate(model) {
    let m = model;

    Ember.assert('Model must be a Changeset instance', m && typeof m.validate === 'function');
    return m.get('isValid') ? RSVP.resolve() : RSVP.reject();
  },

  _initValidation: on('init', observer('model', function() {
    if (this.get('hasValidator')) {
      this.get('model').validate();
    }
  }))
});
