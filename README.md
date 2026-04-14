# 🍴 Canteen Store

A beautiful, modern ordering system for school canteens. Students browse snacks, place orders, and track spending—all with zero backend setup required.

## ✨ What It Does

- **Browse** diverse snacks with vivid emojis and descriptions
- **Order** with drag-and-drop or simple clicks
- **Manage** student profiles and referral codes
- **Track** spending and order history
- **Works everywhere** - mobile, tablet, desktop

## 🚀 Get Started

```bash
cd canteen-app
npm install
npm run dev
```

Open `http://localhost:5173` and you're good to go! 🎉

## 🎯 How to Use

**Students:** Browse snacks → Add to order → Select student → Place order ✅

**Admins:** View students → Add new student → View spending & history 📊

## 🛠️ Built With

- React 18 + TypeScript
- TailwindCSS for styling
- Zustand for state management
- Framer Motion for smooth animations
- Vite for fast development
- No backend needed—everything runs locally!

## 📁 Structure

```
src/
├── components/   # Reusable UI pieces
├── pages/        # Snacks, Students, Details
├── store/        # App state
├── data/         # Mock snacks & students
├── api/          # In-memory data logic
└── types/        # TypeScript interfaces
```

## 🎨 Colors

- Green (#88B361) - Fresh & healthy
- White (#FFFFFF) - Clean & trust
- Black (#000000) - Bold & contrast
- Gray (#9E9E9E) - Balanced & neutral

## 📱 Responsive

Mobile-first design that adapts beautifully from your phone to desktop.

## 🎁 Features

✅ Search snacks in real-time  
✅ Drag-and-drop ordering  
✅ Auto-generated student codes  
✅ Order history tracking  
✅ Beautiful animations  
✅ Works offline (no server!)  