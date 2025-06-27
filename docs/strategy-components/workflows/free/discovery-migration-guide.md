# Discovery Workflow Migration Guide

This guide outlines the changes made from `discovery.md` to `discovery-improved.md` and provides guidance for implementation.

## Key Improvements

### 1. Structure & Navigation
- **Added**: Comprehensive table of contents with anchor links
- **Added**: Executive summary for quick understanding
- **Moved**: Mermaid diagram to the beginning as an overview
- **Reorganized**: Consistent section numbering throughout

### 2. Question Sequence Fix
- **Fixed**: Question 7 now appears in correct sequence (after Q6, before Q8)
- **Updated**: Progress percentages to reflect correct ordering
- **Clarified**: All questions now have consistent numbering

### 3. Data Structure Improvements
- **Moved**: Data structure to the beginning for better visibility
- **Fixed**: Incomplete type definitions (e.g., `string (or Array` now properly defined as `["string"]`)
- **Added**: Consistent structure with nested objects for better organization
- **Added**: Metadata section for timestamps and analytics
- **Added**: Summary section with calculated metrics

### 4. Content Organization
- **Simplified**: Removed verbose if/else code syntax, replaced with clear descriptions
- **Consolidated**: Grouped related questions under their components
- **Streamlined**: Reduced redundancy in question descriptions
- **Clarified**: Made adaptive content more readable

### 5. Technical Enhancements
- **Added**: TypeScript interfaces for key components
- **Added**: API integration points specification
- **Enhanced**: Mobile responsiveness guidelines
- **Expanded**: Internationalization considerations
- **Detailed**: Security and error handling specifications

## Implementation Checklist

### Phase 1: Code Structure Updates
- [ ] Update data model to match new nested structure
- [ ] Implement TypeScript interfaces for components
- [ ] Create API endpoints for progress saving and report generation
- [ ] Update WorkflowDataContext to handle new data structure

### Phase 2: UI Component Updates
- [ ] Implement new progress indicator with section awareness
- [ ] Create reusable question components based on responseType
- [ ] Build action planning table with inline editing
- [ ] Design responsive layouts for mobile breakpoints

### Phase 3: AI Integration Updates
- [ ] Update AI prompts to follow clearer conversation flow
- [ ] Implement adaptive content based on company size and team structure
- [ ] Add context preservation between questions
- [ ] Create report generation logic with strength/gap analysis

### Phase 4: Accessibility & Performance
- [ ] Implement all WCAG 2.1 AA requirements
- [ ] Add progressive loading for questions
- [ ] Implement auto-save with debouncing
- [ ] Add offline support with local caching

## Data Migration

### Old Structure → New Structure Mapping

```javascript
// Old structure (flat)
{
  Q1_clarity_on_value_prop: boolean,
  Q1_unique_value_proposition: string,
  Q1_specific_capabilities: string,
  // ... other questions
}

// New structure (nested)
{
  assessment_questions: {
    Q1_unique_value_proposition: {
      has_clarity: boolean,
      value_proposition: string,
      specific_capabilities: string
    },
    // ... other questions organized by component
  }
}
```

### Migration Script Example

```javascript
function migrateDiscoveryData(oldData) {
  return {
    company_name_for_strategy_review: oldData.company_name_for_strategy_review,
    business_context: oldData.business_context,
    assessment_questions: {
      Q1_unique_value_proposition: {
        has_clarity: oldData.Q1_clarity_on_value_prop,
        value_proposition: oldData.Q1_unique_value_proposition,
        specific_capabilities: oldData.Q1_specific_capabilities
      },
      Q2_strategy_development: {
        approach: oldData.Q2_strategy_approach,
        evidence_or_improvements: oldData.Q2_evidence_or_improvement_needs
      },
      // ... map remaining questions
    },
    strategic_action_planning: oldData.strategic_action_planning,
    summary: {
      num_yes_answers: oldData.summary.num_yes_answers,
      num_no_answers: oldData.summary.num_no_answers,
      strategic_strength_score: calculateStrengthScore(oldData),
      top_strengths: identifyTopStrengths(oldData),
      top_gaps: identifyTopGaps(oldData)
    },
    metadata: {
      created_at: oldData.last_updated || new Date().toISOString(),
      last_updated: new Date().toISOString(),
      completion_time_minutes: null
    }
  };
}
```

## Testing Guidelines

### Unit Tests
- Test each question component in isolation
- Verify data structure transformations
- Test adaptive content logic for different company sizes
- Validate action item creation and editing

### Integration Tests
- Test complete workflow from start to finish
- Verify data persistence across sessions
- Test report generation with various data combinations
- Validate API endpoints with different payloads

### User Acceptance Tests
- Solo founder path (team_size = 1)
- Small team path (team_size <= 3)
- Standard organization path (team_size > 3)
- Mobile device workflow completion
- Accessibility testing with screen readers

## Rollout Strategy

### Phase 1: Development Environment
- Implement all changes in development
- Run comprehensive test suite
- Conduct code review

### Phase 2: Staging Environment
- Deploy to staging for QA testing
- Run user acceptance tests
- Performance testing and optimization

### Phase 3: Production Rollout
- Deploy with feature flag initially
- Monitor error rates and performance
- Gradual rollout to user segments
- Full production deployment

## Monitoring & Analytics

### Key Metrics to Track
- Workflow completion rates
- Average time per question
- Drop-off points in the workflow
- Report generation success rates
- User satisfaction scores

### Error Monitoring
- Track API failures
- Monitor client-side errors
- Alert on data structure mismatches
- Track save/load failures

## Support Documentation

### For Developers
- API documentation updates
- Component library documentation
- Data model documentation
- Integration guide updates

### For Users
- Updated workflow instructions
- FAQ for common issues
- Video walkthrough of new features
- Migration notice for existing users

## Backward Compatibility

### Considerations
- Support loading old data format for 6 months
- Automatic migration on first load
- Export option for old format if needed
- Clear communication about changes

### API Versioning
- Maintain v1 endpoints for backward compatibility
- Introduce v2 endpoints with new structure
- Deprecation timeline: 6 months
- Migration tools for API consumers
