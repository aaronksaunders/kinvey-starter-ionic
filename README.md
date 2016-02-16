Ionic App Base - Kinvey Starter
=====================

**Set the Kinvey Configuration, use your values from the kinvey console**
```Javascript
  .value('KinveyConfiguration', {
    appKey: "xxxxxx",
    appSecret: "xxxxxxxxxxxx"
  })
```

**Create the `todo-collection`, at a minimum it needs to have a title**
```Javascript
{
  description: "Sample To Do Description"
  title: "Sample To Do"
  status: "open"
}
```
**The application demonstrates the following:**
* Login
* Create Account
* View Data Collection
* Delete Object From Data Collection - *swipe list item to expose delete button*
* Add Object to Data Collection
