const path = require('path'); // Required for handling file paths

const BUILD_DIR = path.join(__dirname, 'dist');
const CLIENTLIB_DIR = path.join(
  __dirname,
  '..',
  'ui.apps', 
  'src',
  'main',
  'content',
  'jcr_root',
  'apps',
  'aashiyana-redesign',
  'clientlibs'
);

const libsBaseConfig = {
  allowProxy: true,
  serializationFormat: 'xml',
  cssProcessor: ['default:none', 'min:none'],
  jsProcessor: ['default:none', 'min:none']
};

// Config for `aem-clientlib-generator`
module.exports = {
  context: BUILD_DIR,
  clientLibRoot: CLIENTLIB_DIR,
  libs: [
    {
      ...libsBaseConfig,
      name: 'clientlib-dependencies',
      categories: ['aashiyana-redesign.dependencies'],
      assets: {
        js: {
          cwd: 'clientlib-dependencies',
          files: ['**/*.js'],
          flatten: false
        },
        css: {
          cwd: 'clientlib-dependencies',
          files: ['**/*.css'],
          flatten: false
        }
      }
    },
    {
      ...libsBaseConfig,
      name: 'clientlib-site',
      categories: ['aashiyana-redesign.site'],
      dependencies: ['aashiyana-redesign.dependencies'],
      assets: {
        js: {
          cwd: 'clientlib-site',
          files: ['**/*.js'],
          flatten: false
        },
        css: {
          cwd: 'clientlib-site',
          files: ['**/*.css'],
          flatten: false
        },
        resources: {
          cwd: 'clientlib-site',
          files: ['**/*.*'],
          flatten: false,
          ignore: ['**/*.js', '**/*.css']
        }
      }
    },
    {
      ...libsBaseConfig,
      name: 'clientlib-custom', // Added a new clientlib for custom scripts and styles
      categories: ['aashiyana-redesign.custom'],
      dependencies: ['aashiyana-redesign.site'],
      assets: {
        js: {
          cwd: 'clientlib-custom',
          files: ['**/*.js'],
          flatten: false
        },
        css: {
          cwd: 'clientlib-custom',
          files: ['**/*.css'],
          flatten: false
        },
        resources: {
          cwd: 'clientlib-custom',
          files: ['**/*.*'],
          flatten: false,
          ignore: ['**/*.js', '**/*.css']
        }
      }
    }
  ]
};
