var RxWorker =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// observables
	__webpack_require__(1);
	// operators
	__webpack_require__(8);
	__webpack_require__(10);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(2);
	var fromWorker_1 = __webpack_require__(3);
	Observable_1.Observable.fromWorker = fromWorker_1.fromWorker;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = rxjs/Observable;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(2);
	var Subject_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(5);
	var WorkerObservable = (function (_super) {
	    __extends(WorkerObservable, _super);
	    function WorkerObservable(ish, scheduler) {
	        _super.call(this, null);
	        this.ish = ish;
	        this.scheduler = scheduler;
	    }
	    WorkerObservable.create = function (fn) {
	        var subject = new Subject_1.Subject();
	        var worker;
	        try {
	            worker = utils_1.createWorker(fn);
	        }
	        catch (err) {
	            subject.error(err);
	        }
	        worker.onmessage = function (e) { return subject.next(e.data); };
	        worker.onerror = function (err) { return subject.error(err); };
	        worker.postMessage({});
	        return subject;
	    };
	    return WorkerObservable;
	}(Observable_1.Observable));
	exports.WorkerObservable = WorkerObservable;
	exports.fromWorker = WorkerObservable.create;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = rxjs/Subject;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	// creates an inline web worker
	function createWorker(worker) {
	    if (typeof worker === 'string') {
	        return new Worker(worker);
	    }
	    else {
	        var blob = new Blob(['self.onmessage = ', worker.toString()], { type: 'text/javascript' });
	        var url = URL.createObjectURL(blob);
	        return new Worker(url);
	    }
	}
	exports.createWorker = createWorker;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	// creates an inline web worker
	function createStaticWorker(fn) {
	    var blob = new Blob([
	        'self.cb = ', fn.toString(), ';',
	        'self.onmessage = function (e) { self.postMessage(self.cb(e.data)) }'
	    ], {
	        type: 'text/javascript'
	    });
	    var url = URL.createObjectURL(blob);
	    return new Worker(url);
	}
	exports.createStaticWorker = createStaticWorker;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(2);
	var mapWorker_1 = __webpack_require__(9);
	Observable_1.Observable.prototype.mapWorker = mapWorker_1.mapWorker;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Subject_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(5);
	function mapWorker(cb) {
	    var subject = new Subject_1.Subject();
	    var worker = utils_1.createStaticWorker(cb);
	    worker.onmessage = function (e) { return subject.next(e.data); };
	    worker.onerror = function (err) { return subject.error(err); };
	    this.subscribe(function (value) { return worker.postMessage(value); });
	    return subject;
	}
	exports.mapWorker = mapWorker;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(2);
	var filterWorker_1 = __webpack_require__(11);
	Observable_1.Observable.prototype.filterWorker = filterWorker_1.filterWorker;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Subject_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(5);
	function filterWorker(cb) {
	    var subject = new Subject_1.Subject();
	    var worker = utils_1.createStaticWorker(cb);
	    var data;
	    worker.onmessage = function (e) {
	        if (data && e.data) {
	            subject.next(data);
	        }
	        else {
	            subject.next(null);
	        }
	    };
	    this.subscribe(function (value) {
	        data = value;
	        worker.postMessage(value);
	    });
	    return subject;
	}
	exports.filterWorker = filterWorker;


/***/ }
/******/ ]);