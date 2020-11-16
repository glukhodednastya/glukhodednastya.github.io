(function(modules) { // webpackBootstrap
 	var installedModules = {};
 	function __webpack_require__(moduleId) {
    if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
 		}
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
 		module.l = true;
 		return module.exports;
 	}
 	__webpack_require__.m = modules;
 	__webpack_require__.c = installedModules;
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};
 	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};
	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
	};
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
 	__webpack_require__.p = "";
 	return __webpack_require__(__webpack_require__.s = 0);
 })
 ({

 "./src/index.js":
 (function(module, exports, __webpack_require__) {

    eval("var _require = __webpack_require__(/*! ./js/createHtml */ \"./src/js/createHtml.js\"),\n    create = _require.create;\n\nvar _require2 = __webpack_require__(/*! ./js/shuffle */ \"./src/js/shuffle.js\"),\n    shuffleRun = _require2.shuffleRun;\n\nvar _require3 = __webpack_require__(/*! ./js/moveTile */ \"./src/js/moveTile.js\"),\n    moveTile = _require3.moveTile;\n\nvar _require4 = __webpack_require__(/*! ./js/timeRun */ \"./src/js/timeRun.js\"),\n    timeRun = _require4.timeRun;\n\nvar _require5 = __webpack_require__(/*! ./js/markDrug */ \"./src/js/markDrug.js\"),\n    markDraggable = _require5.markDraggable;\n\nvar _require6 = __webpack_require__(/*! ./js/removeDraggableAll */ \"./src/js/removeDraggableAll.js\"),\n    removeDraggableAll = _require6.removeDraggableAll;\n\nvar _require7 = __webpack_require__(/*! ./js/addSteps */ \"./src/js/addSteps.js\"),\n    addStep = _require7.addStep;\n\nvar _require8 = __webpack_require__(/*! ./js/checkWin */ \"./src/js/checkWin.js\"),\n    checkWin = _require8.checkWin;\n\nvar _require9 = __webpack_require__(/*! ./js/resizes */ \"./src/js/resizes.js\"),\n    resizes = _require9.resizes;\n\nvar soundMove = new Audio('./src/sounds/notification-sound.mp3');\ncreate(localStorage.getItem('area-size') || 4);\nshuffleRun(document.querySelectorAll('.square'));\nmarkDraggable();\nvar stepsTimeStorage = localStorage.getItem('stepsTime');\nvar infoStorage = localStorage.getItem('info');\nvar areaStorage = localStorage.getItem('area');\n\nif (stepsTimeStorage && infoStorage && areaStorage) {\n  document.querySelector('.wrapperStepsTime').outerHTML = stepsTimeStorage;\n  document.querySelector('.wrapperInfo').outerHTML = infoStorage;\n  document.querySelector('.container-area').outerHTML = areaStorage;\n  localStorage.setItem('area-size', localStorage.getItem('sizeStorage'));\n  resizes();\n}\n\nvar stopIntervalSeconds = setInterval(timeRun, 1000);\nvar listenAreas;\nvar activeButtons = document.querySelector('.wrapperActiveButton');\nlistenAreas = document.querySelector('.wrapperArea');\nlistenAreas.addEventListener('click', moveTile);\ndocument.querySelector('input').addEventListener('change', function (event) {\n  if (isFinite(event.target.value) && event.target.value > 2 && event.target.value < 9) {\n    listenAreas.removeEventListener('click', moveTile);\n    document.querySelector('.wrapperStepsTime').remove();\n    document.querySelector('.container-area').remove();\n    document.querySelector('.wrapperInfo').remove();\n    create(event.target.value);\n    shuffleRun(document.querySelectorAll('.square'));\n    markDraggable();\n    event.target.value = '';\n    listenAreas = document.querySelector('.wrapperArea');\n    listenAreas.addEventListener('click', moveTile);\n  } else {\n    event.target.value = 'From 3 To 8';\n    document.querySelector('input').setAttribute('style', 'color: #561616;');\n    setTimeout(function () {\n      event.target.value = '';\n      document.querySelector('input').removeAttribute('style');\n    }, 1500);\n  }\n});\nactiveButtons.addEventListener('click', function (_ref) {\n  var target = _ref.target;\n\n  if (target.textContent === 'Pause') {\n    clearInterval(stopIntervalSeconds);\n    listenAreas.removeEventListener('click', moveTile);\n    removeDraggableAll();\n  }\n\n  if (target.textContent === 'New Game') {\n    listenAreas.removeEventListener('click', moveTile);\n    document.querySelector('.wrapperStepsTime').remove();\n    document.querySelector('.wrapperArea').remove();\n    document.querySelector('.wrapperInfo').remove();\n    clearInterval(stopIntervalSeconds);\n    create(4);\n    shuffleRun(document.querySelectorAll('.square'));\n    markDraggable();\n    listenAreas = document.querySelector('.wrapperArea');\n    listenAreas.addEventListener('click', moveTile);\n    stopIntervalSeconds = setInterval(timeRun, 1000);\n  }\n\n  if (target.textContent === 'Save Game') {\n    localStorage.setItem('stepsTime', document.querySelector('.wrapperStepsTime').outerHTML);\n    localStorage.setItem('area', document.querySelector('.container-area').outerHTML);\n    localStorage.setItem('info', document.querySelector('.wrapperInfo').outerHTML);\n    localStorage.setItem('sizeStorage', localStorage.getItem('area-size'));\n  }\n\n  if (target.textContent === 'Results') {\n    var results = document.querySelector('.results-background');\n    var resultsContent = document.querySelector('.results-gem');\n    resultsContent.textContent = '';\n    var storageResults = localStorage.getItem('results-gem-puzzle');\n\n    if (storageResults) {\n      var arr = JSON.parse(storageResults);\n      arr.forEach(function (result) {\n        var el = document.createElement('div');\n        el.textContent = result;\n        resultsContent.append(el);\n      });\n    } else {\n      resultsContent.textContent = 'No Leaders';\n    }\n\n    results.classList.remove('hidden');\n  }\n});\nwindow.onresize = resizes;\nvar dragged;\nvar draggedClient;\ndocument.addEventListener('dragstart', function (_ref2) {\n  var target = _ref2.target;\n  draggedClient = target.getBoundingClientRect();\n  dragged = target;\n});\ndocument.addEventListener('dragover', function (event) {\n  event.preventDefault();\n});\ndocument.addEventListener('drop', function (_ref3) {\n  var target = _ref3.target;\n  var droppedClient = target.getBoundingClientRect();\n\n  if (target.classList.contains('emptySquare') && dragged.hasAttribute('draggable')) {\n    soundMove.play();\n    removeDraggableAll();\n    setTimeout(function () {\n      target.removeAttribute('style');\n      dragged.removeAttribute('style');\n      var outerTarget = target.outerHTML;\n      target.outerHTML = dragged.outerHTML;\n      dragged.outerHTML = outerTarget;\n      markDraggable();\n      addStep();\n      checkWin();\n    }, 1000);\n\n    if (draggedClient.y === droppedClient.y) {\n      if (draggedClient.x > droppedClient.x) {\n        target.style.left = \"\".concat(droppedClient.width + 2, \"px\");\n        dragged.style.left = \"-\".concat(droppedClient.width + 2, \"px\");\n      }\n\n      if (draggedClient.x < droppedClient.x) {\n        target.style.left = \"-\".concat(droppedClient.width + 2, \"px\");\n        dragged.style.left = \"\".concat(droppedClient.width + 2, \"px\");\n      }\n    } else {\n      if (draggedClient.y > droppedClient.y) {\n        target.style.top = \"\".concat(droppedClient.width + 2, \"px\");\n        dragged.style.top = \"-\".concat(droppedClient.width + 2, \"px\");\n      }\n\n      if (draggedClient.y < droppedClient.y) {\n        target.style.top = \"-\".concat(droppedClient.width + 2, \"px\");\n        dragged.style.top = \"\".concat(droppedClient.width + 2, \"px\");\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/index.js?");
 }),
    
 "./src/js/addSteps.js":
 (function(module, exports) {
    
    eval("function addStep() {\n  var steps = document.querySelector('.steps');\n  steps.children[0].textContent = +steps.children[0].textContent + 1;\n}\n\nmodule.exports = {\n  addStep: addStep\n};\n\n//# sourceURL=webpack:///./src/js/addSteps.js?");
 }),
    
"./src/js/checkWin.js":
 (function(module, exports, __webpack_require__) {
    
    eval("var _require = __webpack_require__(/*! ./getDateTime */ \"./src/js/getDateTime.js\"),\n    getTime = _require.getTime;\n\nvar _require2 = __webpack_require__(/*! ./storage */ \"./src/js/storage.js\"),\n    storage = _require2.storage;\n\nfunction checkWin() {\n  var tiles = document.querySelectorAll('.square');\n  var currentArray = [];\n\n  for (var i = 0; i < tiles.length; i += 1) {\n    currentArray.push(tiles[i].textContent);\n  }\n\n  var sortArray = currentArray.slice().sort(function (a, b) {\n    return a - b;\n  });\n  var empty = sortArray.shift();\n  sortArray.push(empty);\n\n  if (sortArray.toString() === currentArray.toString()) {\n    var timeWin = document.querySelector('.timeWin');\n    var stepsWin = document.querySelector('.stepsWin');\n    var steps = document.querySelector('.steps');\n    var time = document.querySelector('.time');\n    timeWin.textContent = time.textContent;\n    stepsWin.textContent = steps.textContent;\n    var show = document.querySelector('.wrapperAlertWin');\n    show.classList.remove('hidden');\n    storage(\"\".concat(getTime(), \" <> \").concat(time.textContent, \" \").concat(steps.textContent));\n    setTimeout(function () {\n      show.classList.add('hidden');\n    }, 3000);\n    return true;\n  }\n}\n\nmodule.exports = {\n  checkWin: checkWin\n};\n\n//# sourceURL=webpack:///./src/js/checkWin.js?");
 }),
    
  "./src/js/createHtml.js":
  (function(module, exports) {
    
    eval("var activeButton = ['New Game', 'Pause', 'Save Game', 'Results'];\nvar message = \"Hooray! You solved the puzzle in \\n<span class=\\\"timeWin\\\"></span> \\nand \\n<span class=\\\"stepsWin\\\"></span> \\nmoves\";\nvar container = document.createElement('div');\ncontainer.setAttribute('class', 'container');\ndocument.body.append(container);\nvar wrapperActiveButton = document.createElement('div');\nwrapperActiveButton.setAttribute('class', 'wrapperActiveButton');\ncontainer.append(wrapperActiveButton);\n\nfor (var i = 0; i < activeButton.length; i += 1) {\n  var div = document.createElement('button');\n  div.setAttribute('class', 'activeButton');\n  div.textContent = activeButton[i];\n  wrapperActiveButton.append(div);\n}\n\nfunction create(size) {\n  var wrapperStepsTime = document.createElement('div');\n  wrapperStepsTime.setAttribute('class', 'wrapperStepsTime');\n  container.append(wrapperStepsTime);\n  var spanSteps = document.createElement('span');\n  spanSteps.innerHTML = 'Moves: <span>0</span>';\n  spanSteps.setAttribute('class', 'steps');\n  var spanTime = document.createElement('span');\n  spanTime.innerHTML = 'Time: <span>00</span>:<span>00</span>';\n  spanTime.setAttribute('class', 'time');\n  wrapperStepsTime.append(spanSteps, spanTime);\n\n  function sizeArea(size) {\n    localStorage.setItem('area-size', size);\n    var containerArea = document.createElement('div');\n    containerArea.setAttribute('class', 'container-area');\n    var wrapperArea = document.createElement('div');\n    wrapperArea.setAttribute('class', 'wrapperArea');\n    containerArea.append(wrapperArea);\n    container.append(containerArea);\n\n    for (var _i = 0; _i < Math.pow(size, 2); _i += 1) {\n      var _div = document.createElement('div');\n\n      _div.setAttribute('class', 'square');\n\n      if (_i !== 0) {\n        _div.innerHTML = _i;\n      }\n\n      wrapperArea.append(_div);\n    }\n\n    var square = document.querySelector('.square');\n    var widthSquare = square.getBoundingClientRect().width;\n    wrapperArea.setAttribute('style', \"width: \".concat(Number(size) * widthSquare + size * 2, \"px; height: \").concat(Number(size) * widthSquare + size * 2, \"px;\"));\n    var wrapperInfo = document.createElement('div');\n    wrapperInfo.setAttribute('class', 'wrapperInfo');\n    wrapperInfo.innerHTML = \"<span>Field size: \".concat(size, \"x\").concat(size, \"</span>\");\n    container.append(wrapperInfo);\n  }\n\n  sizeArea(size);\n}\n\nvar wrapperOtherSize = document.createElement('div');\nwrapperOtherSize.setAttribute('class', 'wrapperOtherSize');\nwrapperOtherSize.innerHTML = \"<span>Field size: <input placeholder='enter size'/></span>\";\ncontainer.append(wrapperOtherSize);\nvar wrapperAlertWin = document.createElement('div');\nwrapperAlertWin.setAttribute('class', 'wrapperAlertWin hidden');\nwrapperAlertWin.innerHTML = \"<div class=\\\"alertWin\\\">\".concat(message, \"</div>\");\ncontainer.append(wrapperAlertWin);\nvar resultsBackground = document.createElement('div');\nresultsBackground.classList.add('results-background', 'hidden');\n\nresultsBackground.onclick = function (_ref) {\n  var target = _ref.target;\n\n  if (target.classList.contains('results-background')) {\n    resultsBackground.classList.add('hidden');\n  }\n};\n\nvar close = document.createElement('span');\nclose.textContent = 'x';\nclose.classList.add('close-results');\n\nclose.onclick = function () {\n  resultsBackground.classList.add('hidden');\n};\n\nvar resultsContent = document.createElement('div');\nresultsContent.classList.add('results-content');\nresultsContent.innerHTML = '<h2>Leader Board</h2><div class=\"results-gem\"></div>';\nresultsBackground.append(resultsContent);\nresultsContent.append(close);\ndocument.querySelector('body').append(resultsBackground);\nmodule.exports = {\n  create: create\n};\n\n//# sourceURL=webpack:///./src/js/createHtml.js?");
    
   }),
    
    "./src/js/getDateTime.js":
    (function(module, exports) {
    
    eval("function getTime() {\n  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];\n  var date = new Date();\n  var currentDate = \"\".concat(date.getDate(), \" \").concat(months[date.getMonth()], \" \").concat(date.getFullYear());\n  var hour = \"\".concat(date.getHours());\n  var minute = \"\".concat(Number(date.getMinutes()) >= 10 ? date.getMinutes() : 0 + String(date.getMinutes()));\n  var second = \"\".concat(Number(date.getSeconds()) >= 10 ? date.getSeconds() : 0 + String(date.getSeconds()));\n  return \"\".concat(currentDate, \" \").concat(hour, \":\").concat(minute, \":\").concat(second);\n}\n\nmodule.exports = {\n  getTime: getTime\n};\n\n//# sourceURL=webpack:///./src/js/getDateTime.js?");
    
    }),
    
   "./src/js/markDrug.js":
    (function(module, exports) {
    
    eval("function markDraggable() {\n  var tiles = document.querySelectorAll('.square');\n\n  for (var i = 0; i < tiles.length; i += 1) {\n    if (tiles[i].classList.contains('emptySquare')) {\n      if (tiles[i + 1] !== undefined) {\n        if ((i + 1) % Math.sqrt(tiles.length) !== 0) {\n          tiles[i + 1].setAttribute('draggable', 'true');\n          tiles[i + 1].classList.add('draggable-tile');\n        }\n      }\n\n      if (tiles[i - 1] !== undefined) {\n        if ((i - 1) % Math.sqrt(tiles.length) !== Math.sqrt(tiles.length) - 1) {\n          tiles[i - 1].setAttribute('draggable', 'true');\n          tiles[i - 1].classList.add('draggable-tile');\n        }\n      }\n\n      if (tiles[i + Math.sqrt(tiles.length)] !== undefined) {\n        tiles[i + Math.sqrt(tiles.length)].setAttribute('draggable', 'true');\n        tiles[i + Math.sqrt(tiles.length)].classList.add('draggable-tile');\n      }\n\n      if (tiles[i - Math.sqrt(tiles.length)] !== undefined) {\n        tiles[i - Math.sqrt(tiles.length)].setAttribute('draggable', 'true');\n        tiles[i - Math.sqrt(tiles.length)].classList.add('draggable-tile');\n      }\n    }\n  }\n}\n\nmodule.exports = {\n  markDraggable: markDraggable\n};\n\n//# sourceURL=webpack:///./src/js/markDrug.js?");
    
   }),
    
    "./src/js/moveTile.js":
    (function(module, exports, __webpack_require__) {
    
    eval("var _require = __webpack_require__(/*! ./markDrug */ \"./src/js/markDrug.js\"),\n    markDraggable = _require.markDraggable;\n\nvar _require2 = __webpack_require__(/*! ./removeDraggableAll */ \"./src/js/removeDraggableAll.js\"),\n    removeDraggableAll = _require2.removeDraggableAll;\n\nvar _require3 = __webpack_require__(/*! ./addSteps */ \"./src/js/addSteps.js\"),\n    addStep = _require3.addStep;\n\nvar _require4 = __webpack_require__(/*! ./checkWin */ \"./src/js/checkWin.js\"),\n    checkWin = _require4.checkWin;\n\nvar soundMove = new Audio('./src/sounds/notification-sound.mp3');\nvar isAcive = false;\n\nfunction moveTile(_ref) {\n  var target = _ref.target;\n  var tiles = document.querySelectorAll('.square');\n\n  var _tiles$0$getBoundingC = tiles[0].getBoundingClientRect(),\n      width = _tiles$0$getBoundingC.width;\n\n  if (!isAcive) {\n    var _loop = function _loop(i) {\n      if (tiles[i].textContent === target.textContent) {\n        if (tiles[i + 1] !== undefined && tiles[i + 1].textContent === '') {\n          if ((i + 1) % Math.sqrt(tiles.length) !== 0) {\n            soundMove.play();\n            isAcive = true;\n            var element = tiles[i];\n            var emptySquare = tiles[i + 1];\n            setTimeout(function () {\n              tiles[i].remove();\n              tiles[i + 1].after(element);\n              tiles[i + 1].remove();\n              element.before(emptySquare);\n              emptySquare.removeAttribute('style');\n              element.removeAttribute('style');\n            }, 1000);\n            element.style.left = \"\".concat(width + 2, \"px\");\n            tiles[i + 1].style.left = \"-\".concat(width + 2, \"px\");\n            addStep();\n          }\n        }\n\n        if (tiles[i - 1] !== undefined && tiles[i - 1].textContent === '') {\n          if ((i - 1) % Math.sqrt(tiles.length) !== Math.sqrt(tiles.length) - 1) {\n            soundMove.play();\n            isAcive = true;\n            var _element = tiles[i];\n            var _emptySquare = tiles[i - 1];\n            setTimeout(function () {\n              tiles[i].remove();\n              tiles[i - 1].before(_element);\n              tiles[i - 1].remove();\n\n              _element.after(_emptySquare);\n\n              _emptySquare.removeAttribute('style');\n\n              _element.removeAttribute('style');\n            }, 1000);\n            _element.style.left = \"-\".concat(width + 2, \"px\");\n            tiles[i - 1].style.left = \"\".concat(width + 2, \"px\");\n            addStep();\n          }\n        }\n\n        if (tiles[i + Math.sqrt(tiles.length)] !== undefined && tiles[i + Math.sqrt(tiles.length)].textContent === '') {\n          soundMove.play();\n          isAcive = true;\n          var _element2 = tiles[i];\n          var empty = tiles[i + Math.sqrt(tiles.length)];\n          setTimeout(function () {\n            tiles[i].remove();\n            tiles[i + Math.sqrt(tiles.length)].remove();\n            tiles[i + (Math.sqrt(tiles.length) - 1)].after(_element2);\n            tiles[i + 1].before(empty);\n            empty.removeAttribute('style');\n\n            _element2.removeAttribute('style');\n          }, 1000);\n          _element2.style.top = \"\".concat(width + 2, \"px\");\n          empty.style.top = \"-\".concat(width + 2, \"px\");\n          addStep();\n        }\n\n        if (tiles[i - Math.sqrt(tiles.length)] !== undefined && tiles[i - Math.sqrt(tiles.length)].textContent === '') {\n          soundMove.play();\n          isAcive = true;\n          var _element3 = tiles[i];\n          var _empty = tiles[i - Math.sqrt(tiles.length)];\n          setTimeout(function () {\n            tiles[i].remove();\n            tiles[i - Math.sqrt(tiles.length)].remove();\n            tiles[i - (Math.sqrt(tiles.length) - 1)].before(_element3);\n            tiles[i - 1].after(_empty);\n\n            _empty.removeAttribute('style');\n\n            _element3.removeAttribute('style');\n          }, 1000);\n          _element3.style.top = \"-\".concat(width + 2, \"px\");\n          _empty.style.top = \"\".concat(width + 2, \"px\");\n          addStep();\n        }\n      }\n    };\n\n    for (var i = 0; i < tiles.length; i += 1) {\n      _loop(i);\n    }\n\n    setTimeout(function () {\n      isAcive = false;\n      removeDraggableAll();\n      markDraggable();\n      checkWin();\n    }, 1000);\n  }\n}\n\nmodule.exports = {\n  moveTile: moveTile\n};\n\n//# sourceURL=webpack:///./src/js/moveTile.js?");
     }),
    
     "./src/js/removeDraggableAll.js":
    (function(module, exports) {
    
    eval("function removeDraggableAll() {\n  var tiles = document.querySelectorAll('.square');\n\n  for (var i = 0; i < tiles.length; i += 1) {\n    tiles[i].removeAttribute('draggable');\n    tiles[i].classList.remove('draggable-tile');\n  }\n}\n\nmodule.exports = {\n  removeDraggableAll: removeDraggableAll\n};\n\n//# sourceURL=webpack:///./src/js/removeDraggableAll.js?");
     }),
    
    "./src/js/resizes.js":
   (function(module, exports) {
    
    eval("function resizes() {\n  var area = document.querySelector('.wrapperArea');\n  var square = document.querySelector('.square');\n  var size = localStorage.getItem('area-size');\n  var widthSquare = square.getBoundingClientRect().width;\n  var template = \"width: \".concat(Number(size) * widthSquare + size * 2, \"px;\");\n  template += \"height: \".concat(Number(size) * widthSquare + size * 2, \"px;\");\n  area.setAttribute('style', template);\n}\n\nmodule.exports = {\n  resizes: resizes\n};\n\n//# sourceURL=webpack:///./src/js/resizes.js?");
     }),
    
     "./src/js/shuffle.js":
   (function(module, exports) {
    
    eval("function _createForOfIteratorHelper(o) { if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction shuffle(array) {\n  return array.sort(function () {\n    return Math.random() - 0.5;\n  });\n}\n\nfunction shuffleRun(mix) {\n  var forShoffle = [];\n\n  var _iterator = _createForOfIteratorHelper(mix),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var _i = _step.value;\n      forShoffle.push(_i.textContent);\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n\n  shuffle(forShoffle);\n\n  for (var i = 0; i < mix.length; i += 1) {\n    mix[i].textContent = forShoffle[i];\n\n    if (mix[i].textContent === '') {\n      mix[i].classList.add('emptySquare');\n    }\n  }\n}\n\nmodule.exports = {\n  shuffleRun: shuffleRun\n};\n\n//# sourceURL=webpack:///./src/js/shuffle.js?");
    }),
    
    "./src/js/storage.js":
   (function(module, exports) {
    
    eval("function storage(data) {\n  var games = window.localStorage.getItem('results-gem-puzzle');\n\n  if (games) {\n    var arr = JSON.parse(games);\n    arr.push(data);\n    window.localStorage.setItem('results-gem-puzzle', JSON.stringify(arr));\n  } else {\n    window.localStorage.setItem('results-gem-puzzle', JSON.stringify([data]));\n  }\n}\n\nmodule.exports = {\n  storage: storage\n};\n\n//# sourceURL=webpack:///./src/js/storage.js?");
    }),
    
    "./src/js/timeRun.js":
    (function(module, exports) {
    
    eval("function timeRun() {\n  var secondsSpan = document.querySelector('.time').childNodes[3];\n\n  if ((Number(secondsSpan.textContent) + 1) % 60 === 0) {\n    var minutesSpan = document.querySelector('.time').childNodes[1];\n\n    if ((Number(minutesSpan.textContent) + 1) % 60 < 10) {\n      minutesSpan.textContent = \"0\".concat((Number(minutesSpan.textContent) + 1) % 60);\n    } else {\n      minutesSpan.textContent = (Number(minutesSpan.textContent) + 1) % 60;\n    }\n  }\n\n  if ((Number(secondsSpan.textContent) + 1) % 60 < 10) {\n    secondsSpan.textContent = \"0\".concat((Number(secondsSpan.textContent) + 1) % 60);\n  } else {\n    secondsSpan.textContent = (Number(secondsSpan.textContent) + 1) % 60;\n  }\n}\n\nmodule.exports = {\n  timeRun: timeRun\n};\n\n//# sourceURL=webpack:///./src/js/timeRun.js?");
     }),
    
    "./src/scss/style.scss":
    (function(module, exports, __webpack_require__) {
    
    eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/scss/style.scss?");
    
    }),
    
    0:
    (function(module, exports, __webpack_require__) {
    
    eval("__webpack_require__(/*! ./src/index.js */\"./src/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/scss/style.scss */\"./src/scss/style.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js_./src/scss/style.scss?");
     })
    
 });