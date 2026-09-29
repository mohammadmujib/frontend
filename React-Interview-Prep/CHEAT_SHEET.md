# React 19 & Next.js 15 - Quick Reference Cheat Sheet

## 🚀 React 19 New Hooks

### useActionState
```jsx
const [state, formAction, isPending] = useActionState(serverAction, initialState);
<form action={formAction}>
  <input name="email" />
  <button disabled={isPending}>Submit</button>
</form>
```

### useFormStatus
```jsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Submit</button>;
}
```

### useOptimistic
```jsx
const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos);
addOptimisticTodo(newTodo);
```

### use()
```jsx
const data = use(fetchPromise);
```

---

## 🎯 Next.js 15 Essentials

### File-based Routing
```
app/
  page.jsx              → /
  blog/page.jsx         → /blog
  blog/[slug]/page.jsx  → /blog/:slug
  api/users/route.js    → /api/users
```

### Server vs Client Components
```jsx
// Server Component (default)
export async function ServerComp() {
  const data = await db.query();
  return <div>{data}</div>;
}

// Client Component
'use client';
export function ClientComp() {
  const [state, setState] = useState();
  return <div>{state}</div>;
}
```

### Server Actions
```jsx
'use server';
export async function updateUser(formData) {
  await db.user.update(...);
  revalidatePath('/users');
}
```

### API Routes
```jsx
// app/api/users/route.js
export async function GET(request) {
  return Response.json(data);
}

export async function POST(request) {
  const body = await request.json();
  return Response.json(result, { status: 201 });
}
```

### Middleware
```jsx
// middleware.js
export function middleware(request) {
  if (!request.cookies.get('auth')) {
    return NextResponse.redirect('/login');
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

### Image Optimization
```jsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority
  quality={75}
/>
```

### Metadata
```jsx
export const metadata = {
  title: 'My Page',
  description: 'Page description',
};

// Dynamic metadata
export async function generateMetadata({ params }) {
  const post = await getPost(params.id);
  return { title: post.title };
}
```

### ISR (Incremental Static Regeneration)
```jsx
export const revalidate = 60; // Revalidate every 60 seconds

// Or on-demand
import { revalidatePath } from 'next/cache';
revalidatePath('/blog');
```

### Dynamic Routes
```jsx
// Generate static params
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default function Post({ params }) {
  return <h1>{params.slug}</h1>;
}
```

---

## 🔥 Common Patterns

### Form with Validation
```jsx
'use client';
import { useActionState } from 'react';

export function Form() {
  const [state, formAction] = useActionState(submitForm, null);

  return (
    <form action={formAction}>
      <input name="email" />
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Data Fetching
```jsx
// Server Component
async function Page() {
  const data = await fetch('url', {
    next: { revalidate: 60 }
  }).then(r => r.json());
  return <div>{data}</div>;
}

// Client Component
function Component() {
  const { data, loading } = useFetch('/api/data');
  return loading ? <div>Loading</div> : <div>{data}</div>;
}
```

### Protected Routes
```jsx
// middleware.js
export function middleware(request) {
  const token = request.cookies.get('auth-token');
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect('/login');
  }
}
```

### Error Handling
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

### Suspense with Streaming
```jsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SlowComponent />
    </Suspense>
  );
}
```

---

## 📊 Performance Tips

1. **Use Server Components by default** - Less JavaScript sent to browser
2. **Image Optimization** - Always use `<Image>` component
3. **Code Splitting** - Use `dynamic()` for heavy components
4. **Caching** - Use `revalidate` and `revalidatePath()`
5. **Memoization** - React Compiler handles most cases now
6. **Streaming** - Use Suspense for better UX

---

## 🔐 Security Best Practices

1. **Server Actions** - Keep sensitive logic on server
2. **Environment Variables** - Use `.env.local` for secrets
3. **CORS** - Configure properly for API routes
4. **Input Validation** - Always validate on server
5. **Authentication** - Use httpOnly cookies for tokens
6. **Rate Limiting** - Implement on API routes

---

## 🧪 Testing Patterns

```jsx
// Unit test
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

test('renders correctly', () => {
  render(<Component />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});

// Server Action test
import { createUser } from '@/app/actions/user';

test('creates user', async () => {
  const formData = new FormData();
  formData.set('name', 'John');
  const result = await createUser(null, formData);
  expect(result.success).toBe(true);
});
```

---

## 🎓 Interview Tips

1. **Explain the "why"** - Not just what, but why you chose that approach
2. **Show trade-offs** - Discuss pros and cons
3. **Real-world examples** - Use projects you've built
4. **Performance matters** - Always think about optimization
5. **Security first** - Mention security considerations
6. **Error handling** - Show you handle edge cases
7. **Testing** - Mention how you'd test the code
8. **Scalability** - Think about how it scales

---

## ❓ Quick Q&A

**Q: When to use Server vs Client Components?**
A: Server by default. Use Client only for interactivity (useState, onClick, etc.)

**Q: What's the difference between useActionState and useTransition?**
A: useActionState is for forms, useTransition is for any async operation.

**Q: How do you handle loading states?**
A: Use `isPending` from useActionState or useTransition, or Suspense for streaming.

**Q: What's ISR?**
A: Incremental Static Regeneration - build static pages, revalidate on demand or after time.

**Q: How do you protect routes?**
A: Use middleware to check auth token before allowing access.

**Q: What's the React Compiler?**
A: Automatic optimization that memoizes components and removes unnecessary renders.

**Q: How do you optimize images?**
A: Use `<Image>` component with proper width/height, quality, and sizes props.

**Q: What's a Server Action?**
A: Async function marked with 'use server' that runs on server, callable from client.

---

## 📚 Resources to Review

- React 19 Docs: https://react.dev
- Next.js 15 Docs: https://nextjs.org/docs
- React Compiler: https://react.dev/learn/react-compiler
- Server Actions: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

---

## ✅ Pre-Interview Checklist

- [ ] Understand React 19 hooks (useActionState, useFormStatus, useOptimistic, use)
- [ ] Know Server Components vs Client Components
- [ ] Practice Server Actions
- [ ] Review Next.js routing (dynamic routes, catch-all)
- [ ] Study middleware and authentication
- [ ] Know API route patterns
- [ ] Understand ISR and revalidation
- [ ] Review error handling patterns
- [ ] Study performance optimization
- [ ] Practice explaining your code choices

---

Good luck! 🚀
