import BsFormElement from 'ember-bootstrap/components/bs-form/element';

export default class BsFormElementWithChangesetValidationsSupport extends BsFormElement {
  '__ember-bootstrap_subclass' = true;

  get errors() {
    return [
      this.model.error[this.property]?.validation
    ];
  }

  get hasValidator() {
    return typeof this.model.validate === 'function';
  }
}
