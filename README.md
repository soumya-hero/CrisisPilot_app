# CrisisPilot 🚨

## Autonomous Emergency Response & Resource Coordination Agent

CrisisPilot is an agentic emergency-response coordination prototype that demonstrates how an autonomous agent can observe changing conditions, make decisions, plan actions, execute them, detect failures, adapt its strategy, replan, and verify the final outcome.

The current prototype is a **safe, deterministic local simulation** designed for hackathon demonstration. It is not connected to real emergency dispatch systems.

## 🔗 Links

* **Live Demo:** https://crisispilot.ai.studio/
* **GitHub Repository:** https://github.com/soumya-hero/CrisisPilot_app

## 🎯 Problem

Emergency situations such as floods involve continuously changing weather, incidents, rescue-team availability, routes, and shelter capacity. Traditional dashboards mainly display information, while simple recommendation systems may not continuously adapt when conditions change.

CrisisPilot demonstrates an agentic approach that can:

**Observe → Decide → Plan → Act → Detect Failure → Adapt → Replan → Verify**

## 🤖 Agentic Workflow

```text
Goal
 ↓
Observe
 ↓
Decide
 ↓
Plan
 ↓
Act
 ↓
Intermediate Result
 ↓
Failure Detection
 ↓
Adapt
 ↓
Replan
 ↓
Act Again
 ↓
Verify
 ↓
Mission Completed
```

## 🌊 Demonstration Scenario

Mission:

**"Protect residents in Flood Zone A."**

The agent initially selects:

```text
Team 2 → Route R1 → Flood Zone A
```

During execution, Route R1 becomes blocked.

The agent then:

1. Detects the failure.
2. Invalidates the existing plan.
3. Evaluates alternative resources and routes.
4. Selects Team 4 and Route R3.
5. Creates a new plan.
6. Executes the new plan.
7. Verifies the mission constraints.
8. Reports the final outcome.

```text
Team 2 → Route R1
              ↓
           BLOCKED
              ↓
       Detect Failure
              ↓
       Adapt & Replan
              ↓
Team 4 → Route R3
              ↓
        Verification
              ↓
     Mission Completed
```

## 🧠 Key Agentic Capabilities

* Goal-driven execution
* Environmental observation
* Decision making
* Multi-step planning
* Tool interaction
* Mission memory/state
* Action execution
* Failure detection
* Adaptive replanning
* Verification
* Human-in-the-loop control

## 🛠️ Simulated Tools

The prototype demonstrates interaction with:

* Weather Service
* Incident Database
* Resource Database
* Route Engine
* Shelter Database
* Action Simulator

> These are simulated tools in the current prototype and are not connected to real emergency-management systems.

## 🏗️ Architecture

The system consists of:

```text
Human Command Center
        ↓
Crisis Orchestrator
        ↓
Goal Manager
        ↓
Planning & Decision Engine
        ↓
Action Manager
        ↓
Simulated Tools
        ↓
Simulated Emergency Environment
        ↓
Feedback / Observation
        ↓
Verification
        ↓
Success / Failure
        ↓
Adapt & Replan
        ↺
Crisis Orchestrator
```

Detailed architecture documentation is provided in:

```text
architecture/ARCHITECTURE.md
```

## 👤 Human-in-the-Loop

The Command Center allows a human operator to:

* Define the mission
* Monitor agent activity
* Observe decisions
* Monitor resources
* Observe simulated failures
* Review verification results
* Control the demonstration
* Review the final outcome

The human remains in control of the system.

## 💻 Technology Stack

* React
* TypeScript
* Vite
* Local React State
* Deterministic Agent State Machine
* Simulated Emergency Tools
* Responsive Web Interface

## 📁 Project Structure

```text
CrisisPilot_app/
├── src/
├── public/
├── architecture/
│   └── ARCHITECTURE.md
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## ⚙️ Setup Instructions

### Prerequisites

Install:

* Node.js
* npm
* Git

Check your installation:

```bash
node --version
npm --version
git --version
```

### Clone Repository

```bash
git clone https://github.com/soumya-hero/CrisisPilot_app.git
cd CrisisPilot_app
```

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Create a local environment file from the provided example:

```bash
cp .env.example .env
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure the required environment variables in `.env`.

**Do not commit API keys, passwords, tokens, or other secrets to GitHub.**

### Run Locally

```bash
npm run dev
```

Open the local URL provided by Vite, typically:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 📦 Dependencies

Project dependencies and scripts are defined in:

```text
package.json
```

Install all dependencies using:

```bash
npm install
```

## 📚 Documentation

Architecture documentation:

```text
architecture/ARCHITECTURE.md
```

It describes the Crisis Orchestrator, agent workflow, tools, memory/state, planning, verification, failure handling, adaptive replanning, and human interaction.

## 🎥 Recommended Demo Flow

1. Define the emergency mission.
2. Show the agent observing the environment.
3. Show the initial decision.
4. Show Team 2 using Route R1.
5. Trigger or observe the Route R1 failure.
6. Show failure detection.
7. Show adaptive replanning.
8. Show Team 4 using Route R3.
9. Show verification.
10. Display **Mission Completed**.

## 🚧 Current Scope

CrisisPilot is currently a deterministic simulation for demonstrating agentic emergency-response behavior.

It does not currently provide:

* Real emergency dispatch
* Real rescue operations
* Real government emergency integrations
* Production disaster-management infrastructure
* Real-world safety guarantees

All emergency data, routes, resources, and actions in the demonstration are simulated.

## 🔮 Future Scope

Potential future improvements include:

* Real-time weather APIs
* Real road and traffic data
* GIS/map integration
* Government disaster-management data
* Real-time emergency notifications
* LLM-based planning
* Retrieval-Augmented Generation (RAG)
* Multi-agent coordination
* Advanced risk prediction
* Production deployment
* Authorized emergency-system integrations

## 🏆 Hackathon Requirement Mapping

| Requirement                | CrisisPilot                    |
| -------------------------- | ------------------------------ |
| Source Code                | Public GitHub repository       |
| Setup Instructions         | This README                    |
| Dependencies               | `package.json`                 |
| Environment Configuration  | `.env.example`                 |
| README                     | `README.md`                    |
| Architecture Documentation | `architecture/ARCHITECTURE.md` |
| Agent / Controller         | Crisis Orchestrator            |
| Tools                      | Simulated emergency tools      |
| Memory / State             | Mission state                  |
| Planning                   | Planning & Decision Engine     |
| Evaluation                 | Verification layer             |
| Human Interaction          | Command Center                 |
| Failure Handling           | Adaptive replanning            |
| Runnable Demo              | Live deployed application      |

## ⚠️ Disclaimer

CrisisPilot is a hackathon prototype and simulation intended for demonstration and educational purposes. It is not a certified emergency-management system and should not be used for real-world emergency, medical, evacuation, rescue, or public-safety decisions.
