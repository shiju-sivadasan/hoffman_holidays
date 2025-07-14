# Travel Agency Application

## Overview

This is a full-stack travel agency web application built with React, Express, and Drizzle ORM. The application allows users to browse travel packages, make bookings, submit contact forms, leave testimonials, and interact with a customer service chatbot. It features a modern, responsive design using shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and bundling
- **Routing**: Wouter for client-side routing
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **API Pattern**: RESTful API endpoints
- **Middleware**: JSON parsing, URL encoding, custom logging middleware
- **Development**: Hot module replacement with Vite integration

## Key Components

### Database Schema (Drizzle ORM)
The application uses PostgreSQL with the following main entities:
- **users**: User authentication and management
- **packages**: Travel package information with rich metadata (highlights, itinerary, includes)
- **bookings**: Customer booking requests with status tracking
- **contacts**: Contact form submissions
- **testimonials**: Customer reviews and feedback

### Frontend Pages
- **Home**: Hero section with featured packages and search functionality
- **About**: Company information and mission
- **Services**: Package browsing with filtering capabilities
- **Package Detail**: Individual package information with booking integration
- **Gallery**: Photo gallery with category filtering
- **Testimonials**: Customer reviews display
- **Contact**: Contact form with company information
- **Book Now**: Comprehensive booking form

### UI Components
- **Navigation**: Responsive navigation with mobile menu
- **Footer**: Company information and newsletter signup
- **Booking Modal**: Package booking interface
- **Chatbot**: Customer service chat interface
- **Package Cards**: Reusable package display components

## Data Flow

### Package Management
1. Packages are stored with rich metadata including pricing, duration, highlights, and detailed itineraries
2. Packages can be filtered by category (tropical, romantic, cultural, luxury, adventure)
3. Featured packages are displayed prominently on the homepage
4. Individual package pages provide detailed information and booking options

### Booking Process
1. Users can book packages through modal dialogs or dedicated booking page
2. Booking forms capture customer information, travel details, and special requests
3. Form validation ensures data integrity before submission
4. Booking status tracking (pending, confirmed, cancelled)

### Contact Management
1. Contact forms allow users to express interest in specific packages
2. General inquiries are captured with customer contact information
3. All submissions are stored for follow-up by customer service

### Testimonial System
1. Customers can submit testimonials with ratings
2. Only approved testimonials are displayed publicly
3. Testimonials enhance credibility and showcase customer satisfaction

## External Dependencies

### UI and Styling
- **@radix-ui/***: Accessible UI primitives for complex components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management for components
- **lucide-react**: Icon library

### Data and State Management
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form handling with validation
- **@hookform/resolvers**: Zod integration for form validation
- **zod**: Schema validation

### Database and ORM
- **drizzle-orm**: Type-safe ORM for database operations
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-zod**: Zod schema generation from Drizzle schemas

### Development Tools
- **vite**: Fast development server and build tool
- **typescript**: Type safety and developer experience
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Deployment Strategy

### Development Environment
- **Development Server**: Vite dev server with hot module replacement
- **API Server**: Express server with file watching via tsx
- **Database**: Connection via DATABASE_URL environment variable
- **Error Handling**: Runtime error overlay for development debugging

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database Migrations**: Drizzle Kit manages schema changes
- **Static Serving**: Express serves built frontend in production

### Environment Configuration
- **NODE_ENV**: Controls development vs production behavior
- **DATABASE_URL**: PostgreSQL connection string (required)
- **Replit Integration**: Special handling for Replit development environment

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns, type safety throughout the stack, and a focus on developer experience and performance.