import { notEmpty } from '@ember/object/computed';
import { assert } from '@ember/debug';
import RSVP from 'rsvp';
import { on } from '@ember/object/evented';
import { observer } from '@ember/object';
import BsForm from 'ember-bootstrap/components/bs-form';

export default BsForm.extend({
  
  hasValidator: notEmpty('model.validate'),

  validate(model) {
    let m = model;

    assert('Model must be a Changeset instance', m && typeof m.validate === 'function');
    return m.get('isValid') ? RSVP.resolve() : RSVP.reject();
  },

  _initValidation: on('init', observer('model', function() {
    if (this.get('hasValidator')) {
      this.get('model').validate();
    }
  }))
});
