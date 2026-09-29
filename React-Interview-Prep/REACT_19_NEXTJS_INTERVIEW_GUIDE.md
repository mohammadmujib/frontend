# 🚀 React 19 & Next.js 15 - Complete Interview Prep Guide

## 📋 Table of Contents

1. [7-Day Study Plan](#7-day-study-plan)
2. [Complete React Hooks Reference](#complete-react-hooks-reference)
3. [Day 1: React 19 Fundamentals](#day-1-react-19-fundamentals)
4. [Day 2: React 19 Advanced Hooks](#day-2-react-19-advanced-hooks)
5. [Day 3: Server Components & Actions](#day-3-server-components--actions)
6. [Day 4: Next.js 15 Features](#day-4-nextjs-15-features)
7. [Day 5: Performance & Optimization](#day-5-performance--optimization)
8. [Day 6: Real-world Patterns](#day-6-real-world-patterns)
9. [Day 7: Interview Q&A & Practice](#day-7-interview-qa--practice)

---

## 📅 7-Day Study Plan

### Overview

| Day | Topic | Duration | Key Focus |
|-----|-------|----------|-----------|
| **Day 1** | React 19 Fundamentals | 4-5 hrs | React Compiler, Ref as Prop, useActionState |
| **Day 2** | React 19 Advanced Hooks | 4-5 hrs | useFormStatus, useOptimistic, use() hook |
| **Day 3** | Server Components & Actions | 4-5 hrs | Server Components, Server Actions, Mixing |
| **Day 4** | Next.js 15 Features | 4-5 hrs | App Router, API Routes, Middleware |
| **Day 5** | Performance & Optimization | 4-5 hrs | ISR, Caching, Code Splitting |
| **Day 6** | Real-world Patterns | 4-5 hrs | Authentication, Error Handling, Validation |
| **Day 7** | Mock Interview & Review | 4-5 hrs | Q&A, Practice, Consolidation |

### Daily Structure

**Morning (2 hours):**
- Read the day's section
- Take detailed notes
- Understand concepts deeply

**Afternoon (2 hours):**
- Code along with examples
- Build small projects
- Test your understanding

**Evening (1 hour):**
- Review and consolidate
- Create flashcards
- Prepare for next day

---

# 📚 COMPLETE REACT HOOKS REFERENCE

## All React Hooks Explained

This section covers ALL React hooks with detailed explanations, examples, and use cases.

---

## 1️⃣ useState Hook

### What is it?

`useState` is the most basic hook for managing state in functional components. It returns an array with two elements: the current state value and a function to update it.

### Signature

```jsx
const [state, setState] = useState(initialValue);
```

### Parameters & Return

| Item | Type | Description |
|------|------|-------------|
| **initialValue** | any | Initial state value |
| **state** | any | Current state value (getter) |
| **setState** | function | Function to update state (setter) |

### Basic Example

```jsx
import { useState } from 'react';

export function Counter() {
  // state = current value (getter)
  // setState = function to update state (setter)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Multiple State Variables

```jsx
import { useState } from 'react';

export function Form() {
  // Each state variable is independent
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
      <p>Name: {name}, Email: {email}, Age: {age}</p>
    </div>
  );
}
```

### Functional Update

```jsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  // Functional update - uses previous state
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
```

### Lazy Initialization

```jsx
import { useState } from 'react';

// Expensive computation
function expensiveComputation() {
  console.log('Computing...');
  return 0;
}

export function Counter() {
  // Function is called only once on mount
  const [count, setCount] = useState(() => expensiveComputation());

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Key Points

✅ **Getter** - `state` is the current value
✅ **Setter** - `setState` updates the value
✅ **Immutable** - Always create new state, don't mutate
✅ **Batched** - Multiple updates are batched together
✅ **Functional update** - Use previous state for dependent updates

---

## 2️⃣ useEffect Hook

### What is it?

`useEffect` runs side effects after render. It handles data fetching, subscriptions, timers, and cleanup.

### Signature

```jsx
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

### Parameters

| Item | Type | Description |
|------|------|-------------|
| **effect** | function | Function to run after render |
| **cleanup** | function | Optional cleanup function |
| **dependencies** | array | Array of values to watch |

### Basic Example

```jsx
import { useEffect, useState } from 'react';

export function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs after every render
  useEffect(() => {
    console.log('Effect ran');
  });

  return <div>{loading ? 'Loading...' : data}</div>;
}
```

### With Dependency Array

```jsx
import { useEffect, useState } from 'react';

export function DataFetcher({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs only when userId changes
  useEffect(() => {
    console.log('Fetching user:', userId);
    
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Dependency array

  return <div>{loading ? 'Loading...' : user?.name}</div>;
}
```

### Empty Dependency Array

```jsx
import { useEffect, useState } from 'react';

export function Component() {
  const [data, setData] = useState(null);

  // Runs only once on mount
  useEffect(() => {
    console.log('Component mounted');
    
    fetch('/api/data')
      .then(r => r.json())
      .then(setData);
  }, []); // Empty array = run once

  return <div>{data}</div>;
}
```

### Cleanup Function

```jsx
import { useEffect, useState } from 'react';

export function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Set up interval
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup function - runs before unmount or before next effect
    return () => {
      clearInterval(interval);
      console.log('Cleanup: interval cleared');
    };
  }, []);

  return <div>Seconds: {seconds}</div>;
}
```

### Proper Data Fetching Pattern

```jsx
import { useEffect, useState } from 'react';

export function DataFetcher({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if component is mounted

    async function fetchData() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const json = await response.json();
        
        // Only update if component is still mounted
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false; // Mark as unmounted
    };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{data?.name}</div>;
}
```

### Key Points

✅ **Runs after render** - After DOM updates
✅ **Cleanup function** - Prevents memory leaks
✅ **Dependency array** - Controls when effect runs
✅ **Empty array** - Runs only once on mount
✅ **No array** - Runs after every render
✅ **Check isMounted** - Prevent state updates on unmounted components

---

## 3️⃣ useContext Hook

### What is it?

`useContext` accesses context values without prop drilling.

### Signature

```jsx
const value = useContext(Context);
```

### Complete Example

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create context
const ThemeContext = createContext();

// 2. Create provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Use context
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff'
      }}
    >
      Current theme: {theme}
    </button>
  );
}

// 4. Use in app
export function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### Key Points

✅ **Avoid prop drilling** - Pass data directly
✅ **Create context** - Use createContext()
✅ **Provider** - Wrap components with Provider
✅ **useContext** - Access value in child components
✅ **Re-renders** - All consumers re-render when value changes

---

## 4️⃣ useReducer Hook

### What is it?

`useReducer` manages complex state with multiple related values.

### Signature

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

### Complete Example

```jsx
import { useReducer } from 'react';

// Action types
const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO'
};

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    
    case ACTIONS.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      };
    
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload
            ? { ...t, completed: !t.completed }
            : t
        )
      };
    
    default:
      return state;
  }
}

// Initial state
const initialState = {
  todos: []
};

// Component
export function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleAddTodo = (text) => {
    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: { id: Date.now(), text, completed: false }
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: ACTIONS.TOGGLE_TODO,
      payload: id
    });
  };

  const handleRemoveTodo = (id) => {
    dispatch({
      type: ACTIONS.REMOVE_TODO,
      payload: id
    });
  };

  return (
    <div>
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => handleRemoveTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <AddTodoForm onAdd={handleAddTodo} />
    </div>
  );
}
```

### Key Points

✅ **Complex state** - Multiple related values
✅ **Predictable** - Pure reducer function
✅ **Testable** - Easy to test reducer logic
✅ **Centralized** - All logic in one place
✅ **Scalable** - Works for large state trees

---

## 5️⃣ useCallback Hook

### What is it?

`useCallback` memoizes a function so it's not recreated on every render.

### Signature

```jsx
const memoizedCallback = useCallback(() => {
  // function body
}, [dependencies]);
```

### Example

```jsx
import { useCallback, useState } from 'react';

export function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback, this function is recreated every render
  // With useCallback, it's only recreated when dependencies change
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onButtonClick={handleClick} />
    </div>
  );
}

function Child({ onButtonClick }) {
  console.log('Child rendered');
  return <button onClick={onButtonClick}>Child Button</button>;
}
```

### With Dependencies

```jsx
import { useCallback, useState } from 'react';

export function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Recreated only when count changes
  const handleClick = useCallback(() => {
    console.log('Count:', count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onButtonClick={handleClick} />
    </div>
  );
}
```

### Key Points

✅ **Memoize functions** - Prevent unnecessary re-renders
✅ **Dependencies** - Recreate when dependencies change
✅ **Performance** - Use with React.memo for best results
✅ **Reference equality** - Same function reference across renders

---

## 6️⃣ useMemo Hook

### What is it?

`useMemo` memoizes an expensive computation so it's not recalculated on every render.

### Signature

```jsx
const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]);
```

### Example

```jsx
import { useMemo, useState } from 'react';

export function DataProcessor({ items }) {
  const [filter, setFilter] = useState('');

  // Only recalculate when items or filter changes
  const processedData = useMemo(() => {
    console.log('Processing data...');
    return items
      .filter(item => item.name.includes(filter))
      .map(item => ({
        ...item,
        processed: item.value * 2
      }));
  }, [items, filter]);

  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter..."
      />
      <ul>
        {processedData.map(item => (
          <li key={item.id}>{item.name}: {item.processed}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Key Points

✅ **Expensive computations** - Cache results
✅ **Dependencies** - Recalculate when dependencies change
✅ **Performance** - Use for heavy calculations
✅ **Reference equality** - Same object reference across renders

---

## 7️⃣ useRef Hook

### What is it?

`useRef` creates a mutable reference that persists across renders without causing re-renders.

### Signature

```jsx
const ref = useRef(initialValue);
```

### Example 1: Accessing DOM Elements

```jsx
import { useRef } from 'react';

export function TextInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} placeholder="Type here..." />
      <button onClick={handleFocus}>Focus Input</button>
    </>
  );
}
```

### Example 2: Storing Mutable Values

```jsx
import { useRef, useEffect } from 'react';

export function Timer() {
  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      console.log('Timer running...');
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </>
  );
}
```

### Example 3: Tracking Previous Value

```jsx
import { useRef, useEffect, useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Current: {count}, Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Key Points

✅ **Mutable** - Can be changed without re-render
✅ **Persists** - Same reference across renders
✅ **No re-render** - Changing ref doesn't trigger render
✅ **DOM access** - Access DOM elements directly
✅ **Storing values** - Store timers, intervals, etc.

---

## 8️⃣ useLayoutEffect Hook

### What is it?

`useLayoutEffect` is like `useEffect` but runs synchronously after DOM mutations, before browser paint.

### Signature

```jsx
useLayoutEffect(() => {
  // Runs after DOM mutations but before paint
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

### Example

```jsx
import { useLayoutEffect, useRef, useState } from 'react';

export function Tooltip() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    // Measure DOM and update position before paint
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
    }
  }, []);

  return (
    <div 
      ref={tooltipRef}
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      Tooltip
    </div>
  );
}
```

### Key Points

✅ **Synchronous** - Runs before browser paint
✅ **DOM measurement** - Get accurate measurements
✅ **Performance** - Use sparingly, can block rendering
✅ **Rare use case** - Usually useEffect is better

---

## 9️⃣ useId Hook

### What is it?

`useId` generates a unique ID that's stable across renders.

### Signature

```jsx
const id = useId();
```

### Example

```jsx
import { useId } from 'react';

export function Form() {
  const emailId = useId();
  const passwordId = useId();

  return (
    <form>
      <label htmlFor={emailId}>Email:</label>
      <input id={emailId} type="email" />

      <label htmlFor={passwordId}>Password:</label>
      <input id={passwordId} type="password" />
    </form>
  );
}
```

### Key Points

✅ **Unique IDs** - Generate stable unique IDs
✅ **Accessibility** - Use with labels and ARIA
✅ **SSR safe** - Works with server-side rendering
✅ **No collisions** - Guaranteed unique across components

---

## 🔟 useTransition Hook

### What is it?

`useTransition` marks updates as non-urgent, allowing urgent updates to interrupt them.

### Signature

```jsx
const [isPending, startTransition] = useTransition();
```

### Example

```jsx
import { useTransition, useState } from 'react';

export function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value); // Urgent update

    // Non-urgent update
    startTransition(() => {
      const filtered = data.filter(item =>
        item.name.includes(value)
      );
      setResults(filtered);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleSearch} />
      {isPending && <p>Loading...</p>}
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Key Points

✅ **Non-urgent updates** - Can be interrupted
✅ **Better UX** - Urgent updates feel faster
✅ **Pending state** - Show loading indicator
✅ **Concurrent features** - Foundation for Suspense

---

## 1️⃣1️⃣ useDeferredValue Hook

### What is it?

`useDeferredValue` defers updating a value to keep the UI responsive.

### Signature

```jsx
const deferredValue = useDeferredValue(value);
```

### Example

```jsx
import { useDeferredValue, useState } from 'react';

export function SearchResults() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <Results query={deferredQuery} />
    </div>
  );
}

function Results({ query }) {
  // This component receives deferred value
  // Allows input to update immediately
  const results = expensiveSearch(query);
  
  return (
    <ul>
      {results.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Key Points

✅ **Deferred updates** - Keep UI responsive
✅ **Input immediately** - Input updates right away
✅ **Results delayed** - Results update after
✅ **Better UX** - Feels faster and more responsive

---

## 1️⃣2️⃣ useImperativeHandle Hook

### What is it?

`useImperativeHandle` customizes the instance value exposed by a ref.

### Signature

```jsx
useImperativeHandle(ref, () => ({
  // methods to expose
}), [dependencies]);
```

### Example

```jsx
import { useImperativeHandle, useRef, forwardRef } from 'react';

const TextInput = forwardRef(function TextInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
    clear() {
      inputRef.current.value = '';
    }
  }), []);

  return <input ref={inputRef} />;
});

export function App() {
  const inputRef = useRef(null);

  return (
    <>
      <TextInput ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
      <button onClick={() => inputRef.current?.clear()}>Clear</button>
    </>
  );
}
```

### Key Points

✅ **Custom ref** - Expose custom methods
✅ **Encapsulation** - Hide internal details
✅ **Imperative** - Call methods on ref
✅ **Advanced** - Use sparingly

---

## 1️⃣3️⃣ React 19 New Hooks

### useActionState (Already Covered)
### useFormStatus (Already Covered)
### useOptimistic (Already Covered)
### use() Hook (Already Covered)

---

## Hooks Comparison Table

| Hook | Purpose | When to Use | Returns |
|------|---------|------------|---------|
| **useState** | State management | Simple state | [state, setState] |
| **useEffect** | Side effects | Data fetching, subscriptions | void |
| **useContext** | Share state | Avoid prop drilling | context value |
| **useReducer** | Complex state | Multiple related values | [state, dispatch] |
| **useCallback** | Memoize function | Pass to optimized children | memoized function |
| **useMemo** | Memoize value | Expensive computations | memoized value |
| **useRef** | Mutable reference | DOM access, store values | ref object |
| **useLayoutEffect** | Sync side effects | DOM measurements | void |
| **useId** | Generate IDs | Accessibility | unique ID |
| **useTransition** | Non-urgent updates | Keep UI responsive | [isPending, startTransition] |
| **useDeferredValue** | Defer value | Responsive input | deferred value |
| **useImperativeHandle** | Custom ref | Expose methods | void |

---

# 🎯 DAY 1: React 19 Fundamentals

## What's New in React 19?

React 19 introduces several major improvements that change how we build React applications:

### 1. **React Compiler** - Automatic Optimization
### 2. **Server Components** - First-class support
### 3. **Server Actions** - Simplified async operations
### 4. **New Hooks** - useActionState, useFormStatus, useOptimistic, use()
### 5. **Ref as Prop** - No more forwardRef needed
### 6. **Hydration Improvements** - Better SSR support

---

## 1️⃣ React Compiler (Automatic Memoization)

### What is it?

The React Compiler is an automatic optimization tool that:
- **Memoizes components** without manual React.memo
- **Memoizes values** without useMemo
- **Memoizes callbacks** without useCallback
- **Optimizes dependency tracking** automatically
- **Reduces unnecessary re-renders** intelligently

### Why it matters?

**Before React 19** - Manual optimization required:
```jsx
// ❌ Before: Had to manually memoize everything
import { useMemo, useCallback, memo } from 'react';

const SearchResults = memo(({ query, results }) => {
  const filteredResults = useMemo(() => 
    results.filter(r => r.title.toLowerCase().includes(query.toLowerCase())),
    [results, query]
  );

  const handleFilter = useCallback((text) => {
    console.log('Filtering:', text);
  }, []);

  return (
    <div>
      <ResultsList items={filteredResults} onFilter={handleFilter} />
    </div>
  );
});
```

**React 19** - Compiler handles it automatically:
```jsx
// ✅ After: Compiler optimizes automatically
import { useState } from 'react';

export function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // React Compiler automatically memoizes this
  const filteredResults = results.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  // React Compiler automatically memoizes this callback
  const handleFilter = (text) => {
    console.log('Filtering:', text);
  };

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ResultsList items={filteredResults} onFilter={handleFilter} />
    </div>
  );
}
```

### Key Benefits

| Aspect | Before React 19 | React 19 |
|--------|-----------------|---------|
| **Memoization** | Manual with useMemo | Automatic |
| **Callbacks** | Manual with useCallback | Automatic |
| **Components** | Manual with React.memo | Automatic |
| **Boilerplate** | High | Low |
| **Performance** | Good (if done right) | Excellent (always) |
| **Learning Curve** | Steep | Gentle |

### When to use React Compiler

✅ **Always** - It's enabled by default in React 19
✅ **No configuration needed** - Just write normal code
✅ **No performance penalty** - Only optimizes

---

## 2️⃣ Ref as Prop (No forwardRef)

### What is it?

In React 19, you can pass refs directly as props without using `forwardRef`.

### Why it matters?

**Before React 19** - forwardRef was required:
```jsx
// ❌ Before: Had to use forwardRef
import { forwardRef, useRef } from 'react';

const TextInput = forwardRef(({ placeholder }, ref) => (
  <input ref={ref} placeholder={placeholder} />
));

// Usage
export function App() {
  const inputRef = useRef(null);
  
  return (
    <>
      <TextInput ref={inputRef} placeholder="Type here..." />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  );
}
```

**React 19** - Refs are just props:
```jsx
// ✅ After: Refs are just props
function TextInput({ ref, placeholder }) {
  return <input ref={ref} placeholder={placeholder} />;
}

// Usage
import { useRef } from 'react';

export function App() {
  const inputRef = useRef(null);
  
  return (
    <>
      <TextInput ref={inputRef} placeholder="Type here..." />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  );
}
```

### Comparison Table

| Feature | Before React 19 | React 19 |
|---------|-----------------|---------|
| **Syntax** | forwardRef wrapper | Direct prop |
| **Boilerplate** | Extra wrapper | None |
| **Readability** | Less clear | More clear |
| **Performance** | Same | Same |
| **Learning Curve** | Steep | Gentle |

### Key Benefits

✅ **Simpler code** - No wrapper needed
✅ **More intuitive** - Refs are just props
✅ **Less boilerplate** - Fewer lines of code
✅ **Better readability** - Easier to understand

---

## 3️⃣ useActionState Hook (Form Handling)

### What is it?

`useActionState` is a new hook that simplifies form handling by managing form state and submission status automatically.

### Signature

```jsx
const [state, formAction, isPending] = useActionState(serverAction, initialState);
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| **serverAction** | async function | Function that handles form submission |
| **initialState** | any | Initial state value |
| **state** | any | Current state (returned from serverAction) |
| **formAction** | function | Pass to form's action prop |
| **isPending** | boolean | True while form is submitting |

### Why it matters?

**Before React 19** - Manual state management:
```jsx
// ❌ Before: Had to manage state manually
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        setError('Login failed');
        return;
      }
      
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Logged in!</p>}
    </form>
  );
}
```

**React 19** - Simplified with useActionState:
```jsx
// ✅ After: useActionState handles everything
import { useActionState } from 'react';

async function loginAction(previousState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      return { error: 'Login failed', success: false };
    }

    return { error: null, success: true, message: 'Logged in!' };
  } catch (error) {
    return { error: error.message, success: false };
  }
}

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: null,
    success: false
  });

  return (
    <form action={formAction}>
      <input 
        type="email" 
        name="email"
        required 
        disabled={isPending}
      />
      <input 
        type="password" 
        name="password"
        required 
        disabled={isPending}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state?.success && <p style={{ color: 'green' }}>{state.message}</p>}
    </form>
  );
}
```

### Comparison Table

| Aspect | Before React 19 | React 19 |
|--------|-----------------|---------|
| **State Management** | Manual (5+ useState) | Automatic (1 hook) |
| **Form Handling** | Manual onSubmit | Automatic with action |
| **Loading State** | Manual | Automatic (isPending) |
| **Error Handling** | Manual | Automatic (state) |
| **Code Lines** | ~50 lines | ~20 lines |
| **Boilerplate** | High | Low |

### Key Benefits

✅ **Less code** - No manual state management
✅ **Automatic loading state** - isPending handled
✅ **Better UX** - Form disabled while submitting
✅ **Cleaner logic** - Separation of concerns
✅ **Progressive enhancement** - Works without JavaScript

---

## 4️⃣ useFormStatus Hook

### What is it?

`useFormStatus` is a hook that gives you access to the status of a form submission from within a child component.

### Why it matters?

**Before React 19** - Had to pass props down:
```jsx
// ❌ Before: Had to pass loading state as prop
export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // ... submit logic
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" disabled={loading} />
      <SubmitButton loading={loading} />
    </form>
  );
}

function SubmitButton({ loading }) {
  return (
    <button disabled={loading}>
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  );
}
```

**React 19** - Access status directly:
```jsx
// ✅ After: useFormStatus accesses status directly
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

export function LoginForm() {
  async function handleSubmit(formData) {
    const email = formData.get('email');
    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }

  return (
    <form action={handleSubmit}>
      <input type="email" name="email" />
      <SubmitButton />
    </form>
  );
}
```

### useFormStatus Properties

| Property | Type | Description |
|----------|------|-------------|
| **pending** | boolean | True while form is submitting |
| **data** | FormData | Form data being submitted |
| **method** | string | HTTP method (GET, POST, etc.) |
| **action** | function | The action being called |

### Key Benefits

✅ **No prop drilling** - Access status directly
✅ **Cleaner components** - Less prop passing
✅ **Better separation** - Button doesn't need to know about form
✅ **Reusable** - Same button works with any form

---

## 5️⃣ useOptimistic Hook (Optimistic Updates)

### What is it?

`useOptimistic` allows you to update the UI optimistically before the server responds, then revert if the operation fails.

### Why it matters?

**Before React 19** - Manual optimistic updates:
```jsx
// ❌ Before: Had to manage optimistic state manually
import { useState } from 'react';

export function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [loading, setLoading] = useState(false);

  const handleAddTodo = async (text) => {
    // Optimistically add
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        // Revert on error
        setTodos(initialTodos);
      }
    } catch (error) {
      // Revert on error
      setTodos(initialTodos);
    }
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

**React 19** - Automatic with useOptimistic:
```jsx
// ✅ After: useOptimistic handles everything
import { useOptimistic } from 'react';

export function TodoList({ initialTodos }) {
  const [todos, setTodos] = useOptimistic(initialTodos);

  async function handleAddTodo(formData) {
    const text = formData.get('todo');
    
    // Optimistically add
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);

    // Send to server
    try {
      await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text })
      });
    } catch (error) {
      // Automatically reverts on error
      setTodos(initialTodos);
    }
  }

  return (
    <form action={handleAddTodo}>
      <input type="text" name="todo" />
      <button type="submit">Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </form>
  );
}
```

### Comparison Table

| Aspect | Before React 19 | React 19 |
|--------|-----------------|---------|
| **Optimistic Update** | Manual | Automatic |
| **Revert on Error** | Manual | Automatic |
| **Code Complexity** | High | Low |
| **User Experience** | Good | Excellent |
| **Error Handling** | Manual | Automatic |

### Key Benefits

✅ **Better UX** - Instant feedback to users
✅ **Automatic revert** - No manual error handling
✅ **Less code** - Simpler implementation
✅ **Faster perceived performance** - No waiting for server

---

## 6️⃣ use() Hook (Promise Unwrapping)

### What is it?

The `use()` hook allows you to unwrap promises directly in components, working seamlessly with Suspense.

### Why it matters?

**Before React 19** - Complex promise handling:
```jsx
// ❌ Before: Had to handle promises manually
import { useState, useEffect } from 'react';

async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchUser(userId)
      .then(data => {
        if (isMounted) setUser(data);
      })
      .catch(err => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

**React 19** - Simple with use() hook:
```jsx
// ✅ After: use() unwraps promises automatically
import { use, Suspense } from 'react';

async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

function UserProfile({ userId }) {
  // Unwrap promise directly
  const user = use(fetchUser(userId));

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile userId={1} />
    </Suspense>
  );
}
```

### Comparison Table

| Aspect | Before React 19 | React 19 |
|--------|-----------------|---------|
| **Promise Handling** | Manual with useEffect | Automatic with use() |
| **Loading State** | Manual | Suspense |
| **Error Handling** | Manual | Error boundary |
| **Code Lines** | ~30 lines | ~10 lines |
| **Readability** | Complex | Simple |

### Key Benefits

✅ **Simpler code** - No useEffect needed
✅ **Better with Suspense** - Works seamlessly
✅ **Cleaner logic** - Focus on data, not loading
✅ **Less boilerplate** - Fewer lines of code

---

## Summary: React 19 Fundamentals

| Feature | Purpose | Benefit |
|---------|---------|---------|
| **React Compiler** | Automatic optimization | No manual memoization needed |
| **Ref as Prop** | Pass refs directly | No forwardRef wrapper |
| **useActionState** | Form handling | Simplified form management |
| **useFormStatus** | Form status access | No prop drilling |
| **useOptimistic** | Optimistic updates | Better UX |
| **use()** | Promise unwrapping | Simpler async code |

---

# 🎯 DAY 2: React 19 Advanced Hooks

## Overview

Day 2 covers advanced React 19 hooks and patterns that build on the fundamentals.

### Topics

1. **useContext** - State sharing without props
2. **useReducer** - Complex state management
3. **useEffect** - Side effects and cleanup
4. **Custom Hooks** - Reusable logic
5. **useCallback & useMemo** - Performance (still useful)

---

## 1️⃣ useContext Hook

### What is it?

`useContext` allows you to share state across components without prop drilling.

### Why it matters?

**Problem: Prop Drilling**
```jsx
// ❌ Props passed through many levels
function App() {
  const [theme, setTheme] = useState('light');
  return <Header theme={theme} setTheme={setTheme} />;
}

function Header({ theme, setTheme }) {
  return <Navigation theme={theme} setTheme={setTheme} />;
}

function Navigation({ theme, setTheme }) {
  return <UserMenu theme={theme} setTheme={setTheme} />;
}

function UserMenu({ theme, setTheme }) {
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Toggle Theme
  </button>;
}
```

**Solution: useContext**
```jsx
// ✅ Context provides direct access
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function UserMenu() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Navigation />
      <UserMenu />
    </ThemeProvider>
  );
}
```

### Comparison Table

| Aspect | Prop Drilling | useContext |
|--------|---------------|-----------|
| **Prop Passing** | Through all levels | Direct access |
| **Code Clarity** | Confusing | Clear |
| **Maintenance** | Hard | Easy |
| **Performance** | Good | Good |
| **Use Case** | Simple apps | Any app |

---

## 2️⃣ useReducer Hook

### What is it?

`useReducer` is for managing complex state with multiple related values and complex update logic.

### Why it matters?

**When to use useReducer:**
- Multiple related state values
- Complex update logic
- State depends on previous state
- Want to optimize performance

### Example: Todo App with useReducer

```jsx
import { useReducer } from 'react';

// Action types
const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  SET_FILTER: 'SET_FILTER'
};

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    
    case ACTIONS.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      };
    
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload
            ? { ...t, completed: !t.completed }
            : t
        )
      };
    
    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    
    default:
      return state;
  }
}

// Initial state
const initialState = {
  todos: [],
  filter: 'all'
};

// Component
export function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleAddTodo = (text) => {
    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: { id: Date.now(), text, completed: false }
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: ACTIONS.TOGGLE_TODO,
      payload: id
    });
  };

  const handleRemoveTodo = (id) => {
    dispatch({
      type: ACTIONS.REMOVE_TODO,
      payload: id
    });
  };

  return (
    <div>
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => handleRemoveTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <AddTodoForm onAdd={handleAddTodo} />
    </div>
  );
}
```

### Comparison Table

| Aspect | useState | useReducer |
|--------|----------|-----------|
| **Simple State** | ✅ Good | ❌ Overkill |
| **Complex State** | ❌ Messy | ✅ Good |
| **Multiple Values** | ❌ Many hooks | ✅ One hook |
| **Update Logic** | ❌ Scattered | ✅ Centralized |
| **Testing** | ❌ Hard | ✅ Easy |
| **Learning Curve** | ✅ Easy | ❌ Steep |

---

## 3️⃣ useEffect Hook (Advanced)

### What is it?

`useEffect` runs side effects after render and handles cleanup.

### Why it matters?

**Common Mistakes:**

```jsx
// ❌ Missing dependency array - runs every render
useEffect(() => {
  fetchData();
});

// ❌ Empty dependency array - never updates
useEffect(() => {
  setData(fetchedData);
}, []);

// ✅ Correct - runs when dependencies change
useEffect(() => {
  fetchData();
}, [userId]);
```

### Proper Cleanup Pattern

```jsx
import { useEffect, useState } from 'react';

export function DataFetcher({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const json = await response.json();
        
        // Only update if component is still mounted
        if (isMounted) {
          setData(json);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{data?.name}</div>;
}
```

### Key Points

✅ **Always cleanup** - Prevent memory leaks
✅ **Check isMounted** - Avoid state updates on unmounted components
✅ **Correct dependencies** - Include all used values
✅ **One effect per concern** - Separate effects for different logic

---

## 4️⃣ Custom Hooks

### What is it?

Custom hooks are functions that use React hooks to extract reusable logic.

### Why it matters?

**Before Custom Hooks** - Logic scattered:
```jsx
// ❌ Same logic in multiple components
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then(r => r.json())
      .then(data => setUser(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  // ... component logic
}

function UserList() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(data => setUsers(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  // ... component logic
}
```

**After Custom Hooks** - Reusable logic:
```jsx
// ✅ Custom hook extracts logic
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const json = await response.json();
        
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile() {
  const { data: user, loading, error } = useFetch('/api/user');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{user?.name}</div>;
}

function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Benefits of Custom Hooks

✅ **DRY** - Don't Repeat Yourself
✅ **Reusable** - Use across components
✅ **Testable** - Easy to test logic
✅ **Maintainable** - Update logic in one place
✅ **Composable** - Combine multiple hooks

---

## 5️⃣ useCallback & useMemo (Still Useful)

### When to use them?

Even with React Compiler, these are still useful for:
- Passing callbacks to optimized child components
- Expensive computations
- Preventing unnecessary re-renders in specific cases

### useCallback Example

```jsx
import { useCallback, useState } from 'react';

export function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback, this function is recreated every render
  // With useCallback, it's only recreated when dependencies change
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onButtonClick={handleClick} />
    </div>
  );
}

function Child({ onButtonClick }) {
  console.log('Child rendered');
  return <button onClick={onButtonClick}>Child Button</button>;
}
```

### useMemo Example

```jsx
import { useMemo, useState } from 'react';

export function DataProcessor({ items }) {
  const [filter, setFilter] = useState('');

  // Only recalculate when items or filter changes
  const processedData = useMemo(() => {
    console.log('Processing data...');
    return items
      .filter(item => item.name.includes(filter))
      .map(item => ({
        ...item,
        processed: item.value * 2
      }));
  }, [items, filter]);

  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter..."
      />
      <ul>
        {processedData.map(item => (
          <li key={item.id}>{item.name}: {item.processed}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Summary: Day 2

| Hook | Purpose | When to Use |
|------|---------|------------|
| **useContext** | Share state | Avoid prop drilling |
| **useReducer** | Complex state | Multiple related values |
| **useEffect** | Side effects | Data fetching, subscriptions |
| **Custom Hooks** | Reusable logic | Extract common patterns |
| **useCallback** | Memoize functions | Pass to optimized children |
| **useMemo** | Memoize values | Expensive computations |

---

# 🎯 DAY 3: Server Components & Actions

## What are Server Components?

Server Components are React components that run exclusively on the server, never on the client.

### Why it matters?

**Before Server Components** - Everything on client:
```jsx
// ❌ Before: All data fetching on client
import { useState, useEffect } from 'react';

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

**With Server Components** - Data fetching on server:
```jsx
// ✅ After: Data fetching on server
async function UserProfile({ userId }) {
  const response = await fetch(`/api/users/${userId}`);
  const user = await response.json();

  return <div>{user.name}</div>;
}
```

### Key Benefits

| Aspect | Before | After |
|--------|--------|-------|
| **Data Fetching** | Client-side | Server-side |
| **Bundle Size** | Large | Small |
| **Security** | Exposed tokens | Hidden |
| **Performance** | Slower | Faster |
| **Complexity** | High | Low |

---

## Server Actions

### What is it?

Server Actions are async functions that run on the server and can be called from client components.

### Why it matters?

**Before Server Actions** - Manual API routes:
```jsx
// ❌ Before: Had to create API routes
// pages/api/todos.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;
    const todo = await db.todos.create({ text });
    res.json(todo);
  }
}

// components/TodoForm.jsx
import { useState } from 'react';

export function TodoForm() {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text })
    });
    const todo = await response.json();
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
```

**With Server Actions** - Direct function calls:
```jsx
// ✅ After: Server Actions handle everything
'use server';

import { db } from '@/lib/db';

export async function addTodo(formData) {
  const text = formData.get('text');
  const todo = await db.todos.create({ text });
  return todo;
}

// components/TodoForm.jsx
'use client';

import { addTodo } from '@/app/actions';

export function TodoForm() {
  return (
    <form action={addTodo}>
      <input name="text" placeholder="Add a todo..." />
      <button type="submit">Add</button>
    </form>
  );
}
```

### Comparison Table

| Aspect | Before | After |
|--------|--------|-------|
| **API Routes** | Manual | Automatic |
| **Boilerplate** | High | Low |
| **Type Safety** | Manual | Automatic |
| **Error Handling** | Manual | Automatic |
| **Code Lines** | ~30 lines | ~10 lines |

---

## Mixing Server & Client Components

### Pattern: Server Component with Client Children

```jsx
// app/page.jsx (Server Component)
import { ClientComponent } from '@/components/ClientComponent';

async function getUsers() {
  const response = await fetch('https://api.example.com/users');
  return response.json();
}

export default async function Page() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <ClientComponent users={users} />
    </div>
  );
}

// components/ClientComponent.jsx (Client Component)
'use client';

import { useState } from 'react';

export function ClientComponent({ users }) {
  const [filter, setFilter] = useState('');

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter users..."
      />
      <ul>
        {filtered.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Key Points

✅ **Server Components** - Data fetching, database access
✅ **Client Components** - Interactivity, state, hooks
✅ **Mix them** - Best of both worlds
✅ **Pass data** - Server to client via props

---

# 🎯 DAY 4: Next.js 15 Features

## App Router

### What is it?

The App Router is Next.js's new file-based routing system using the `app` directory.

### Why it matters?

**Before App Router** - Pages directory:
```
pages/
  index.js
  about.js
  blog/
    [id].js
```

**With App Router** - App directory:
```
app/
  page.jsx
  about/
    page.jsx
  blog/
    [id]/
      page.jsx
```

### File Structure

| File | Purpose |
|------|---------|
| **page.jsx** | Route page |
| **layout.jsx** | Shared layout |
| **error.jsx** | Error boundary |
| **loading.jsx** | Loading UI |
| **not-found.jsx** | 404 page |

### Example: Blog Post Page

```jsx
// app/blog/[id]/page.jsx
export default function BlogPost({ params }) {
  return (
    <article>
      <h1>Blog Post {params.id}</h1>
      <p>Content here...</p>
    </article>
  );
}
```

---

## API Routes

### What is it?

API Routes allow you to create API endpoints in Next.js.

### Example

```jsx
// app/api/todos/route.js
export async function GET() {
  const todos = await db.todos.findAll();
  return Response.json(todos);
}

export async function POST(request) {
  const { text } = await request.json();
  const todo = await db.todos.create({ text });
  return Response.json(todo);
}
```

---

## Middleware

### What is it?

Middleware runs before requests are processed.

### Example

```jsx
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check authentication
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
```

---

# 🎯 DAY 5: Performance & Optimization

## Image Optimization

### What is it?

Next.js automatically optimizes images for performance.

### Example

```jsx
import Image from 'next/image';

export function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={600}
      priority
    />
  );
}
```

### Benefits

✅ **Automatic resizing** - Responsive images
✅ **Format conversion** - WebP, AVIF
✅ **Lazy loading** - Load on demand
✅ **Placeholder** - Blur while loading

---

## Code Splitting

### What is it?

Next.js automatically splits code into smaller chunks.

### Dynamic Imports

```jsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Loading...</div>
});

export function Page() {
  return <HeavyComponent />;
}
```

---

## Caching Strategies

### What is it?

Next.js provides multiple caching layers for performance.

### Types

| Type | Duration | Use Case |
|------|----------|----------|
| **Request** | Per request | Deduplication |
| **Data** | Per build | Static data |
| **Full Route** | Per build | Static pages |
| **Dynamic** | Per request | Real-time data |

---

# 🎯 DAY 6: Real-world Patterns

## Authentication Pattern

### What is it?

A complete authentication flow with Next.js.

### Example

```jsx
// lib/auth.js
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyAuth(token) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (err) {
    return null;
  }
}

// middleware.js
import { verifyAuth } from '@/lib/auth';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const user = await verifyAuth(token);

  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
```

---

## Error Handling Pattern

### What is it?

Proper error handling in Next.js applications.

### Example

```jsx
// app/error.jsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

// app/page.jsx
export default async function Page() {
  const data = await fetch('/api/data');
  
  if (!data.ok) {
    throw new Error('Failed to fetch data');
  }

  return <div>{/* content */}</div>;
}
```

---

## Form Validation Pattern

### What is it?

Client and server-side form validation.

### Example

```jsx
// lib/validation.js
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  return password.length >= 8;
}

// app/register/page.jsx
'use client';

import { useState } from 'react';
import { validateEmail, validatePassword } from '@/lib/validation';

export default function Register() {
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Invalid email';
    if (!validatePassword(password)) newErrors.password = 'Password too short';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" />
      {errors.email && <p>{errors.email}</p>}
      
      <input name="password" type="password" />
      {errors.password && <p>{errors.password}</p>}
      
      <button type="submit">Register</button>
    </form>
  );
}
```

---

# 🎯 DAY 7: Interview Q&A & Practice

## 10 Common Interview Questions

### 1. What's the difference between Server Components and Client Components?

**Answer:**
- **Server Components**: Run on server, no interactivity, smaller bundle
- **Client Components**: Run on browser, interactive, use hooks

### 2. How does React Compiler improve performance?

**Answer:**
- Automatically memoizes components, values, and callbacks
- Eliminates need for manual useMemo, useCallback, React.memo
- Reduces unnecessary re-renders

### 3. What are Server Actions and why use them?

**Answer:**
- Async functions that run on server
- Can be called from client components
- Eliminate need for manual API routes
- Better security (tokens hidden)

### 4. Explain useActionState hook

**Answer:**
- Manages form state and submission status
- Returns [state, formAction, isPending]
- Simplifies form handling
- Works with Server Actions

### 5. What's the benefit of Ref as Prop in React 19?

**Answer:**
- No need for forwardRef wrapper
- Refs are just props
- Simpler, more intuitive code
- Less boilerplate

### 6. How do you handle data fetching in Server Components?

**Answer:**
```jsx
async function Page() {
  const data = await fetch('/api/data');
  const json = await data.json();
  return <div>{json}</div>;
}
```

### 7. What's the difference between useEffect and useLayoutEffect?

**Answer:**
- **useEffect**: Runs after paint (async)
- **useLayoutEffect**: Runs before paint (sync)
- Use useLayoutEffect for DOM measurements

### 8. How do you optimize images in Next.js?

**Answer:**
- Use Image component
- Automatic resizing and format conversion
- Lazy loading by default
- Blur placeholder support

### 9. Explain the App Router file structure

**Answer:**
- `page.jsx` - Route page
- `layout.jsx` - Shared layout
- `error.jsx` - Error boundary
- `loading.jsx` - Loading UI
- `[id]` - Dynamic routes

### 10. What's useOptimistic hook used for?

**Answer:**
- Optimistic UI updates
- Update UI before server responds
- Automatically revert on error
- Better perceived performance

---

## 15 Practice Questions

### Easy

1. What does useState return?
2. How do you pass data from Server Component to Client Component?
3. What's the purpose of useRef?
4. How do you create a context?
5. What's the difference between useCallback and useMemo?

### Medium

6. How do you handle errors in Server Components?
7. Explain the cleanup function in useEffect
8. What's the purpose of middleware in Next.js?
9. How do you create a custom hook?
10. What's the difference between Server Actions and API routes?

### Hard

11. Design a complete authentication system with Next.js
12. Optimize a large list rendering with 10,000 items
13. Implement a real-time notification system
14. Design a caching strategy for a blog application
15. Create a form with client and server-side validation

---

## Mock Interview Scenario

### Scenario: Build a Todo App

**Requirements:**
- Add, delete, toggle todos
- Persist to database
- Real-time updates
- Optimistic UI
- Error handling

**Solution:**

```jsx
// app/actions.js
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData) {
  const text = formData.get('text');
  const todo = await db.todos.create({ text });
  revalidatePath('/');
  return todo;
}

export async function deleteTodo(id) {
  await db.todos.delete(id);
  revalidatePath('/');
}

export async function toggleTodo(id) {
  const todo = await db.todos.findById(id);
  await db.todos.update(id, { completed: !todo.completed });
  revalidatePath('/');
}

// app/page.jsx
import { addTodo, deleteTodo, toggleTodo } from '@/app/actions';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';

async function getTodos() {
  const todos = await db.todos.findAll();
  return todos;
}

export default async function Page() {
  const todos = await getTodos();

  return (
    <div>
      <h1>Todos</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList 
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
}

// components/TodoList.jsx
'use client';

import { useOptimistic } from 'react';

export function TodoList({ todos, onDelete, onToggle }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos);

  const handleToggle = async (id) => {
    addOptimisticTodo(
      optimisticTodos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
    await onToggle(id);
  };

  const handleDelete = async (id) => {
    addOptimisticTodo(optimisticTodos.filter(t => t.id !== id));
    await onDelete(id);
  };

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo.id)}
          />
          <span>{todo.text}</span>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---

## Final Tips for Interview

✅ **Understand the why** - Not just the how
✅ **Know the trade-offs** - Every solution has pros and cons
✅ **Practice coding** - Write code, don't just read
✅ **Ask questions** - Clarify requirements
✅ **Think out loud** - Explain your thought process
✅ **Test your code** - Make sure it works
✅ **Optimize** - Discuss performance improvements
✅ **Handle errors** - Don't forget edge cases

---

## Resources for Further Learning

### Official Documentation
- React 19: https://react.dev
- Next.js 15: https://nextjs.org/docs
- React Compiler: https://react.dev/learn/react-compiler

### Practice Platforms
- LeetCode - Algorithm practice
- CodeSignal - Coding interviews
- Frontend Masters - Video courses
- Egghead.io - React tutorials

### Key Concepts to Master
1. React fundamentals (hooks, components, state)
2. Server Components and Actions
3. Performance optimization
4. Error handling and validation
5. Authentication and security
6. Database integration
7. Testing and debugging

---

## Conclusion

You now have a comprehensive guide covering:
- ✅ All React hooks with examples
- ✅ React 19 new features
- ✅ Next.js 15 fundamentals
- ✅ Real-world patterns
- ✅ Interview questions and practice
- ✅ Complete code examples

**Good luck with your interview! 🚀**

Remember: Practice makes perfect. Code along with the examples, build small projects, and review the concepts regularly. You've got this! 💪
