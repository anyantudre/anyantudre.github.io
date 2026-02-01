---
title: "Barbados Traffic Analysis Challenge"
excerpt: "ML solution for predicting traffic congestion using video analysis. Implemented YOLO detection, VideoMAE embeddings, and ensemble models.<br/><br/>**Technologies:** PyTorch, YOLOv11, VideoMAE, XGBoost, OpenCV"
collection: portfolio
date: 2026-01-15
image: "portfolio/barbados-traffic.png"
github_url: "https://github.com/anyantudre/barbados-traffic-analysis-challenge"
github_stars: 3
tags: [Computer Vision, Video Analysis, Machine Learning, YOLO]
---

## Overview

Machine Learning solution developed for the [Zindi Barbados Traffic Analysis Challenge](https://zindi.africa/competitions/barbados-traffic-analysis-challenge). The goal: predict traffic congestion levels 15 minutes into the future using video data from roundabout cameras.

![Challenge Overview](https://github.com/anyantudre/barbados-traffic-analysis-challenge/blob/main/img/barbados-traffic-analysis-challenge-2.png)

## Challenge Constraints

- **Prediction Window**: 15 minutes ahead using 45 minutes of historical video
- **Embargo Period**: 2-minute processing delay simulation
- **Multi-Camera**: 4 cameras monitoring Norman Niles roundabout
- **Congestion Classes**: Free flowing, Light delay, Moderate delay, Heavy delay

## Our Approach

### Feature Extraction Pipeline

**1. Basic Features**
- Optical flow for motion pattern analysis
- Statistical features (intensity, edge activity, brightness)

**2. YOLO-based Detection**
- YOLOv11 vehicle detection and tracking
- Vehicle counting and type classification
- Speed estimation and zone-based distribution

**3. Deep Learning Embeddings**
- EfficientNet-B0 scene embeddings
- VideoMAE spatio-temporal features
- Meta's Perception Encoder for video understanding

### Modeling Strategy

| Model Type | Models Used |
|------------|-------------|
| Tree-Based | Random Forest, XGBoost, LightGBM, CatBoost |
| Ensemble | Soft Voting Classifier |
| Video Transformers | Fine-tuned VideoMAE |

## Results

Achieved competitive ranking in the final leaderboard using our ensemble approach combining tree-based models with video transformer features.

## Team

- [Wendemi Brice Roméo ZEMBA](https://github.com/BriceZemba)
- [Wendyellé A. Alban NYANTUDRE](https://github.com/anyantudre)

## Links

- [GitHub Repository](https://github.com/anyantudre/barbados-traffic-analysis-challenge)
- [Zindi Competition Page](https://zindi.africa/competitions/barbados-traffic-analysis-challenge)
