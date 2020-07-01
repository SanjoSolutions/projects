const { Then } = require('cucumber')
const { When } = require('cucumber')

const createJ$ = require('@sanjo/jasmine-expect').createJ$
// const createSpyEnv = require('@sanjo/jasmine-spy').createEnv;
const createExpectEnv = require('@sanjo/jasmine-expect').createEnv

const j$ = createJ$()
const expectEnv = createExpectEnv(j$)
// const spyEnv = createSpyEnv(j$);

const expect = expectEnv.expect
// const spyOn = spyEnv.spyOn;
const jasmine = {
  // createSpy: spyEnv.createSpy,
  // createSpyObj: spyEnv.createSpyObj,
  any: expectEnv.any,
  anything: expectEnv.anything,
  objectContaining: expectEnv.objectContaining,
  stringMatching: expectEnv.stringMatching,
  arrayContaining: expectEnv.arrayContaining,
  addCustomEqualityTester: expectEnv.addCustomEqualityTester,
  addMatchers: expectEnv.addMatchers,
}

// afterEach(function () {
//   spyEnv.clearSpies();
// });

When(/^no cheese left in storage$/, function () {
  this.storage = []
})

Then(/^new cheese should be delivered and put into storage$/, function () {
  expect(this.storage).toEqual([])
})
