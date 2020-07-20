import { notEmpty } from '@ember/object/computed';
import { defineProperty, computed } from '@ember/object';
import { A } from '@ember/array';
import BsFormElement from 'ember-bootstrap/components/bs-form/element';

export default BsFormElement.extend({
  '__ember-bootstrap_subclass' : true,

  hasValidator: notEmpty('model.validate'),

  setupValidations() {
    // `Changeset.error` is a getter based on a tracked property. Since it's a
    // derived state it's not working together with computed properties smoothly.
    // As a work-a-round we observe the `Changeset._errors` computed property
    // directly, which holds the state. This is not optimal cause it's private.
    // Should refactor to native getter as soon as `<FormElement>` component
    // of Ember Bootstrap supports native getters for `FormElement.errors`
    // property.
    let key = `model.error.${this.get('property')}.validation`;
    defineProperty(this, 'errors', computed(`model._errors`, function() {
      return A(this.get(key));
    }));
  }
});
