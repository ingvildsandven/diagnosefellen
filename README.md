[![Netlify Status](https://api.netlify.com/api/v1/badges/24d78c86-687a-4d2c-98aa-fdcb10288ee1/deploy-status)](https://app.netlify.com/projects/diagnosefellen/deploys)

# Diagnosefellen

A website for **Henriette Sandven** and her book *Diagnosefellen*. The site collects and organizes relevant content—podcasts, lectures, interviews, articles, and other appearances—so it’s easy to find, share, and keep updated. It also includes a booking form to contact Henriette by email for events.

## Overview

**Diagnosefellen** is a content hub + booking page.

Core ideas:
- One place for everything related to Henriette’s work and *Diagnosefellen*
- Simple navigation and clear categories (podcasts, lectures, etc.)
- A straightforward way to request bookings (talks, panels, events)

Planned pages:
- **Home**: Intro + highlighted items + call-to-action for booking
- **Booking**: Booking form + practical info (topics, formats, availability notes)
- **About**: About Henriette + about the book
- **Admin**: (Optional) Manage links/content if a backend is added


## Running a local version

```bash
# install dependencies
npm install

# start dev server
npm run dev

# production build
npm run build

# preview production build locally
npm run preview
```

## Images and screenshots
![image-diagnosefellen](/src/assets/images/book/14.png)


## Structure
```
src/
  api/
  assets/
    images/
      book/
      selfie/
  components/
    BookingForm/
    Navbar/
  pages/
    AboutPage/
    AdminPage/
    BookingPage/
    HomePage/
  App.css
  App.tsx
  index.css
  main.tsx
public/
```

## Techstack


- React (UI)
- TypeScript (type safety)
- Vite (build tool / dev server)

I’m currently debating:
- Firebase (auth + database + hosting-friendly)
- Supabase (Postgres + auth + storage, SQL-first)

