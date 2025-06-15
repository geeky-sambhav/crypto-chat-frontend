## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charting**: Recharts
- **State Management**: React Hooks (`useState`, `useRef`, `useEffect`)
- **Browser APIs**: Web Speech API (`SpeechRecognition`, `SpeechSynthesis`), Fetch API

## 🚀 Getting Started

Instructions to set up and run the frontend on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [Bun](https://bun.sh/) (used as package manager and runtime)
- **A running instance of the [backend server](https://github.com/your-username/crypto-chat-backend-bun).**

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/geeky-sambhav/crypto-chat-frontend.git](https://github.com/geeky-sambhav/crypto-chat-frontend.git)
    cd crypto-chat-frontend
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    This project requires a connection to its backend. Create a `.env` file in the root directory:
    ```bash
    touch .env
    ```
    Open the `.env` file and add the following line, pointing to the local backend server's URL:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

### Running the Application

1.  Make sure your backend server is running.
2.  Start the frontend development server. We use port `3000` 
    ```bash
    bun run dev 
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.