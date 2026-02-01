---
title: YOLO, You Only Look Once
date: 2025-06-29 04:30:00 +0100
categories: [paper_review]
tags: [paper_review, deep_learning, cnn, yolo]
description: YOLO unifie la détection d'objets en un seul réseau convolutif qui traite toute l'image en une passe.
image:
  path: /images/blog/img_yolo/the_model.png
  alt: Modèle YOLO.
math: true
permalink: /blog/posts/yolo-review-fr/
translation_en: /blog/posts/yolo-review/
lang: fr
---


## Résumé
Nous présentons YOLO, une nouvelle approche de la détection d'objets. Les travaux antérieurs réutilisent des classifieurs pour la détection. Nous formulons plutôt la détection comme un **problème de régression** : boîtes englobantes et probabilités de classe en une seule évaluation. Un seul réseau prédit boîtes et classes directement à partir de l'image entière. Comme tout le pipeline est un seul réseau, il peut être optimisé de bout en bout.

L'architecture est **très rapide** : le modèle YOLO de base tourne en temps réel à 45 images/s. Une version plus petite, Fast YOLO, atteint 155 images/s tout en dépassant le mAP des autres détecteurs temps réel. Par rapport aux systèmes de pointe, YOLO fait plus d'erreurs de localisation mais moins de faux positifs sur le fond. Enfin, YOLO apprend des représentations très générales et surpasse d'autres méthodes (DPM, R-CNN) lors du transfert vers d'autres domaines (ex. œuvres d'art).


> - **Article original** : [You Only Look Once: Unified, Real-Time Object Detection](https://arxiv.org/abs/1506.02640)
> - **Dépôt GitHub** : [Deep Learning Classics: Read, Review, Recode](https://github.com/anyantudre/Deep_Learning_Classics)
{: .prompt-info }


## Contexte et problématique
L’humain voit une image et sait immédiatement quels objets sont présents, où ils sont et comment ils interagissent.

Les systèmes de détection classiques adaptent des classifieurs (fenêtre glissante type DPM, ou propositions de régions type R-CNN puis classement). Un post-traitement affine les boîtes et les scores.

> ***Ces pipelines sont lents et difficiles à optimiser car chaque composant est entraîné séparément.***
{: .prompt-warning }

YOLO reformule la détection en **une seule régression** : des pixels aux coordonnées des boîtes et aux probabilités de classe (you only look once). Un seul CNN prédit plusieurs boîtes et leurs probabilités. Avantages : YOLO est très rapide (45 fps), raisonne globalement sur l’image et apprend des représentations généralisables.

![YOLO](/images/blog/img_yolo/yolo.png){: width="500" height="200" }
_Système de détection YOLO._



## Idée centrale : détection unifiée
YOLO divise l’image en une grille $S \times S$. Si le centre d’un objet tombe dans une cellule, cette cellule est responsable de le détecter.

Chaque cellule prédit :

* $B$ boîtes, chacune avec :
  * **Coordonnées** : $(x, y, w, h)$
  * **Score de confiance** :
    $$
    \text{Confiance} = \Pr(\text{Objet}) \times \text{IOU}_{\text{vérité, prédit}}
    $$
* $C$ **probabilités de classe conditionnelles** sachant qu’un objet est présent :
  $$
  \Pr(\text{Classe}_i \mid \text{Objet})
  $$

Chaque boîte fait donc **5 prédictions** : $(x, y, w, h, \text{Confiance})$.

Au test, le **score de confiance par classe** pour chaque boîte est :
$$
\Pr(\text{Classe}_i) \times \text{IOU}_{\text{vérité, prédit}} = \Pr(\text{Classe}_i \mid \text{Objet}) \times \Pr(\text{Objet}) \times \text{IOU}_{\text{vérité, prédit}}
$$

Ce score combine la **probabilité de la classe** et **l’adéquation de la boîte** à la vérité terrain.

![Modèle YOLO](/images/blog/img_yolo/the_model.png){: width="600" height="200" }
_Le modèle. Les prédictions sont encodées en un tenseur S×S×(B×5+C)._


## Conception du réseau
YOLO est un CNN évalué sur PASCAL VOC : **24 couches convolutives** pour les traits, **2 couches fully connected** pour les boîtes et les classes. Inspiré de GoogLeNet avec des **réductions 1×1** puis **convolutions 3×3**. **Fast YOLO** : 9 couches et moins de filtres, au détriment de la précision. Sortie : tenseur **7×7×30**.

![Architecture YOLO](/images/blog/img_yolo/architecture.png){: width="900" height="300" }
_Architecture YOLO_

### Entraînement

1. **Pré-entraînement** : 20 premières couches convolutives sur ImageNet (1000 classes) avec Darknet, ~88 % top-5 sur la validation ImageNet 2012.
2. **Passage à la détection** : 4 couches conv + 2 FC (initialisées aléatoirement). Résolution d’entrée **224×224 → 448×448**.
3. **Sortie** : tenseur **7×7×30** ; $(x, y, w, h)$ et confiances normalisés dans $[0, 1]$.
4. **Activations** : **Leaky ReLU** partout, activation linéaire en sortie.
5. **Fonction de perte** : erreur quadratique multi-parties (coordonnées, confiance objet/non-objet, classification). $\lambda_{\text{coord}} = 5$, $\lambda_{\text{noobj}} = 0.5$. Prédiction de $\sqrt{w}$ et $\sqrt{h}$ pour limiter la sensibilité aux grandes boîtes.
6. **Stratégie** : **135 epochs** sur PASCAL VOC 2007+2012, batch 64, momentum 0.9, weight decay 0.0005. LR : warm-up puis $10^{-2}$ (75 ep.) → $10^{-3}$ (30) → $10^{-4}$ (30). **Dropout** 0.5 après la première FC ; augmentation (scale, translation, HSV).


## Limites
YOLO est limité par des contraintes spatiales fortes : chaque cellule ne prédit que deux boîtes et une classe, ce qui gêne la détection d’objets proches ou de petits objets groupés. Il généralise mal à des formes inhabituelles et utilise des traits assez grossiers. La perte traite de la même façon les erreurs sur petites et grandes boîtes, alors que les petites erreurs sur petites boîtes impactent plus l’IOU. La principale source d’erreur reste la **localisation imprécise**.
