# Ember-bootstrap-validations

[![Build Status](https://travis-ci.org/kaliber5/ember-bootstrap-validations.svg?branch=master)](https://travis-ci.org/kaliber5/ember-bootstrap-validations)

This Ember addon adds support for validations based on [ember-validations](https://github.com/DockYard/ember-validations) to [ember-bootstrap](http://kaliber5.github.io/ember-bootstrap/) forms.
ember-bootstrap versions before 0.7.0 came with built-in support for ember-validations, all versions starting at 0.7.0
need an additional addon that implements validation support for the particular validation library. This addon delivers support for ember-validations.

## Installation

`ember install ember-bootstrap-validations`

You should have installed the ember-bootstrap and ember-validations addons already. If not install them:

```
ember install ember-bootstrap
ember install ember-validations
```

## Usage

Add validations to your model:

```js
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations, {
  username: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),

  validations: {
    'username': {
      presence: true,
      length: { minimum: 6 }
    },
    'email': {
      presence: true
    },
    'password': {
      presence: true,
      length: { minimum: 8 }
    }
  }
});
```

Then assign the model to your form:

```hbs
{{#bs-form model=model}}
    {{bs-form-element label="Username" controlType="text" property="username" required=true}}
    {{bs-form-element label="Email" controlType="email" property="email" required=true}}
    {{bs-form-element label="Password" controlType="password" property="password" required=true}}
    {{bs-button defaultText="Submit" type="primary" buttonType="submit"}}
{{/bs-form}}
```

## Authors

[Simon Ihmig](https://github.com/simonihmig) @ [kaliber5](http://www.kaliber5.de)

## Copyright and license

Code and documentation copyright 2016 kaliber5 GmbH. Code released under [the MIT license](LICENSE.md).