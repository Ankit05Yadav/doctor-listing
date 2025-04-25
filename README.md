# Doctor Listing Page

A web application that displays a list of doctors with filtering, sorting, and search capabilities.

## Features

- Autocomplete search for doctor names
- Filter panel with:
  - Consultation type (single select)
  - Specialties (multi-select)
  - Sort options (fees and experience)
- Responsive design
- URL-based filtering (query parameters)

## Running the Project

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API

The application fetches doctor data from:
```
https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json
```

All filtering, searching, and sorting happens on the client side after the initial API call.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS 