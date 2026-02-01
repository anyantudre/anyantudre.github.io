---
title: "Florence-2 Vision Language Model Toolkit"
excerpt: "Comprehensive collection of notebooks for Microsoft's Florence-2 VLM: inference, data auto-labeling, and fine-tuning for various computer vision tasks.<br/><br/>**Technologies:** PyTorch, Hugging Face Transformers, Computer Vision"
collection: portfolio
date: 2024-07-01
image: "portfolio/florence2.png"
github_url: "https://github.com/anyantudre/Florence-2-Vision-Language-Model"
github_stars: 147
tags: [Computer Vision, VLM, Deep Learning, Hugging Face]
---

## Overview

A comprehensive toolkit for working with **Microsoft's Florence-2**, a cutting-edge vision-language foundation model. This repository provides ready-to-use notebooks for inference, data annotation, and fine-tuning across multiple computer vision tasks.

![Florence-2 Architecture](/images/portfolio/florence2-arch.png)

## Why Florence-2?

Florence-2 is an advanced, lightweight foundation vision-language model (0.2B and 0.7B parameters) that achieves results comparable to much larger models like Kosmos-2. Its strength lies in the massive **FLD-5B dataset** containing 5.4 billion visual annotations.

### Supported Tasks (Out of the Box)

- **Captioning**: Caption, Detailed Caption, More Detailed Caption
- **Object Detection**: Dense Region Caption, Object Detection
- **Text Recognition**: OCR, OCR with Region
- **Grounding**: Caption to Phrase Grounding, Segmentation
- **Region Proposals**: Region proposal generation

## Repository Contents

| Notebook | Description |
|----------|-------------|
| `1. Florence-2 sample inference.ipynb` | Basic inference for all supported tasks |
| `2. Data auto-labelling with Florence-2.ipynb` | Automatic data annotation pipeline |
| `3. Fine-tuning Florence-2.ipynb` | Custom fine-tuning workflow |
| `4. Finetuning on detection dataset - Roboflow.ipynb` | Object detection fine-tuning |

## Model Variants

| Model | Size | Description |
|-------|------|-------------|
| Florence-2-base | 0.23B | Pretrained on FLD-5B |
| Florence-2-large | 0.77B | Pretrained on FLD-5B |
| Florence-2-base-ft | 0.23B | Fine-tuned on downstream tasks |
| Florence-2-large-ft | 0.77B | Fine-tuned on downstream tasks |

## Key Features

- **Unified Representation**: Single model for 10+ vision tasks
- **Prompt-Based Interface**: Simple text prompts for task specification
- **Efficient Fine-tuning**: Low-resource fine-tuning capabilities
- **Production Ready**: Deployable on mobile devices

## Links

- [GitHub Repository](https://github.com/anyantudre/Florence-2-Vision-Language-Model)
- [Florence-2 Technical Report](https://arxiv.org/abs/2311.06242)
- [Hugging Face Model](https://huggingface.co/microsoft/Florence-2-large)
