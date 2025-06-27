# Appendix: Marketing Strategy Workflow - Data Connections

This document outlines the primary data inputs required and data outputs produced by each major workflow component within the Marketing Strategy suite. It serves as a high-level guide to understanding the data flow between these components.

All output data is typically stored within a shared `WorkflowDataContext`, under a key specific to that workflow step (e.g., `core_values_data`, `vision_statement_data`).

## 0. Pre-Workflow Processes

These processes occur before a user engages with specific workflows and provide essential context that informs all subsequent workflow interactions.

### Strategic Discovery Process (`discovery.md`)

**Data Inputs:**
- `onboarding_company_name`: (string) The name of the user's company, used for personalization.
- `onboarding_team_members`: (Array of objects: `{ name, position?, email? }`) Pre-existing team members data to reference in team-related questions.

**Data Outputs (within `WorkflowDataContext.strategic_discovery_data`):**
- `company_name_for_strategy_review`: (string) Confirmed company name.
- `business_context`: (object) Foundational business information:
  - `strategic_experience_level`: (string) User's familiarity with business strategy ("beginner", "intermediate", "advanced", "expert").
  - `organization_description`: (string) Free-text description of the organization's purpose and uniqueness.
  - `industry`: (string) Industry or sector.
  - `company_size`: (string) Company size category (e.g., "Startup/Early Stage", "Small Business").
  - `team_size`: (number) Exact number of people working at the company.
  - `business_model`: (string) Primary business model including charity options.
  - `growth_stage`: (string) Current company phase (e.g., "Early Stage/Product Development").
  - `key_challenges`: (string) Current pressing business challenges.
  - `question_complexity_preference`: (string) Preferred detail level ("standard", "simplified", "detailed").
- `core_component_1`: (object) Building the Strategy component:
  - `Q1`: (object) Unique Value Proposition & Capabilities assessment.
  - `Q2`: (object) Strategy vs. Execution & Capabilities assessment.
  - `Q3`: (object) Disruption & Core Strengths assessment.
- `core_component_2`: (object) Translating Strategy component:
  - `Q4`: (object) Following Through & Communication assessment.
  - `Q5`: (object) Visible Programs & Capabilities assessment.
  - `Q6`: (object) Building Connections & Resource Allocation assessment.
  - `Q8`: (object) Cross-Functional Collaboration assessment.
  - `Q9`: (object) Tracking Performance & Capabilities assessment.
  - `Q10`: (object) Management Team Engagement assessment.
- `core_component_3`: (object) Executing for Impact component:
  - `Q7`: (object) Employee Motivation for Strategy assessment.
- `strategic_action_planning`: (object) Contains:
  - `priority_areas_for_action`: (Array of strings) Identified focus areas.
  - `action_items`: (Array of objects) Specific action steps with ownership and timeline.
- `summary`: (object) Statistical summaries:
  - `num_yes_answers`: (number) Count of positive responses.
  - `num_no_answers`: (number) Count of negative responses.

**Data Flows to Other Workflows:**
- **Universal Context Provider**: Serves as the primary context source for all other workflows, reducing redundant questions.
- **Adaptive Question Complexity**: The `strategic_experience_level` and `question_complexity_preference` determine explanation depth and terminology used in subsequent workflows.
- **Team-Size Adaptations**: The `team_size` value enables other workflows to adapt questions about teams, collaboration, and management.
- **Business Model Context**: Informs pricing strategies, marketing approaches, and sales planning based on B2B, B2C, or charity focus.
- **Marketing Strategy Elements**: Key business challenges and organization description provide context for positioning, messaging, and content strategy.
- **Resource Allocation**: Team size and growth stage inform resource planning and capability assessments.
- **Strategic Planning**: Provides baseline information for more detailed planning workflows like SWOT analysis, competitive positioning, and balanced scorecard.

---

## 1. Core Values Workflow (`core-values.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The name of the user's company, used for personalization.
*   `onboarding_team_members`: (Array of objects: `{ name, position }`) Pre-existing list of team members, used to pre-populate stakeholders for personal values input.
*   `reference_company_core_values`: (Data structure) Examples of core values from other companies, used for the optional exploration phase.
*   `company_description` (optional): A brief description of the company, used by AI to help contextualize the drafted values statement.

**Data Outputs (within `workflow_core_values_data`):**
*   `preferences_explored_examples`: (boolean) Whether the user viewed example company values.
*   `preferences_example_companies`: (Array of strings) Names of example companies viewed.
*   `stakeholders_and_values`: (Array of objects: `{ name, position, personal_values: string[] }`) List of key stakeholders and their identified personal core values.
*   `compiled_scores`: (Array of objects: `{ value: string, score: number }`) Aggregated personal values scored for company relevance.
*   `drafted_statement`: (string) The company's drafted core values statement.
*   `final_core_values`: (Array of objects: `{ value_name, description, behavioral_examples: string[] }`) The finalized set of company core values with descriptions and examples.
*   `change_history`: (Array of objects) Log of changes made to the values statement.

---

## 2. Vision Statement Workflow (`vision-statement.md`)

**Data Inputs:**
*   `onboarding_data.company_name`: (string) The name of the user's company.

**Data Outputs (within `WorkflowDataContext.vision_statement_data` or similar key):**
*   `company_name`: (object: `{ value: string, source: string }`) Confirmed company name.
*   `vision_questions_3_year`: (object) Answers to the 7 guided questions for a 3-year outlook (e.g., `why_exist: { answer: string, last_edited_by: string }`).
*   `vision_questions_5_year`: (object) Answers to the 7 guided questions for a 5-year outlook.
*   `vision_statement_draft`: (object: `{ value: string, last_edited_by: string, ai_generated_initial_draft: boolean }`) The drafted and refined company vision statement.
*   `status`: (string) e.g., "in_progress", "completed".
*   `last_updated_at`: (string) Timestamp.

---

## 3. Marketing/Business Alignment Assessment (`alignment.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.
*   `onboarding_team_members`: (Array of objects: `{ id, name, position?, email? }`) Used if multi-participant assessment is chosen.

**Data Outputs (within `WorkflowDataContext.alignment_assessment_data` or similar key, structured per the "Overall Data Structure" section in `alignment.md`):**
*   `assessment_id`: (string) Unique ID for the assessment.
*   `assessment_company_name`: (string) Confirmed company name.
*   `assessment_date`: (string) Timestamp.
*   `participant_type`: (string) 'single_user' or 'multi_user'.
*   `primary_assessor`: (object) Details of the user initiating the assessment.
*   `invited_assessors`: (Array of objects) Details of invited participants and their status.
*   `assessments`: (Array of objects) Contains scores for each sub-aspect across all categories (Communications, Metrics, Planning, etc.), justifications, and goal scores, for each participant.
    *   Example sub-structure: `scores_by_category.Communications: [{ sub_aspect, score, level_description, justification, goal_score }]`
*   `aggregated_results`: (object) Average current and goal scores per category and overall, if calculated (especially for multi-user).

---

## 4. Brand Strength Assessment (`brand-assessment.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.

**Data Outputs (within `WorkflowDataContext.brand_strength_assessment_data` or similar key, structured per the "Overall Data Structure" section in `brand-assessment.md`):**
*   `company_name`: (string) Confirmed company name.
*   `assessment_initiated_by`: (string) User ID/name.
*   `assessment_date`: (string) Timestamp.
*   `brand_strategy_differentiation_scores`: (Array of objects: `{ statement_id, statement_text, rating }`)
*   `brand_alignment_culture_scores`: (Array of objects: `{ statement_id, statement_text, rating }`)
*   `brand_communication_marketing_scores`: (Array of objects: `{ statement_id, statement_text, rating }`)
*   `brand_execution_customer_experience_scores`: (Array of objects: `{ statement_id, statement_text, rating }`)
*   `brand_measurement_risk_management_scores`: (Array of objects: `{ statement_id, statement_text, rating }`)
*   `overall_summary_details`: (object) Includes `overall_average_score`, `section_averages`, `top_strengths`, `areas_for_focus`.
*   `status`: (string) e.g., "in_progress", "completed".
*   `last_updated_at`: (string) Timestamp.

---

## 5. Market Segmentation & Analysis Workflow (`market-segmentation.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.
*   `onboarding_industry_type`: (string) Used by AI to suggest relevant weighting criteria.
*   Potentially, outputs from other modules like `vision-statement.md` or `core-values.md` could implicitly inform the `user_business_goals` if the system is designed for such carry-over.

**Data Outputs (within `WorkflowDataContext.market_segmentation_analysis`):**
*   `company_name`: (object: `{ value: string, source: string }`) Confirmed company name.
*   `user_business_goals`: (Array of strings) High-level business goals for the segmentation.
*   `defined_segments`: (Array of objects: `{ segment_id, segment_name, international_market, company_size_revenue, market_segment_size_description, key_competitors[] }`) User-defined market segments.
*   `selected_criteria_for_weighting`: (Array of strings) IDs of criteria chosen for evaluation.
*   `weighting_scale`: (object) Percentage weights assigned to each selected criterion (e.g., `ability_to_differentiate_weight: number`).
*   `segment_evaluations`: (Array of objects) For each segment:
    *   `raw_scores`: (object) User-input scores (1-10) against each selected criterion.
    *   `calculated_scores`: (object) Includes `overall_segment_score`, sub-category scores (Competitiveness, Market Opportunity, Attractiveness), and `feasibility_for_plot`.
*   `scenario_versions`: (Array of objects) Stores different "what-if" scenarios with overridden criteria/weights.
*   `ai_generated_summary_and_recommendations`: (object: `{ value: string, is_visible: boolean }`) SME-focused summary and strategic recommendations.
*   `status`: (string) e.g., "in_progress", "completed".
*   `last_updated_at`, `last_reviewed_at`: (string) Timestamps.

---

## 6. Balanced Scorecard Workflow (`balanced-scorecard.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.
*   Implicitly, the objectives defined here should align with outputs from `core-values.md` and `vision-statement.md`, though the spec doesn't detail direct data passing. The AI could facilitate this alignment check.

**Data Outputs (within `WorkflowDataContext.balanced_scorecard`):**
*   `company_name`: (string, optional) Confirmed company name.
*   `financial_objectives`: (Array of objects: `{ 
    id: string, 
    title: string, 
    programs: Array<{
      id: string, 
      description: string,
      kpis: Array<{
        id: string,
        metric: string,
        target_timeframe: string
      }>
    }> 
  }`)
*   `customer_objectives`: (Array with same structure as financial_objectives)
*   `business_process_objectives`: (Array with same structure as financial_objectives)
*   `learning_growth_objectives`: (Array with same structure as financial_objectives)
*   `top_critical_objectives`: (Array of strings - objective IDs) The key objectives identified by the user.
*   `reason_for_critical_objectives`: (string) User's rationale for selecting top priorities.
*   `last_updated_at`: (string) Timestamp.
*   `status`: (string) e.g., "in_progress", "completed".
*   `created_by`: (string, optional) User ID/name.

---

## 7. Marketing Skills Assessment Workflow (`marketing-skills.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.
*   `onboarding_team_members`: (Array of objects: `{ name, role, id }`) Pre-existing list of team members to be assessed.

**Data Outputs (within `WorkflowDataContext.marketing_skills_assessment`):**
*   `workflow_step_name`: (string) "Marketing Skills Assessment"
*   `company_name`: (string) Confirmed company name.
*   `assessment_date`: (string) Timestamp of completion.
*   `participants`: (Array of objects) For each participant:
    *   `id`: (string) Unique ID for the participant.
    *   `name`: (string) Name of the participant.
    *   `role`: (string) Job role/title of the participant.
    *   `marketing_experience_summary`: (string) General marketing background and experience description.
    *   `experience_level`: (string) Derived classification ('Junior', 'Mid-level', 'Senior', 'Expert').
    *   `years_in_marketing`: (number) Extracted years of experience from summary.
    *   `specialization_areas`: (Array of strings) Extracted key expertise areas from summary.
    *   `skills_assessment`: (Array of objects) For each assessed skill:
        *   `skill_name`: (string) Name of the marketing skill.
        *   `skill_type`: (string) 'Strategic' or 'Tactical'.
        *   `difficulty`: (string) 'Low', 'Medium', or 'High'.
        *   `importance`: (string) 'Not Important', 'Important', or 'Critical'.
        *   `proficiency`: (string) 'Novice', 'Intermediate', or 'Expert'.
        *   `needs_development`: (boolean) Whether the skill is targeted for development.
        *   `development_objective_idea`: (string, optional) Brief idea for development objective.
*   `priority_development_skills`: (Array of objects) Skills identified as high priority:
    *   `skill_name`: (string) Name of the prioritized skill.
    *   `target_for`: (Array of strings) IDs of participants or 'team' if team-wide.
    *   `why_priority`: (string, optional) Reason for prioritization.
*   `suggested_objectives`: (Array of objects) Draft objectives for development:
    *   `objective_text`: (string) The drafted learning objective.
    *   `linked_skill`: (string) The skill this objective addresses.
    *   `linked_participants`: (Array of strings) IDs of participants or 'team'.
    *   `balanced_scorecard_perspective`: (string) "Learning & Growth".
    *   `status`: (string) 'draft' or 'final'.
*   `suggested_mentorships`: (Array of objects) Recommended mentorship pairings:
    *   `mentor_id`: (string) ID of the participant who will mentor.
    *   `mentee_id`: (string) ID of the participant to be mentored.
    *   `skill_focus`: (string) Skill area for mentorship.
    *   `rationale`: (string) Reasoning behind the pairing.
    *   `status`: (string) 'suggested', 'accepted', or 'rejected'.

**Data Flows to Other Workflows:**
*   The `suggested_objectives` are designed to flow directly to the Balanced Scorecard's `learning_growth_objectives`.
*   The general marketing experience and skills assessment data can inform other marketing strategy components by providing context about team capabilities.
*   Mentorship pairings can inform professional development plans and team structure decisions.

---

## 8. Marketing Strategy Scorecard Workflow (`marketing-strategy-scorecard.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.
*   Outputs from other workflows may inform the objectives defined here.

**Data Outputs (within `WorkflowDataContext.marketing_strategy_scorecard`):**
*   `company_name`: (string, optional) Confirmed company name.
*   `objectives`: (Array of objects: `{ 
    id: string, 
    title: string, 
    programs: Array<{
      id: string, 
      description: string,
      kpis: Array<{
        id: string,
        metric: string,
        target_timeframe: string
      }>
    }> 
  }`)
*   `last_updated_at`: (string) Timestamp.
*   `status`: (string) e.g., "in_progress", "completed".
*   `created_by`: (string, optional) User ID/name.

**Data Flows to Other Workflows:**
*   Marketing objectives can feed into the Balanced Scorecard, particularly the Customer and Internal Business Process perspectives.
*   The KPIs defined here can be used to track progress on marketing initiatives across the organization.

---

## 9. Pricing Strategy Workflow (`pricing-strategy.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.
*   Outputs from market segmentation and competitor analysis may inform pricing decisions.

**Data Outputs (within `WorkflowDataContext.pricing_strategy`):**
*   `project_name`: (string) Confirmed project/company name.
*   `pricing_objective`: (string) The selected pricing objective (e.g., "Maximize profitability").
*   `pricing_strategy`: (string) The selected pricing strategy approach (e.g., "Value-based").
*   `price_quality_matrix_strategy`: (string, conditional) If using Price/Quality matrix, the selected approach.
*   `pricing_model`: (string) The selected pricing model (e.g., "Per unit").
*   `value_worksheet`: (object) Contains:
    *   `variable_costs_per_unit`: (number) Cost that varies with each unit produced.
    *   `maximum_price_customer_pay`: (number) Maximum willingness to pay.
    *   `competitors`: (Array of objects: `{ name: string, price: number }`) Competitor pricing data.
    *   `suggested_price_range_lower`: (number) Calculated lower bound of price range.
    *   `suggested_price_range_upper`: (number) Calculated upper bound of price range.
*   `demand_worksheet`: (object) Contains:
    *   `scenarios`: (Array of objects: `{ scenario_id: string, price_per_unit: number, quantity_per_year: number }`) Price/quantity scenarios.
*   `profit_worksheet`: (object) Contains:
    *   `fixed_costs`: (number) Costs that don't vary with production volume.
    *   `profit_analysis`: (Array of objects) Calculated profit data for each scenario:
        *   `scenario_id`: (string) Reference to the scenario.
        *   `revenue`: (number) Calculated revenue.
        *   `total_variable_costs`: (number) Calculated variable costs.
        *   `total_costs`: (number) Sum of fixed and variable costs.
        *   `profit_net_margin`: (number) Calculated profit.
*   `final_pricing_recommendation`: (object) Contains:
    *   `recommended_scenario_id`: (string) The scenario with highest profit.
    *   `recommended_profit_value`: (number) The profit value of the recommended scenario.
    *   `summary_text`: (string) Text explanation of the recommendation.
*   `last_updated_at`: (string) Timestamp.
*   `status`: (string) e.g., "in_progress", "completed".
*   `created_by`: (string, optional) User ID/name.

**Data Flows to Other Workflows:**
*   Pricing strategies can inform financial objectives in the Balanced Scorecard.
*   Pricing data can be incorporated into market segmentation decisions and competitive positioning.
*   Value and profit calculations can inform broader financial planning within the organization.

---

## 10. Customer Journey Map Workflow (`customer-journey-map.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.
*   `onboarding_team_members`: (Array of objects: `{ name, role, id }`) Used to populate potential internal team members responsible for journey stages.

**Data Outputs (within `WorkflowDataContext.customer_journey_map`):**
*   `company_name`: (string) Confirmed company name.
*   `customer_persona`: (object: `{ name: string, description: string }`) Defined customer persona for the journey.
*   `journey_scope`: (object: `{ start_point: string, end_point: string }`) Defined start and end points of the journey.
*   `journey_stages`: (Array of objects) Detailed information for each stage:
    *   `name`: (string) Name of the journey stage (e.g., "Discovery")
    *   `customer_actions`: (Array of strings) What customers do in this stage
    *   `customer_thoughts`: (Array of strings) What customers think in this stage
    *   `customer_feelings`: (Array of strings) Emotions customers experience
    *   `pain_points_opportunities`: (Array of strings) Problems and improvement areas
    *   `internal_teams_responsible`: (Array of strings) Teams or individuals responsible
    *   `metrics`: (Array of strings) KPIs for measuring success
    *   `technology_tools`: (Array of strings) Technologies involved
    *   `future_state_improvements`: (string) Desired future state
*   `ai_generated_summaries`: (object, optional) Contains:
    *   `pain_point_summary`: (string, optional) Summary of key pain points
    *   `solution_ideas_per_stage`: (object, optional) Ideas mapped to stages
    *   `executive_summary`: (string, optional) Overall journey summary
*   `last_updated_at`: (string) Timestamp.
*   `status`: (string) e.g., "in_progress", "completed".
*   `created_by`: (string, optional) User ID/name.

**Data Flows to Other Workflows:**
*   Pain points from the journey map can inform objectives in the Marketing Strategy Scorecard.
*   Customer touchpoint metrics can feed into the Customer Perspective of the Balanced Scorecard.
*   Skills gaps identified in the journey map can inform the Marketing Skills Assessment.
*   Journey insights can contribute to Competitive Analysis by identifying differentiation opportunities.

---

## 11. Buyer Persona Buying Process Workflow (`buying-process.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.
*   `customer_profile`: (Object) If available, an existing customer persona/profile can be used as the basis for the buying process mapping.
*   `onboarding_team_members`: (Array of objects: `{ name, role, id }`) Optional, can be used to suggest internal team members for seller actions.

**Data Outputs (within `WorkflowDataContext.buying_process_mappings`):**
*   `buying_process_mappings`: (Array of objects) Each object represents a complete buying process for a persona:
    *   `persona_id`: (string) Auto-generated unique ID for the persona.
    *   `persona_name`: (string) Name of the buyer persona (e.g., "Small Business Owner").
    *   `persona_pain_points`: (string) Key pain points the persona experiences.
    *   `buying_stages`: (Array of objects) Each object represents a stage in the buying process:
        *   `stage_name`: (string) Name of the stage (e.g., "Awareness", "Consideration", "Decision").
        *   `buyer_actions`: (string) What the buyer is doing at this stage.
        *   `duration`: (string) Typical timeframe for this stage.
        *   `key_influencers`: (string) Who influences decisions at this stage.
        *   `seller_actions`: (string) What the seller should do at this stage.
        *   `content_type`: (string) What content to provide at this stage.
        *   `key_message`: (string) Key message to convey in content.
    *   `ai_generated_summary`: (string, optional) AI-generated summary of the buying process.
    *   `status`: (string) 'in_progress' or 'completed'.
    *   `last_updated_at`: (string) Timestamp.
    *   `created_by`: (string, optional) User ID/name.

**Data Flows to Other Workflows:**
*   **Content Strategy Development**: The `content_type` and `key_message` for each stage directly informs content planning and creation, providing a framework for what content to develop at each stage of the buyer's journey.
*   **Sales Playbook**: The `seller_actions` defined for each stage form the foundation for sales guidance, helping ensure alignment between marketing and sales approaches.
*   **Customer Journey Mapping**: While the Customer Journey Map focuses on the broader experience, the Buying Process focuses specifically on purchasing decisions, providing complementary insights.
*   **Marketing Campaign Planning**: Understanding what buyers need at each stage helps prioritize campaign themes, messaging, and channels.
*   **Marketing Strategy Scorecard**: The stages and seller actions can inform marketing objectives and KPIs, particularly for lead generation and conversion metrics.

## 12. Message Mapping Workflow (`messaging.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.
*   `vision_statement_data` (optional): Provides context for evaluating how aligned messages are with the company's vision.
*   `core_values_data` (optional): Can help evaluate message alignment with company values.

**Data Outputs (within `WorkflowDataContext.message_mapping_data`):**
*   `workflow_step_name`: (string) "Message Mapping Tool"
*   `company_name`: (string) Confirmed company name.
*   `key_messages`: (Array of objects) Each object represents a complete marketing message:
    *   `id`: (string) Unique identifier for the message.
    *   `message`: (string) Full message text.
    *   `label`: (string) Short label for the message.
*   `criteria_weights`: (Object) Percentage weights assigned to evaluation criteria:
    *   `memorability`: (number) Weight as decimal (e.g., 0.15 for 15%).
    *   `aligned_with_strategy`: (number) Weight for strategy alignment.
    *   `consistent_with_positioning`: (number) Weight for positioning consistency.
    *   `objective`: (number) Weight for objectivity.
    *   `believable`: (number) Weight for believability.
    *   `not_fluffy`: (number) Weight for avoiding marketing hyperbole.
    *   `trendy`: (number) Weight for trendiness.
    *   `impact`: (number) Weight for message impact.
    *   `relevant`: (number) Weight for relevance.
*   `message_scores`: (Array of objects) Each object contains scores for a message:
    *   `message_id`: (string) References a key_message.id.
    *   `scores`: (Object) Contains scores (1-10) for each criterion.
*   `calculated_results`: (Array of objects) Each object contains calculated performance data:
    *   `message_id`: (string) References a key_message.id.
    *   `label`: (string) Short label from the message.
    *   `total_score`: (number) Weighted average of all scores.
    *   `effectiveness_score`: (number) Score for effectiveness category.
    *   `credibility_score`: (number) Score for credibility category.
    *   `resonance_score`: (number) Score for resonance category.
*   `status`: (string) 'in_progress' or 'completed'.
*   `last_updated_at`: (string) Timestamp.
*   `created_by`: (string, optional) User ID/name.

**Data Flows to Other Workflows:**
*   **Content Strategy Development**: The highest-scoring messages provide a foundation for content creation across all channels.
*   **Brand Assessment**: Message effectiveness can inform aspects of brand positioning and communication strategy.
*   **Customer Personas**: The most effective messages can be tailored to specific customer personas.
*   **Marketing Strategy Scorecard**: High-performing messages can inform marketing objectives and KPIs.
*   **Sales Playbook**: Top-scoring messages provide sales teams with proven, effective talking points.

## 13. Marketing Campaign Planning Workflow (`marketing-campaign-planning.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.
*   `onboarding_team_members`: (Array of objects: `{ name, position?, email? }`) Pre-existing list of team members to suggest for campaign roles.
*   `message_mapping_data` (optional): Key messages identified can inform campaign key message and touchpoint messaging.
*   `buying_process_mappings` (optional): Buying process stages can inform campaign touchpoints and messaging at each stage.
*   `customer_persona` (optional): Existing personas can be used for campaign targeting.

**Data Outputs (within `WorkflowDataContext.campaign_plan`):**
*   `campaign_company_name`: (string) Confirmed company name.
*   `campaign_name`: (string) Name of the marketing campaign.
*   `campaign_timeframe`: (string) Timeline for the campaign (e.g., "Q1 2026", "Mar-Apr 2026").
*   `campaign_overview`: (string) High-level description of the campaign.
*   `campaign_objective`: (string) Primary marketing objective (e.g., "increase sales", "generate leads").
*   `campaign_budget`: (number) Allocated budget for the campaign.
*   `campaign_success_goals`: (Array of strings) Key performance indicators and success metrics.
*   `campaign_channels`: (Array of strings) Marketing channels to be used.
*   `campaign_theme`: (string) Main idea or theme of the campaign.
*   `campaign_key_message`: (string) Core message to convey throughout the campaign.
*   `campaign_personas`: (Array of strings) Target personas for the campaign.
*   `campaign_buying_stage`: (string) Primary buying stage targeted.
*   `target_audience_size`: (number) Estimated size of the target audience.
*   `target_audience_location`: (string) Geographic targeting information.
*   `project_team_members`: (Object) Team assignments for the campaign:
    *   `campaign_manager`: (Object: `{name: string, position?: string}`)
    *   `executive_sponsor`: (Object: `{name: string, position?: string}`)
    *   `marketing_operations`: (Object: `{name: string, position?: string}`)
    *   `technical_support`: (Object: `{name: string, position?: string}`)
    *   `design_creative`: (Object: `{name: string, position?: string}`)
    *   `sales_enablement`: (Object: `{name: string, position?: string}`)
*   `campaign_schedule`: (Array of objects) Detailed touchpoint schedule:
    *   `touchpoint_number`: (number) Sequence number of the touchpoint.
    *   `date`: (string) Planned date for the touchpoint.
    *   `channel`: (string) Channel to be used for the touchpoint.
    *   `message_offer`: (string) Message or offer for this touchpoint.
    *   `landing_page`: (string) Destination/landing page.
    *   `link_to_map`: (string, optional) Link to marketing automation platform.
*   `ai_generated_brief`: (string, optional) AI-generated campaign brief.
*   `status`: (string) 'in_progress' or 'completed'.
*   `last_updated_at`: (string) Timestamp.
*   `created_by`: (string, optional) User ID/name.

**Data Flows to Other Workflows:**
*   **Balanced Scorecard & Marketing Strategy Scorecard**: Campaign success goals can inform or be derived from scorecard objectives and KPIs.
*   **Budget Planning**: Campaign budget data can feed into broader marketing budget and resource allocation planning.
*   **Content Strategy**: Campaign messaging and touchpoints provide requirements for content creation.
*   **Marketing Analytics**: Campaign metrics and goals establish baselines for measurement and performance tracking.
*   **Customer Journey Mapping**: Campaign touchpoints should align with the broader customer journey.
*   **Resource Management**: Team assignments can inform staffing and resource allocation decisions.

---

## 14. Marketing Channel Ranking Workflow (`channel-ranking.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name, used for personalization.
*   `brand_assessment_data` (optional): Insights from Brand Assessment can help inform scoring of brand-related criteria.
*   `marketing_campaign_planning_data` (optional): Campaign objectives and themes can inform channel selection priorities.
*   `buying_process_mappings` (optional): Understanding of buying process stages can help evaluate channels based on their effectiveness at different stages.

**Data Outputs (within `WorkflowDataContext.marketing_channel_ranking`):**
*   `company_name`: (string) Confirmed company name.
*   `ranking_criteria_weights`: (Object) Percentage weights assigned to evaluation criteria:
    *   `alignment_with_image_weight`: (number) Weight for brand image alignment (0-100).
    *   `market_visibility_weight`: (number) Weight for market visibility (0-100).
    *   `accountability_weight`: (number) Weight for tracking and measurement capabilities (0-100).
    *   `internal_champion_weight`: (number) Weight for internal expertise/management (0-100).
    *   `purchase_responsibility_weight`: (number) Weight for reaching purchase decision makers (0-100).
    *   `conversion_potential_weight`: (number) Weight for lead conversion likelihood (0-100).
*   `marketing_channels`: (Array of objects) Each object represents a marketing channel:
    *   `channel_name`: (string) Name of the marketing channel (e.g., "Website", "Email").
    *   `criterion_scores`: (Object) User-input scores (1-10) for each criterion:
        *   `alignment_with_image_score`: (number) Score for brand image alignment.
        *   `market_visibility_score`: (number) Score for market visibility.
        *   `accountability_score`: (number) Score for accountability.
        *   `internal_champion_score`: (number) Score for internal champion.
        *   `purchase_responsibility_score`: (number) Score for purchase responsibility.
        *   `conversion_potential_score`: (number) Score for conversion potential.
    *   `production_time_cost`: (number) Cost of time required to prepare the channel.
    *   `delivery_cost`: (number) Cost associated with distributing through the channel.
    *   `other_costs`: (number) Any additional costs for the channel.
    *   `total_costs`: (number) Calculated sum of all costs.
    *   `overall_channel_score`: (number) Calculated weighted average of all criteria scores.
    *   `calculated_brand_promotion_quality`: (number) Derived score for brand-related criteria.
    *   `calculated_lead_quality`: (number) Derived score for lead-related criteria.
*   `selected_channels`: (Array of strings) Names of channels selected as priority.
*   `status`: (string) 'in_progress' or 'completed'.
*   `last_updated_at`: (string) Timestamp.

**Data Flows to Other Workflows:**
*   **Marketing Budget Allocation**: Channel rankings directly inform where to allocate marketing budget for maximum impact.
*   **Marketing Campaign Planning**: Prioritized channels guide campaign channel selection and touchpoint planning.
*   **Content Strategy**: High-ranking channels inform content creation priorities, formats, and distribution methods.
*   **Marketing Strategy Scorecard**: Channel performance metrics can contribute to marketing KPIs and tracking metrics.
*   **Customer Journey Mapping**: Selected channels should align with touchpoints in the customer journey.
*   **Buyer Persona Buying Process**: Channel effectiveness at different buying stages can inform the buying process mapping.

---

## 15. Positioning Statement Workflow (`positioning-statement.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name, used for personalization.
*   `onboarding_team_members` (optional): (Array of objects: `{ name, position?, email? }`) Used for potential collaboration on the positioning statement.

**Data Outputs (within `WorkflowDataContext.positioning_statement`):**
*   `status`: (string) e.g., "draft", "completed", "in_review"
*   `last_updated`: (string) Timestamp of last edit.
*   `company_name`: (string) Confirmed company name from onboarding.
*   `table`: (Object) Core positioning criteria:
    *   `for`: (string) Target market description.
    *   `product_is`: (string) Concise product description.
    *   `ideal_for`: (string) Best use case or application.
    *   `better_than`: (string) Primary competitor or competing approach.
    *   `because`: (string) Key differentiation factor.
*   `template`: (Object) Structured statement components:
    *   `target_market_description`: (string) Refined target market.
    *   `primary_benefit`: (string) Main benefit users seek.
    *   `product_service_name`: (string) Specific product/service name.
    *   `unique_differentiator`: (string) What makes the offering unique.
    *   `unlike_competitors`: (string) How the approach differs from competitors.
    *   `allows_us_to_provide`: (string) Direct outcome enabled by unique approach.
    *   `client_result`: (string) Ultimate benefit clients achieve.
*   `full_draft`: (string) The complete, formatted positioning statement.
*   `collaborators`: (Array of objects: `{ name: string, email: string }`) Team members invited for review.
*   `notes`: (string, optional) Additional context or commentary.
*   `version_history`: (Array of objects, optional) Record of previous drafts:
    *   `date`: (string) Timestamp.
    *   `draft`: (string) Previous version text.
    *   `author`: (string) Who made the change.

**Data Flows to Other Workflows:**
*   **Brand Assessment**: The positioning statement informs and is informed by the brand's strengths and differentiation.
*   **Content Strategy**: The positioning statement provides core messaging that guides content creation and tone.
*   **Message Mapping**: Key differentiators and value propositions feed into more detailed message mapping.
*   **Marketing Campaign Planning**: The positioning statement guides campaign themes and messaging priorities.
*   **Sales Playbook**: Core value propositions inform sales talking points and differentiation strategies.
*   **Competitive Analysis**: The "better than" and differentiation aspects both inform and are informed by competitive analysis.

## 16. SWOT Analysis Workflow (`swot-analysis.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.
*   `vision_statement_data` (optional): Vision statement can provide context for identifying strengths and opportunities that align with the company's vision.
*   `competitor_analysis_data` (optional): Competitive analysis data can help inform strengths and weaknesses relative to competitors.
*   `market_segmentation_data` (optional): Market insights can help identify opportunities and threats in the market.

**Data Outputs (within `WorkflowDataContext.swot_analysis`):**
*   `company_name`: (string) Confirmed company name.
*   `strengths`: (Array of objects) Each object represents an identified company strength:
    *   `id`: (string) Unique identifier for the strength.
    *   `description`: (string) Description of the strength.
    *   `category`: (string) Optional categorization (e.g., "Operational", "Brand", "Financial").
    *   `impact_rating`: (number) Rating of impact/importance (1-10).
    *   `supporting_evidence`: (string) Optional evidence supporting this strength.
*   `weaknesses`: (Array of objects) Each object represents an identified company weakness:
    *   `id`: (string) Unique identifier for the weakness.
    *   `description`: (string) Description of the weakness.
    *   `category`: (string) Optional categorization.
    *   `impact_rating`: (number) Rating of impact/importance (1-10).
    *   `improvement_potential`: (string) Optional assessment of how addressable this weakness is.
*   `opportunities`: (Array of objects) Each object represents an identified opportunity:
    *   `id`: (string) Unique identifier for the opportunity.
    *   `description`: (string) Description of the opportunity.
    *   `category`: (string) Optional categorization.
    *   `impact_rating`: (number) Rating of potential impact (1-10).
    *   `likelihood`: (number) Rating of likelihood (1-10).
    *   `timeframe`: (string) Expected timeframe (e.g., "Short-term", "Medium-term", "Long-term").
*   `threats`: (Array of objects) Each object represents an identified threat:
    *   `id`: (string) Unique identifier for the threat.
    *   `description`: (string) Description of the threat.
    *   `category`: (string) Optional categorization.
    *   `impact_rating`: (number) Rating of potential impact (1-10).
    *   `likelihood`: (number) Rating of likelihood (1-10).
    *   `mitigation_notes`: (string) Optional initial thoughts on how to mitigate this threat.
*   `strategic_implications`: (Array of objects) Derived implications from the SWOT analysis:
    *   `id`: (string) Unique identifier for the implication.
    *   `description`: (string) Description of the strategic implication.
    *   `related_elements`: (Array of strings) IDs of related SWOT elements.
    *   `priority`: (string) Priority level (e.g., "High", "Medium", "Low").
*   `ai_generated_recommendations`: (object, optional) Contains:
    *   `strategic_recommendations`: (Array of strings) AI-generated strategic recommendations.
    *   `summary`: (string) Overall summary of the SWOT analysis.
*   `last_updated_at`: (string) Timestamp.
*   `status`: (string) e.g., "in_progress", "completed".
*   `created_by`: (string, optional) User ID/name.

**Data Flows to Other Workflows:**
*   **Risk Management Components**: Threats identified in the SWOT Analysis directly inform the Identification of Potential Risks, Impact Analysis, and Mitigation Strategies components.
*   **Marketing Strategy Scorecard**: Strategic implications can inform marketing objectives and KPIs.
*   **Balanced Scorecard**: Strategic implications can inform objectives across all four perspectives of the Balanced Scorecard.
*   **SMART Goals**: SWOT Analysis outputs provide context for setting specific, measurable, achievable, relevant, and time-bound goals.
*   **Marketing Campaign Planning**: Strengths can be emphasized in campaigns, while opportunities can be targeted.

---

## 17. Risk Management Plan Workflow (`risk-management.md`)

**Data Inputs:**
*   `onboarding_company_name`: (string) The user's company name.
*   `onboarding_team_members`: (Array of objects: `{ name, email?, position? }`) Pre-existing list of team members, used to pre-populate project roles and suggest risk owners.

**Data Outputs (within `WorkflowDataContext.risk_management_plan`):**
*   `project_title`: (string) Title of the project for the risk plan.
*   `project_sponsor`: (object: `{ name, email?, position? }`) The executive sponsor for the project.
*   `project_manager`: (object: `{ name, email?, position?, phone? }`) The project/risk manager.
*   `project_team_members`: (Array of objects: `{ name, position? }`) Team members involved in the project.
*   `project_start_date`: (string) ISO-formatted project start date.
*   `project_end_date`: (string) ISO-formatted project end date.
*   `risk_identification_methods`: (Array of strings) Methods chosen for identifying risks.
*   `risk_scoring_likelihood_definitions`: (object) Definitions for likelihood categories (Almost Certain, Possible, Unlikely).
*   `risk_scoring_consequence_definitions`: (object) Definitions for consequence categories (Catastrophic, Moderate, Insignificant).
*   `risk_mitigation_strategies`: (Array of strings) Strategy approaches (Avoid, Mitigate, Accept, Transfer).
*   `risk_monitoring_frequency`: (string) How often risks are reviewed/reported.
*   `requires_change_request_form_confirmation`: (boolean) Confirmation of change request process familiarity.
*   `risk_register`: (Array of objects) Detailed risk entries:
    *   `risk_id`: (string) Unique identifier for the risk.
    *   `description`: (string) Description of the risk.
    *   `likelihood`: (string) Assessed likelihood category.
    *   `consequence`: (string) Assessed consequence category.
    *   `score`: (string/number) Calculated priority score.
    *   `owner`: (string) Team member responsible for the risk.
    *   `mitigation_strategy`: (string) Chosen strategy approach.
    *   `mitigation_action_plan`: (string) Detailed mitigation plan.
    *   `trigger_conditions`: (string) Indicators that the risk is occurring/about to occur.
    *   `status`: (string) Current status of the risk (e.g., "Open").
*   `approval_stakeholders`: (object) Names of approvers:
    *   `project_sponsor_name`: (string) From project_sponsor.
    *   `other_key_stakeholder_name`: (string) Additional key stakeholder.
    *   `executive_approver_name`: (string) Executive approver.
    *   `project_manager_name`: (string) From project_manager.
*   `finalized_plan_review_timestamp`: (string) Timestamp of plan review.

**Data Flows to Other Workflows:**
*   **SWOT Analysis**: Threats identified in SWOT can inform or be derived from risks in the Risk Management Plan.
*   **Project Planning Components**: Project timeline, team, and budget decisions can be influenced by identified risks.
*   **Marketing Campaign Planning**: Risk identification can highlight potential campaign risks and mitigation strategies.
*   **Balanced Scorecard**: Risk mitigation actions can inform objectives in the Internal Business Process perspective.
*   **Team & Skills Components**: Skills gaps identified in risk assessment can inform training and development plans.

---

This appendix provides a snapshot. Refer to individual specification documents for full data structures and detailed interaction logic.
