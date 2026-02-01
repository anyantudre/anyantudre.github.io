---
title: "RNA-Seq Pan-Cancer Clustering for Tumor Identification"
excerpt: "Unsupervised clustering of gene expression data using K-Means and DBSCAN for automatic tumor type identification from TCGA dataset.<br/><br/>**Technologies:** Python, Scikit-learn, PCA, t-SNE"
collection: portfolio
date: 2025-05-25
image: "portfolio/robotic_dna.jpg"
github_url: "https://github.com/anyantudre/RNA-Seq-Pan-Cancer-Clustering-for-Tumor-Identification"
github_stars: 2
tags: [Bioinformatics, Machine Learning, Clustering, Healthcare AI]
---

## Overview

Application of unsupervised clustering algorithms to RNA-Seq gene expression data from the TCGA Pan-Cancer project. The goal is to automatically group cancer samples into clusters that reveal functional or phenotypic similarities without using tumor labels.

## Dataset

**TCGA Pan-Cancer RNA-Seq (HiSeq)**
- **Samples**: 881 patients
- **Features**: 20,531 genes
- **Classes**: 5 tumor types (BRCA, KIRC, COAD, LUAD, PRAD)
- **Source**: [UCI ML Repository](https://archive.ics.uci.edu/)

## Methodology

### Dimensionality Reduction
- **PCA**: Principal Component Analysis for initial reduction
- **t-SNE**: For 2D visualization of high-dimensional clusters

### Clustering Algorithms

**K-Means**
- Optimizes intra-cluster inertia
- Elbow method for optimal K selection
- Well-suited for spherical clusters

**DBSCAN**
- Density-based clustering
- Detects noise and outliers
- Handles arbitrary cluster shapes

### Evaluation Metrics
- Silhouette Score
- Elbow Method
- Visual cluster separation analysis

## Key Findings

The unsupervised approach successfully identified distinct gene expression patterns corresponding to different tumor types, demonstrating the potential for:
- Automatic tumor classification
- Discovery of cancer subtypes
- Biomarker identification

## Applications

- **Clinical Diagnosis**: Automated tumor type identification
- **Drug Discovery**: Identifying similar tumor profiles for treatment
- **Research**: Understanding gene expression patterns in cancer

## Links

- [GitHub Repository](https://github.com/anyantudre/RNA-Seq-Pan-Cancer-Clustering-for-Tumor-Identification)
- [TCGA Pan-Cancer Analysis](https://www.cancer.gov/tcga)
