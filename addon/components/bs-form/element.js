import BsFormElement from 'ember-bootstrap/components/bs-form/element';
import { dependentKeyCompat } from '@ember/object/compat';

export default class BsFormElementWithChangesetValidationsSupport extends BsFormElement {
  '__ember-bootstrap_subclass' = true;

  @dependentKeyCompat
  get errors() {
    let error = this.model.error[this.property]?.validation;
    return error ? [error] : [];
  }

  get hasValidator() {
    return typeof this.model.validate === 'function';
  }
}
