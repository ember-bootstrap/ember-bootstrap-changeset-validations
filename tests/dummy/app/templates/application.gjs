import pageTitle from 'ember-page-title/helpers/page-title';
import BsForm from 'ember-bootstrap/components/bs-form';

<template>
  {{pageTitle "Dummy"}}

  <BsForm
    @model={{@controller.changeset}}
    onSubmit={{@controller.submit}}
    onInvalid={{@controller.invalid}}
    as |form|
  >
    <form.element @label="Name" @property="name" />
    <form.submitButton>Submit</form.submitButton>
  </BsForm>

  {{outlet}}
</template>
