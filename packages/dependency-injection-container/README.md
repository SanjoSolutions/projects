# @sanjo/dependency-injection-container

This work is devoted to God.

A dependency injection container.

## How to install

```
npm install --save '@sanjo/dependency-injection-container'
```

## How to use

```js
import { DependencyInjectionContainer } from '@sanjo/dependency-injection-container'
import { DependingOn } from './DependingOn.js'

const container = new DependencyInjectionContainer()

class DatabaseA {

}

const database = new DatabaseA()
container.register('database', database)

class ComponentB implements DependingOn {
  database: any

  static getDependencies() {
    return ['database']
  }
}

const componentB = container.instantiate<ComponentB>(ComponentB)

console.log(componentB.database)
```
