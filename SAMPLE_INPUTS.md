# Sample Inputs for Mission & Vision Workflow

## 📋 **Module 1: Mission & Vision Creation - Sample Data**

Below are sample inputs you can use to test the workflow functionality. These examples are based on different industries and transformation scenarios.

### 🏭 **Example 1: Manufacturing Company**

**Current / As-IS Scenario:**
```
We are a traditional manufacturing company with 50 years of experience in automotive parts production. Currently, we rely heavily on manual processes, paper-based documentation, and legacy systems. Our production planning is reactive rather than predictive, leading to inefficiencies and waste. We have limited real-time visibility into our supply chain and struggle with inventory management. Customer communication is primarily through phone and email, making it difficult to provide real-time updates on orders.
```

**Industry:** `Manufacturing`

**Market Segment:** `B2B Automotive Parts`

**Transformation Goal:**
```
We want to become a smart manufacturing leader by implementing Industry 4.0 technologies including IoT sensors, predictive analytics, and automated production lines. Our goal is to achieve 30% reduction in waste, 25% improvement in production efficiency, and provide real-time supply chain visibility to our customers.
```

**Intended TO-BE for Transformation:**
```
By 2027, we will be a fully connected smart factory with AI-driven predictive maintenance, automated quality control, and real-time supply chain optimization. Our customers will have complete visibility into their orders through digital dashboards, and we will proactively prevent issues before they impact production. All processes will be data-driven with continuous improvement powered by machine learning algorithms.
```

**Additional Context:**
```
We have a workforce of 200 employees, annual revenue of $50M, and serve major automotive OEMs. Leadership is committed to digital transformation with a $5M budget allocated over 3 years. Main challenges include resistance to change from long-term employees and integration with customer legacy systems.
```

---

### 🏥 **Example 2: Healthcare Organization**

**Current / As-IS Scenario:**
```
We are a mid-sized healthcare network with 3 hospitals and 15 clinics serving a regional population of 500,000. Our current systems are fragmented with different electronic health records (EHR) systems across facilities. Patient data is siloed, making it difficult to provide coordinated care. Appointment scheduling is manual, leading to inefficiencies and patient frustration. We lack predictive analytics for patient outcomes and population health management.
```

**Industry:** `Healthcare`

**Market Segment:** `Regional Healthcare Network`

**Transformation Goal:**
```
Transform into a digitally-enabled healthcare ecosystem that provides personalized, predictive, and preventive care. Implement unified patient data platforms, AI-powered diagnostic assistance, and telehealth capabilities to improve patient outcomes while reducing costs by 20%.
```

**Intended TO-BE for Transformation:**
```
By 2026, we will operate as an integrated digital health network with unified patient records accessible across all facilities. AI algorithms will assist in early disease detection and treatment recommendations. Patients will have seamless access to care through telehealth platforms and mobile apps. Population health analytics will enable proactive community health interventions.
```

**Additional Context:**
```
We serve both urban and rural communities with varying digital literacy levels. Current challenges include regulatory compliance (HIPAA), interoperability between systems, and physician adoption of new technologies. We have strong community trust and partnerships with local organizations.
```

---

### 🏪 **Example 3: Retail Chain**

**Current / As-IS Scenario:**
```
We operate 50 retail stores across the region with traditional point-of-sale systems and manual inventory management. Our customer data is limited to basic transaction records, and we lack insights into customer preferences and behavior patterns. Marketing campaigns are broad-based rather than targeted, resulting in low conversion rates. Supply chain management relies on historical data and gut feeling rather than predictive analytics.
```

**Industry:** `Retail`

**Market Segment:** `B2C Fashion and Lifestyle`

**Transformation Goal:**
```
Become an omnichannel retail leader by creating seamless online and offline experiences, implementing AI-driven personalization, and optimizing inventory through predictive analytics. Target 40% increase in customer lifetime value and 50% improvement in inventory turnover.
```

**Intended TO-BE for Transformation:**
```
By 2025, we will offer a unified shopping experience across all touchpoints with personalized recommendations powered by AI. Real-time inventory optimization will ensure products are available when and where customers want them. Advanced analytics will predict fashion trends and optimize buying decisions. Customers will enjoy seamless experiences from discovery to delivery.
```

**Additional Context:**
```
Target demographic is 25-45 year old professionals with growing e-commerce expectations. Main competitors are expanding digital capabilities rapidly. We have strong brand loyalty and prime retail locations but need to modernize to stay competitive.
```

---

### 🏦 **Example 4: Financial Services**

**Current / As-IS Scenario:**
```
We are a community bank with 12 branches serving local businesses and individuals for over 30 years. Our core banking systems are outdated, and most customer interactions require in-person visits or phone calls. Loan approval processes are manual and time-consuming, taking 2-3 weeks on average. We lack digital banking capabilities and real-time fraud detection systems.
```

**Industry:** `Financial Services`

**Market Segment:** `Community Banking`

**Transformation Goal:**
```
Transform into a digital-first community bank while maintaining our personal touch. Implement mobile banking, automated loan processing, and AI-powered financial advisory services. Reduce loan processing time to 24 hours and increase customer satisfaction scores by 35%.
```

**Intended TO-BE for Transformation:**
```
By 2026, we will be a digitally-enabled community bank offering 24/7 mobile banking services with AI-powered financial insights. Customers will access personalized financial advice through digital channels while maintaining the option for in-person consultations. All processes will be streamlined with automated compliance and risk management.
```

**Additional Context:**
```
Serving both tech-savvy millennials and traditional customers who prefer in-person service. Regulatory requirements are strict, and cybersecurity is a major concern. We have deep community relationships and local market knowledge as competitive advantages.
```

---

## 🚀 **How to Test These Samples**

1. **Access the Application**: Go to http://localhost:3001
2. **Sign In**: Use any email/password (demo@bookgpt.com / demo123)
3. **Select 7Ms Book**: Choose "The 7Ms of Digital Transformation" from sidebar
4. **Switch to Workflow Mode**: Click "Workflow Mode" in the top header
5. **Start Module 1**: Click "Mission & Vision Creation"
6. **Copy & Paste**: Use any of the sample data above to fill the form
7. **Generate**: Click "Generate Mission & Vision Statements"
8. **Review**: Examine the 3 different strategic approaches generated

## 📊 **Expected Output Format**

The system will generate 3 different approaches:

**Digital-First Approach**: Emphasizes technology leadership and innovation
**Customer-Centric Approach**: Focuses on enhanced customer experience  
**Transformation-Focused Approach**: Highlights organizational change and capability building

Each approach includes:
- Mission Statement (2-3 sentences)
- Vision Statement (1-2 sentences)
- Rationale explaining why this approach fits the context

## 🔧 **API Testing**

You can also test the API directly using PowerShell:

```powershell
$body = @{
    userInputs = @{
        currentScenario = "We are a traditional manufacturing company..."
        industry = "Manufacturing"
        marketSegment = "B2B Automotive Parts"
        goal = "Become a smart manufacturing leader..."
        intendedToBe = "Fully connected smart factory..."
        additionalContext = "200 employees, $50M revenue..."
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3004/api/mission-vision" -Method POST -ContentType "application/json" -Body $body
```

This will return a JSON response with the generated mission/vision options.
