# gather-lightbulb

A simple Node.js application for blink the lightbulb in Gather using a Gather webhook.

## How to use

### 1. Fork the repository

First, fork this repository to your own GitHub account.

### 2. Clone your fork

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/gather-lightbulb.git
cd gather-lightbulb
```

Replace `your-username` with your GitHub username.

### 3. Configure the environment variables

Create a `.env` file in the project root and add your Gather webhook secret:

```env
GATHER_WEBHOOK_SECRET=your_gather_webhook_secret
```

### 4. Run the project

Start the application with:

```bash
node blink-lamp.js
```

The application will start running and control the Gather lightbulb.

To stop the application, press:

```text
Ctrl + C
```

Nothing special.
