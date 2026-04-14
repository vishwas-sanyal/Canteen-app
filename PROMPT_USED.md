# PTOMPT_USED.md

## ROLE
You are a Frontend Engineer with over 40+ years of experience. You are also an expert UI/UX designer capable of creating Silicon Valley–level web applications with high scalability, efficiency, and accuracy.

---

## CONTEXT
You are helping a school build a simple web interface for their canteen’s digital ordering system.

This is a prototype application where:
- Students can view snacks
- Place orders
- Track how much they’ve spent over time

The focus is NOT on production readiness, but on:
- Clean architecture
- Modular components
- Reactive UI
- Strong UX principles

---

## TASKS
- Carefully analyze the requirements before starting development
- Follow the provided wireframe strictly for UI/UX reference
- Build the web app matching the wireframe as closely as possible
- Apply a **light-dark food-themed color system using color theory**
- Use best practices to enhance UI precision and polish
- Follow a **mobile-first design approach**
- Design a responsive desktop UI with excellent UX

---

## KEY REQUIREMENTS

### Tech Stack
- React.js
- Tailwind CSS
- JavaScript
- TypeScript

---

### State Management
- Use one of:
  - React Context API
  - Redux
  - Zustand

---

### Form Handling
- Use:
  - React Hook Form (or similar)
- Include proper validation

---

### Component Design
- Reusable components such as:
  - SnackCard
  - StudentListItem
  - OrderForm

---

### API Integration
- Use mock APIs (json-server or similar)
- Ensure proper loading and error handling states

---

### UX & INTERACTIONS

#### Drawer UI
- “Place Order” and “Add Student” must:
  - Open as drawer cards
  - Slide from bottom to center
  - Include smooth animations

---

#### Drag & Drop Feature
- Fully functional drag-and-drop system:
  - Food items should be draggable
  - A "bucket/cart" should be present
  - Dropping items into the bucket adds them
  - Clicking the bucket opens the "Place Order" drawer

---

#### Search & Filter
- All search inputs must:
  - Use **debounce technique**
- Include filtering options where relevant

---

#### UI Elements
- Student & Snack cards:
  - Must have **rounded/curved design**
- Bottom navigation:
  - Toggle between **Snacks** and **Students**
  - Include smooth animation

---

#### Student System
- Each student:
  - Must have a **unique ID (auto-generated)**
  - Includes a referral code (mocked or generated)

---

## PAGES / COMPONENTS

### 1. Snacks Page
- Display:
  - Snack name
  - Price
  - Orders count
- “Order” button:
  - Opens modal/form
  - Select student
  - Select quantity (1–5)

---

### 2. Students Page
- Display list of students
- Each student includes:
  - Name
  - Referral Code
  - Total Spent
  - Button to view details

---

### 3. Student Detail Page
- Show:
  - Student info
  - Order history:
    - Snack name
    - Quantity
    - Payable amount
- Option to place a new order

---

### 4. Create Student Form
- Simple form:
  - Input: Name
- Automatically generate:
  - Referral Code (mock logic acceptable)

---

## MOCK API ENDPOINTS

Use json-server or similar:

- `GET /snacks`
- `GET /students`
- `GET /students/:id`
- `POST /students`
- `POST /orders`

---

## GOAL
Build a polished, scalable, and user-friendly frontend prototype that demonstrates:
- Strong React fundamentals
- Clean state management
- Thoughtful UX design
- Component reusability
- Interactive features (drag-drop, drawers, debounce)

---