# BuildIt — Startup Idea Validator
 
A web app that analyzes and scores startup ideas, generating a detailed validation report with market insights, competitor analysis, risks, and opportunities.
 
## Features
 
- **Idea Scoring** — Rates your startup across four dimensions: Market Opportunity, Competition Level, Feasibility, and Monetization Potential
- **Competitor Analysis** — Identifies key competitors and summarizes their positioning
- **Risk & Opportunity Breakdown** — Surfaces the top risks to watch and opportunities to exploit
- **Final Verdict** — A concise AI-generated conclusion on whether to build the idea
- **Shareable Reports** — Generate a shareable link for your validation report
- **PDF Export** — Download the report as a PDF
## Tech Stack
 
- **React** with React Router (`useParams` for report routing)
- **Tailwind CSS** for styling
- **LocalStorage** for persisting report data between sessions
## Project Structure
 
```
src/
├── components/
│   ├── CategoryScore.jsx       # Score pill for each validation dimension
│   ├── CompetitionCard.jsx     # Individual competitor card
│   ├── RiskCard.jsx            # Risks section card
│   ├── OpportunitiesCard.jsx   # Opportunities section card
│   └── ShareDialog.jsx         # Share URL dialog
├── pages/
│   └── Results.jsx             # Main report results page
└── utils/
    ├── shareReport.js          # Logic for generating shareable URLs
    └── pdfExports.js           # PDF download logic
```
 
## Getting Started
 
### Prerequisites
 
- Node.js 18+
- npm or yarn
### Installation
 
```bash
git clone https://github.com/your-username/buildit.git
cd buildit
npm install
```
 
### Running locally
 
```bash
npm run dev
```
 
Open [http://localhost:5173](http://localhost:5173) in your browser.
 
### Building for production
 
```bash
npm run build
```
 
## How It Works
 
1. User submits a startup idea through the input form
2. The app sends the idea to an AI model for analysis
3. The response is parsed into a structured report and saved to `localStorage` under the key `result_<id>`
4. The user is redirected to `/results/<id>` where the report is rendered
## Report Data Shape
 
Each report stored in `localStorage` follows this structure:
 
```json
{
  "title": "Idea name",
  "stage": "Idea / MVP / Growth",
  "summary": {
    "industry": "Industry name",
    "targetAudience": "Who this is for"
  },
  "buildItScore": 72,
  "categoryScores": {
    "marketOpportunity": 80,
    "competitionLevel": 60,
    "feasibility": 75,
    "monetizationPotential": 70
  },
  "competitors": [
    { "name": "Competitor A", "description": "What they do" }
  ],
  "risks": ["Risk 1", "Risk 2"],
  "opportunities": ["Opportunity 1", "Opportunity 2"],
  "verdict": "Final AI verdict text"
}
```
