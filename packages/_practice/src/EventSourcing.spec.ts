export {}

class EventSourcingEvent {}

class CreationEvent extends EventSourcingEvent {}

class GrowEvent extends EventSourcingEvent {}

function applyEvent(entity: any, event: EventSourcingEvent) {
  if (event instanceof CreationEvent) {
    return {}
  } else if (event instanceof GrowEvent) {
    return {
      ...entity,
      height: (entity.height || 0) + 1,
    }
  }
}

describe.skip("EventSourcing", () => {
  // can store events regarding a model

  it("", () => {
    let entity = null
    const creationEvent = new CreationEvent()
    const growEvent = new GrowEvent()
    const entityEvents = [creationEvent]
    entity = entityEvents.reduce((entity, event) => applyEvent(entity, event))
    expect(entity).toEqual({ height: 1 })
  })
})
