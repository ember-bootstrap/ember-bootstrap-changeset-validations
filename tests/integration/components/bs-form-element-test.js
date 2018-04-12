import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import {
  validatePresence,
    validateLength
} from 'ember-changeset-validations/validators';

module('Integration | Component | bs form element', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  const validation = {
    name: [
      validatePresence(true),
      validateLength({ min: 4 })
    ]
  };

  test('valid validation is supported as expected', async function(assert) {
    let model = EmberObject.create({
      name: '1234'
    });

    this.set('model', model);
    this.set('validation', validation);
    this.actions.submitAction = function() {
      assert.ok(true, 'submit action has been called.');
    };
    this.actions.invalidAction = function() {
      assert.ok(false, 'Invalid action must not been called.');
    };

    await render(hbs`
      {{#bs-form model=(changeset model validation) onSubmit=(action "submitAction") onInvalid=(action "invalidAction") as |form|}}
        {{form.element label="Name" property="name"}}
      {{/bs-form}}
    `);

  //  this.$('input').val('FooBar').change();
    assert.expect(1);

    await triggerEvent('form', 'submit');
  });

  test('invalid validation is supported as expected', async function(assert) {
    let model = EmberObject.create({
      name: ''
    });

    this.set('model', model);
    this.set('validation', validation);
    this.actions.submitAction = function() {
      assert.ok(false, 'submit action must not been called.');
    };
    this.actions.invalidAction = function() {
      assert.ok(true, 'Invalid action has been called.');
    };

    this.actions.validate = function() {
      return 'invalid';
    };

    await render(hbs`
      {{#bs-form model=(changeset model validation) onSubmit=(action "submitAction") onInvalid=(action "invalidAction") as |form|}}
        {{form.element label="Name" property="name"}}
      {{/bs-form}}
    `);

    assert.expect(2);

    await triggerEvent('form', 'submit');
    assert.ok(find('.form-group').classList.contains('has-error'), 'form element group has error class');
  });
});
