## Features

### Status

- ✅ Done
- 🟡 Partial
- ⚪ Not Implemented

### Features list

- [🟡] Navbar
  - [🟡] Mobile menu, style needs refinement
  - [✅] PC menu
- [✅] Footer
- [✅] Home Page
  - [✅] Features,
  - [✅] Carousels,
  - [✅] Testimonials
- [⚪] Rich Text Editor
- [🟡] Pagination and Filter
  - [🟡] Filter, Sorting, Searching
  - [✅] Pagination, DataTable
  - [✅] Public pagination
- [✅] File upload (Single/Multiple)
- [🟡] News and Event feature
  - [🟡] Management, missing rich text editor
  - [✅] Public Page
- [🟡] Programs, Course, Course-Group feature
  - [🟡] Management, missing relationships CRUD
  - [🟡] Public Page, styles needs refinement, missing tqf and viewing older program
- [🟡] About feature
  - [✅] Public Page
  - [⚪] Management
- [✅] Classroom and Building feature
  - [✅] Public Page
  - [✅] Management
- [✅] Personnel feature
  - [✅] Public Page
  - [✅] Management
- [✅] Alumni feature
  - [✅] Public Page
  - [✅] Management
- [✅] Project feature
  - [✅] Public Page
  - [✅] Management
- [✅] Contact feature
  - [✅] Public Page
  - [✅] Management
- [🟡] Complain feature
  - [✅] Public Page
  - [🟡] Management

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v24 LTS or later)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

### Installing

1.  Clone the repo
2.  Install dependencies
    ```bash
    pnpm install
    ```
3.  Create a `.env` file from `example.env` and update the environment variables.

### Development

To run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `pnpm dev`: Runs the app in development mode.
- `pnpm build`: Builds the app for production.
- `pnpm start`: Starts a production server.
- `pnpm lint`: Runs the linter.
