# LL3 Academic Thesis & Software Reproducibility Guide

This guide describes how to reproduce the software systems, threat simulations, and academic document artifacts for the Bachelor's Thesis:

> **„Impactul tehnologiilor inteligente asupra securitatii digitale”**  
> **Coordonator: prof. univ. dr. Georgeta Soava**  
> **Inventariere stack: Lucrare de licență — Inventar inițial**  
> **FEAA Craiova · Informatică Economică 2026**

### Tech Stack & Lab Scope
* **Stack:** Windows Server, Linux, networking TCP/IP, wire shark, tcpdump, SIEMuri precum Splunk, Elastic, Wazuh sau Sentinel, EDR, IDS/IPS, nmap, nessus, openVAS, burp, powershell, python, git, mașini virtuale, sysmon, sigma, yara, snort, MISP, malware autopsy, volatility, ghidra, IDA sau x64dbg, directiva NIS2, MITRE ATT&CK pentru cartografierea atacurilor, Ansible, Python și Terraform pentru IaC, automatizând izolarea VM-urilor compromise în urma alertelor din SIEM, Kubernetes, AWS.
* **Simulări:** Red-teaming ușor, Honeypot pe OS vechi, mediu bancar (Windows 10/11 + Active Directory), analiză malware, vulnerabilitate rețele Wi-Fi & detecție SOC, simulare atacuri APT, reverse engineering.
* **Mențiune:** Între VM-urile mele, niciun atac nu va părăsi mașinile mele virtuale; lucrarea de licență va fi efectuată într-un cadru legal.

---

## 1. Quick Verification Matrix

| Target Component | Build / Run Command | Expected Output | Verification Criteria |
| :--- | :--- | :--- | :--- |
| **Python Attack Simulator** | `python3 banking_attack_simulator.py` | 5 MITRE ATT&CK Scenarios Executed | 100% Defensive Interception Rate |
| **Banking Test Suite** | `pytest -v test_banking_suite.py` | Pytest report across 7+ test cases | All assertions PASS |
| **Spring Boot Backend** | `mvn clean test package` | `target/bank-kiosk-backend-*.jar` | Zero JUnit test failures |
| **Live Smoke Probing** | `python3 smoke_test_backend.py` | HTTP 200 OK + JWT bearer validation | Live REST responses & SIEM stream |
| **DOCX <-> LaTeX Parity** | `python3 ../../../scripts/sync_academic_docs.py --verify` | Parity audit report | Both DOCX files verified |
| **LaTeX Compilation** | `latexmk -pdf main.tex` | `main.pdf` | Document compiled without fatal errors |

---

## 2. Step-by-Step Reproduction Instructions

### 2.1. Environment Preparation
```bash
# Clone repository
git clone https://github.com/stefanutc1/proiecte.git
cd proiecte/licenta/LL3-LucrareLicenta/code

# Python virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2.2. Executing Threat Scenarios
```bash
python3 banking_attack_simulator.py
```
The console will display:
* Scenario 1: SQL Injection via Authentication form $\rightarrow$ Sanitized & rejected.
* Scenario 2: Direct Ledger Database modification $\rightarrow$ SHA-256 hash mismatch flagged by audit monitor.
* Scenario 3: Brute-force card CVV stuffing $\rightarrow$ Adaptive rate-limiting triggered.
* Scenario 4: Lateral movement to Core Banking from unauthorized subnet $\rightarrow$ Rejected by network segmentation rule.
* Scenario 5: Denial-of-Service transaction flood $\rightarrow$ Alert generated for SIEM.

### 2.3. Compiling the Academic Document
```bash
cd ../latex
latexmk -pdf -interaction=nonstopmode main.tex
```
Produces the complete final PDF with all chapters and references.

*For full monorepo reproducibility across other student coursework, refer to [`docs/reproducibility.md`](../../docs/reproducibility.md).*
