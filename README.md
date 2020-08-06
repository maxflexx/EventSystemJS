# What is it?

This is an event system, which is made to make different parts of your project "closer" to each other:)

# How to use?

`npm i eventSystem --save`

You have to create class, which will extent from `BaseEvent` class and define at least one of those methods: `call || callAsync`.
After that create an instance of `EventManager`, subscribe into event and wait for events. You can have sync and async events.

Example:
```
class MyEvent1 extends BaseEvent {
    constructor(){
        super("MessageFromNetworkArrived"); // eventTypeName
    }
    call() {
        console.log("Hello event 1 %d", this.getId());
}

const eventManager = new EventManager();
const event1 = new MyEvent1();
eventManager.AddSyncEvent(event1);
eventManager.DispatchSyncEvent("MessageFromNetworkArrived");
```

`Call` function will be invoked by eventManager;
