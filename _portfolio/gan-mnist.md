---
title: "Generative Adversarial Networks (GANs)"
excerpt: "Deep Convolutional GAN implementation in PyTorch for generating realistic handwritten digits from the MNIST dataset.<br/><br/>**Technologies:** PyTorch, Deep Learning, Generative Models"
collection: portfolio
date: 2023-08-01
image: "portfolio/gan-mnist.png"
github_url: "https://github.com/anyantudre/Generative-Adversarial-Networks-GANs"
tags: [Deep Learning, GANs, PyTorch, Generative AI]
---

## Overview

Implementation of a **Deep Convolutional Generative Adversarial Network (DCGAN)** using PyTorch to generate realistic handwritten digits. The model learns to produce images indistinguishable from real MNIST samples.

![GAN Generated Samples](/images/portfolio/gan-samples.png)

## Architecture

### Generator Network
- Takes random noise vector as input
- Upsamples through transposed convolutions
- Outputs 28x28 grayscale images
- Uses BatchNorm and ReLU activations

### Discriminator Network
- Takes 28x28 images as input
- Downsamples through convolutions
- Outputs probability of image being real
- Uses LeakyReLU and Dropout

## Training Process

The adversarial training involves:

1. **Discriminator Training**
   - Learn to distinguish real MNIST images from generated fakes
   - Maximize classification accuracy

2. **Generator Training**
   - Learn to produce images that fool the discriminator
   - Minimize discriminator's ability to detect fakes

## Results

The trained generator produces realistic handwritten digits across all classes (0-9), demonstrating:
- Diverse digit styles
- Clear, legible outputs
- Smooth interpolation in latent space

## Key Learnings

- GAN training dynamics and stability
- Importance of architectural choices in DCGANs
- Hyperparameter tuning for convergence

## Links

- [GitHub Repository](https://github.com/anyantudre/Generative-Adversarial-Networks-GANs)
- [Original GAN Paper](https://arxiv.org/abs/1406.2661)
- [DCGAN Paper](https://arxiv.org/abs/1511.06434)
