# 🚀 React 19 & Next.js Latest - 7 Day Interview Prep Guide

## 📅 7-Day Study Plan

### **Day 1: React 19 Fundamentals & New Features**
### **Day 2: React 19 Advanced Hooks & Patterns**
### **Day 3: Server Components & Actions**
### **Day 4: Next.js 15 New Features**
### **Day 5: Performance & Optimization**
### **Day 6: Real-world Patterns & Best Practices**
### **Day 7: Mock Interview & Q&A**

---

## 🎯 DAY 1: React 19 Fundamentals & New Features

### What's New in React 19?

1. **React Compiler** - Automatic optimization
2. **Server Components** - First-class support
3. **Actions** - Simplified async operations
4. **New Hooks** - `useActionState`, `useFormStatus`, `useOptimistic`
5. **Ref as Prop** - No more forwardRef needed
6. **Hydration Improvements** - Better SSR support

### 1. React Compiler (Automatic Memoization)

```jsx
// React 19 - No need for useMemo/useCallback
import { useState } from 'react';

export function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // React Compiler automatically optimizes this
  const filteredResults = results.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ResultsList items={filteredResults} />
    </div>
  );
}

// Before React 19, you'd need:
// const filteredResults = useMemo(() => 
//   results.filter(...), [results, query]
// );
```

### 2. Ref as Prop (No forwardRef)

```jsx
// React 19 - Refs are just props now!
function TextInput({ ref, placeholder }) {
  return <input ref={ref} placeholder={placeholder} />;
}

// Usage
import { useRef } from 'react';

export function App() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <TextInput ref={inputRef} placeholder="Type here..." />
      <button onClick={handleFocus}>Focus Input</button>
    </>
  );
}

// Before React 19:
// const TextInput = forwardRef(({ placeholder }, ref) => (
//   <input ref={ref} placeholder={placeholder} />
// ));
```

### 3. useActionState Hook (Form Handling)

```jsx
// React 19 - Simplified form handling
import { useActionState } from 'react';

async function submitForm(previousState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return { error: 'Login failed' };
    }

    return { success: true, message: 'Logged in!' };
  } catch (error) {
    return { error: error.message };
  }
}

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(submitForm, null);

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

### 4. useFormStatus Hook

```jsx
// React 19 - Get form submission status
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

export function NewsletterForm() {
  async function handleSubmit(formData) {
    const email = formData.get('email');
    await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  return (
    <form action={handleSubmit}>
      <input type="email" name="email" required />
      <SubmitButton />
    </form>
  );
}
```

### 5. useOptimistic Hook (Optimistic Updates)

```jsx
// React 19 - Optimistic UI updates
import { useOptimistic, useRef } from 'react';

export function TodoList({ initialTodos }) {
  const [todos, setTodos] = useOptimistic(initialTodos);
  const inputRef = useRef(null);

  async function addTodo(formData) {
    const text = formData.get('todo');
    
    // Optimistically add to UI
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);

    // Send to server
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      // Revert on error (useOptimistic handles this)
      setTodos(initialTodos);
    }

    inputRef.current.value = '';
  }

  return (
    <div>
      <form action={addTodo}>
        <input 
          ref={inputRef}
          type="text" 
          name="todo" 
          placeholder="Add a todo..."
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 6. use() Hook (Promise Unwrapping)

```jsx
// React 19 - Unwrap promises in components
import { use } from 'react';

async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

function UserProfile({ userId }) {
  // Unwrap promise directly in component
  const user = use(fetchUser(userId));

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// With Suspense
import { Suspense } from 'react';

export function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile userId={1} />
    </Suspense>
  );
}
```

---

## 🎯 DAY 2: React 19 Advanced Hooks & Patterns

### 1. Context with useContext (Still Important)

```jsx
// Create context
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

// Use context
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
      }}
    >
      Current theme: {theme}
    </button>
  );
}
```

### 2. useReducer for Complex State

```jsx
// Complex state management
import { useReducer } from 'react';

const initialState = {
  count: 0,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleIncrement = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: 'INCREMENT' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={handleIncrement} disabled={state.loading}>
        {state.loading ? 'Loading...' : 'Increment'}
      </button>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

### 3. useEffect Cleanup Pattern

```jsx
// Proper cleanup
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

### 4. Custom Hooks Pattern

```jsx
// Custom hook for API calls
import { useState, useEffect } from 'react';

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
export function UserList() {
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

### 5. useCallback for Memoization (Still Useful)

```jsx
// useCallback - memoize functions
import { useCallback, useState } from 'react';

export function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback, this function is recreated on every render
  // With useCallback, it's only recreated when dependencies change
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Empty dependency array = never recreate

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

### 6. useMemo for Expensive Computations

```jsx
// useMemo - memoize expensive calculations
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
        processed: item.value * 2,
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

## 🎯 DAY 3: Server Components & Actions

### 1. Server Components Basics

```jsx
// app/components/UserCard.jsx - Server Component
import { db } from '@/lib/db';

// This runs ONLY on the server
export async function UserCard({ userId }) {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
```

### 2. Server Actions

```jsx
// app/actions/user.js
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');

  try {
    const user = await db.user.create({
      data: { name, email },
    });

    revalidatePath('/users');
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteUser(userId) {
  try {
    await db.user.delete({
      where: { id: userId },
    });

    revalidatePath('/users');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### 3. Using Server Actions in Client Components

```jsx
// app/components/UserForm.jsx
'use client';

import { useActionState } from 'react';
import { createUser } from '@/app/actions/user';

export function UserForm() {
  const [state, formAction, isPending] = useActionState(createUser, null);

  return (
    <form action={formAction}>
      <input 
        type="text" 
        name="name" 
        placeholder="Name"
        required
        disabled={isPending}
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Email"
        required
        disabled={isPending}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create User'}
      </button>
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state?.success && <p style={{ color: 'green' }}>User created!</p>}
    </form>
  );
}
```

### 4. Progressive Enhancement with Server Actions

```jsx
// app/components/TodoItem.jsx
'use client';

import { useTransition } from 'react';
import { toggleTodo, deleteTodo } from '@/app/actions/todos';

export function TodoItem({ todo }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleTodo(todo.id);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTodo(todo.id);
    });
  };

  return (
    <li style={{ opacity: isPending ? 0.6 : 1 }}>
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isPending}
      />
      <span style={{ 
        textDecoration: todo.completed ? 'line-through' : 'none' 
      }}>
        {todo.text}
      </span>
      <button onClick={handleDelete} disabled={isPending}>
        Delete
      </button>
    </li>
  );
}
```

### 5. Mixing Server & Client Components

```jsx
// app/page.jsx - Server Component
import { db } from '@/lib/db';
import { UserCard } from '@/components/UserCard';
import { UserForm } from '@/components/UserForm';

export default async function UsersPage() {
  const users = await db.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      
      {/* Server Component */}
      <div className="users-list">
        {users.map(user => (
          <UserCard key={user.id} userId={user.id} />
        ))}
      </div>

      {/* Client Component */}
      <UserForm />
    </div>
  );
}
```

---

## 🎯 DAY 4: Next.js 15 New Features

### 1. App Router (Latest Standard)

```jsx
// app/layout.jsx - Root layout
import './globals.css';

export const metadata = {
  title: 'My App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/page.jsx - Home page
export default function Home() {
  return <h1>Welcome to Next.js 15</h1>;
}

// app/blog/[slug]/page.jsx - Dynamic route
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return posts.map(post => ({ slug: post.slug }));
}

export default function BlogPost({ params }) {
  return <h1>Blog Post: {params.slug}</h1>;
}
```

### 2. Incremental Static Regeneration (ISR)

```jsx
// app/blog/page.jsx
export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 }
  }).then(r => r.json());

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### 3. Dynamic Routes with Catch-All

```jsx
// app/docs/[[...slug]]/page.jsx
export default function DocsPage({ params }) {
  const slug = params.slug?.join('/') || 'index';

  return (
    <div>
      <h1>Documentation: {slug}</h1>
      {/* Matches /docs, /docs/guide, /docs/guide/setup, etc. */}
    </div>
  );
}
```

### 4. Middleware

```jsx
// middleware.js - Root level
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth-token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
```

### 5. API Routes

```jsx
// app/api/users/route.js
import { db } from '@/lib/db';

export async function GET(request) {
  try {
    const users = await db.user.findMany();
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const user = await db.user.create({
      data: body,
    });
    return Response.json(user, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}

// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const user = await db.user.findUnique({
    where: { id: params.id },
  });
  return Response.json(user);
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const user = await db.user.update({
    where: { id: params.id },
    data: body,
  });
  return Response.json(user);
}

export async function DELETE(request, { params }) {
  await db.user.delete({
    where: { id: params.id },
  });
  return Response.json({ success: true });
}
```

### 6. Image Optimization

```jsx
// Using Next.js Image component
import Image from 'next/image';

export function ProductCard({ product }) {
  return (
    <div>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
    </div>
  );
}
```

### 7. Font Optimization

```jsx
// app/layout.jsx
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['700'],
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

### 8. Metadata API

```jsx
// app/blog/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const post = await fetch(`/api/posts/${params.slug}`).then(r => r.json());

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function BlogPost({ params }) {
  return <article>{/* ... */}</article>;
}
```

---

## 🎯 DAY 5: Performance & Optimization

### 1. Code Splitting & Dynamic Imports

```jsx
// Lazy load components
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // Don't render on server
});

export function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 2. Image Optimization Best Practices

```jsx
// Responsive images
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

### 3. Bundle Analysis

```bash
# Install bundle analyzer
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

### 4. Caching Strategies

```jsx
// app/api/data/route.js
export async function GET(request) {
  const data = await fetch('https://api.example.com/data', {
    next: { 
      revalidate: 3600, // Cache for 1 hour
      tags: ['data'] // For on-demand revalidation
    }
  }).then(r => r.json());

  return Response.json(data);
}

// Revalidate on demand
// app/api/revalidate/route.js
import { revalidateTag } from 'next/cache';

export async function POST(request) {
  const tag = request.nextUrl.searchParams.get('tag');
  revalidateTag(tag);
  return Response.json({ revalidated: true });
}
```

### 5. Web Vitals Monitoring

```jsx
// app/layout.jsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function RootLayout({ children }) {
  useReportWebVitals((metric) => {
    console.log(metric);
    // Send to analytics service
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify(metric),
    });
  });

  return <>{children}</>;
}
```

### 6. Streaming & Suspense

```jsx
// app/page.jsx
import { Suspense } from 'react';

async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return <div>Slow content loaded</div>;
}

function LoadingFallback() {
  return <div>Loading...</div>;
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

## 🎯 DAY 6: Real-world Patterns & Best Practices

### 1. Authentication Pattern

```jsx
// lib/auth.js
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// middleware.js
import { getSession } from '@/lib/auth';

export async function middleware(request) {
  const session = await getSession();

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// app/api/login/route.js
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { email, password } = await request.json();

  // Validate credentials
  const user = await validateUser(email, password);
  if (!user) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Create token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
  });

  return Response.json({ success: true, user });
}
```

### 2. Error Handling

```jsx
// app/error.jsx - Error boundary
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

// app/not-found.jsx
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find the requested resource</p>
    </div>
  );
}

// app/api/error-handler.js
export function handleApiError(error) {
  console.error(error);

  if (error.code === 'VALIDATION_ERROR') {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }

  if (error.code === 'NOT_FOUND') {
    return Response.json(
      { error: 'Resource not found' },
      { status: 404 }
    );
  }

  return Response.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

### 3. Form Validation Pattern

```jsx
// lib/validation.js
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// app/actions/user.js
'use server';

import { userSchema } from '@/lib/validation';

export async function createUser(formData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const validated = userSchema.parse(data);
    // Create user...
    return { success: true };
  } catch (error) {
    return { success: false, errors: error.flatten().fieldErrors };
  }
}

// app/components/UserForm.jsx
'use client';

import { useActionState } from 'react';
import { createUser } from '@/app/actions/user';

export function UserForm() {
  const [state, formAction] = useActionState(createUser, null);

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      {state?.errors?.name && <p>{state.errors.name}</p>}

      <input name="email" type="email" placeholder="Email" />
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <input name="password" type="password" placeholder="Password" />
      {state?.errors?.password && <p>{state.errors.password}</p>}

      <button type="submit">Create User</button>
    </form>
  );
}
```

### 4. Data Fetching Patterns

```jsx
// lib/api.js
export async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        next: { revalidate: 60 },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// Usage in Server Component
import { fetchWithRetry } from '@/lib/api';

export async function UserList() {
  const users = await fetchWithRetry('/api/users');

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 5. State Management Pattern (Zustand)

```jsx
// lib/store.js
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  
  fetchUser: async (id) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();
      set({ user, error: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  clearUser: () => set({ user: null }),
}));

// Usage in Client Component
'use client';

import { useUserStore } from '@/lib/store';

export function UserProfile() {
  const { user, isLoading, fetchUser } = useUserStore();

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {user && <h1>{user.name}</h1>}
      <button onClick={() => fetchUser(1)}>Load User</button>
    </div>
  );
}
```

---

## 🎯 DAY 7: Interview Q&A & Mock Questions

### Common Interview Questions

#### Q1: What's the difference between Server Components and Client Components?

**Answer:**
- **Server Components**: Run only on the server, can access databases directly, no JavaScript sent to browser
- **Client Components**: Run in the browser, can use hooks, handle interactivity
- Use `'use server'` and `'use client'` directives

```jsx
// Server Component (default)
export async function ServerComponent() {
  const data = await db.query();
  return <div>{data}</div>;
}

// Client Component
'use client';
import { useState } from 'react';

export function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### Q2: Explain React 19's useActionState hook

**Answer:**
`useActionState` simplifies form handling by managing pending state and form submission:

```jsx
const [state, formAction, isPending] = useActionState(serverAction, initialState);
```

#### Q3: What are Server Actions?

**Answer:**
Server Actions are async functions marked with `'use server'` that run on the server and can be called from Client Components:

```jsx
'use server';
export async function updateUser(formData) {
  // Runs on server
  await db.user.update(...);
}
```

#### Q4: How do you handle authentication in Next.js?

**Answer:**
Use middleware to protect routes and store tokens in httpOnly cookies:

```jsx
// middleware.js
export function middleware(request) {
  const token = request.cookies.get('auth-token');
  if (!token) return NextResponse.redirect('/login');
}
```

#### Q5: What's the difference between ISR and SSG?

**Answer:**
- **SSG (Static Site Generation)**: Built at build time, never changes
- **ISR (Incremental Static Regeneration)**: Built at build time, revalidates on demand or after time interval

```jsx
export const revalidate = 60; // Revalidate every 60 seconds
```

#### Q6: How do you optimize images in Next.js?

**Answer:**
Use the `Image` component with automatic optimization:

```jsx
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority
  quality={75}
/>
```

#### Q7: Explain the React Compiler

**Answer:**
React 19's compiler automatically optimizes components by:
- Memoizing expensive computations
- Removing unnecessary re-renders
- Optimizing dependency tracking

No need for manual `useMemo` or `useCallback` in most cases.

#### Q8: What's the difference between useTransition and useActionState?

**Answer:**
- **useTransition**: For any async operation, returns `isPending` and `startTransition`
- **useActionState**: Specifically for form actions, manages form state and submission

```jsx
// useTransition
const [isPending, startTransition] = useTransition();
startTransition(async () => { await action(); });

// useActionState
const [state, formAction, isPending] = useActionState(action, initial);
```

#### Q9: How do you handle errors in Next.js?

**Answer:**
Use error boundaries and error.jsx:

```jsx
// app/error.jsx
'use client';
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Error: {error.message}</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

#### Q10: What's the purpose of middleware in Next.js?

**Answer:**
Middleware runs before requests are processed, useful for:
- Authentication checks
- Redirects
- Request logging
- Setting headers

```jsx
export function middleware(request) {
  // Runs before every request
  return NextResponse.next();
}
```

---

## 📚 Key Concepts to Review

### React 19
- ✅ React Compiler
- ✅ Server Components
- ✅ Server Actions
- ✅ useActionState
- ✅ useFormStatus
- ✅ useOptimistic
- ✅ use() hook
- ✅ Ref as prop (no forwardRef)

### Next.js 15
- ✅ App Router
- ✅ Server Components by default
- ✅ API Routes
- ✅ Middleware
- ✅ Image Optimization
- ✅ Font Optimization
- ✅ Metadata API
- ✅ ISR & Revalidation
- ✅ Dynamic Routes
- ✅ Streaming & Suspense

### Performance
- ✅ Code Splitting
- ✅ Image Optimization
- ✅ Caching Strategies
- ✅ Web Vitals
- ✅ Bundle Analysis

### Best Practices
- ✅ Authentication Patterns
- ✅ Error Handling
- ✅ Form Validation
- ✅ Data Fetching
- ✅ State Management

---

## 🎯 Practice Projects

### Project 1: Blog Platform
- Server Components for posts
- Server Actions for comments
- ISR for post pages
- Authentication with middleware

### Project 2: E-commerce Dashboard
- Dynamic product pages
- Server Actions for cart management
- Image optimization
- Performance monitoring

### Project 3: Real-time Chat App
- WebSocket integration
- Server Components for message history
- Client Components for real-time updates
- Authentication

---

## 📖 Resources

- [React 19 Docs](https://react.dev)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [React Compiler Docs](https://react.dev/learn/react-compiler)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

---

## ✅ Pre-Interview Checklist

- [ ] Understand React 19 new hooks
- [ ] Know Server Components vs Client Components
- [ ] Practice Server Actions
- [ ] Review Next.js routing
- [ ] Study performance optimization
- [ ] Prepare real-world examples
- [ ] Practice mock interviews
- [ ] Review error handling patterns
- [ ] Study authentication flows
- [ ] Know caching strategies

Good luck with your interview! 🚀
