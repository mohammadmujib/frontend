// ============================================
// REACT 19 PRACTICAL CODE EXAMPLES
// ============================================

// 1. COMPLETE LOGIN FORM WITH useActionState
// ============================================

'use client';

import { useActionState } from 'react';
import { loginUser } from '@/app/actions/auth';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, {
    success: false,
    error: null,
    user: null,
  });

  return (
    <form action={formAction} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          disabled={isPending}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          disabled={isPending}
          className="form-input"
        />
      </div>

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending ? 'Logging in...' : 'Login'}
      </button>

      {state?.error && (
        <div className="error-message" role="alert">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="success-message" role="status">
          Welcome, {state.user?.name}!
        </div>
      )}
    </form>
  );
}

// Server Action
// app/actions/auth.js
'use server';

import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function loginUser(previousState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    // Validate input
    if (!email || !password) {
      return { success: false, error: 'Email and password required' };
    }

    // Find user
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Verify password (use bcrypt in production)
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return { success: false, error: 'Invalid password' };
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

    return {
      success: true,
      error: null,
      user: { id: user.id, name: user.name, email: user.email },
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================
// 2. OPTIMISTIC TODO LIST
// ============================================

'use client';

import { useOptimistic, useRef } from 'react';
import { addTodo, toggleTodo, deleteTodo } from '@/app/actions/todos';

export function TodoList({ initialTodos }) {
  const [todos, setTodos] = useOptimistic(initialTodos);
  const inputRef = useRef(null);

  async function handleAddTodo(formData) {
    const text = formData.get('todo');
    if (!text.trim()) return;

    // Optimistically add
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      pending: true,
    };
    setTodos([...todos, newTodo]);

    // Send to server
    try {
      await addTodo(text);
      inputRef.current.value = '';
    } catch (error) {
      // Revert on error
      setTodos(initialTodos);
    }
  }

  async function handleToggle(todoId) {
    // Optimistically toggle
    setTodos(
      todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );

    // Send to server
    try {
      await toggleTodo(todoId);
    } catch (error) {
      // Revert on error
      setTodos(initialTodos);
    }
  }

  async function handleDelete(todoId) {
    // Optimistically remove
    setTodos(todos.filter(todo => todo.id !== todoId));

    // Send to server
    try {
      await deleteTodo(todoId);
    } catch (error) {
      // Revert on error
      setTodos(initialTodos);
    }
  }

  return (
    <div className="todo-container">
      <h1>My Todos</h1>

      <form action={handleAddTodo} className="add-todo-form">
        <input
          ref={inputRef}
          type="text"
          name="todo"
          placeholder="Add a new todo..."
          className="form-input"
        />
        <button type="submit" className="btn-primary">
          Add
        </button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''} ${
              todo.pending ? 'pending' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              className="todo-checkbox"
            />
            <span className="todo-text">{todo.text}</span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="btn-delete"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// 3. CUSTOM HOOK FOR DATA FETCHING
// ============================================

import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

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
  }, [url, options]);

  return { data, loading, error };
}

// Usage
export function UsersList() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </li>
      ))}
    </ul>
  );
}

// ============================================
// 4. FORM WITH VALIDATION
// ============================================

'use client';

import { useActionState } from 'react';
import { createUser } from '@/app/actions/user';

export function UserForm() {
  const [state, formAction, isPending] = useActionState(createUser, {
    success: false,
    errors: {},
  });

  return (
    <form action={formAction} className="user-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="John Doe"
          required
          disabled={isPending}
          className="form-input"
        />
        {state?.errors?.name && (
          <span className="error-text">{state.errors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="john@example.com"
          required
          disabled={isPending}
          className="form-input"
        />
        {state?.errors?.email && (
          <span className="error-text">{state.errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          disabled={isPending}
          className="form-input"
        />
        {state?.errors?.password && (
          <span className="error-text">{state.errors.password}</span>
        )}
      </div>

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending ? 'Creating...' : 'Create User'}
      </button>

      {state?.success && (
        <div className="success-message">User created successfully!</div>
      )}
    </form>
  );
}

// Server Action with Validation
// app/actions/user.js
'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function createUser(previousState, formData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    // Validate
    const validated = userSchema.parse(data);

    // Check if user exists
    const existing = await db.user.findUnique({
      where: { email: validated.email },
    });

    if (existing) {
      return {
        success: false,
        errors: { email: 'Email already in use' },
      };
    }

    // Create user
    await db.user.create({
      data: validated,
    });

    revalidatePath('/users');

    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      };
    }

    return {
      success: false,
      errors: { general: error.message },
    };
  }
}

// ============================================
// 5. CONTEXT WITH HOOKS
// ============================================

import { createContext, useContext, useState, useCallback } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
export function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Current theme: {theme}
    </button>
  );
}

// ============================================
// 6. NEXT.JS API ROUTE WITH ERROR HANDLING
// ============================================

// app/api/users/route.js
import { db } from '@/lib/db';

export async function GET(request) {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return Response.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return Response.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate
    if (!body.name || !body.email) {
      return Response.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Create user
    const user = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return Response.json(user, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    return Response.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json(user);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();

    const user = await db.user.update({
      where: { id: params.id },
      data: body,
    });

    return Response.json(user);
  } catch (error) {
    return Response.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await db.user.delete({
      where: { id: params.id },
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

// ============================================
// 7. MIDDLEWARE FOR AUTHENTICATION
// ============================================

// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const token = request.cookies.get('auth-token')?.value;

  // Public routes
  const publicRoutes = ['/login', '/signup', '/'];
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/protected/:path*'],
};

// ============================================
// 8. PERFORMANCE OPTIMIZATION EXAMPLE
// ============================================

'use client';

import { useMemo, useCallback, useState } from 'react';

export function DataTable({ items }) {
  const [sortBy, setSortBy] = useState('name');
  const [filterText, setFilterText] = useState('');

  // Memoize expensive computation
  const processedData = useMemo(() => {
    console.log('Processing data...');
    return items
      .filter(item =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return a.date - b.date;
      });
  }, [items, filterText, sortBy]);

  // Memoize callback
  const handleSort = useCallback((field) => {
    setSortBy(field);
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <button onClick={() => handleSort('name')}>Sort by Name</button>
      <button onClick={() => handleSort('date')}>Sort by Date</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {processedData.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// 9. SUSPENSE WITH SERVER COMPONENTS
// ============================================

// app/page.jsx
import { Suspense } from 'react';
import { UserCard } from '@/components/UserCard';
import { PostsList } from '@/components/PostsList';

function LoadingFallback() {
  return <div className="skeleton">Loading...</div>;
}

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Suspense fallback={<LoadingFallback />}>
        <UserCard userId={1} />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <PostsList />
      </Suspense>
    </div>
  );
}

// ============================================
// 10. COMPLETE NEXT.JS PROJECT STRUCTURE
// ============================================

/*
my-app/
├── app/
│   ├── layout.jsx                 # Root layout
│   ├── page.jsx                   # Home page
│   ├── error.jsx                  # Error boundary
│   ├── not-found.jsx              # 404 page
│   ├── api/
│   │   ├── users/
│   │   │   ├── route.js           # GET /api/users, POST /api/users
│   │   │   └── [id]/
│   │   │       └── route.js       # GET/PUT/DELETE /api/users/[id]
│   │   └── auth/
│   │       └── route.js           # Auth endpoints
│   ├── dashboard/
│   │   ├── layout.jsx             # Dashboard layout
│   │   ├── page.jsx               # Dashboard home
│   │   └── settings/
│   │       └── page.jsx           # Settings page
│   ├── blog/
│   │   ├── page.jsx               # Blog list
│   │   └── [slug]/
│   │       └── page.jsx           # Blog post
│   └── actions/
│       ├── auth.js                # Auth server actions
│       ├── user.js                # User server actions
│       └── todos.js               # Todo server actions
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── UserCard.jsx
│   └── ...
├── lib/
│   ├── db.js                      # Database connection
│   ├── auth.js                    # Auth utilities
│   ├── api.js                     # API utilities
│   ├── validation.js              # Validation schemas
│   └── store.js                   # State management
├── middleware.js                  # Next.js middleware
├── next.config.js                 # Next.js config
├── package.json
└── .env.local                     # Environment variables
*/
