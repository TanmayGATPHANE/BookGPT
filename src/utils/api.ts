interface Book {
  id: string;
  title: string;
  author: string;
}

interface ChatRequest {
  message: string;
  book?: Book;
}

interface ChatResponse {
  response: string;
  success: boolean;
  error?: string;
}

export const sendChatMessage = async (request: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await fetch('http://localhost:3004/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      response: data.response,
      success: true,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      response: "I'm sorry, I encountered an error while processing your request. Please try again.",
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const streamChatMessage = async (
  request: ChatRequest,
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    const response = await fetch('http://localhost:3004/api/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No reader available');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        onComplete();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      
      // Process complete lines
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            onComplete();
            return;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.chunk) {
              onChunk(parsed.chunk);
            }
          } catch (e) {
            // Skip malformed JSON
          }
        }
      }
    }
  } catch (error) {
    onError(error instanceof Error ? error.message : 'Unknown error');
  }
};
