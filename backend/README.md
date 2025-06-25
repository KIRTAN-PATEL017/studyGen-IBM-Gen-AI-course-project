# Study Notes Generator Backend

A Python Flask backend that processes PDF documents and generates AI-powered study materials using RAG (Retrieval Augmented Generation), LangChain, and TogetherAI's API.

## Features

- PDF text extraction using PyPDF2
- RAG-based text processing with FAISS vector store
- AI-powered summary generation
- Automatic note extraction
- Interactive flashcard creation
- Free/cheap LLM usage via TogetherAI

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

Required environment variables:
- `TOGETHER_API_KEY`: Your TogetherAI API key (get one free at https://api.together.xyz/)

### 3. Run the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Process PDF
```
POST /api/process-pdf
```

Upload a PDF file and receive AI-generated study materials.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: PDF file with key 'pdf'

**Response:**
```json
{
  "summary": "AI-generated summary of the document...",
  "notes": [
    "Key point 1",
    "Key point 2",
    "..."
  ],
  "flashcards": [
    {
      "id": "uuid",
      "question": "What is...?",
      "answer": "The answer is..."
    }
  ]
}
```

## Architecture

### Components

1. **Flask App (`app.py`)**: Main server handling file uploads and API endpoints
2. **PDF Processor (`pdf_processor.py`)**: Extracts and cleans text from PDF files
3. **AI Service (`ai_service.py`)**: Handles AI-powered content generation using RAG

### AI Pipeline

1. **Text Chunking**: Documents are split into manageable chunks
2. **Embeddings**: Text chunks are converted to vectors using HuggingFace models
3. **Vector Store**: FAISS creates a searchable index of embeddings
4. **RAG Chain**: LangChain retrieves relevant chunks for context-aware generation
5. **LLM Generation**: TogetherAI's LLaMA model generates summaries, notes, and flashcards

## Model Information

- **Embeddings**: `sentence-transformers/all-MiniLM-L6-v2` (free HuggingFace model)
- **LLM**: `togethercomputer/llama-2-7b-chat` (cost-effective via TogetherAI)
- **Vector Store**: FAISS (efficient similarity search)

## Cost Optimization

- Uses free HuggingFace embeddings model
- Leverages TogetherAI's competitive pricing for LLM inference
- Implements text chunking to optimize token usage
- Caches embeddings for repeated queries

## Error Handling

- Comprehensive error logging
- Graceful failure handling for PDF processing
- File cleanup after processing
- Input validation and sanitization

## Development

For development, set `FLASK_DEBUG=True` in your `.env` file to enable hot reloading and detailed error messages.

## Production Deployment

1. Set `FLASK_ENV=production` in environment variables
2. Use a production WSGI server like Gunicorn
3. Configure proper logging
4. Set up file storage for production use
5. Implement rate limiting and authentication as needed