---
title: "Fine-Tuning MMS Adapter Models for Low-Resource ASR"
excerpt: "Scripts and utilities for fine-tuning Meta's Massive Multilingual Speech (MMS) adapter models for ASR on low-resource languages like Mooré.<br/><br/>**Technologies:** PyTorch, Hugging Face Transformers, Speech Processing"
collection: portfolio
date: 2024-10-21
image: "portfolio/mms_map.png"
github_url: "https://github.com/anyantudre/mms-adapter-asr-finetuning"
tags: [Speech Recognition, NLP, Low-Resource Languages, Hugging Face]
---

## Overview

A comprehensive toolkit for fine-tuning **Meta's Massive Multilingual Speech (MMS)** adapter models for Automatic Speech Recognition (ASR), specifically designed for low-resource languages like Mooré.

## Features

- **Adapter-Based Fine-tuning**: Efficient training using adapter layers
- **Flexible Data Loading**: Support for Hugging Face datasets and local files
- **CTC Loss Training**: Connectionist Temporal Classification for sequence-to-sequence ASR
- **WER Evaluation**: Word Error Rate metrics for performance assessment

## Repository Structure

```
├── data/           # Data preprocessing scripts
├── models/         # Model loading and checkpoints
├── scripts/
│   ├── preprocess.py    # Data preprocessing
│   ├── train.py         # Training script
│   ├── evaluate.py      # Evaluation with WER
│   └── inference.py     # Run inference
├── utils/
│   └── config.yaml      # Configuration file
└── logs/           # Training logs
```

## Quick Start

```bash
# Preprocess data
python scripts/preprocess.py --data_source huggingface

# Train model
python scripts/train.py --config utils/config.yaml

# Evaluate
python scripts/evaluate.py --checkpoint models/checkpoints/

# Inference
python scripts/inference.py --audio_file audio.wav
```

## Why Adapter Fine-tuning?

Adapter-based fine-tuning offers several advantages:
- **Parameter Efficient**: Only train adapter layers, not the full model
- **Memory Efficient**: Smaller memory footprint during training
- **Multi-task Ready**: Share base model across multiple languages
- **Quick Adaptation**: Fast fine-tuning for new languages

## About MMS

Meta's MMS supports 1,100+ languages with models for:
- Automatic Speech Recognition (ASR)
- Text-to-Speech (TTS)
- Language Identification

## Links

- [GitHub Repository](https://github.com/anyantudre/mms-adapter-asr-finetuning)
- [MMS Paper](https://arxiv.org/abs/2305.13516)
- [Hugging Face MMS Models](https://huggingface.co/facebook/mms-1b-all)
- [Fine-tuning MMS Adapters Blog](https://huggingface.co/blog/mms_adapters)
