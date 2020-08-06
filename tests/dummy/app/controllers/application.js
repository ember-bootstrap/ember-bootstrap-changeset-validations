import Controller from '@ember/controller';
import { action } from '@ember/object';
import Changeset from 'ember-changeset';
import { validateLength, validatePresence } from 'ember-changeset-validations/validators';
import lookupValidator from 'ember-changeset-validations';

class Model {
  name = '';
  nested = {
    name: ''
  }
}

const Validation = {
  name: [
    validatePresence(true),
    validateLength({ min: 4 })
  ],
  nested: {
    name: [
      validatePresence(true),
      validateLength({ min: 4 })
    ]
  }
};

export default class ApplicationController extends Controller {
  changeset;
  model = new Model();

  constructor() {
    super(...arguments);

    this.changeset = new Changeset(this.model, lookupValidator(Validation), Validation);
  }

  @action
  submit() {
    window.alert('Submitted!');
  }

  @action
  invalid() {
    window.alert('Invalid!');
  }
}
