# Telugu Language Learning Platform

A comprehensive Telugu language learning platform designed to help adult beginners learn Telugu effectively.

## Features

- Interactive Telugu alphabet lessons
- Grammar lessons with examples
- Progress tracking
- Audio pronunciations
- Practice exercises

## Local Deployment

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Make the deployment script executable:
```bash
chmod +x deploy.sh
```

3. Run the deployment script:
```bash
./deploy.sh
```

The application will be available at `http://localhost:5000`

### Manual Setup

If you prefer to run commands manually:

1. Install dependencies:
```bash
npm install
```

2. Build the application:
```bash
npm run build
```

3. Start the server:
```bash
NODE_ENV=production node dist/index.js
```

## Development

To run the application in development mode:

```bash
npm run dev
```

The development server will be available at `http://localhost:5000`
