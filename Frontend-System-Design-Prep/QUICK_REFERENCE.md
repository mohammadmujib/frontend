# 🎯 Frontend Interview - Quick Reference

## System Design Checklist

### Architecture
- [ ] Understand MVC, MVVM, Flux patterns
- [ ] Know when to use each pattern
- [ ] Understand component hierarchy
- [ ] Know composition vs inheritance
- [ ] Understand props drilling vs Context

### State Management
- [ ] Redux basics and advanced
- [ ] Zustand basics and advanced
- [ ] Context API
- [ ] When to use each
- [ ] Middleware and async actions

### Performance
- [ ] Code splitting and lazy loading
- [ ] Memoization
- [ ] Virtual scrolling
- [ ] Image optimization
- [ ] Bundle analysis

### Scalability
- [ ] Folder structure
- [ ] Module organization
- [ ] Dependency injection
- [ ] Testing strategies
- [ ] Error handling

## Next.js 16 Checklist

### Fundamentals
- [ ] App Router
- [ ] Server Components
- [ ] Client Components
- [ ] Server Actions
- [ ] API Routes

### Features
- [ ] Dynamic routes
- [ ] Middleware
- [ ] Image optimization
- [ ] Font optimization
- [ ] Metadata API

### Advanced
- [ ] ISR
- [ ] Streaming & Suspense
- [ ] Error handling
- [ ] Loading states
- [ ] Caching strategies

## Authentication Checklist

### Methods
- [ ] JWT
- [ ] OAuth 2.0
- [ ] Session-based
- [ ] Multi-factor authentication
- [ ] Refresh tokens

### Authorization
- [ ] RBAC
- [ ] PBAC
- [ ] ABAC
- [ ] Middleware protection
- [ ] Route protection

### Security
- [ ] Password hashing
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Secure cookies
- [ ] Input validation

## Common Interview Questions

### System Design
1. Design a todo app
2. Design a shopping cart
3. Design a real-time chat
4. Design a file upload system
5. Design a notification system

### Next.js
1. Difference between Server and Client Components
2. How does ISR work?
3. How do Server Actions work?
4. How do you handle errors?
5. How do you optimize images?

### Authentication
1. How does JWT work?
2. How does OAuth work?
3. What's the difference between authentication and authorization?
4. How do you protect routes?
5. How do you handle refresh tokens?

### State Management
1. When to use Redux vs Zustand?
2. How does Redux middleware work?
3. How do you handle async actions?
4. What's the difference between actions and reducers?
5. How do you structure Redux state?

### Patterns
1. What's the difference between MVC and MVVM?
2. When do you use Render Props vs HOC?
3. What's the Factory pattern?
4. What's the Observer pattern?
5. What's the Strategy pattern?

## Best Practices

### Component Design
✅ Keep components small and focused
✅ Use composition over inheritance
✅ Avoid prop drilling with Context
✅ Use custom hooks for logic
✅ Memoize expensive computations

### State Management
✅ Keep state as local as possible
✅ Normalize state shape
✅ Use immutable updates
✅ Handle async operations properly
✅ Use middleware for side effects

### Performance
✅ Code split large components
✅ Lazy load images
✅ Memoize components and callbacks
✅ Use virtual scrolling for large lists
✅ Monitor bundle size

### Security
✅ Use httpOnly cookies for tokens
✅ Validate input on server
✅ Use CSRF protection
✅ Implement rate limiting
✅ Hash passwords with bcrypt

### Testing
✅ Test business logic
✅ Test user interactions
✅ Test edge cases
✅ Mock external dependencies
✅ Aim for high coverage

## Interview Tips

1. **Understand the problem** - Ask clarifying questions
2. **Think out loud** - Explain your reasoning
3. **Consider trade-offs** - Discuss pros and cons
4. **Show examples** - Use real code
5. **Discuss scalability** - How does it grow?
6. **Think about performance** - Optimization matters
7. **Consider security** - Always think about safety
8. **Be honest** - If you don't know, say so

---

Good luck with your frontend interview! 🚀
