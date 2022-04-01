# Ember-bootstrap-changeset-validations

[![Build Status](https://travis-ci.org/kaliber5/ember-bootstrap-changeset-validations.svg?branch=master)](https://travis-ci.org/kaliber5/ember-bootstrap-changeset-validations)

This Ember addon adds support for validations based on [ember-changeset](https://github.com/poteto/ember-changeset) to [ember-bootstrap](https://www.ember-bootstrap.com/) forms.
This way your forms are only submitted when the underlying data is valid, otherwise the appropriate bootstrap error
markup will be applied. See the [FormElement documentation](https://www.ember-bootstrap.com/api/classes/Components.FormElement.html) for
further details.

Compatibility
------------------------------------------------------------------------------

* Ember Bootstrap v4.5 or above
* Ember Changeset and Ember Changeset Validations v3
* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

    ember install ember-bootstrap-changeset-validations

You should have installed the ember-bootstrap and ember-changeset addons already. If not install them:

```
ember install ember-bootstrap
ember install ember-changeset
```

You probably also want to install [ember-changeset-validations](https://github.com/poteto/ember-changeset-validations/)
if you do not have a custom validation implementation:

```
ember install ember-changeset-validations
```

## Usage

Define your model and its validations as described in [ember-changeset-validations](https://github.com/poteto/ember-changeset-validations/).
Then assign the changeset based on that to your form:

```hbs
<BsForm @model={{changeset this.user this.userValidations}} as |form|>
  <form.element @label="Username" @controlType="text" @property="username" />
  <form.element @label="Email" @controlType="email" @property="email" />
  <form.element @label="Password" @controlType="password" @property="password" />
  <form.submitButton>Submit</form.submitButton>
</BsForm>
```

## Authors

* [Simon Ihmig](https://github.com/simonihmig) @ [kaliber5](http://www.kaliber5.de)
* [Jeldrik Hanschke](https://github.com/jelhan)


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

## Copyright and license

Code and documentation copyright 2017 kaliber5 GmbH and contributors. Code released under [the MIT license](LICENSE.md).
