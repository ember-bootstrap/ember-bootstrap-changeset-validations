import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, fillIn, focus, blur } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  validatePresence,
  validateLength,
} from 'ember-changeset-validations/validators';

module('Integration | Component | bs form element', function(hooks) {
  setupRenderingTest(hooks);

  const validation = {
    name: [
      validatePresence(true),
      validateLength({ min: 4 })
    ]
  };

  const nestedValidation = {
    nested: {
      name: [
        validatePresence(true),
        validateLength({ min: 4 })
      ]
    }
  };

  test('form is submitted if valid and validation success shown', async function(assert) {
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

  test('validation errors are shown on submit', async function(assert) {
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

  test('validation nested errors are shown on submit', async function(assert) {
    let model = {
      nested: { name: '' }
    };

    this.set('model', model);
    this.set('validation', nestedValidation);
    this.submitAction = function() {
      assert.ok(false, 'submit action must not been called.');
    };
    this.invalidAction = function() {
      assert.step('Invalid action has been called.');
    };

    await render(hbs`
      <BsForm @model={{changeset this.model this.validation}} @onSubmit={{this.submitAction}} @onInvalid={{this.invalidAction}} as |form|>
        <form.element @label="Name" @property="nested.name" />
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.dom('input').hasClass('is-invalid', 'input has error class');
    assert.verifySteps(['Invalid action has been called.']);
  });

  test('validation errors are shown after blur', async function(assert) {
    this.set('model', { name: '' });
    this.set('validation', validation);

    await render(hbs`
      <BsForm @model={{changeset this.model this.validation}} as |form|>
        <form.element @label="Name" @property="name" />
      </BsForm>
    `);
    assert.dom('input').doesNotHaveClass('is-invalid');

    await focus('input');
    await blur('input');
    assert.dom('input').hasClass('is-invalid');
  });

  test('validation success is shown after blur', async function(assert) {
    this.set('model', { name: 'Clara' });
    this.set('validation', validation);

    await render(hbs`
      <BsForm @model={{changeset this.model this.validation}} as |form|>
        <form.element @label="Name" @property="name" />
      </BsForm>
    `);
    assert.dom('input').doesNotHaveClass('is-valid');

    await focus('input');
    await blur('input');
    assert.dom('input').hasClass('is-valid');
  });

  test('validation errors are shown after user input', async function(assert) {
    this.set('model', { name: '' });
    this.set('validation', validation);

    await render(hbs`
      <BsForm @model={{changeset this.model this.validation}} as |form|>
        <form.element @label="Name" @property="name" />
      </BsForm>
    `);
    assert.dom('input').doesNotHaveClass('is-invalid');

    await fillIn('input', 'R');
    assert.dom('input').doesNotHaveClass('is-invalid', 'validation is not shown while user is typing');

    await blur('input');
    assert.dom('input').hasClass('is-invalid', 'validation error is shown after focus out');
  });

  test('validation success is shown after user input', async function(assert) {
    this.set('model', { name: '' });
    this.set('validation', validation);

    await render(hbs`
      <BsForm @model={{changeset this.model this.validation}} as |form|>
        <form.element @label="Name" @property="name" />
      </BsForm>
    `);
    assert.dom('input').doesNotHaveClass('is-valid');

    await fillIn('input', 'Rosa');
    assert.dom('input').doesNotHaveClass('is-valid', 'validation is not shown while user is typing');

    await blur('input');
    assert.dom('input').hasClass('is-valid', 'validation error is shown after focus out');
  });

  test('does not break forms which are not using a changeset as model', async function(assert) {
    this.set('model', { name: '' });
    this.set('submitAction', () => {
      assert.step('submit action has been called');
    });

    await render(hbs`
      <BsForm @model={{this.model}} @onSubmit={{this.submitAction}} as |form|>
        <form.element @label="Name" @property="name" />
      </BsForm>
    `);
    assert.dom('input').doesNotHaveClass('is-valid');
    assert.dom('input').doesNotHaveClass('is-invalid');

    await fillIn('input', 'Rosa');
    await blur('input');
    assert.dom('input').doesNotHaveClass('is-valid');
    assert.dom('input').doesNotHaveClass('is-invalid');

    await triggerEvent('form', 'submit');
    assert.dom('input').doesNotHaveClass('is-valid');
    assert.dom('input').doesNotHaveClass('is-invalid');
    assert.verifySteps(['submit action has been called']);
  });

  test('does not break for forms which are not having a model at all', async function(assert) {
    this.set('submitAction', () => {
      assert.step('submit action has been called');
    });
    this.set('noop', () => {});

    await render(hbs`
      <BsForm @onSubmit={{this.submitAction}} as |form|>
        <form.element @label="Name" @property="name" @onChange={{this.noop}} />
      </BsForm>
    `);
    assert.dom('input').doesNotHaveClass('is-valid');
    assert.dom('input').doesNotHaveClass('is-invalid');

    await fillIn('input', 'Rosa');
    await blur('input');
    assert.dom('input').doesNotHaveClass('is-valid');
    assert.dom('input').doesNotHaveClass('is-invalid');

    await triggerEvent('form', 'submit');
    assert.dom('input').doesNotHaveClass('is-valid');
    assert.dom('input').doesNotHaveClass('is-invalid');
    assert.verifySteps(['submit action has been called']);
  });
});
