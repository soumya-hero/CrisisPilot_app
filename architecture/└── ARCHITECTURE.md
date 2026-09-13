# CrisisPilot — System Architecture

## 1. Overview

CrisisPilot is a deterministic, simulation-based autonomous emergency response and resource coordination agent.

The system demonstrates how an agent can understand an emergency mission, observe the environment, evaluate available resources, create and execute a response plan, monitor results, detect failures, adapt its strategy, replan, and verify the final outcome.

CrisisPilot is designed as a safe local simulation for demonstrating agentic behavior. It does not perform real emergency dispatch, communicate with emergency services, or control physical resources.

---

## 2. Architecture Goals

The architecture is designed around the following principles:

- Goal-directed agent behavior
- Continuous observation and feedback
- Autonomous decision making
- Tool usage
- Adaptive replanning
- Failure detection and recovery
- Human-in-the-loop supervision
- Deterministic and repeatable execution
- Safe simulation instead of real emergency operations

---

## 3. High-Level System Architecture

```mermaid
flowchart TD
    H[Human Command Center Operator]
    UI[React Command Center UI]

    ORCH[Crisis Orchestrator]
    GOAL[Goal Manager]
    PLAN[Planning & Decision Engine]
    ACTION[Action Manager]

    TOOLS[Simulated Tool Layer]

    WEATHER[Weather Service]
    INCIDENT[Incident Database]
    RESOURCE[Resource Database]
    ROUTE[Route Engine]
    SHELTER[Shelter Database]
    SIM[Action Simulator]

    ENV[Simulated Emergency Environment]
    OBS[Observation & Feedback]
    VERIFY[Verification Engine]

    H --> UI
    UI --> ORCH

    ORCH --> GOAL
    GOAL --> PLAN
    PLAN --> ACTION
    ACTION --> TOOLS

    TOOLS --> WEATHER
    TOOLS --> INCIDENT
    TOOLS --> RESOURCE
    TOOLS --> ROUTE
    TOOLS --> SHELTER
    TOOLS --> SIM

    SIM --> ENV
    ENV --> OBS
    OBS --> ORCH

    ORCH --> VERIFY
    VERIFY --> ORCH

    ORCH --> UI
    UI --> H
