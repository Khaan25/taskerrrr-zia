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
- Undo/Redo feature (didn't do cuz of time - save the delete item in new array (plus index) and restore it back at original index)

## Challenging Parts

- Creating and managing state with useMemo() and useCallback()

## Future Improvements

With more time, the following improvements could be made:
- Performance optimization
- Enhanced UX for search, sorting, filtering, and pagination
- 404 page (low priority)

## Trade-offs

- Custom table implementation instead of using TanStack Table for better control over functionality

## Interesting things
- Using React Scan to monitor performance
- Using React Query to improve performance
- Using Custom Hooks
- Modular code structure
- Using Features folder structure
- Yeah, it's ready for large scale after we fix above known issues.
