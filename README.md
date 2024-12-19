# Salon Services Dashboard

A React-based web application for managing and displaying salon services with features like pagination, search functionality, and responsive design.

## Features

- 📋 Display salon services in a tabular format
- 🔍 Real-time search functionality
- ⏮️ Pagination support
- 📱 Responsive design (mobile-friendly)
- ⌛ Loading states
- ❌ Error handling
- 🖼️ Image fallback support

## Technologies Used

- React.js
- Axios for API calls
- Tailwind CSS for styling
- REST API integration

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Roshnnnnn/trakky.git
```

2. Install dependencies:

```bash
cd salon-services-dashboard
npm install
```

3. Start the development server:

```bash
npm run dev
```

## API Endpoints

The application connects to the following API endpoint:

```
http://20.193.149.47:2242/salons/service/
```

## Usage

### Search Functionality

- Use the search bar to filter services by salon name
- Search is case-insensitive and updates in real-time

### Pagination

- Navigate through pages using Previous/Next buttons
- Displays 10 items per page
- Buttons are automatically disabled when reaching the start/end of the list

### Service Information Display

Each service entry displays:

- Salon Name
- Service Description
- Service Name
- Price
- Service Image

## Error Handling

- Displays loading spinner during API calls
- Shows error messages if API requests fail
- Image fallback mechanism for broken image links

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
