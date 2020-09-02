import child_process from 'child_process';

import { expect, specification, throwsError } from './index.js';

function runSpecification(specificationFilePath) {
  const { status, stdout, stderr } = child_process.spawnSync(
    'node --experimental-modules --no-warnings ' + specificationFilePath,
    {
      shell: true,
      encoding: 'utf-8',
      stdio: 'pipe'
    }
  )
  return { status, stdout, stderr }
}

specification(function () {
  const { status } = runSpecificationThatPasses()
  expect(status).toEqual(0)
})

specification(function () {
  const { stdout } = runSpecificationThatPasses()
  expect(stdout.includes('\u001b[32mSpecification passed.\u001b[0m\n')).toEqual(true)
})

function runSpecificationThatPasses() {
  return runSpecification('data/specification_that_passes.spec.js')
}

specification(function () {
  const { status } = runSpecificationThatFails()
  expect(status).toEqual(1)
})

specification(function () {
  const { stdout } = runSpecificationThatFails()
  expect(stdout.includes('Specification passed.')).toEqual(false)
})

function runSpecificationThatFails() {
  return runSpecification('data/specification_that_fails.spec.js')
}

specification(function () {
  const { status, stderr } = runSpecificationWithoutExpectation()
  expect(status).toEqual(1) // Specification should fail because it has no expectation
})

specification(function () {
  const { stderr } = runSpecificationWithoutExpectation()
  expect(stderr.includes('Error: specification has no expectation\n')).toEqual(true)
})

function runSpecificationWithoutExpectation() {
  return runSpecification('data/specification_without_expectation.spec.js')
}

specification(function () {
  const { status, stdout, stderr } = runSpecificationWithTwoExpectations()
  expect(status).toEqual(1) // Specification should fail because it has more than one expectation
})

specification(function () {
  const { stderr } = runSpecificationWithTwoExpectations()
  expect(stderr.includes('Error: specification has more than one expectation\n')).toEqual(true)
})

function runSpecificationWithTwoExpectations() {
  return runSpecification('data/specification_with_two_expectations.spec.js')
}

specification(function () {
  const { status } = runSpecificationWithoutExpectationAfterSpecificationThatPasses()
  expect(status).toEqual(1)
})

specification(function () {
  const { stderr } = runSpecificationWithoutExpectationAfterSpecificationThatPasses()
  expect(stderr.includes('Error: specification has no expectation\n')).toEqual(true)
})

function runSpecificationWithoutExpectationAfterSpecificationThatPasses() {
  return runSpecification('data/specification_without_expectation_after_specification_that_passes.spec.js')
}

specification(function () {
  expect(1).toEqual(1)
})

specification(function () {
  class A {
  }
  const a = new A()
  expect(a).toHaveType(A)
})

specification(function () {
  const { stderr } = runToHaveTypeFail()
  expect(stderr.includes('Error: has not the type "A"\n')).toEqual(true)
})

function runToHaveTypeFail() {
  return runSpecification('data/to_have_type_fail.spec.js')
}

specification(function () {
  expect(function () {
    throw Error('<error message>')
  }).toThrowError('<error message>')
})

specification(function () {
  expect(throwsError(function () {
    throw Error('<error message>')
  })).toEqual(true)
})

specification(function () {
  expect(throwsError(function () { })).toEqual(false)
})

specification(function () {
  expect(throwsError(function () {
    throw Error('<error message>')
  }, '<error message>')).toEqual(true)
})

specification(function () {
  expect(throwsError(function () {
    throw Error('<error message>')
  }, '<another error message>')).toEqual(false)
})

specification(function () {
  const { status, stderr } = runSpecification('data/to_exist_pass.spec.js')
  expect(status).toEqual(0)
})

specification(function () {
  const { status } = runToExistFail()
  expect(status).toEqual(1)
})

specification(function () {
  const { stderr } = runToExistFail()
  expect(stderr.includes('Error: No existence')).toEqual(true)
})

function runToExistFail() {
  return runSpecification('data/to_exist_fail.spec.js')
}

specification(function () {
  const { status } = runToThrowErrorPass()
  expect(status).toEqual(0)
})

function runToThrowErrorPass() {
  return runSpecification('data/to_throw_error_pass.spec.js')
}

specification(function () {
  const { status } = runToThrowErrorFail()
  expect(status).toEqual(1)
})

specification(function () {
  const { stderr } = runToThrowErrorFail()
  expect(stderr.includes('Error: Expected to throw error "<another error message>"')).toEqual(true)
})

function runToThrowErrorFail() {
  return runSpecification('data/to_throw_error_fail.spec.js')
}

specification(function () {
  const { status } = runAsync()
  expect(status).toEqual(0)
})

function runAsync() {
  return runSpecification('data/async.spec.js')
}

specification(function () {
  const { status } = runAsyncThrowing()
  expect(status).toEqual(1)
})

specification(function () {
  const { stderr } = runAsyncThrowing()
  expect(stderr.includes('Error: <error message>')).toEqual(true)
})

function runAsyncThrowing() {
  return runSpecification('data/async_throwing.spec.js')
}

specification(function () {
  const { status } = runAsyncTwo()
  expect(status).toEqual(0)
})

function runAsyncTwo() {
  return runSpecification('data/async_two.spec.js')
}

specification(function () {
  const { stdout } = runSpecificationWithLabelPass()
  expect(
    /^✓ test 1\n✓ test 2\n/.test(stdout)
  ).toEqual(true)
})

function runSpecificationWithLabelPass() {
  return runSpecification('data/with_label_pass.spec.js')
}

specification(function () {
  const { stdout } = runSpecificationWithLabelFail()
  expect(
    /^✗ test\n/.test(stdout)
  ).toEqual(true)
})

function runSpecificationWithLabelFail() {
  return runSpecification('data/with_label_fail.spec.js')
}
