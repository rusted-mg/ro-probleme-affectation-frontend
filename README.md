# Assignment Solver Frontend

This is the **React.js frontend** for the Assignment Problem Solver. It provides an interface to input assignment
matrices, visualize the solving process step by step, and display the optimal solution.

## Table of contents

<!-- TOC -->
* [Assignment Solver Frontend](#assignment-solver-frontend)
  * [Table of contents](#table-of-contents)
  * [Features](#features)
  * [Tech Stack](#tech-stack)
  * [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Running the Project](#running-the-project)
  * [Contributing](#contributing)
  * [License](#license)
<!-- TOC -->

## Features

- **Matrix Input**: Users can input cost/profit matrices manually or upload CSV files.
- **Visualization**: Displays the solving steps (row/column minimization, zero marking, etc.).
- **Real-time Updates**: Uses Redis-backed snapshots from the backend to display intermediate steps.
- **Optimization Modes**: Supports both **minimization** and **maximization** problems.
- **Job-Based Computation**: Fetches job progress using a unique **Job ID**.

## Tech Stack

- **React.js** (Vite) – UI Framework
- **TypeScript** – Type Safety
- **Tailwind CSS** – Styling
- **Axios** – API Requests

## Getting Started

### Prerequisites

Ensure you have:

- **Node.js** (latest LTS)
- **npm** or **yarn**

### Installation

```sh
git clone https://github.com/NoobCoders57/ro-probleme-affectation-frontend.git
cd ro-probleme-affectation-frontend
npm install
```

### Running the Project

```sh
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173).

## Contributing

1. Fork the repo
2. Create a new branch (`feat/new-feature`)
3. Commit your changes
4. Push and open a PR

## License

[MIT License](LICENSE)  
