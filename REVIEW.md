### 1. Backend API archeticture
**Category:** Maintainability / Code Quality
**What is wrong:** backend apis were handled in one file directly in lib folder
**Why it matters:** this can make backendApi.ts unreadable as it may have too many apis
**Suggested improvement:** Modularized the API layer by introducing `lib/backendApi/` directory.


### 2. Used axios to unify APIs behaviour 
**Category:** Maintainability / Code Quality
**What is wrong:** you have to add headers each time you call an api and use helper function to parse errors which Increases boilerplate code
**Why it matters:** redundant code and bad practice
**Suggested improvement:** switch to axios instance to handle requests and responses via interceptors