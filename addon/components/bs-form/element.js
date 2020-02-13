import { notEmpty } from '@ember/object/computed';
import { defineProperty, computed } from '@ember/object';
import { A } from '@ember/array';
import BsFormElement from 'ember-bootstrap/components/bs-form/element';

export default BsFormElement.extend({
  hasValidator: notEmpty('model.validate'),

  setupValidations() {
    let key = `model.error.${this.get('property')}.validation`;
    defineProperty(this, 'errors', computed(`model._errors`, function() {
      return A(this.get(key));
    }));
  }
});
