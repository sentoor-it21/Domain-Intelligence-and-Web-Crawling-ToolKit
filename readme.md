# 🛡️ Domain Intelligence & Web Crawling Toolkit

A full-stack application built using **C# (.NET)**, **Ember.js**, **SQLite**, and **Puppeteer**, designed for validating email domains and crawling websites to detect Managed Service Provider (MSP) links, competitor presence, and other organization-specific references. This project includes two major modules:

---

## ✉️ Module 1: Email Validation & Domain Intelligence

This module validates email IDs and analyzes their associated domains for trust and reputation.

### 🔍 Features

✅ **Email Validation**  
  Extracts and verifies the domain from the entered email ID.

📊 **Trust Score Evaluation**  
  Determines the trustworthiness of the domain.

🌐 **Google Popularity Check**  
  Assesses the online popularity of the domain.

🏢 **Competitor Detection**  
  Identifies whether the domain is a competitor of a specific organization.

🔢 **Global Rank Display**  
  Shows a rank based on domain visibility and metrics.

📸 **Screenshot Capture**  
  Uses Puppeteer to capture the homepage of the domain.

🧠 **Groq API Integration**  
  Queries the domain using Groq’s prompt-based intelligence to retrieve insights.

---

## 🌐 Module 2: Website Crawler & MSP Link Detection

This module crawls entire websites (depth-first) and detects internal references, links, and content related to a specific organization.

### 🔍 Features

🔍 **Deep Web Crawling**  
  Crawls all internal pages using depth-first search (e.g., /about, /services/example, etc.).

🔗 **MSP Link Detection**  
  Detects links or content promoting a specific organization (e.g., as a Managed Service Provider).

📸 **Targeted Screenshot Capture**  
  Takes screenshots of pages containing organization-related mentions.

💾 **Data Storage**  
  Stores all crawled links and screenshots in the database for future reference.

⚙️ **MSP Link Status Check**  
  Verifies if the found MSP links are actually **live and accessible**

🏢 **Competitor Identification**  
  Detects if the target website is a potential competitor of the specific organization.

---

## 🛠️ Tech Stack

| Layer        | Technology           |
|--------------|----------------------|
| Frontend     | Ember.js             |
| Backend      | ASP.NET Core (C#)    |
| Database     | SQLite               |
| Web Crawling | Puppeteer            |
| AI/Analysis  | Groq API             |

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/3782d7be-009d-42fe-a1bc-12ca29b30243)
![image](https://github.com/user-attachments/assets/4f5ee10f-c7a0-4d67-8039-ddb74c927039)

---
