var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ And, But, Given, Then, When }) {
  Then(
    /^an ADAC service worker should be there to repair the motor in (\d+) minutes or less$/,
    function (arg1, callback) {
      callback.pending();
    }
  );
  Given(/^I have a car$/, function (callback) {
    callback.pending();
  });
  Given(/^the car has no gas$/, function (callback) {
    callback.pending();
  });
  When(/^I call ADAC$/, function (callback) {
    callback.pending();
  });
  Then(
    /^an ADAC service worker should be there to help in (\d+) minutes or less$/,
    function (arg1, callback) {
      callback.pending();
    }
  );
  Given(/^the motor has a defect$/, function (callback) {
    callback.pending();
  });
});
