# 🔐 Authentication & Authorization - Complete Guide

## Authentication vs Authorization

| Aspect | Authentication | Authorization |
|--------|----------------|-----------------|
| Definition | Verifying who you are | Verifying what you can do |
| Question | "Are you who you claim?" | "Are you allowed to do this?" |
| Example | Login with password | Access admin panel |

## Authentication Methods

### 1. JWT (JSON Web Token)
- Stateless authentication
- Token-based
- Secure and scalable
- Best for APIs

### 2. OAuth 2.0
- Third-party authentication
- Google, GitHub, Facebook login
- Secure delegation
- Industry standard

### 3. Session-Based
- Server-side sessions
- Cookie-based
- Traditional approach
- Good for monoliths

## Authorization Patterns

### 1. RBAC (Role-Based Access Control)
- Users have roles
- Roles have permissions
- Simple and effective
- Example: admin, user, moderator

### 2. PBAC (Permission-Based Access Control)
- Fine-grained permissions
- More flexible than RBAC
- Complex but powerful
- Example: posts:read, posts:write

### 3. ABAC (Attribute-Based Access Control)
- Check user, resource, and action attributes
- Most flexible
- Most complex
- Example: user.status, resource.isPrivate

## Security Best Practices

✅ Use httpOnly cookies for tokens
✅ Validate input on server
✅ Use CSRF protection
✅ Implement rate limiting
✅ Hash passwords with bcrypt
✅ Use HTTPS in production
✅ Implement proper error handling
✅ Monitor for suspicious activity

---

See COMPLETE_CODE_EXAMPLES.md for full implementations!
