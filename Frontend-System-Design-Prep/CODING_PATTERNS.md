# 💻 Frontend Coding Patterns - Complete Guide

## Design Patterns

### 1. Singleton Pattern
- Single instance throughout app
- Logger, configuration
- Use: Shared resources

### 2. Factory Pattern
- Create objects without specifying exact classes
- Component factory
- Use: Object creation

### 3. Observer Pattern
- Notify multiple subscribers
- Event emitter
- Use: Event handling

### 4. Strategy Pattern
- Different algorithms for same task
- Payment methods
- Use: Interchangeable algorithms

### 5. Decorator Pattern
- Add functionality to existing objects
- withAuth, withTheme HOCs
- Use: Cross-cutting concerns

## Architectural Patterns

### 1. MVC Pattern
- Model: Data and business logic
- View: UI
- Controller: Logic
- Use: Simple apps

### 2. MVVM Pattern
- Model: Data layer
- ViewModel: State and logic
- View: UI
- Use: Complex state

### 3. Flux Pattern
- Actions → Dispatcher → Stores → Views
- Unidirectional data flow
- Use: Large apps

## Behavioral Patterns

### 1. Render Props Pattern
- Share logic between components
- Function as prop
- Use: Shared logic

### 2. Compound Components Pattern
- Components that work together
- Tabs, Accordion
- Use: Related components

### 3. Custom Hooks Pattern
- Reusable logic
- useFetch, useLocalStorage
- Use: Shared logic

## Performance Patterns

### 1. Memoization
- Prevent unnecessary re-renders
- React.memo, useMemo, useCallback

### 2. Code Splitting
- Lazy load components
- Reduce bundle size

### 3. Virtual Scrolling
- Render only visible items
- Handle large lists

---

See COMPLETE_CODE_EXAMPLES.md for full implementations!
