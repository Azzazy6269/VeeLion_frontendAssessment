### 1. Backend API archeticture
**Category:** Maintainability / Code Quality
**What is wrong:** backend apis were handled in one file directly in lib folder
**Why it matters:** this can make backendApi.ts unreadable as it may have too many apis
**Suggested improvement:** Modularized the API layer by introducing `lib/backendApi/` directory.


### 2. Used axios to unify backend APIs behaviour 
**Category:** Maintainability / Code Quality
**What is wrong:** you have to add headers each time you call an api and use helper function to parse errors which Increases boilerplate code
**Why it matters:** redundant code and bad practice
**Suggested improvement:** switch to axios instance to handle requests and responses via interceptors


### 3. Used Zod to validate data
**Category:** Code Quality / Performance
**What is wrong:** Requests payload must be validated before sending it to backend server
**Why it matters:** Invalid or malformed payloads can lead to unhandled backend errors, data corruption, storing redundant spaces, or unexpected application crashes.
**Suggested improvement:** used Zod library to validate requests payload


### 4. Implemented ParseToJson to parse request payload to json
**Category:** Code Quality
**What is wrong:** In the begging of each route we had to write request.json and check it's sucess
**Why it matters:** This leads to code redundancy and violates the DRY principle.
**Suggested improvement:** Implemented a shared ParseToJson helper to parse and validate request payloads cleanly.