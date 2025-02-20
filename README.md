# Task Management App

A web-based task management application built with Next.js that allows users to manage tasks with features like filtering, sorting, and pagination with KanBan view.

## Overview

This project is a take-home assignment implementation of a task management interface similar to Notion, Asana, and Linear. Users can perform CRUD operations on tasks, with additional features like filtering, sorting, and pagination.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Task Management (CRUD operations)
- Filtering and Sorting
- Pagination
- Local Storage Persistence
- KanBan view
## Known Issues

- Bulk delete at last page should navigate back one page
- Performance optimizations needed:
  - Implement useMemo() and useCallback() for better performance
  - Use React Scan (react-scan.com) for performance improvements

## Remaining tasks
- Custom Fields Support (didn't do cuz of time but have action plan - see custom-field-implementation.md)

## Challenging Parts

- Creating and managing state with useMemo() and useCallback()

## Future Improvements

With more time, the following improvements could be made:
- Performance optimization
- Enhanced UX for search, sorting, filtering, and pagination

## Trade-offs

- Custom table implementation instead of using TanStack Table for better control over functionality

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
