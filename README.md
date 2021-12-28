# Information
 - Not production code instead simple abstraction for testing purposes
 - Client needs to send authorization header like:

```js
const io = require('socket.io-client');

const socket = io('http://localhost:4000', {
  transportOptions: {
    polling: {
      extraHeaders: {
        'Authorization': 'Bearer abc',
      },
    },
  },
});
```
