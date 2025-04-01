// /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  ~ Copyright 2020 Adobe Systems Incorporated
//  ~
//  ~ Licensed under the Apache License, Version 2.0 (the "License");
//  ~ you may not use this file except in compliance with the License.
//  ~ You may obtain a copy of the License at
//  ~
//  ~     http://www.apache.org/licenses/LICENSE-2.0
//  ~
//  ~ Unless required by applicable law or agreed to in writing, software
//  ~ distributed under the License is distributed on an "AS IS" BASIS,
//  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  ~ See the License for the specific language governing permissions and
//  ~ limitations under the License.
//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const path = require('path');

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

module.exports = {
  context: BUILD_DIR,
  clientLibRoot: CLIENTLIB_DIR,
  libs: [
    {
      ...libsBaseConfig,
      name: 'clientlib-dependencies',
      categories: ['aashiyana-redesign.dependencies'],
      dependencies: ['cq.jquery'],
      assets: {
        js: { cwd: 'clientlib-dependencies', files: ['**/*.js'], flatten: false },
        css: { cwd: 'clientlib-dependencies', files: ['**/*.css'], flatten: false }
      }
    },
    {
      ...libsBaseConfig,
      name: 'clientlib-site',
      categories: ['aashiyana-redesign.site'],
      dependencies: ['aashiyana-redesign.dependencies'],
      assets: {
        js: { cwd: 'clientlib-site', files: ['**/*.js'], flatten: false },
        css: { cwd: 'clientlib-site', files: ['**/*.css'], flatten: false },
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
      name: 'clientlib-expense',
      categories: ['aashiyana-redesign.expense'],  
      dependencies: ['aashiyana-redesign.dependencies'],
      assets: {
        js: { cwd: 'clientlib-expense', files: ['**/*.js'], flatten: false },
        css: { cwd: 'clientlib-expense', files: ['**/*.css'], flatten: false }
      }
    }
  ]
};




