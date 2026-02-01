---
title: "Radio Signals Classification"
excerpt: "Deep learning model for classifying radio signals using spectrogram images with PyTorch and transfer learning.<br/><br/>**Technologies:** PyTorch, timm, Audio Processing, Transfer Learning"
collection: portfolio
date: 2024-03-01
image: "portfolio/radio-signals.png"
github_url: "https://github.com/anyantudre/Radio-Signals-Classification"
tags: [Deep Learning, Signal Processing, PyTorch, Audio]
---

## Overview

A deep learning project for classifying radio signals by converting them to spectrogram images and applying computer vision techniques. This approach bridges signal processing and image classification.

![Radio Signals Spectrograms](/images/portfolio/radio-spectrograms.png)

## Approach

### Signal to Image Pipeline
1. **Raw Signal Input**: Radio frequency signals
2. **Spectrogram Generation**: Time-frequency representation
3. **Image Classification**: CNN-based classification

### Data Augmentation

Implemented **SpecAugment** techniques for robust training:
- Time masking
- Frequency masking
- Time warping

### Model Architecture

Using **timm (PyTorch Image Models)** for transfer learning:
- Pre-trained backbones (EfficientNet, ResNet, etc.)
- Fine-tuning on spectrogram images
- Custom classification head

## Key Features

- **Spectrogram Visualization**: Visual representation of signal characteristics
- **Transfer Learning**: Leveraging pre-trained vision models
- **Audio Augmentation**: SpecAugment for data augmentation
- **PyTorch Implementation**: Clean, modular code structure

## Resources

- [SpecAugment Paper](https://research.google/blog/specaugment-a-new-data-augmentation-method-for-automatic-speech-recognition/)
- [PyTorch Audio Augmentation](https://pytorch.org/audio/master/tutorials/audio_feature_augmentation_tutorial.html)
- [timm Documentation](https://timm.fast.ai/)

## Links

- [GitHub Repository](https://github.com/anyantudre/Radio-Signals-Classification)
