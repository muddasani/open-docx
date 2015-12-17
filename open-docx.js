#!/usr/bin/env node

var fs = require('fs')
  , path = require('path')
  , exec = require('child_process').execSync
  , findit = require('findit')
;

function die (msg) {
  console.error(msg);
  process.exit(1);
}
function run (cmd, args, env) {
  var cli = cmd + ' ' + args.join(' ');
  console.log(cli);
  var ret = exec(cli, env).toString('utf8');
  if (ret) console.log(ret);
}

if (process.argv.length !== 4) die('Usage: open-docx path/to/document.docx path/to/directory');
var doc = path.resolve(process.argv[2])
  , dir = path.resolve(process.argv[3])
;

// doc must exist, dir must not
if (!fs.existsSync(doc)) die('Document not found at: ' + doc);
if (fs.existsSync(dir)) die('Directory exists, if that\'s the one you want remove it: ' + dir);

// make dir, copy doc, unzip, find all XML, reformat them
// errors just blow up immediately
var ourDoc = path.join(dir, path.basename(doc));
fs.mkdirSync(dir);
run('cp', [doc, ourDoc]);
run('unzip', [ourDoc], { cwd: dir });
var finder = findit(dir);
finder.on('error', die);
finder.on('file', function (f) {
  if (/\.(xml|rels)$/.test(f)) {
    run('xmllint', ['--format', '--output', f, f]);
  }
});
finder.on('end', function () {
  console.log('Ok!');
});
