import { mixin } from './mixin.js'
import { FlatOfferInformationRetriever } from './FlatOfferInformationRetriever.js'
import { Page } from './Page.js'

export class FlatOfferDetailPage extends Page {}

mixin(FlatOfferDetailPage, FlatOfferInformationRetriever)
