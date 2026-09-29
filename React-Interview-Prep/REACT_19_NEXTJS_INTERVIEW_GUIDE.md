# 🚀 React 19 & Next.js 15 - Complete Interview Prep Guide

## 📋 Table of Contents

1. [7-Day Study Plan](#7-day-study-plan)
2. [Day 1: React 19 Fundamentals](#day-1-react-19-fundamentals)
3. [Day 2: React 19 Advanced Hooks](#day-2-react-19-advanced-hooks)
4. [Day 3: Server Components & Actions](#day-3-server-components--actions)
5. [Day 4: Next.js 15 Features](#day-4-nextjs-15-features)
6. [Day 5: Performance & Optimization](#day-5-performance--optimization)
7. [Day 6: Real-world Patterns](#day-6-real-world-patterns)
8. [Day 7: Interview Q&A](#day-7-interview-qa)

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

## Overview

Server Components and Server Actions are fundamental to modern Next.js development.

### Topics

1. **Server Components** - Run on server only
2. **Client Components** - Run in browser
3. **Server Actions** - Async functions on server
4. **Mixing Server & Client** - Best practices
5. **Revalidation** - Cache invalidation

---

## 1️⃣ Server Components

### What is it?

Server Components run only on the server and send HTML to the browser.

### Why it matters?

**Benefits:**
- ✅ No JavaScript sent to browser
- ✅ Direct database access
- ✅ Keep secrets safe
- ✅ Better performance
- ✅ Reduced bundle size

### Example

```jsx
// app/users/page.jsx - Server Component (default)
import { db } from '@/lib/db';

export default async function UsersPage() {
  // This runs on the server only
  const users = await db.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Comparison Table

| Aspect | Server Component | Client Component |
|--------|-----------------|-----------------|
| **Runs on** | Server | Browser |
| **JavaScript** | None sent | Sent to browser |
| **Database Access** | ✅ Direct | ❌ Via API |
| **Secrets** | ✅ Safe | ❌ Exposed |
| **Hooks** | ❌ No | ✅ Yes |
| **Interactivity** | ❌ No | ✅ Yes |
| **Performance** | ✅ Better | ❌ Slower |

---

## 2️⃣ Client Components

### What is it?

Client Components run in the browser and can use React hooks.

### When to use

- ✅ Need interactivity (onClick, onChange, etc.)
- ✅ Need React hooks (useState, useEffect, etc.)
- ✅ Need browser APIs (localStorage, window, etc.)

### Example

```jsx
// app/components/Counter.jsx - Client Component
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## 3️⃣ Server Actions

### What is it?

Server Actions are async functions that run on the server and can be called from Client Components.

### Why it matters?

**Before Server Actions** - Manual API routes:
```jsx
// ❌ Before: Had to create API route
// app/api/todos/route.js
export async function POST(request) {
  const body = await request.json();
  const todo = await db.todo.create({ data: body });
  return Response.json(todo);
}

// app/components/AddTodoForm.jsx
'use client';
import { useState } from 'react';

export function AddTodoForm() {
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

**After Server Actions** - Direct function calls:
```jsx
// ✅ After: Server Action handles everything
// app/actions/todos.js
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData) {
  const text = formData.get('text');
  
  const todo = await db.todo.create({
    data: { text }
  });
  
  revalidatePath('/todos');
  return todo;
}

// app/components/AddTodoForm.jsx
'use client';

import { useActionState } from 'react';
import { addTodo } from '@/app/actions/todos';

export function AddTodoForm() {
  const [state, formAction, isPending] = useActionState(addTodo, null);

  return (
    <form action={formAction}>
      <input type="text" name="text" required disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
```

### Comparison Table

| Aspect | API Routes | Server Actions |
|--------|-----------|-----------------|
| **Setup** | Create route file | Create action file |
| **Calling** | fetch() | Direct function call |
| **Boilerplate** | High | Low |
| **Error Handling** | Manual | Automatic |
| **Revalidation** | Manual | Built-in |
| **Type Safety** | Manual | Automatic |

---

## 4️⃣ Mixing Server & Client Components

### Best Practice Pattern

```jsx
// app/dashboard/page.jsx - Server Component
import { db } from '@/lib/db';
import { DashboardClient } from './DashboardClient';

export default async function DashboardPage() {
  // Fetch data on server
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { todos: true }
  });

  // Pass data to Client Component
  return <DashboardClient user={user} initialTodos={user.todos} />;
}

// app/dashboard/DashboardClient.jsx - Client Component
'use client';

import { useState } from 'react';
import { addTodo } from '@/app/actions/todos';

export function DashboardClient({ user, initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = async (formData) => {
    const text = formData.get('text');
    const newTodo = await addTodo(text);
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <TodoList todos={todos} />
      <AddTodoForm onAdd={handleAddTodo} />
    </div>
  );
}
```

### Benefits

✅ **Server fetches data** - Faster, more secure
✅ **Client handles interactivity** - Better UX
✅ **Minimal JavaScript** - Smaller bundle
✅ **Best of both worlds** - Performance + Interactivity

---

## 5️⃣ Revalidation

### What is it?

Revalidation invalidates cached data so it's fetched fresh from the server.

### Types of Revalidation

**Time-based (ISR):**
```jsx
// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Page() {
  const data = await fetch('/api/data', {
    next: { revalidate: 60 }
  });
  return <div>{data}</div>;
}
```

**On-demand:**
```jsx
// app/actions/revalidate.js
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function revalidateTodos() {
  revalidatePath('/todos');
}

export async function revalidateByTag() {
  revalidateTag('todos');
}
```

---

## Summary: Day 3

| Concept | Purpose | Use Case |
|---------|---------|----------|
| **Server Components** | Run on server | Data fetching |
| **Client Components** | Run in browser | Interactivity |
| **Server Actions** | Async on server | Form submission |
| **Mixing** | Best of both | Complete apps |
| **Revalidation** | Refresh cache | Keep data fresh |

---

# 🎯 DAY 4: Next.js 15 Features

## Overview

Next.js 15 builds on Next.js 14 with improved performance and developer experience.

### Topics

1. **App Router** - File-based routing
2. **Dynamic Routes** - [slug] and [...slug]
3. **API Routes** - GET, POST, PUT, DELETE
4. **Middleware** - Request interception
5. **Image Optimization** - Automatic optimization
6. **Font Optimization** - Google Fonts
7. **Metadata API** - SEO optimization
8. **ISR & Streaming** - Performance

---

## 1️⃣ App Router

### File Structure

```
app/
├── layout.jsx                    # Root layout
├── page.jsx                      # / (home)
├── error.jsx                     # Error boundary
├── not-found.jsx                 # 404 page
├── loading.jsx                   # Loading state
│
├── blog/
│   ├── page.jsx                  # /blog
│   ├── layout.jsx                # Blog layout
│   └── [slug]/
│       ├── page.jsx              # /blog/:slug
│       └── layout.jsx            # Post layout
│
├── api/
│   ├── users/
│   │   ├── route.js              # GET/POST /api/users
│   │   └── [id]/
│   │       └── route.js          # GET/PUT/DELETE /api/users/:id
│   └── auth/
│       └── route.js              # /api/auth
│
└── actions/
    ├── auth.js                   # Auth server actions
    ├── todos.js                  # Todo server actions
    └── users.js                  # User server actions
```

### Key Features

✅ **File-based routing** - No configuration needed
✅ **Nested layouts** - Shared UI
✅ **Dynamic routes** - [slug] syntax
✅ **Catch-all routes** - [...slug] syntax
✅ **Route groups** - (group) syntax
✅ **Parallel routes** - @slot syntax

---

## 2️⃣ Dynamic Routes

### Basic Dynamic Route

```jsx
// app/blog/[slug]/page.jsx
export default function BlogPost({ params }) {
  return <h1>Blog Post: {params.slug}</h1>;
}
```

### Generate Static Params

```jsx
// app/blog/[slug]/page.jsx
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
    .then(r => r.json());
  
  return posts.map(post => ({
    slug: post.slug
  }));
}

export default function BlogPost({ params }) {
  return <h1>Blog Post: {params.slug}</h1>;
}
```

### Catch-All Routes

```jsx
// app/docs/[[...slug]]/page.jsx
export default function DocsPage({ params }) {
  const slug = params.slug?.join('/') || 'index';
  return <h1>Documentation: {slug}</h1>;
}

// Matches:
// /docs
// /docs/guide
// /docs/guide/setup
// /docs/guide/setup/installation
```

---

## 3️⃣ API Routes

### GET Request

```jsx
// app/api/users/route.js
import { db } from '@/lib/db';

export async function GET(request) {
  try {
    const users = await db.user.findMany();
    return Response.json(users);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### POST Request

```jsx
// app/api/users/route.js
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate
    if (!body.name || !body.email) {
      return Response.json(
        { error: 'Name and email required' },
        { status: 400 }
      );
    }
    
    const user = await db.user.create({ data: body });
    return Response.json(user, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### Dynamic API Routes

```jsx
// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const user = await db.user.findUnique({
    where: { id: params.id }
  });
  
  if (!user) {
    return Response.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }
  
  return Response.json(user);
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const user = await db.user.update({
    where: { id: params.id },
    data: body
  });
  return Response.json(user);
}

export async function DELETE(request, { params }) {
  await db.user.delete({ where: { id: params.id } });
  return Response.json({ success: true });
}
```

---

## 4️⃣ Middleware

### Basic Middleware

```jsx
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check authentication
  const token = request.cookies.get('auth-token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
};
```

### With Authentication

```jsx
// middleware.js
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const session = await auth();
  
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
```

---

## 5️⃣ Image Optimization

### Basic Usage

```jsx
import Image from 'next/image';

export function ProductImage({ product }) {
  return (
    <Image
      src={product.image}
      alt={product.name}
      width={300}
      height={300}
      priority={false}
      quality={75}
    />
  );
}
```

### Responsive Images

```jsx
import Image from 'next/image';

export function ResponsiveImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={600}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={75}
      priority
    />
  );
}
```

### Benefits

✅ **Automatic format conversion** - WebP, AVIF
✅ **Responsive sizing** - Different sizes for different devices
✅ **Lazy loading** - Load only when visible
✅ **Blur placeholder** - Show while loading
✅ **Automatic optimization** - Best practices applied

---

## 6️⃣ Font Optimization

### Google Fonts

```jsx
// app/layout.jsx
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700']
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className={playfair.className}>My App</h1>
        {children}
      </body>
    </html>
  );
}
```

### Benefits

✅ **Zero layout shift** - Fonts loaded before render
✅ **Automatic subsetting** - Only needed characters
✅ **Self-hosted** - No external requests
✅ **Performance** - Optimized delivery

---

## 7️⃣ Metadata API

### Static Metadata

```jsx
// app/page.jsx
export const metadata = {
  title: 'Home',
  description: 'Welcome to my app',
  openGraph: {
    title: 'Home',
    description: 'Welcome to my app',
    images: ['/og-image.jpg']
  }
};

export default function Home() {
  return <h1>Home</h1>;
}
```

### Dynamic Metadata

```jsx
// app/blog/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image]
    }
  };
}

export default function BlogPost({ params }) {
  return <article>{/* ... */}</article>;
}
```

---

## 8️⃣ ISR & Streaming

### ISR (Incremental Static Regeneration)

```jsx
// app/blog/[slug]/page.jsx
export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}
```

### Streaming with Suspense

```jsx
// app/page.jsx
import { Suspense } from 'react';

function LoadingFallback() {
  return <div>Loading...</div>;
}

async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return <div>Loaded!</div>;
}

export default function Page() {
  return (
    <div>
      <h1>Page Title</h1>
      <Suspense fallback={<LoadingFallback />}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

---

## Summary: Day 4

| Feature | Purpose | Benefit |
|---------|---------|---------|
| **App Router** | File-based routing | No configuration |
| **Dynamic Routes** | [slug] syntax | Flexible routing |
| **API Routes** | REST endpoints | Built-in backend |
| **Middleware** | Request interception | Authentication |
| **Image Optimization** | Automatic optimization | Better performance |
| **Font Optimization** | Google Fonts | Zero layout shift |
| **Metadata API** | SEO optimization | Better rankings |
| **ISR** | Hybrid rendering | Best of both worlds |

---

# 🎯 DAY 5: Performance & Optimization

## Overview

Performance is critical for user experience and SEO.

### Topics

1. **Code Splitting** - Lazy loading
2. **Memoization** - Prevent re-renders
3. **Image Optimization** - Smaller files
4. **Caching** - Reduce requests
5. **Web Vitals** - Measure performance
6. **Bundle Analysis** - Identify bottlenecks

---

## 1️⃣ Code Splitting

### Dynamic Imports

```jsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HeavyComponent = dynamic(
  () => import('@/components/Heavy'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false // Don't render on server
  }
);

export function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Benefits

✅ **Smaller initial bundle** - Faster page load
✅ **Load on demand** - Only when needed
✅ **Better performance** - Lazy loading
✅ **Improved UX** - Faster perceived performance

---

## 2️⃣ Memoization

### React.memo

```jsx
import { memo } from 'react';

const UserCard = memo(({ user }) => {
  console.log('UserCard rendered');
  return <div>{user.name}</div>;
});

export default UserCard;
```

### useMemo

```jsx
import { useMemo } from 'react';

export function DataProcessor({ items }) {
  const processedData = useMemo(() => {
    console.log('Processing...');
    return items.map(item => ({
      ...item,
      processed: item.value * 2
    }));
  }, [items]);

  return <div>{processedData.length} items</div>;
}
```

---

## 3️⃣ Image Optimization

### Best Practices

```jsx
import Image from 'next/image';

export function OptimizedImage() {
  return (
    <Image
      src="/image.jpg"
      alt="Description"
      width={800}
      height={600}
      quality={75}
      priority={false}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}
```

### Benefits

✅ **Automatic format conversion** - WebP, AVIF
✅ **Responsive sizing** - Different sizes
✅ **Lazy loading** - Load when visible
✅ **Blur placeholder** - Better UX
✅ **Quality optimization** - Smaller files

---

## 4️⃣ Caching

### Data Caching

```jsx
// Cache for 1 hour
export async function getData() {
  const response = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  });
  return response.json();
}
```

### On-Demand Revalidation

```jsx
// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  const path = request.nextUrl.searchParams.get('path');
  revalidatePath(path);
  return Response.json({ revalidated: true });
}
```

---

## 5️⃣ Web Vitals

### Monitoring

```jsx
// app/layout.jsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function RootLayout({ children }) {
  useReportWebVitals((metric) => {
    console.log(metric);
    // Send to analytics
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify(metric)
    });
  });

  return <>{children}</>;
}
```

### Key Metrics

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** | < 2.5s | 2.5s - 4s | > 4s |
| **FID** | < 100ms | 100ms - 300ms | > 300ms |
| **CLS** | < 0.1 | 0.1 - 0.25 | > 0.25 |

---

## 6️⃣ Bundle Analysis

### Analyze Bundle

```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your config
});

# Run analysis
ANALYZE=true npm run build
```

---

## Summary: Day 5

| Technique | Purpose | Benefit |
|-----------|---------|---------|
| **Code Splitting** | Lazy load | Smaller bundle |
| **Memoization** | Prevent re-renders | Better performance |
| **Image Optimization** | Smaller images | Faster load |
| **Caching** | Reduce requests | Better performance |
| **Web Vitals** | Measure performance | Track improvements |
| **Bundle Analysis** | Identify bottlenecks | Optimize effectively |

---

# 🎯 DAY 6: Real-world Patterns & Best Practices

## Overview

Real-world patterns and best practices for production applications.

### Topics

1. **Authentication** - JWT, OAuth
2. **Error Handling** - Boundaries, fallbacks
3. **Form Validation** - Client & server
4. **State Management** - Redux, Zustand
5. **Testing** - Unit, integration, E2E

---

## 1️⃣ Authentication

### JWT Implementation

```jsx
// lib/auth.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// app/api/login/route.js
export async function POST(request) {
  const { email, password } = await request.json();
  
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !await verifyPassword(password, user.password)) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  const token = createToken(user);
  
  const response = Response.json({ success: true });
  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60
  });
  
  return response;
}
```

---

## 2️⃣ Error Handling

### Error Boundary

```jsx
// app/error.jsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### Not Found

```jsx
// app/not-found.jsx
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find the requested resource</p>
    </div>
  );
}
```

---

## 3️⃣ Form Validation

### With Zod

```jsx
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

// app/actions/user.js
'use server';

export async function createUser(formData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    const validated = userSchema.parse(data);
    const user = await db.user.create({ data: validated });
    return { success: true, user };
  } catch (error) {
    return { success: false, errors: error.flatten().fieldErrors };
  }
}
```

---

## 4️⃣ State Management

### Redux Toolkit

```jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    }
  }
});

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer
  }
});

export const { addTodo } = todoSlice.actions;
```

### Zustand

```jsx
import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), text }]
  }))
}));
```

---

## 5️⃣ Testing

### Unit Test

```jsx
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

test('renders correctly', () => {
  render(<Component />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

### Integration Test

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoApp } from './TodoApp';

test('adds a todo', async () => {
  render(<TodoApp />);
  
  const input = screen.getByPlaceholderText('Add a todo');
  const button = screen.getByText('Add');
  
  fireEvent.change(input, { target: { value: 'Learn React' } });
  fireEvent.click(button);
  
  expect(screen.getByText('Learn React')).toBeInTheDocument();
});
```

---

## Summary: Day 6

| Pattern | Purpose | Benefit |
|---------|---------|---------|
| **Authentication** | Secure access | Protect data |
| **Error Handling** | Handle failures | Better UX |
| **Form Validation** | Validate input | Prevent errors |
| **State Management** | Manage state | Scalable apps |
| **Testing** | Verify code | Reliable apps |

---

# 🎯 DAY 7: Interview Q&A & Mock Interview

## Common Interview Questions

### React 19 Questions

**Q1: What's the main benefit of React Compiler?**

A: React Compiler automatically optimizes components by memoizing values and callbacks without manual React.memo, useMemo, or useCallback. This reduces boilerplate and ensures consistent performance.

**Q2: Explain useActionState hook**

A: useActionState simplifies form handling by managing form state and submission status. It takes a server action and returns [state, formAction, isPending], automatically handling loading states and form submission.

**Q3: What's the difference between Server and Client Components?**

A: Server Components run only on the server (no JavaScript sent to browser), can access databases directly, and are better for data fetching. Client Components run in the browser, can use hooks, and handle interactivity.

**Q4: How do Server Actions work?**

A: Server Actions are async functions marked with 'use server' that run on the server. They can be called from Client Components, automatically handle form submissions, and can revalidate cache.

**Q5: What's useOptimistic hook?**

A: useOptimistic allows optimistic UI updates before the server responds. It updates the UI immediately, then reverts if the operation fails, providing better perceived performance.

### Next.js Questions

**Q6: Explain ISR (Incremental Static Regeneration)**

A: ISR combines static generation with dynamic updates. Pages are built at build time but revalidated on demand or after a time interval, providing fast performance with fresh content.

**Q7: How do you protect routes in Next.js?**

A: Use middleware to check authentication before allowing access. If the user isn't authenticated, redirect to login. This works for both Server and Client Components.

**Q8: What's the difference between getStaticProps and ISR?**

A: getStaticProps (Pages Router) builds pages at build time and never updates. ISR (App Router) builds at build time but revalidates on demand or after time, providing fresh content.

**Q9: How do you optimize images in Next.js?**

A: Use the `<Image>` component which automatically optimizes images with format conversion (WebP, AVIF), responsive sizing, lazy loading, and blur placeholders.

**Q10: Explain middleware in Next.js**

A: Middleware runs before requests are processed. It's useful for authentication checks, redirects, request logging, and setting headers. Use the matcher config to specify which routes it applies to.

---

## Mock Interview Scenario

### Scenario: Design a Todo App

**Interviewer:** "Design a todo app using React 19 and Next.js 15. Include authentication, real-time updates, and performance optimization."

**Your Answer Structure:**

1. **Architecture Overview**
   - Server Components for data fetching
   - Client Components for interactivity
   - Server Actions for mutations
   - Middleware for authentication

2. **Authentication**
   - JWT tokens in httpOnly cookies
   - Middleware to protect routes
   - Login/Signup pages

3. **Features**
   - Add/Edit/Delete todos
   - Mark as complete
   - Filter todos
   - Real-time updates with Suspense

4. **Performance**
   - Code splitting for heavy components
   - Image optimization
   - Caching with ISR
   - Memoization where needed

5. **Database Schema**
   - Users table
   - Todos table with userId foreign key

6. **API Design**
   - GET /api/todos - Get user's todos
   - POST /api/todos - Create todo
   - PUT /api/todos/[id] - Update todo
   - DELETE /api/todos/[id] - Delete todo

---

## Practice Questions

### Easy

1. What's the difference between useState and useReducer?
2. How do you pass data from Server to Client Component?
3. What's the purpose of useEffect cleanup?
4. How do you handle errors in Next.js?
5. What's the benefit of Server Components?

### Medium

6. Design a shopping cart system
7. Implement authentication with JWT
8. Optimize a slow React component
9. Design a real-time notification system
10. Implement form validation

### Hard

11. Design a complete e-commerce platform
12. Implement a real-time chat application
13. Design a file upload system with progress
14. Implement a complex state management system
15. Design a scalable multi-tenant application

---

## Final Tips

✅ **Understand concepts deeply** - Not just syntax
✅ **Think about trade-offs** - Pros and cons
✅ **Consider scalability** - How does it grow?
✅ **Think about performance** - Optimization matters
✅ **Consider security** - Always think about safety
✅ **Ask clarifying questions** - Understand requirements
✅ **Explain your reasoning** - Show your thinking
✅ **Use real examples** - From your experience

---

## Conclusion

You now have a comprehensive understanding of:

✅ React 19 fundamentals and advanced features
✅ Next.js 15 architecture and best practices
✅ Server Components and Server Actions
✅ Performance optimization techniques
✅ Real-world patterns and best practices
✅ Interview preparation and Q&A

**Good luck with your interview! You've got this! 🚀**
