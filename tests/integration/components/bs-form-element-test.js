import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, fillIn, blur } from '@ember/test-helpers';

import hbs from 'htmlbars-inline-precompile';

import {
  validatePresence,
  validateLength,
  validateConfirmation,
  validateFormat,
} from 'ember-changeset-validations/validators';

module('Integration | Component | bs form element', function(hooks) {
  setupRenderingTest(hooks);

  const validation = {
    name: [
      validatePresence(true),
      validateLength({ min: 4 })
    ]
  };

  const extendedValidation = {
    name: [
      validatePresence(true),
      validateLength({ min: 4 })
    ],
    email: validateFormat({ type: 'email', allowBlank: true }),
    password: [
      validateLength({ min: 6 })
    ],
    passwordConfirmation: validateConfirmation({ on: 'password' })
  }

  test('valid validation is supported as expected', async function(assert) {
    let model = {
      name: '1234',
    };

    this.set('model', model);
    this.set('validation', validation);
    this.submitAction = function() {
      assert.step('submit action has been called.');
    };
    this.invalidAction = function() {
      assert.ok(false, 'Invalid action must not been called.');
    };

    await render(hbs`
      <BsForm @model={{changeset this.model this.validation}} @onSubmit={{this.submitAction}} @onInvalid={{this.invalidAction}} as |form|>
        <form.element @label="Name" @property="name" />
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.verifySteps(['submit action has been called.']);
  });

  test('invalid validation is supported as expected', async function(assert) {
    let model = {
      name: '',
    };

    this.set('model', model);
    this.set('validation', validation);
    this.submitAction = function() {
      assert.ok(false, 'submit action must not been called.');
    };
    this.invalidAction = function() {
      assert.step('Invalid action has been called.');
    };

    await render(hbs`
      <BsForm @model={{changeset this.model this.validation}} @onSubmit={{this.submitAction}} @onInvalid={{this.invalidAction}} as |form|>
        <form.element @label="Name" @property="name" />
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.dom('input').hasClass('is-invalid', 'input has error class');
    assert.verifySteps(['Invalid action has been called.']);
  });


  test('more complicated validations', async function(assert) {
    let model = {
      name: '',
      password: null,
      passwordConfirmation: null,
      email: '',
    };

    this.set('model', model);
    this.set('validation', extendedValidation);
    this.submitAction = function() {
      assert.ok(false, 'submit action must not been called.');
    };
    this.invalidAction = function() {
      assert.step('Invalid action has been called.');
    };

    await render(hbs`
      <BsForm @model={{changeset this.model this.validation}} @onSubmit={{this.submitAction}} @onInvalid={{this.invalidAction}} as |form|>
        <form.element id="name" @label="Name" @property="name" />
        <form.element id="email" @label="Email" @property="email" />
        <form.element id="password" @label="Password" @property="password" />
        <form.element id="password-confirmation" @label="Password confirmation" @property="passwordConfirmation" />
      </BsForm>
    `);

    await fillIn('#password input', 'bad');
    assert.dom('#password input').doesNotHaveClass('is-invalid', 'password does not have error while typing.');
    assert.dom('#password input').doesNotHaveClass('is-valid', 'password does not have success while typing.');

    await blur('#password input');
    assert.dom('#password input').hasClass('is-invalid', 'password does have error when focus out.');

    await fillIn('#password-confirmation input', 'betterpass');
    assert.dom('#password-confirmation input').doesNotHaveClass('is-invalid', 'password confirmation does not have error while typing.');

    await blur('#password-confirmation input');
    assert.dom('#password-confirmation input').hasClass('is-invalid', 'password confirmation does have error when focus out.');

    await triggerEvent('form', 'submit');
    assert.dom('#password input').hasClass('is-invalid', 'password still has error after submit.');
    assert.dom('#password-confirmation input').hasClass('is-invalid', 'password confirmation still has error after submit.');
    assert.verifySteps(['Invalid action has been called.']);
  });

});
