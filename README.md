# TokeItReal Frontend

A modern React application for tokenized real estate investment platform.

## Environment Configuration

This project supports multiple environments with different configurations:

### Environment Files

- `.env.local` - Local development environment
- `.env.production` - Production environment
- `.env` - Default fallback (currently set to production values)

### Environment Variables

| Variable | Description | Local | Production |
|----------|-------------|-------|------------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` | `https://api.tokeitreal.com` |
| `VITE_WS_URL` | WebSocket URL | `ws://localhost:3000` | `wss://api.tokeitreal.com` |
| `VITE_ENV` | Environment identifier | `development` | `production` |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk authentication key | `pk_test_...` | `pk_live_...` |

### Development Scripts

```bash
# Local development (uses .env.local)
npm run dev:local

# Regular development (uses .env)
npm run dev

# Production build
npm run build:production

# Regular build
npm run build
```

### Usage in Code

```typescript
import { config, logger, endpoints } from './config/environment';

// Access environment variables
const apiUrl = config.apiUrl;
const isDev = config.isDevelopment;

// Environment-aware logging
logger.log('This only shows in development');
logger.error('This always shows');

// API endpoints
const orderBookUrl = `${config.apiUrl}${endpoints.orderBook(propertyId)}`;
```

### Features by Environment

#### Development Environment
- Detailed console logging
- WebSocket connection to local backend
- API calls to localhost
- Enhanced error messages

#### Production Environment
- Minimal logging (errors only)
- Secure HTTPS/WSS connections
- Production API endpoints
- Optimized performance

## Project Structure

```
src/
├── config/
│   └── environment.ts     # Environment configuration
├── components/           # React components
├── pages/               # Page components
├── services/            # API services
└── types.ts            # TypeScript types
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   - Copy `.env.local` for local development
   - Modify variables as needed for your setup

3. **Start development server:**
   ```bash
   npm run dev:local  # For local backend
   # or
   npm run dev        # For production backend
   ```

4. **Build for production:**
   ```bash
   npm run build:production
   ```

## API Integration

The application integrates with the TokeItReal backend API for:

- Newsletter subscriptions
- Contact form submissions
- Real estate property data
- Market data (order books, trades)
- Real-time WebSocket updates

All API calls are environment-aware and will automatically use the correct endpoints based on the current environment configuration.