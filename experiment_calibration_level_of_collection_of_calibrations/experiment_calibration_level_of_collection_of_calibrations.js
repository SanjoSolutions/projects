const calibrations = [
  425,
  420,
  460,
  455,
  445,
  498,
  503,
  445,
  485,
  470,
  460,
  430,
  480,
  455,
  505,
  450,
  490,
  465,
  200,
  430,
  440,
  470,
  415,
  440,
  405,
  499,
  450,
  485,
  445,
  450,
  465,
  470,
  470,
  440,
  485,
  435,
  455,
  445,
  465,
  490,
  460,
  470,
  425,
  470,
  420,
  440,
  130,
  460,
  465,
  470,
  440,
  435,
  499,
  435,
  465,
  485,
  503,
  460,
  435,
  435,
  465,
  465,
  455,
  465,
  480,
  430,
  445,
  420,
  420,
  420,
  445,
]

const calibrationsValues = calibrations.map(calibration => BigInt(10) **
  BigInt(calibration))
const averageCalibrationValue = approximatedLog10(average(calibrationsValues))
console.log('average:', averageCalibrationValue)
console.log('median:', approximatedLog10(median(calibrationsValues)))

function average (values) {
  return values.reduce((sum, value) => sum + value) / BigInt(values.length)
}

function median (values) {
  values.sort()
  if (values.length % 2 == 0) {
    return (values[values.length / 2 - 1] + values[values.length / 2]) / 2n
  } else {
    return values[Math.floor(values.length / 2)]
  }
}

function wholeNumberLog10 (value) {
  const valueString = value.toString()
  return valueString.length
}

export function approximatedLog10 (value) {
  const valueString = value.toString()
  return valueString.length + Math.log10(Number(`0.${valueString}`))
}

