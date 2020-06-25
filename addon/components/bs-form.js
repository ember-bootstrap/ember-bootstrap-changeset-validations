import { notEmpty } from '@ember/object/computed';
import { assert } from '@ember/debug';
import RSVP from 'rsvp';
import BsForm from 'ember-bootstrap/components/bs-form';

export default BsForm.extend({
  '__ember-bootstrap_subclass' : true,

  hasValidator: notEmpty('model.validate'),

  validate(model) {
    let m = model;

    assert('Model must be a Changeset instance', m && typeof m.validate === 'function');
    return new RSVP.Promise( function(resolve, reject) {
      m.validate().then(
        () => {
          model.get('isValid') ? resolve() : reject();
        },
        reject
      );
    });
  }
});
