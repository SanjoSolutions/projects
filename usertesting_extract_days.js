const fetch = require('node-fetch')

fetch('https://testersupport.usertesting.com/hc/en-us/articles/360021480191')
	.then(response => response.text())
	.then(body => {
		const match = /completed ([0-9]+) days ago/.exec(body)
		if (match) {
			return Number(match[1])
		} else {
			return null
		}
	})
	.then(console.log)
