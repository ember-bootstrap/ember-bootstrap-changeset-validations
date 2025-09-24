import { assert } from '@ember/debug';
import BsForm from 'ember-bootstrap/components/bs-form';

export default class BsFormWithChangesetValidationsSupport extends BsForm {
  '__ember-bootstrap_subclass' = true;

  get hasValidator() {
    return typeof this.model?.validate === 'function';
  }

  async validate(model) {
    let m = model;

    assert(
      'Model must be a Changeset instance',
      m && typeof m.validate === 'function',
    );

    await m.validate();
    if (!model.get('isValid')) {
      throw new Error();
    }
  }
}
