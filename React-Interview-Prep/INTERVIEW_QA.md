# React 19 & Next.js 15 - Interview Q&A

## 🎯 REACT 19 QUESTIONS

### Q1: What are the main new features in React 19?

**Answer:**
React 19 introduces several major improvements:

1. **React Compiler** - Automatic optimization without manual memoization
2. **Server Components** - First-class support for server-side rendering
3. **Server Actions** - Simplified async operations with 'use server'
4. **New Hooks**:
   - `useActionState` - Form handling
   - `useFormStatus` - Get form submission status
   - `useOptimistic` - Optimistic UI updates
   - `use()` - Unwrap promises
5. **Ref as Prop** - No need for forwardRef
6. **Hydration Improvements** - Better SSR support

**Code Example:**
```jsx
// Before React 19
const MemoComponent = React.memo(({ items }) => {
  const filtered = useMemo(() => items.filter(...), [items]);
  return <div>{filtered}</div>;
});

// React 19 - Compiler handles optimization
export function Component({ items }) {
  const filtered = items.filter(...);
  return <div>{filtered}</div>;
}
```

---

### Q2: Explain useActionState hook

**Answer:**
`useActionState` simplifies form handling by managing form state and submission status. It takes a server action and returns state, form action, and pending status.

**Signature:**
```jsx
const [state, formAction, isPending] = useActionState(serverAction, initialState);
```

**Complete Example:**
```jsx
'use client';
import { useActionState } from 'react';
import { loginUser } from '@/app/actions/auth';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, {
    error: null,
    success: false,
  });

  return (
    <form action={formAction}>
      <input type="email" name="email" required disabled={isPending} />
      <input type="password" name="password" required disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state?.success && <p style={{ color: 'green' }}>Logged in!</p>}
    </form>
  );
}
```

**Server Action:**
```jsx
'use server';
export async function loginUser(previousState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const user = await validateUser(email, password);
    if (!user) return { error: 'Invalid credentials', success: false };
    
    // Set auth cookie
    return { success: true, error: null };
  } catch (error) {
    return { error: error.message, success: false };
  }
}
```

---

### Q3: What's the difference between useActionState and useTransition?

**Answer:**

| Feature | useActionState | useTransition |
|---------|----------------|---------------|
| Purpose | Form handling | Any async operation |
| Returns | state, formAction, isPending | isPending, startTransition |
| Use Case | Forms, mutations | Async operations, navigation |
| State Management | Manages form state | Doesn't manage state |

**useActionState Example:**
```jsx
const [state, formAction, isPending] = useActionState(submitForm, null);
<form action={formAction}>...</form>
```

**useTransition Example:**
```jsx
const [isPending, startTransition] = useTransition();

const handleClick = () => {
  startTransition(async () => {
    await someAsyncOperation();
  });
};
```

---

### Q4: Explain useOptimistic hook

**Answer:**
`useOptimistic` allows you to update the UI optimistically before the server responds, then revert if the operation fails.

**Example:**
```jsx
'use client';
import { useOptimistic } from 'react';
import { addTodo } from '@/app/actions/todos';

export function TodoList({ initialTodos }) {
  const [todos, setTodos] = useOptimistic(initialTodos);

  async function handleAddTodo(formData) {
    const text = formData.get('todo');
    
    // Optimistically add
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);

    // Send to server
    try {
      await addTodo(text);
    } catch (error) {
      // Revert on error (useOptimistic handles this)
      setTodos(initialTodos);
    }
  }

  return (
    <form action={handleAddTodo}>
      <input name="todo" placeholder="Add a todo..." />
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

---

### Q5: What's the use() hook?

**Answer:**
The `use()` hook unwraps promises and allows you to use them in components. It works with Suspense for better error handling.

**Example:**
```jsx
import { use } from 'react';
import { Suspense } from 'react';

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

---

### Q6: Explain Ref as Prop in React 19

**Answer:**
In React 19, you can pass refs directly as props without using `forwardRef`.

**Before React 19:**
```jsx
const TextInput = forwardRef(({ placeholder }, ref) => (
  <input ref={ref} placeholder={placeholder} />
));

// Usage
const inputRef = useRef(null);
<TextInput ref={inputRef} placeholder="Type..." />
```

**React 19:**
```jsx
function TextInput({ ref, placeholder }) {
  return <input ref={ref} placeholder={placeholder} />;
}

// Usage
const inputRef = useRef(null);
<TextInput ref={inputRef} placeholder="Type..." />
```

---

### Q7: What's the React Compiler?

**Answer:**
The React Compiler is an automatic optimization tool that:
- Memoizes components and functions
- Removes unnecessary re-renders
- Optimizes dependency tracking
- Eliminates the need for manual `useMemo` and `useCallback`

**Before (Manual Optimization):**
```jsx
const MemoizedComponent = React.memo(({ items }) => {
  const filtered = useMemo(() => 
    items.filter(i => i.active), 
    [items]
  );

  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return <div onClick={handleClick}>{filtered.length}</div>;
});
```

**React 19 (Compiler Handles It):**
```jsx
export function Component({ items }) {
  const filtered = items.filter(i => i.active);

  const handleClick = () => {
    console.log('clicked');
  };

  return <div onClick={handleClick}>{filtered.length}</div>;
}
```

---

## 🎯 NEXT.JS 15 QUESTIONS

### Q8: What's the difference between Server Components and Client Components?

**Answer:**

| Feature | Server Component | Client Component |
|---------|-----------------|-----------------|
| Runs on | Server only | Browser only |
| Can access | Database, APIs, secrets | Browser APIs, hooks |
| Bundle size | Not included | Included |
| Use cases | Data fetching, auth | Interactivity, state |
| Directive | None (default) | 'use client' |

**Example:**
```jsx
// Server Component (default)
export async function UserCard({ userId }) {
  const user = await db.user.findUnique({ where: { id: userId } });
  return <div>{user.name}</div>;
}

// Client Component
'use client';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

### Q9: What are Server Actions?

**Answer:**
Server Actions are async functions marked with `'use server'` that run on the server and can be called from Client Components. They enable secure server-side operations.

**Example:**
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

// Client Component
'use client';
import { useActionState } from 'react';
import { createUser } from '@/app/actions/user';

export function UserForm() {
  const [state, formAction, isPending] = useActionState(createUser, null);

  return (
    <form action={formAction}>
      <input name="name" required disabled={isPending} />
      <input name="email" required disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

---

### Q10: Explain Next.js routing

**Answer:**
Next.js 15 uses file-based routing in the `app` directory. File structure determines routes.

**Examples:**
```
app/
  page.jsx                    → /
  about/page.jsx              → /about
  blog/page.jsx               → /blog
  blog/[slug]/page.jsx        → /blog/:slug
  blog/[slug]/comments/page.jsx → /blog/:slug/comments
  api/users/route.js          → /api/users
  api/users/[id]/route.js     → /api/users/:id
  [[...slug]]/page.jsx        → /*, /any, /any/path
```

**Dynamic Route Example:**
```jsx
// app/blog/[slug]/page.jsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return { title: post.title };
}

export default function BlogPost({ params }) {
  return <h1>{params.slug}</h1>;
}
```

---

### Q11: What's ISR (Incremental Static Regeneration)?

**Answer:**
ISR allows you to build static pages at build time and revalidate them on demand or after a time interval, combining the benefits of static and dynamic rendering.

**Example:**
```jsx
// app/blog/[slug]/page.jsx
export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPost({ params }) {
  const post = await fetch(`/api/posts/${params.slug}`, {
    next: { revalidate: 60 }
  }).then(r => r.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// On-demand revalidation
// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  const slug = request.nextUrl.searchParams.get('slug');
  revalidatePath(`/blog/${slug}`);
  return Response.json({ revalidated: true });
}
```

---

### Q12: How do you handle authentication in Next.js?

**Answer:**
Use middleware to protect routes and store tokens in httpOnly cookies.

**Example:**
```jsx
// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};

// app/api/login/route.js
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await validateUser(email, password);
  if (!user) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

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

---

### Q13: How do you optimize images in Next.js?

**Answer:**
Use the `<Image>` component from `next/image` for automatic optimization including:
- Responsive sizing
- Lazy loading
- Format optimization (WebP)
- Blur placeholder

**Example:**
```jsx
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
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
    </div>
  );
}
```

---

### Q14: What's middleware in Next.js?

**Answer:**
Middleware runs before requests are processed. It's useful for:
- Authentication checks
- Redirects
- Request logging
- Setting headers

**Example:**
```jsx
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Add custom header
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');

  // Redirect based on condition
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-token');
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
```

---

### Q15: How do you handle errors in Next.js?

**Answer:**
Use error boundaries with `error.jsx` and `not-found.jsx` files.

**Example:**
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

---

## 🎯 BEHAVIORAL QUESTIONS

### Q16: Tell me about a time you optimized a React application

**Answer:**
"In my last project, I had a dashboard with 100+ components that was rendering slowly. I:

1. **Identified the problem** - Used React DevTools Profiler to find unnecessary re-renders
2. **Implemented Server Components** - Moved data fetching to server components
3. **Used dynamic imports** - Lazy loaded heavy components
4. **Optimized images** - Switched to Next.js Image component
5. **Implemented caching** - Used ISR for static pages

Result: Reduced initial load time from 4.2s to 1.8s and improved Lighthouse score from 65 to 92."

---

### Q17: How do you approach building a new feature?

**Answer:**
"I follow this process:

1. **Understand requirements** - Ask clarifying questions
2. **Design architecture** - Sketch components and data flow
3. **Identify constraints** - Performance, security, scalability
4. **Choose technologies** - Server vs Client components, caching strategy
5. **Implement incrementally** - Build, test, iterate
6. **Optimize** - Profile, identify bottlenecks, improve
7. **Document** - Code comments, README, architecture docs"

---

### Q18: How do you handle debugging in production?

**Answer:**
"I use several strategies:

1. **Error tracking** - Sentry or similar for error monitoring
2. **Logging** - Structured logging with context
3. **Performance monitoring** - Web Vitals, custom metrics
4. **User feedback** - Collect bug reports
5. **Reproduction** - Try to reproduce locally
6. **Incremental rollback** - Use feature flags or gradual rollouts
7. **Post-mortem** - Document what happened and how to prevent it"

---

## 🎯 CODING CHALLENGES

### Challenge 1: Build a Form with Validation

**Requirements:**
- Form with name, email, password fields
- Client-side validation
- Server-side validation
- Error messages
- Loading state
- Success message

**Solution:**
```jsx
// See PRACTICAL_CODE_EXAMPLES.js for complete solution
```

---

### Challenge 2: Build an Optimistic Todo List

**Requirements:**
- Add todos optimistically
- Toggle completion optimistically
- Delete todos optimistically
- Revert on error
- Show pending state

**Solution:**
```jsx
// See PRACTICAL_CODE_EXAMPLES.js for complete solution
```

---

### Challenge 3: Build a Protected Dashboard

**Requirements:**
- Authentication with JWT
- Protected routes with middleware
- User profile page
- Logout functionality
- Redirect to login if not authenticated

**Solution:**
```jsx
// See PRACTICAL_CODE_EXAMPLES.js for complete solution
```

---

## 📊 Interview Tips

1. **Listen carefully** - Understand the question before answering
2. **Think out loud** - Explain your reasoning
3. **Ask clarifying questions** - Show you understand the problem
4. **Provide examples** - Use real code examples
5. **Discuss trade-offs** - Show you understand pros and cons
6. **Be honest** - If you don't know, say so
7. **Show enthusiasm** - React and Next.js are awesome!
8. **Practice** - Do mock interviews before the real one

---

Good luck! You've got this! 🚀
