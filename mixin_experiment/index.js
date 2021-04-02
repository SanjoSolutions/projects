import { FlatOfferInformationRetriever } from "../automatic_application_for_flats/src/lib/FlatOfferInformationRetriever.js"
import { mixin } from "../mixin.js"

class A {
  constructor() {
    console.log("constructor A")
  }
}

console.log(FlatOfferInformationRetriever.prototype.getColdRent)

mixin(A, FlatOfferInformationRetriever)

const a = new A()

console.log("a.getColdRent()", a.getColdRent())
