# LandSeller - Premium Land Marketplace

A modern, full-stack land selling marketplace built with Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, and MongoDB.

![LandSeller](https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop)

## Features

- 🏠 **User Authentication** - Register and login with secure credentials
- 📍 **Land Listings** - Post land for sale with detailed information
- 🔍 **Advanced Search** - Filter by location, price, size, and land type
- 📱 **Responsive Design** - Beautiful UI on all devices
- 💬 **Contact Sellers** - Buyers can send inquiries directly to sellers
- 📊 **Seller Dashboard** - Manage listings and view contact requests

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn UI (Radix Primitives)
- **Database**: MongoDB Atlas
- **Authentication**: NextAuth v5
- **Form Handling**: React Hook Form + Zod

## Pages

| Page         | Route        | Description                              |
| ------------ | ------------ | ---------------------------------------- |
| Home         | `/`          | Hero section with featured lands         |
| Explore      | `/explore`   | Browse and filter all listings           |
| Land Details | `/land/[id]` | View property details and contact seller |
| Login        | `/login`     | User authentication                      |
| Register     | `/register`  | Create new account                       |
| Dashboard    | `/dashboard` | Manage listings and inquiries            |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd landseller
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/landseller?retryWrites=true&w=majority
   AUTH_SECRET=your-super-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── actions/          # Server Actions (auth, land, contact)
├── app/              # App Router pages
│   ├── api/          # API routes
│   ├── dashboard/    # Dashboard pages
│   ├── explore/      # Explore lands page
│   ├── land/         # Land details page
│   ├── login/        # Login page
│   └── register/     # Register page
├── components/       # React components
│   └── ui/           # Shadcn UI components
├── lib/              # Utility functions
│   ├── auth.ts       # NextAuth configuration
│   ├── db.ts         # MongoDB connection
│   └── utils.ts      # Helper functions
├── models/           # Mongoose models
│   ├── User.ts
│   ├── Land.ts
│   └── ContactRequest.ts
├── types/            # TypeScript types
└── middleware.ts     # Auth middleware
```

## Database Models

### User

- name, email, password, phone
- Created/Updated timestamps

### Land

- title, description, price, area
- location (address, city, state, pincode)
- landType (residential/commercial/agricultural/industrial)
- features, images
- owner reference to User
- isFeatured, isActive flags

### ContactRequest

- land and seller references
- buyer info (name, email, phone, message)
- status (pending/read/responded)

## Features Breakdown

### For Buyers

- Browse all available land listings
- Filter by location, price range, area, and land type
- View detailed land information
- Contact sellers directly through the platform
- No account required to browse

### For Sellers

- Create an account and login
- Add new land listings with images and details
- Edit or delete existing listings
- View all contact requests from interested buyers
- Mark requests as read or responded

## Customization

### Adding More States

Edit the `STATES` array in:

- `src/components/LandFilters.tsx`
- `src/components/LandForm.tsx`

### Changing Color Theme

The primary color theme uses Emerald/Teal. To change:

- Update CSS variables in `src/app/globals.css`
- Modify component variants in `src/components/ui/`

### Adding Image Upload

Currently, the app uses Image URLs. To add file upload:

1. Add a storage provider (Cloudinary, AWS S3, etc.)
2. Create an upload API route
3. Update the LandForm component

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
AUTH_SECRET=generate-a-strong-secret
NEXTAUTH_URL=https://your-domain.com
```

## Scripts

```bash
# Development
pnpm dev

# Build
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
