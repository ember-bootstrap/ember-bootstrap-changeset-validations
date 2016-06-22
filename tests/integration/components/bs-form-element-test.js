import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

import {
  validatePresence,
    validateLength
} from 'ember-changeset-validations/validators';

moduleForComponent('bs-form-element', 'Integration | Component | bs form element', {
  integration: true
});

const validation = {
  name: [
    validatePresence(true),
    validateLength({ min: 4 })
  ]
};

test('valid validation is supported as expected', function(assert) {
  let model = Ember.Object.create({
    name: '1234'
  });

  this.set('model', model);
  this.set('validation', validation);
  this.on('submitAction', function() {
    assert.ok(true, 'submit action has been called.');
  });
  this.on('invalidAction', function() {
    assert.ok(false, 'Invalid action must not been called.');
  });

  this.render(hbs`
    {{#bs-form model=(changeset model validation) action=(action "submitAction") invalid=(action "invalidAction")}}
      {{bs-form-element label="Name" property="name"}}
    {{/bs-form}}
  `);

//  this.$('input').val('FooBar').change();
  assert.expect(1);

  this.$('form').submit();
});

test('invalid validation is supported as expected', function(assert) {
  let model = Ember.Object.create({
    name: ''
  });

  this.set('model', model);
  this.set('validation', validation);
  this.on('submitAction', function() {
    assert.ok(false, 'submit action must not been called.');
  });
  this.on('invalidAction', function() {
    assert.ok(true, 'Invalid action has been called.');
  });

  this.on('validate', function() {
    return 'invalid';
  });

  this.render(hbs`
    {{#bs-form model=(changeset model validation) action=(action "submitAction") invalid=(action "invalidAction")}}
      {{bs-form-element label="Name" property="name"}}
    {{/bs-form}}
  `);

  assert.expect(2);

  this.$('form').submit();
  assert.ok(this.$('.form-group').hasClass('has-error'), 'form element group has error class');
});
