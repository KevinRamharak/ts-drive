/**
 * @module ts-drive
 * @description
 * This is a TypeScript library (more like a wrapper) to interact with the DriveApp service from Google Apps Script.
 * It has a fairly simple build system (just concat everything), but does have one rule.
 * This very file is used as the initilialise part of the library and has to be concattenated first.
 * The makefile is already set to use it like that
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
    (item: T): void|false;
}

function iterate<T, R>(iterator: Iterator<T>, func: IteratorCallback<T>, thisArg: R) {
    while (iterator.hasNext()) {
        if(func.call(thisArg, iterator.next()) === false)
            break;
    }
    return thisArg;
}



const x = new Folder(DriveApp.getRootFolder());
