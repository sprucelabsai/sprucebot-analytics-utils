# Sprucebot Analytics Utils

### Getting Started
Before using, make sure the ANALYTICS_API_HOST and JWT_ANALYTICS_SECRET variables are set.

```
ANALYTICS_API_HOST=https://sb-analytics-api-dev.herokuapp.com
JWT_ANALYTICS_SECRET=abcdefghijklmnopqrstuvwxyz
```

After installing, require the module with the following `const analyticsUtils = require('sprucebot-analytics-utils');`. To fire an event, at the minimum, you will need a noun and verb `analyticsUtils.fire('user', 'exit')`. An optional object param can be passed in as well. 

```
const object = {
  "userId": "8ec5980b-7385-41a2-9fcb-49600acebf87",
  "locationId" : "30713777-3ede-4515-867f-ea66fb3eff36",
  "date" : "2020-07-01T09:55:45-04:00"
}

analyticsUtils.fire('user', 'exit', object);
```

### Testing
To start the test, in a terminal type: `npm run test`. The test suite is ran by Jest. Code coverage results can be found in `cover/lcov-report`.

### Documentation
Failure to provide the required enviornmental variables or parameters (noun, verb), the module will fail silently.
