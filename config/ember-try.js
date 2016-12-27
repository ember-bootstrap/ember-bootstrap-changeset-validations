/*jshint node:true*/
module.exports = {
  scenarios: [
    {
      name: 'ember-2.4-lts',
      bower: {
        dependencies: {
          "ember": "~2.4.0"
        }
      }
    },
    {
      name: 'ember-2.8-lts',
      bower: {
        dependencies: {
          "ember": "~2.8.0"
        }
      }
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'components/ember#release'
        },
        resolutions: {
          'ember': 'release'
        }
      }
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          'ember': 'components/ember#beta'
        },
        resolutions: {
          'ember': 'beta'
        }
      }
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          'ember': 'components/ember#canary'
        },
        resolutions: {
          'ember': 'canary'
        }
      }
    }
  ]
};
