### 1. Backend API archeticture
**Category:** Maintainability / Code Quality
**What is wrong:** backend apis were handled in one file directly in lib folder
**Why it matters:** this can make backendApi.ts unreadable as it may have too many apis
**Suggested improvement:** Modularized the API layer by introducing `lib/backendApi/` directory.


### 2. Used axios to unify backend APIs behaviour 
**Category:** Maintainability / Code Quality
**What is wrong:** you have to add headers each time you call an api and use helper function to parse errors which Increases boilerplate code
**Why it matters:** redundant code and bad practice.
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
**Suggested improvement:** Implemented a shared ParseToJson helper to parse and validate request body cleanly.


### 5. Lack of Unified Client-Side HTTP Instance (`apiClient`)
**Category:** Maintainability / Code Quality
**What is wrong:** Custom React hooks were directly invoking raw `fetch` calls and inline `requestJson` helper functions with duplicated header settings and error parsing logic.
**Why it matters:** redundant code and bad practice
**Suggested improvement:** switch to axios instance to handle requests and responses via interceptors


### 6. useCallback and useMemo for caching( Although I prefer tanstack query )
**Category:** Performance / React best practice
**What is wrong:** Handlers and filtered data inside custom hooks were re-created and re-computed on every single render cycle without memoization wrappers.
**Why it matters:** consume resources which makes application slower( bad for UX ).
**Suggested improvement:** used useCallback and useMemo to cache functions and it's result. ( avoided Stale Closure ).
I preferred using TanStack Query, as it eliminates manual state management boilerplate (such as loading and error flags) while seamlessly handling automatic cache invalidation upon mutations.


### 7. implement getErrorMessage as a global helper function
**Category:** Code quality
**What is wrong:** in many files we compared between error.message and fallback message.
**Why it matters:** it's redundant code that we have to write once and use in differen modules .
**Suggested improvement:** implemented getErrorMessage helper function in lib directory and called it when it's needed.


### 8. Enhance components folder archeticture
**Category:** Code quality
**What is wrong:** There's no folder for shared components between features or for layouts and tasks feature only has a seperate folder.
**Why it matters:** After adding all the needed components It will be messy structure that you can't find your component easily .
**Suggested improvement:** divided components folder into layouts, ui and features( Feature-Based Architecture).



### 9. Using props can lead to props drilling
**Category:** performance / React best practices
**What is wrong:** Using props can lead to props drilling.
**Why it matters:** As the application scales, deeply nested prop passing creates tight coupling between components, reduces code readability, and makes refactoring or maintaining the component tree significantly harder.
**Suggested improvement:** For large-scale applications, global state management tools like Zustand, Redux Toolkit, or React Context should be used. However, for the current scope and complexity of this application, utilizing props remains the appropriate, lightweight, and performant choice.


### 10. Radix UI and tailwind
**Category:** Code quality / UX Design
**What is wrong:** current code depends only on native css.
**Why it matters:** It's much harder for developers to design UI without css framework like tailwind and UI library like shadcn or others. In current code we use inline style which enlarge DOM so we have to replace it with tailwind classes
**Suggested improvement:** installed tailwind and Radix UI.


### 11. Duplication of main tag
**Category:** performance / React best practices
**What is wrong:** main tag is used in RootLayout and in page.tsx.
**Why it matters:** It breaks HTML5 Semantics rules and affects SEO 
**Suggested improvement:** Used it only in RootLayout.


### 12. Missing Memoization on Event Handlers (useCallback)
**Category:** React Performance / Best Practices
**What is wrong:** In TaskDashboard.tsx, the inline function handleToggle is recreated on every render of TaskDashboard, forcing all child TaskItem components inside TaskList to re-render unnecessarily.
**Why it matters:** Causes unnecessary re-renders across the task list tree whenever parent state changes (e.g., when changing status filters).
**Suggested improvement:** Wrapped task action handlers in useCallback to preserve reference identity across renders.


### 13. Moved navigation to navbar
**Category:** UX Design
**What is wrong:** There's no direct button to navigate from tasks to activity, reports and vice versa.
**Why it matters:** User has every time to press `back` and return to home page to navigate to another page.
**Suggested improvement:** Introduced a global persistent Navigation Bar (Navbar / Sidebar) with active page indicators, allowing single-click transitions between Tasks, Activity Feed, and Reports.
