import Ember from 'ember';
import BsFormElement from 'ember-bootstrap/components/bs-form/element';

const { computed, defineProperty, A } = Ember;

export default BsFormElement.extend({

  hasValidator: computed.notEmpty('model.validate'),

  setupValidations() {
    let key = `model.error.${this.get('property')}.validation`;
    defineProperty(this, 'errors', computed(`${key}[]`, function() {
      return A(this.get(key));
    }));
  }
});