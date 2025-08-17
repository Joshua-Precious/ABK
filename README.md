# Accra Boogie King (ABK) 2025 - Official Website

A comprehensive React-based website for Ghana's premier dance competition, featuring registration, gallery, and admin functionality.

## 🚀 Features

- **Responsive Design**: Mobile-first design with smooth animations
- **Team Registration**: Complete registration form with validation
- **Database Integration**: Appwrite backend for data management  
- **Email Notifications**: Automated email notifications via EmailJS
- **Admin Dashboard**: View and manage registrations
- **Gallery**: Showcase past events and hall of fame
- **Search Functionality**: Smart search across all pages
- **Progressive Loading**: Animated section loading for better UX

## 🛠 Tech Stack

- **Frontend**: React 19.1, Vite 7.1
- **Styling**: TailwindCSS 4.1, DaisyUI 5.0
- **Backend**: Appwrite (Database, Authentication)
- **Email**: EmailJS for notifications
- **Icons**: Lucide React
- **Routing**: React Router 7.8

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18+ recommended)
- npm or yarn package manager
- Appwrite account and project setup
- EmailJS account for email notifications

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ABK
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy the `.env` file and update with your credentials:
   ```bash
   # Appwrite Configuration
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_REGISTRATION_COLLECTION_ID=registrations

   # EmailJS Configuration
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_confirmation_template_id
   VITE_ADMIN_EMAIL=your_admin_email@gmail.com
   ```

4. **Database Setup**
   ```bash
   npm run dev
   # Navigate to http://localhost:5173/setup
   # Click "Test Connection" → "Setup Collection" → "Test Registration"
   ```

## 🚀 Usage

### Development
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📱 Application Routes

- `/` - Home page with event info and auditions
- `/register` - Team registration form
- `/gallery` - Past events and hall of fame
- `/admin` - Admin dashboard (view registrations)
- `/test` - Test registration system
- `/setup` - Database setup and testing

## 🔧 Configuration

### Appwrite Setup
1. Create an Appwrite project
2. Create a database named "abk-database"
3. The application will auto-create the "registrations" collection
4. See `APPWRITE_SETUP.md` for detailed setup instructions

### EmailJS Setup
1. Create EmailJS account
2. Set up email service and templates
3. See `EMAILJS_SETUP.md` for detailed setup instructions

## 🧪 Testing

### Automated Testing
- Navigate to `/test` to run registration system tests
- Choose between full system, Appwrite-only, or email-only tests

### Manual Testing Checklist
- [ ] Home page loads and animations work
- [ ] Navigation between pages works
- [ ] Search functionality works across pages
- [ ] Registration form validation works
- [ ] Registration submission saves to database
- [ ] Email notifications are sent
- [ ] Admin dashboard displays registrations
- [ ] Gallery tabs and content work
- [ ] Responsive design works on mobile/desktop

## 📁 Project Structure

```
src/
├── appwrite/          # Appwrite configuration and services
├── components/        # Reusable components
│   └── assets/       # Images and static assets
├── routes/           # Page components
├── services/         # External service integrations
├── styles/           # CSS and styling
└── utils/            # Utility functions and setup
```

## 🎨 Design Features

- **Dark Theme**: Professional dark color scheme
- **Smooth Animations**: Progressive loading and hover effects
- **Mobile Responsive**: Optimized for all screen sizes
- **Modern UI**: Clean, professional design with TailwindCSS
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**: Run `npm run lint` to check for code issues
2. **Database Connection**: Use `/setup` route to test and configure
3. **Email Not Working**: Check EmailJS configuration and spam folder
4. **Assets Not Loading**: Verify all images are in `src/components/assets/`

### Environment Issues
- Ensure all VITE_ prefixed environment variables are set
- Restart development server after changing environment variables
- Check browser console for detailed error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: pcjosh00@gmail.com
- Check the setup guides in `APPWRITE_SETUP.md` and `EMAILJS_SETUP.md`
- Use the `/test` route for system diagnostics

---

**Accra Boogie King 2025** - Ghana's Ultimate Dance Competition
