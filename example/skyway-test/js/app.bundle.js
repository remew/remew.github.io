/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "js";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createVideo = __webpack_require__(1);

var _createVideo2 = _interopRequireDefault(_createVideo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function main() {
    const $ = document.querySelector.bind(document);
    const joinButton = $('#join-button');
    const roomNameInput = $('#room-name-input');
    const videoBoxes = $('#video-boxes');
    const logger = $('#log');

    const peer = new Peer({
        key: 'a12ca00f-7eb6-4d49-a81c-58b661209428',
        debug: 3
    });
    let localStream = null;
    let localPeerId = '';

    peer.on('open', async peerId => {
        logger.textContent += 'open\n';
        localPeerId = peerId;
        localStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
        // localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        // localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
        videoBoxes.appendChild((0, _createVideo2.default)(localPeerId, localStream));
        logger.textContent += localPeerId;
    });
    peer.on('call', call => {
        call.answer(stream);
        setUpCall(call);
    });
    peer.on('error', (...args) => {
        console.error(args);
        logger.textContent += 'error:' + JSON.stringify(args);
    });
    joinButton.addEventListener('click', async () => {
        if (!roomNameInput.value) {
            return;
        }
        const room = peer.joinRoom(`sfu_room_${roomNameInput.value}`, { mode: 'sfu', stream: localStream });
        room.on('stream', stream => {
            logger.textContent += 'stream';
            console.log('onStream');
            console.log(stream);
            videoBoxes.appendChild((0, _createVideo2.default)(stream.peerId, stream));
        });
        room.on('error', (...args) => {
            console.error(args);
            logger.textContent += 'error:' + JSON.stringify(args);
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    main().then(() => {
        const $ = document.querySelector.bind(document);
        const roomNameInput = $('#log');
        roomNameInput.textContent = 'then';
    }).catch(e => {
        const $ = document.querySelector.bind(document);
        const roomNameInput = $('#room-name-input');
        roomNameInput.value = JSON.stringify(e);
    });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createVideo;
function createVideo(peerId, stream) {
    const t = document.getElementById('template-video');
    const root = document.importNode(t.content, true);
    const peerIdText = root.querySelector('p');
    peerIdText.textContent = peerId;
    const video = root.querySelector('video');
    video.srcObject = stream;
    return root;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);