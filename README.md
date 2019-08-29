# Parking-Sharing

A simple web application using node js & express for managing parking space booking.

---

Registered users can view both their current bookings as well as a list of available parking spaces, and make reservations.

For the moment only the system administrator (who has access to the database) can register both new users and parking spaces.

## Static live preview

Open [https://zsombi55.github.io/Parking-Sharing/public/index.html](https://zsombi55.github.io/Parking-Sharing/public/index.html)

## Content

Once logged in..

- **CRUD** operations:
    - **C**reate new reservation
    - **R**ead users (account data) spots and reservations from .json files
    - **U**pdate reservations
    - **D**elete reservations
- **Search** available spots & user reservations
    - by: city / area / street name 

###### Database:

**Parking**

- Use a mysql database.
- Create database named "parking" using encoding "UTF8_general_ci".
- Import tables & example data from the provided sql file.
>./public/data/parking.sql

| Users | Spots | Reservations |
| --- | --- | --- |
| first name | city / town | user reference (id) |
| last name | area / neighborhood name | spot reference (id) |
| phone number | address | booking time (timestamp) |
| e-mail address | parking space number / ID | end time (of reservation release; datetime) |
| vehicle number | free from time (daily availability) | |
| | free until time (daily availability) | |
| | description / spot owner's notes | |

## Features

- [x] Use flex box for element arrangement
- [x] Use of MariaDB (MySql) for data storage.
- [x] **After** logging in: View available & booked spots
- [x] Basic login, storing session data in "local storage"
- [x] **After** logging in: Dynamic spot search based on any combination of: City, Area (Neighborhood), Address
- [x] Basic Sesion logout & clearing of "local storage"
- [x] **Partial** login page styling
- [x] Demo version: connect to data storage for login module & spot listing, view N pages from 1 file, arranging elements with flex

### To Do

- [ ] Mock booking functionality for the demo (changes only seen on the page not "actually" saving)
- [ ] Mock reservation ending functionality for the demo (changes only seen on the page not "actually" saving)
- [ ] Actual booking & reservation release
- [ ] Finish login page styling
- [ ] "Proper" login, session & logout management
- [ ] View of all available Spots even without logging in
- [ ] View & modify account information **by** the user
    - Names, phone number, e-mail address, car & parking space data
- [ ] View Name, phone number & e-amil address of user booking a spot by spot owner
- [ ] "Send e-mail" type message Form for the Contact page
- [ ] Changeable app display language between ENG~RO

## Setup

Clone project, then install npm inside its root folder to get the current "node_modules" package.

Set up MariaDB and import mock data from the sql file in the Public/Data path (for now until in-app is added).

```
npm install
```

## Running app (locally)

```
npm run devstart
```

open http://localhost:3000
