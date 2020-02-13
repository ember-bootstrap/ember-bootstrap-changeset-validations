# Ember-bootstrap-changeset-validations

[![Build Status](https://travis-ci.org/kaliber5/ember-bootstrap-changeset-validations.svg?branch=master)](https://travis-ci.org/kaliber5/ember-bootstrap-changeset-validations)

This Ember addon adds support for validations based on [ember-changeset](https://github.com/poteto/ember-changeset) to [ember-bootstrap](http://kaliber5.github.io/ember-bootstrap/) forms.
This way your forms are only submitted when the underlying data is valid, otherwise the appropriate bootstrap error
markup will be applied. See the [FormElement documentation](http://kaliber5.github.io/ember-bootstrap/api/classes/Components.FormElement.html) for
further details.

Compatibility
------------------------------------------------------------------------------

* Ember Bootstrap v3
* Ember Changeset and Ember Changeset Validations v2
* Ember.js v3.13 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


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

If using ember-bootstrap 1.0 (alpha), install the corresponding version of this addon:

    ember install ember-bootstrap-changeset-validations@1.0.0-alpha

## Usage

Define your model and its validations as described in [ember-changeset-validations](https://github.com/poteto/ember-changeset-validations/).
Then assign the changeset based on that to your form:

```hbs
{{#bs-form model=(changeset user userValidations)}}
    {{bs-form-element label="Username" controlType="text" property="username" required=true}}
    {{bs-form-element label="Email" controlType="email" property="email" required=true}}
    {{bs-form-element label="Password" controlType="password" property="password" required=true}}
    {{bs-button defaultText="Submit" type="primary" buttonType="submit"}}
{{/bs-form}}
```

## Authors

[Simon Ihmig](https://github.com/simonihmig) @ [kaliber5](http://www.kaliber5.de)


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

## Copyright and license

Code and documentation copyright 2017 kaliber5 GmbH. Code released under [the MIT license](LICENSE.md).
