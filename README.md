# SoundMind Productions - Frontend

This is the Next.js TypeScript frontend for the SoundMind Productions booking system.

## 🚀 Quick Start

**For complete setup instructions, see the main project documentation:**

- **[📚 Complete Documentation](../README.md)** - Full project overview and setup
- **[⚡ Quick Start Guide](../QUICKSTART.md)** - Get running in 5 minutes  
- **[👥 Collaborator Guide](../COLLABORATOR_GUIDE.md)** - Development workflow

## 🏃 Run Frontend Only

If the backend is already running:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🔧 Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📁 Structure

```
src/app/
├── components/    # Reusable UI components
├── contexts/      # React Context (Auth)
├── lib/          # API services & utilities
├── admin/        # Admin dashboard page
├── portfolio/    # Portfolio gallery page
├── profile/      # User profile page
└── services/     # Services listing page
```

## 🎨 Technology Stack

- **Next.js 15** with App Directory
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Headless UI** for accessible components
- **Heroicons** for icons
- **React Hook Form** for form management

## 🔗 API Integration

The frontend communicates with the Django backend via REST API:
- Authentication endpoints for login/register
- Service catalog for booking interface
- Booking management for user dashboard
- Admin endpoints for management interface

## 🎯 Key Features

- ✅ **Authentication** - Login, register, profile management
- ✅ **Booking System** - Service selection with equipment
- ✅ **Admin Dashboard** - Statistics and booking management  
- ✅ **Portfolio Gallery** - Interactive image showcase
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Type Safety** - Full TypeScript implementation

---

**Need help?** Check the [main documentation](../README.md) or [collaborator guide](../COLLABORATOR_GUIDE.md)!
