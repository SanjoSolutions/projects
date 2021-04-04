# forum-eu-automation

This work is devoted to God.

Automation for Forum.eu.

## How to use

```zsh
node index.js create-pr wip <tickedId>
node index.js create-pr ready <ticketId>
node index.js mark-pr-as-ready <ticketId>
```

### Short version of commands

Prefix ticketId with current common digits (e.g. 6).

1. Open terminal with one key.
2. Enter shortcut command (e.g. with ticketId = 59):

```zsh
cw 59  # gets translated to `node index.js create-pr wip 659`
cr 59  # gets translated to `node index.js create-pr ready 659`
r 59   # gets translated to `node index.js mark-pr-as-ready 659`
```

### Config for .zshrc

```zsh
pathToForumEuAutomation='<PATH_TO>/packages/forum-eu-automation/built/index.js'
ticketIdPrefix='6'

cw() {
  node "${pathToForumEuAutomation}" create-pr wip "${ticketIdPrefix}$@"
}

cr() {
  node "${pathToForumEuAutomation}" create-pr ready "${ticketIdPrefix}$@"
}

r() {
  node "${pathToForumEuAutomation}" mark-pr-as-ready "${ticketIdPrefix}$@"
}
```

#### Zsh function for creating feature branch

```zsh
d() {
  git checkout dev && git pull && git checkout -b "$@"
}
```

#### Zsh functions for starting

```zsh
pathToForumEu='<PATH_TO_FORUM_EU>/forum_eu'
pathToForumEuFrontend="${pathToForumEu}/frontend"
pathToForumEuBackend="${pathToForumEu}/backend"

f() {
  cd "${pathToForumEuFrontend}" && npm start
}

b() {
  cd "${pathToForumEuBackend}" && nvm use 10 && npm run develop
}

s() {
  cd "${pathToForumEuFrontend}" && npm run storybook
}
```
