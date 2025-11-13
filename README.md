# Viktor Assessment - Blog Application

<img width="1900" height="989" alt="Screenshot 2025-11-14 at 01 13 45" src="https://github.com/user-attachments/assets/c589810f-6607-4755-ac5f-ebb764be549b" />

Demo :- https://viktor-assessment.vercel.app/

## Features
- Showing blogs
- Search
- FIltering and sorting of blog posts
- Responsive UI
- URL reflecting page state


## Tech stack used

- **React + TypeScript + Vite**
- **Material-UI** - Component library
- **Vitest** - Testing framework

### Installation

1. Clone repo:
```bash
git clone git@github.com:Shashika6/Viktor-assessment.git
cd Viktor-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Rename env.development to .env
mv env.development .env
```

The `.env` file should contain:
```
VITE_VIKTOR_API_URL=<your-api-url>
VITE_DEFAULT_BLOG_IMAGE=<default-image-url>
```

### Running the Application Locally

Start the development server:

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or another port if 5173 is already in use). The dev server includes Hot Module Replacement (HMR) for a smooth development experience.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI interface

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── services/      # API services
├── types/         # Type definitions
└── config/        # Configuration files
```

