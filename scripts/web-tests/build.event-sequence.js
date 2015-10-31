
var shelljs = require('shelljs');
var replace = require('replace');
var requirejs = require('requirejs');

var SOURCE = 'tests/event-sequence/';
var TARGET = 'web/tests/event-sequence/';

shelljs.mkdir('-p', TARGET);
shelljs.cp(SOURCE + '*.html', TARGET);

replace({
  regex: '<script src="../../node_modules/platform/platform.js"></script>',
  replacement: '<script src="https://cdnjs.cloudflare.com/ajax/libs/platform/1.3.0/platform.min.js"></script>',
  paths: [TARGET + 'test.html'],
  recursive: false,
  silent: true,
});

replace({
  regex: '<script src="../../node_modules/requirejs/require.js" data-main="table"></script>',
  replacement: '<script src="./table.js" data-main="table"></script>',
  paths: [TARGET + 'table.html'],
  recursive: false,
  silent: true,
});

var config = {
  name: 'table',
  out: TARGET + 'table.js',
  mainConfigFile: SOURCE + 'table.js',
  paths: {
    requireLib: '../../node_modules/requirejs/require',
  },
  include: ['requireLib'],
};

requirejs.optimize(config, function(/* buildResponse */) {
  //buildResponse is just a text output of the modules
  //included. Load the built file for the contents.
  //Use config.out to get the optimized file contents.
  //var contents = fs.readFileSync(config.out, 'utf8');
}, function(err) {
  /*eslint-disable no-console */
  console.log(err);
  /*eslint-enable no-console */
  /*eslint-disable no-process-exit */
  process.exit(1);
  /*eslint-enable no-process-exit */
});