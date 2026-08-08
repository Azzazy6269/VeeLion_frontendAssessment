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