"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = reducer;
exports.dialogs = exports.closeDialog = exports.openDialog = void 0;

var _immutable = require("immutable");

var OPEN_DIALOG = 'c2-dialog/open-dialog';
var CLOSE_DIALOG = 'c2-dialog/close-dialog';

var openDialog = function openDialog(id, component) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var channel = arguments.length > 3 ? arguments[3] : undefined;
  return {
    type: OPEN_DIALOG,
    id: id,
    component: component,
    props: props,
    channel: channel
  };
};

exports.openDialog = openDialog;

var closeDialog = function closeDialog(id) {
  return {
    type: CLOSE_DIALOG,
    id: id
  };
};

exports.closeDialog = closeDialog;

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case OPEN_DIALOG:
      return state.set(action.id, (0, _immutable.fromJS)({
        id: action.id,
        channel: action.channel,
        component: action.component,
        props: action.props || {}
      }));

    case CLOSE_DIALOG:
      return state.delete(action.id);

    default:
      return state;
  }
}

reducer.key = 'c2-dialog';

var dialogs = function dialogs(state, _ref) {
  var channel = _ref.channel;
  var defaultChannel = 'c2-dialog/app';
  return state.get(reducer.key, (0, _immutable.Map)()).toList().filter(function (d) {
    return (d.get('channel') || defaultChannel) === (channel || defaultChannel);
  });
};

exports.dialogs = dialogs;