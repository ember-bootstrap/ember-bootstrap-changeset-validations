'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    packageManager: 'pnpm',
    scenarios: [
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            '@glimmer/component': '^1.1.2',
            '@ember/test-waiters': '^3.1.0',
            'ember-bootstrap': '^5.0.0',
            'ember-cli': '~4.12.0',
            'ember-resolver': '^11.0.0',
            'ember-source': '~3.28.0',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-lts-5.12',
        npm: {
          devDependencies: {
            'ember-source': '~5.12.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      },
      {
        name: 'ember-changeset-v4',
        npm: {
          devDependencies: {
            'ember-changeset': '^4.2.0',
            'ember-changeset-validations': '^4.2.0',
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
