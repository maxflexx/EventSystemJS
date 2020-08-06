export class BaseEvent {
    #m_EventType;
    #m_Id;
    constructor(eventType) {
        this.#m_EventType = eventType;
        this.#m_Id = EventManager.getNextNumber();
    }
    call(){}

    async callAsync() {}

    getEventType() {
        return this.#m_EventType;
    }
    getId(){
        return this.#m_Id;
    }
}

export class EventManager {
    #m_SyncEvents;
    #m_AsyncEvents;
    static #nextNumberOfEvent = 0;

    static getNextNumber() {
        return this.#nextNumberOfEvent++;
    }

    constructor(){
        this.#m_SyncEvents = new Map();
        this.#m_AsyncEvents = new Map();
        this.AddEvent = function(container, event) {
            if (!container.get(event.getEventType())) {
                container.set(event.getEventType(), []);
            }
            container.get(event.getEventType()).push(event);
        };
        this.DeleteEvent = function (container, event) {
            if (!container.get(event.getEventType())){
                return;
            }
            container.set(event.getEventType(), container.get(event.getEventType()).filter(e => e.getId() != event.getId()));
        };
        this.DispatchEvent  = function (container, eventType) {
            if (!container.get(eventType)){
                return;
            }
            container.get(eventType).map(e => e.call());
        };
    }

    AddSyncEvent(event) {
        this.AddEvent(this.#m_SyncEvents, event);
    }

    AddAsyncEvent(event) {
        this.AddEvent(this.#m_AsyncEvents, event);
    }

    DeleteSyncEvent(event) {
        this.DeleteEvent(this.#m_SyncEvents, event);
    }

    DeleteAsyncEvent(event) {
        this.DeleteEvent(this.#m_AsyncEvents, event);
    }

    DispatchSyncEvent(eventType) {
        if (!this.#m_SyncEvents.get(eventType)){
            return;
        }
        this.#m_SyncEvents.get(eventType).map(e => e.call());
    }

    async DispatchAsyncEvent(eventType) {
        if (!this.#m_AsyncEvents.get(eventType)){
            return;
        }
        await Promise.all(this.#m_AsyncEvents.get(eventType).map((e) => e.callAsync()));
    }
}
