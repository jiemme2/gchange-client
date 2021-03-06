#!/usr/bin/env node

const gulp = require('gulp'),
  path = require("path"),
  log = require('fancy-log'),
  colors = require('ansi-colors');

module.exports = function(context) {
  const now = Date.now();
  log("Executing '" + colors.cyan("before_compile") + "' hook...");

  const projectRoot = context && context.opts && context.opts.projectRoot || '.';
  const platforms = context && context.opts && context.opts.platforms || ['android'];
  const gulpFile = require(path.join(projectRoot, 'gulpfile'));

  if (!projectRoot || !platforms || !gulpFile) return; // Skip

  return Promise.all(platforms
    .map(platform => {
      return new Promise(done => gulpFile.cdvBeforeCompile(done, projectRoot, platform.trim().toLowerCase()));
    }))
    .then(() => {
      log(colors.grey("Hook 'before_compile' finished in " + (Date.now() - now) + 'ms'));
    });
}
