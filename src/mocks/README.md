# Mock Data System

This mock data system allows you to toggle between real API calls and static mock responses for development and testing purposes.

## Configuration

The system is controlled by the `VITE_USE_REAL_API` environment variable in the `.env` file:

```bash
# Set to false to use static mock responses instead of API calls
VITE_USE_REAL_API=false
```

- `VITE_USE_REAL_API=true` - Uses real API calls to the backend
- `VITE_USE_REAL_API=false` - Uses static mock responses (default)

## Features

### 1. Mission & Vision Mock Data
- Generates 3 different mission/vision options based on user inputs
- Includes different approaches: Innovation-Driven, Customer-Centric, and Adaptive Excellence
- Simulates API delay (2 seconds)

### 2. Stakeholder Motivation Strategy Mock Data
- Complete SMILE Framework output
- Stakeholder mappings with quadrant analysis
- Communication timeline with phases
- Risk mitigation strategies
- Tracking metrics
- Simulates API delay (2.5 seconds)

### 3. Chat Mock Data
- Random responses from a predefined set
- Simulates book-based conversations
- Simulates API delay (1 second)

## File Structure

```
src/
├── mocks/
│   ├── mockData.ts       # Mock data generators
│   ├── mockService.ts    # Service layer with API toggle
│   └── README.md         # This file
├── types/
│   └── env.d.ts          # Environment variable types
```

## Usage

### Components Updated
- `WorkflowContainer.tsx` - Uses mock services for mission/vision and stakeholder strategies
- `App.tsx` - Uses mock chat service
- `ChatWindow.tsx` - Uses mock chat service

### Mock Services
All components now use the mock services instead of direct API calls:

```typescript
import { mockSendChatMessage, mockGenerateMissionVision, mockGenerateStakeholderMotivationStrategy } from '../mocks/mockService';

// These automatically switch between real API and mock data based on .env setting
const chatResponse = await mockSendChatMessage(request);
const missionVisionResponse = await mockGenerateMissionVision(request);
const stakeholderResponse = await mockGenerateStakeholderMotivationStrategy(request);
```

## Benefits

1. **Faster Development** - No need to wait for API responses during development
2. **Testing** - Consistent, predictable responses for testing
3. **Offline Development** - Work without backend connectivity
4. **API Rate Limiting** - Avoid hitting API rate limits during development
5. **Consistent Data** - Same mock responses help with UI development

## Console Logging

When the application starts, you'll see console logs indicating the current mode:

```
🔧 API Mode: MOCK DATA
📝 Environment: development
🎛️ VITE_USE_REAL_API: false
```

## Switching Modes

To switch between mock and real API:

1. Edit the `.env` file
2. Change `VITE_USE_REAL_API=false` to `VITE_USE_REAL_API=true` (or vice versa)
3. Restart the development server

## Mock Data Customization

You can customize the mock responses by editing `src/mocks/mockData.ts`:

- Modify existing response templates
- Add new response variations
- Adjust simulation delays
- Add more realistic data based on user inputs

## Note

Make sure your backend server is running when `VITE_USE_REAL_API=true`, otherwise the application will fall back to error handling.
