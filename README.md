# RAGVerse AI

A comprehensive Retrieval-Augmented Generation (RAG) experimentation platform for building, comparing, evaluating, and analyzing multiple RAG architectures on a common knowledge base.

---

## Overview

RAGVerse AI is a full-stack research and experimentation platform designed to study and benchmark different Retrieval-Augmented Generation (RAG) techniques.

The platform enables users to:

- Upload and process PDF documents
- Create searchable vector databases
- Compare multiple RAG architectures
- Visualize retrieval pipelines
- Evaluate answer quality
- Track experiments
- Manage datasets
- Export benchmark results

The project provides a unified environment for understanding how different retrieval and reasoning strategies affect answer quality.

---

## Key Features

### Document Processing

- PDF Upload
- PDF Text Extraction
- Automatic Chunking
- Embedding Generation
- ChromaDB Storage

### Retrieval-Augmented Generation

Implemented RAG architectures:

1. Naive RAG
2. Hybrid RAG
3. Fusion RAG
4. Graph RAG
5. MultiHop RAG
6. ReRank RAG
7. Adaptive RAG
8. Agentic RAG
9. Self-RAG
10. Corrective RAG

### Evaluation & Benchmarking

- Benchmark Analytics
- RAG Comparison Dashboard
- Pipeline Explorer
- Quality Leaderboard
- Performance Metrics

### Experiment Management

- Save Experiments
- View Experiment Details
- Dataset Manager
- Export Results to JSON
- Export Results to CSV

### Visualization

- Architecture Dashboard
- Pipeline Explorer
- Benchmark Charts
- RAG Flow Analysis

---

# System Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
FastAPI Backend
 │
 ├──────── Upload API
 │                │
 │                ▼
 │          PDF Loader
 │                │
 │                ▼
 │           Chunking
 │                │
 │                ▼
 │         Embeddings
 │                │
 │                ▼
 │           ChromaDB
 │
 ├──────── Query API
 │                │
 │                ▼
 │         Selected RAG
 │                │
 │                ▼
 │              LLM
 │                │
 │                ▼
 │           Response
 │
 ├──────── Evaluation Engine
 │
 ├──────── Experiment Manager
 │
 ├──────── Dataset Manager
 │
 └──────── Export Engine
