const dest = './dist/assets';
const src = './src/assets';
const version = require('../package.json').version;

module.exports = {
    lintCss: {
        src: `${src}/sass/**/*.scss`
    },
    lintJS: {
        src: ['**/*.js', '!dist/**', '!src/assets/js/docs/vendor/**', '!node_modules/**']
    },
    compressCss: {
        tasks: {
            protocol: {
                src: [
                    `${dest}/protocol/protocol/css/*.css`,
                    `!${dest}/protocol/protocol/css/*.min.css`
                ],
                dest: `${dest}/protocol/protocol/css/`,
            },
            docs: {
                src: [
                    `${dest}/docs/css/*.css`,
                    `!${dest}/docs/css/*.min.css`
                ],
                dest: `${dest}/docs/css/`,
            }
        },
        rename: {
            suffix: '.min'
        }
    },
    compressJS: {
        tasks: {
            protocol: {
                src: [
                    `${dest}/protocol/protocol/js/**/*.js`,
                    `!${dest}/protocol/protocol/js/*.min.js`
                ],
                dest: `${dest}/protocol/protocol/js/`,
            },
            docs: {
                src: [
                    `${dest}/docs/js/**/*.js`,
                    `${dest}/docs/js/*.min.js`,
                ],
                dest: `${dest}/docs/js/`,
            }
        },
        rename: {
            suffix: '.min'
        },
        settings: {
            errLogToConsole: true,
            sourceComments: true
        }
    },
    concatJS: {
        protocol: {
            src: [
                `${src}/js/protocol/*.js`
            ],
            dest: `${dest}/protocol/protocol/js/`
        },
        docs: {
            src: [
                `${src}/js/docs/**/*.js`
            ],
            dest: `${dest}/docs/js/`
        },
    },
    sassCompile: {
        protocol: {
            src: `${src}/sass/protocol/protocol.scss`,
            dest: `${dest}/protocol/protocol/css/`
        },
        docs: {
            src: [
                `${src}/sass/docs/**/*.scss`,
                `${src}/sass/demos/**/*.scss`
            ],
            dest: `${dest}/docs/css/`
        }
    },
    sassCopy: {
        protocol: {
            src: `${src}/sass/protocol/**/*.scss`,
            dest: `${dest}/protocol/protocol/css/`
        },
        docs: {
            src: [
                `${src}/sass/docs/**/*.scss`,
                `${src}/sass/demos/**/*.scss`
            ],
            dest: `${dest}/docs/css/`
        }
    },
    jsCopy: {
        protocol: {
            src: `${src}/js/protocol/**/*.js`,
            dest: `${dest}/protocol/protocol/js/`
        },
        docs: {
            src: [
                `${src}/js/docs/**/*.js`,
                `${src}/js/demos/**/*.js`
            ],
            dest: `${dest}/docs/js/`
        }
    },
    staticCopy: {
        package: {
            src: `${src}/package/*`,
            dest: `${dest}/protocol`
        },
        img: {
            src: `${src}/img/**/*`,
            dest: `${dest}/protocol/protocol/img/`
        },
        fonts: {
            src: `${src}/fonts/*`,
            dest: `${dest}/protocol/protocol/fonts/`
        },
        docs: {
            src: './src/static/**/*',
            dest: './dist/static'
        }
    },
    serve: {
        plugins: {
            browserSync: {
                open: false,
                notify: false,
                files: ['./dist/**/*'],
                server: {
                    baseDir: './dist'
                }
            }
        }
    },
    watch: {
        watchers: [
            {
                match: [
                    './src/static/**/*',
                    `${src}/package/*`
                ],
                tasks: ['static:copy']
            },
            {
                match: `${src}/js/**/*.js`,
                tasks: ['js:lint', 'js:concat']
            },
            {
                match: `${src}/sass/**/*.scss`,
                tasks: ['css:lint', 'sass:compile']
            },
            {
                match: [
                    './src/**/*.hbs',
                    './src/data/**/*',
                    './src/**/*.yaml',
                    './src/**/*.md'
                ],
                tasks: ['drizzle']
            }
        ]
    },
    drizzle: {
        beautifier: {
            /* eslint-disable camelcase */
            indent_char: ' ',
            indent_size: 2,
            indent_with_tabs: false,
            max_preserve_newlines: 1,
            wrap_line_length: 60,
            unformatted:
                `a abbr acronym address b bdo big cite code col del dfn dt em font
                h1 h2 h3 h4 h5 h6 i img ins kbd mark pre q s samp small span
                strike strong sub sup tt u var`.split(' ')
            /* eslint-enable camelcase */
        },
        src: {
            patterns: {
                basedir: './src/patterns',
                glob: './src/patterns/**/*.hbs'
            },
            templates: {
                basedir: './src/templates',
                glob: './src/templates/**/*.hbs'
            }
        },
        dest: {
            pages: './dist',
            patterns: './dist/patterns'
        },
        fieldParsers: {
            description: 'markdown',
            notes: 'markdown',
            tips: 'markdown',
            nonos: 'markdown'
        }
    },
    version: version
};
