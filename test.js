var rc = require('./build/Release/roboticscape');
var fs = require('fs');
var assert = require('assert');

assert.equal(rc.initialize(), false);
fs.readFile('/var/run/robotics_cape.pid', readRCpid);
assert.equal(rc.get_state(), "UNINITIALIZED");
console.log("Setting state RUNNING")
rc.set_state("RUNNING");
assert.equal(rc.get_state(), "RUNNING");

rc.set_pause_pressed_func(onPausePressed);
console.log("Press PAUse button now")
setTimeout(onTimeout, 5000);

function onTimeout() {
    console.log("Setting state PAUSED")
    rc.set_state("PAUSED");
    assert.equal(rc.get_state(), "PAUSED");
    console.log("Setting state EXITING")
    rc.set_state("EXITING");
    assert.equal(rc.get_state(), "EXITING");
    process.exit();
}

function readRCpid(err, data) {
    assert.equal(data, process.pid);
}

function onPausePressed() {
    console.log("PAUse button pressed")
}
