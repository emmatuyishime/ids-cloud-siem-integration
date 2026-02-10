# Cloud SIEM Integration and Privacy-Aware Offloading Artifacts

## Overview

The contents of this repository presents:
- Integration of local IDS components with a cloud SIEM
- Secure and structured forwarding of inference and security events
- Separation of edge, fog, and cloud responsibilities
- Privacy-aware handling of security telemetry

The implementation targets **Microsoft Sentinel** as the SIEM platform and uses **Node-RED** as the orchestration and integration layer.
The **integration architecture** comprises of:

- **Edge-level intrusion detection** (low-latency inference)
- **Fog-level intrusion detection** (enhanced analytics and aggregation)
- **Cloud-based SIEM** (centralized security monitoring and correlation)

## Contents

### 🔹 Node-RED SIEM Integration Workflows

- **`Model Prediction Logging to Microsoft Sentinel -Flow.json`**

This Node-RED workflow implements:
- Subscription to prediction outputs from local IDS components
- Separation of **edge-level** and **fog-level** security events
- Transformation of prediction messages into SIEM-compatible payloads
- Secure transmission of logs to Microsoft Sentinel
- Response and error logging for observability

The workflow supports both:
- **Fog-level model predictions**
- **Edge-level model predictions**

### 🔹 Payload Construction and Secure Offloading Logic

- **`Predictions Payload.js`**

This JavaScript logic:
- Configure authentication and encryption
- Formats inference results into structured SIEM events
- Applies field filtering and normalization
- Supports privacy-aware payload construction prior to cloud offloading
- Ensures compatibility with Microsoft Sentinel ingestion endpoints

### 🔹 Configuration Artifacts

- **`Cloud SIEM & Components Deployment Configuration File`**

### 🔹 Graphical Flow Representation

To improve readability the repository includes a **snap** of the deployed Node-RED workflow:

- **Model Predictions Logging to Microsoft Sentinel – Flow (PNG)**

## License
Released under the **MIT License**. See `LICENSE` for details.
