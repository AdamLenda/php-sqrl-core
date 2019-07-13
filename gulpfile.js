const gulp = require("gulp");
const include = require("gulp-include");
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const del = require("del");
const nodeFs = require("fs");

const config = {
    cleanPaths: [
        "Assets/Public/**/*"
    ],
    publicPath: "Assets/Public",
    publicJavaScriptPath: "Assets/Public/JavaScript",
    sourceJavaScriptPath: "Assets/Source/JavaScript",
    npmPath: "node_modules",
    includeOptions: {
        includePaths: [
            __dirname,
            __dirname + "/node_modules"
        ]
    }
};

function clean(cb) {
    "use strict";
    // Remove compiled JS folder assetPublicJsPath
    del(config.cleanPaths);
    cb();
}

function minifyJsAssets(cb) {
    "use strict";
    if (!nodeFs.existsSync(config.publicPath)) {
        console.log("Creating: " + config.publicPath);
        nodeFs.mkdirSync(config.publicPath);
    }

    if (!nodeFs.existsSync(config.publicJavaScriptPath)) {
        console.log("Creating: " + config.publicJavaScriptPath);
        nodeFs.mkdirSync(config.publicJavaScriptPath);
    }

    gulp.src([
        "!" + config.sourceJavaScriptPath + "/_*.js",
        config.sourceJavaScriptPath + "/*.js",
        config.sourceJavaScriptPath + "/**/*.js"
    ])
        .pipe(sourcemaps.init())
        .pipe(include(config.includeOptions).on("error", console.log))
        .pipe(uglify())
        .on("error", notify.onError(function (error) {
            return "ERROR: " + error.message;
        }))
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest(config.publicJavaScriptPath));

    cb();
}

exports.clean = clean;
exports.default = gulp.series(clean, minifyJsAssets);