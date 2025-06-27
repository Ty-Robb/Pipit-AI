# ADK Marketing Agency Migration Strategy

## Overview

This document outlines a practical approach to implementing Google's ADK Marketing Agency in your project, then extending it with your AI Marketing Platform's functionality. The strategy follows a "replicate, integrate, extend" pattern.

## Phase 1: Replicate ADK Marketing Agency (Week 1-2)

### Step 1: Set Up Python Environment
```bash
# Create a dedicated Python service directory
mkdir -p src/services/adk-marketing
cd src/services/adk-marketing

# Copy the ADK marketing agency structure
cp -r /path/to/adk-samples/python/agents/marketing-agency/* .

# Set up Python environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install poetry
poetry install
```

### Step 2: Configure Google Cloud
```bash
# Create .env file
cp .env.example .env

# Add your Google Cloud credentials
GOOGLE_GENAI_USE_VERTEXAI=true
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
```

### Step 3: Test Original Functionality
```bash
# Run the marketing agency locally
adk run marketing_agency

# Test each workflow step:
# 1. Domain name suggestions
# 2. Website creation
# 3. Marketing strategy
# 4. Logo design
```

### Step 4: Create Docker Container
```dockerfile
# src/services/adk-marketing/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy project files
COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.create false && poetry install --no-dev

COPY . .

EXPOSE 8000

CMD ["uvicorn", "api_server:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Phase 2: Create API Bridge (Week 2-3)

### Step 1: Build FastAPI Server
```python
# src/services/adk-marketing/api_server.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from marketing_agency import marketing_coordinator
import asyncio

app = FastAPI()

# Enable CORS for your Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AgentRequest(BaseModel):
    message: string
    session_id: str
    context: dict = {}

class AgentResponse(BaseModel):
    response: str
    agent_used: str
    metadata: dict = {}

@app.post("/api/agent/process")
async def process_message(request: AgentRequest):
    try:
        # Process through marketing coordinator
        result = await marketing_coordinator.process(
            message=request.message,
            session_id=request.session_id,
            context=request.context
        )
        
        return AgentResponse(
            response=result.content,
            agent_used=result.agent_name,
            metadata=result.metadata
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

### Step 2: Create TypeScript Client
```typescript
// src/services/adk-client.ts
export interface ADKAgentRequest {
  message: string;
  sessionId: string;
  context?: Record<string, any>;
}

export interface ADKAgentResponse {
  response: string;
  agentUsed: string;
  metadata?: Record<string, any>;
}

export class ADKClient {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.ADK_SERVICE_URL || 'http://localhost:8000') {
    this.baseUrl = baseUrl;
  }

  async processMessage(request: ADKAgentRequest): Promise<ADKAgentResponse> {
    const response = await fetch(`${this.baseUrl}/api/agent/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`ADK service error: ${response.statusText}`);
    }

    return response.json();
  }
}
```

## Phase 3: Integrate with Your Platform (Week 3-4)

### Step 1: Create Workflow Adapter
```typescript
// src/services/workflow-adk-adapter.ts
import { ADKClient } from './adk-client';
import { WorkflowComponent } from '@/types';

export class WorkflowADKAdapter {
  private adkClient: ADKClient;
  
  constructor() {
    this.adkClient = new ADKClient();
  }

  async processWorkflowStep(
    component: WorkflowComponent,
    userInput: string,
    context: WorkflowContext
  ): Promise<ComponentResult> {
    // Map your workflow components to ADK agents
    const adkMessage = this.formatForADK(component, userInput, context);
    
    const response = await this.adkClient.processMessage({
      message: adkMessage,
      sessionId: context.sessionId,
      context: {
        tenant: context.tenant,
        workflowId: context.workflowId,
        componentType: component.type,
      }
    });

    // Convert ADK response to your platform format
    return this.adaptResponse(response, component);
  }

  private formatForADK(
    component: WorkflowComponent,
    userInput: string,
    context: WorkflowContext
  ): string {
    // Map component types to ADK workflow steps
    const componentToADKMap = {
      'domain-research': 'help me find domain names for',
      'website-design': 'create a website for',
      'marketing-strategy': 'create marketing strategy for',
      'brand-identity': 'design a logo for',
    };

    return `${componentToADKMap[component.type]} ${userInput}`;
  }
}
```

### Step 2: Update Your AI Service
```typescript
// src/services/ai-service.ts
import { WorkflowADKAdapter } from './workflow-adk-adapter';

export class EnhancedAIService {
  private adkAdapter: WorkflowADKAdapter;
  private useADK: boolean;

  constructor() {
    this.adkAdapter = new WorkflowADKAdapter();
    this.useADK = process.env.FEATURE_ADK_ENABLED === 'true';
  }

  async processComponent(
    component: WorkflowComponent,
    userInput: string,
    context: WorkflowContext
  ): Promise<ComponentResult> {
    if (this.useADK && this.isADKCompatible(component)) {
      // Use ADK for compatible components
      return this.adkAdapter.processWorkflowStep(component, userInput, context);
    } else {
      // Use existing OpenAI integration
      return this.legacyProcess(component, userInput, context);
    }
  }

  private isADKCompatible(component: WorkflowComponent): boolean {
    const adkComponents = [
      'domain-research',
      'website-design',
      'marketing-strategy',
      'brand-identity'
    ];
    return adkComponents.includes(component.type);
  }
}
```

## Phase 4: Extend ADK Functionality (Week 4-6)

### Step 1: Add Your Custom Agents
```python
# src/services/adk-marketing/marketing_agency/sub_agents/audience_analysis/agent.py
from google.adk.agents import LlmAgent
from google.adk.tools import Tool

audience_analysis_agent = LlmAgent(
    name="audience_analysis",
    model="gemini-2.5-pro-preview-05-06",
    description="Analyze target audience demographics and psychographics",
    instruction="""
    You are an expert in audience analysis for marketing strategies.
    Given a business or product description, provide:
    1. Detailed demographic analysis
    2. Psychographic profiles
    3. Pain points and needs
    4. Preferred communication channels
    5. Purchasing behavior insights
    """,
    tools=[
        # Add custom tools for data analysis
    ]
)
```

### Step 2: Extend Marketing Coordinator
```python
# src/services/adk-marketing/marketing_agency/agent.py
from .sub_agents.audience_analysis import audience_analysis_agent
from .sub_agents.competitive_research import competitive_research_agent
from .sub_agents.value_proposition import value_proposition_agent

# Extend the marketing coordinator with your agents
enhanced_marketing_coordinator = LlmAgent(
    name="enhanced_marketing_coordinator",
    model=MODEL,
    description="Enhanced marketing coordinator with additional capabilities",
    instruction=ENHANCED_COORDINATOR_PROMPT,
    tools=[
        # Original agents
        AgentTool(agent=domain_create_agent),
        AgentTool(agent=website_create_agent),
        AgentTool(agent=marketing_create_agent),
        AgentTool(agent=logo_create_agent),
        
        # Your custom agents
        AgentTool(agent=audience_analysis_agent),
        AgentTool(agent=competitive_research_agent),
        AgentTool(agent=value_proposition_agent),
    ],
)
```

### Step 3: Add Tenant Awareness
```python
# src/services/adk-marketing/tenant_context.py
class TenantContextManager:
    def __init__(self, tenant_id: str):
        self.tenant_id = tenant_id
        self.branding = self.load_tenant_branding()
        self.constraints = self.load_tenant_constraints()
    
    def apply_to_prompt(self, prompt: str) -> str:
        return f"""
        Tenant Context:
        - Brand: {self.branding['name']}
        - Colors: {self.branding['colors']}
        - Voice: {self.branding['voice']}
        
        {prompt}
        """
    
    def filter_results(self, results: list) -> list:
        # Apply tenant-specific filtering
        return [r for r in results if self.is_allowed(r)]
```

## Phase 5: Production Deployment (Week 6-7)

### Step 1: Docker Compose Integration
```yaml
# docker-compose.yml addition
services:
  # ... existing services ...
  
  adk-marketing:
    build: ./src/services/adk-marketing
    environment:
      - GOOGLE_GENAI_USE_VERTEXAI=true
      - GOOGLE_CLOUD_PROJECT=${GOOGLE_CLOUD_PROJECT}
      - GOOGLE_APPLICATION_CREDENTIALS=/app/credentials.json
    volumes:
      - ./credentials.json:/app/credentials.json:ro
    ports:
      - "8000:8000"
    networks:
      - app-network
```

### Step 2: Update Next.js Configuration
```typescript
// next.config.js
module.exports = {
  // ... existing config ...
  
  async rewrites() {
    return [
      {
        source: '/api/adk/:path*',
        destination: process.env.ADK_SERVICE_URL + '/api/:path*',
      },
    ];
  },
  
  env: {
    FEATURE_ADK_ENABLED: process.env.FEATURE_ADK_ENABLED || 'false',
    ADK_SERVICE_URL: process.env.ADK_SERVICE_URL || 'http://localhost:8000',
  },
};
```

## Testing Strategy

### 1. Unit Tests for ADK Integration
```typescript
// src/services/__tests__/adk-client.test.ts
describe('ADKClient', () => {
  it('should process marketing workflow', async () => {
    const client = new ADKClient();
    const response = await client.processMessage({
      message: 'help me create an organic cake business',
      sessionId: 'test-session',
    });
    
    expect(response.agentUsed).toBeDefined();
    expect(response.response).toContain('domain');
  });
});
```

### 2. Integration Tests
```python
# src/services/adk-marketing/tests/test_integration.py
import pytest
from marketing_agency import enhanced_marketing_coordinator

@pytest.mark.asyncio
async def test_full_workflow():
    # Test complete workflow from domain to logo
    result = await enhanced_marketing_coordinator.process(
        "Create a marketing strategy for organic cakes"
    )
    assert result.success
    assert len(result.artifacts) == 4  # domain, website, marketing, logo
```

## Migration Checklist

- [ ] **Week 1-2: Replicate**
  - [ ] Set up Python environment
  - [ ] Configure Google Cloud credentials
  - [ ] Test original ADK functionality
  - [ ] Create Docker container

- [ ] **Week 2-3: Bridge**
  - [ ] Build FastAPI server
  - [ ] Create TypeScript client
  - [ ] Test API communication

- [ ] **Week 3-4: Integrate**
  - [ ] Create workflow adapter
  - [ ] Update AI service with feature flag
  - [ ] Test hybrid operation

- [ ] **Week 4-6: Extend**
  - [ ] Add custom agents for your components
  - [ ] Implement tenant awareness
  - [ ] Add your business logic

- [ ] **Week 6-7: Deploy**
  - [ ] Update Docker Compose
  - [ ] Configure production environment
  - [ ] Run comprehensive tests
  - [ ] Monitor performance

## Key Benefits of This Approach

1. **Low Risk**: Start with working code
2. **Gradual Migration**: Use feature flags to control rollout
3. **Preserve Existing**: Your platform continues to work
4. **Learn by Doing**: Understand ADK through implementation
5. **Customizable**: Extend with your specific needs

## Next Steps

1. **Start Small**: Begin with Phase 1 - just get ADK running
2. **Measure Impact**: Compare ADK results with your current AI
3. **Iterate**: Gradually add more of your functionality
4. **Monitor Costs**: Track Google Cloud AI usage
5. **Optimize**: Fine-tune prompts and agent interactions

This approach ensures you have a working system at each phase while gradually incorporating your platform's unique features.
