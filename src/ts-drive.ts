/**
 * @module ts-drive
 * @description
 * This is a TypeScript library (more like a wrapper) to interact with the DriveApp service from Google Apps Script.
 * It has a fairly simple build system (just concat everything), but does have one rule.
 * This very file is used as the initilialise part of the library and has to be concatenated first.
 * The makefile already does that:
 * make [tsc] - runs the typescript compiler
 * make cat   - runs 'make tsc', concats any '*.js' files into a single file and concats any '*.d.ts' files into a single file
 * make push  - runs 'make cat' and pushes the './clasp/' directory to the cloud
 * make clean - removes all generated files
 */

/* This block is meant to add polyfills when needed */
(function polyfills() {

})();

/* Utillities */
type falsey = false | null | undefined | void;

interface Iterator<T> {
    next(): T;
    hasNext(): boolean;
}

interface IteratorCallback<T> {
    (item: T): void | false;
}

function iterate<T, R>(iterator: Iterator<T>, func: IteratorCallback<T>, thisArg: R) {
    while (iterator.hasNext()) {
        if (func.call(thisArg, iterator.next()) === false)
            break;
    }
    return thisArg;
}
