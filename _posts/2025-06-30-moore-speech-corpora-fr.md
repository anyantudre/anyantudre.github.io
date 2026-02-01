---
title: MooreSpeechCorpora Toolkit, Collecte de données Mooré à partir de la Bible
date: 2025-06-30 02:14:00 +0100
categories: [tutorial]
tags: [moore, speech-recognition, huggingface, tts, asr]
description: De la collecte de données au jeu de données prêt pour Hugging Face.
image:
  path: /images/blog/img_moore_speech_corpora/crawling_process.png
  alt: Processus de crawl
permalink: /blog/posts/moore-speech-corpora-fr/
translation_en: /blog/posts/moore-speech-corpora/
lang: fr
---

Travailler avec des langues sous-dotées comme le mooré est à la fois passionnant et exigeant. Dans ce tutoriel, je vous présente le pipeline complet que j'ai utilisé pour collecter et préparer des données de parole mooré extraites de la Bible, prêtes à être publiées sur le Hugging Face Hub.

---

### 1. Configuration de l'environnement

Commençons par configurer l'environnement Python.

Créez un nouvel environnement virtuel de préférence avec Python 3.10.11 :

```bash
conda create -n mooredata python=3.10.11
conda activate mooredata
```

Je recommande aussi de rétrograder pip à la version 24.0 (ou inférieure) :

```bash
pip install --upgrade "pip<24.1"
```

Vous vous demandez peut-être pourquoi ces contraintes dès le départ. J'ai rencontré de nombreuses erreurs en utilisant Python 3.12.0 et 3.11.13. L'erreur obtenue était :

```bash
ValueError: mutable default <class 'fairseq.dataclass.configs.CommonConfig'>
for field common is not allowed: use default_factory
```

Après pas mal d'investigations, j'ai découvert que ce `ValueError` survient avec Fairseq v0.12.2 sous Python 3.11 ou 3.12 à cause de l'utilisation de valeurs par défaut mutables dans les dataclasses, interdites dans ces versions. D'où le passage à **Python 3.10 et pip &lt;24.1**.

> Faites-moi confiance, appliquez la même chose pour ne pas perdre de temps en conflits de paquets comme moi.

---

### 2. Installation des dépendances audio et texte

Vérifiez que les paquets système nécessaires sont installés.

Mettez à jour la liste des paquets :

```bash
sudo apt-get update -y
```

En principe vous avez déjà les paquets nécessaires :

* pour l'audio : `libsox-fmt-all`, `sox`, et `ffmpeg`
* pour le texte et l'Unicode : `libicu-dev` et `pkg-config`

Sinon, installez-les :

```bash
sudo apt-get install libsox-fmt-all sox ffmpeg
sudo apt install libicu-dev pkg-config
```

---

### 3. Installation de Torch (version nightly)

Installez PyTorch, de préférence la **version nightly** depuis le [site officiel PyTorch](https://pytorch.org/get-started/locally/).

Avec une GPU Nvidia, choisissez la version CUDA. Sinon, restez sur CPU.

![Torch Install](/images/blog/img_moore_speech_corpora/torch_install.png){: width="500" height="300" }

Exemple de commande :

```bash
pip3 install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128
```

Puis installez les paquets additionnels :

```bash
pip3 install -r requirements.txt
```

---

### 4. Cloner les dépôts nécessaires

Il faut deux dépôts externes.

#### Fairseq

```bash
git clone https://github.com/facebookresearch/fairseq.git
cd fairseq
pip install --editable ./
cd ..
```

#### Uroman

```bash
git clone https://github.com/isi-nlp/uroman.git
```

Adaptez la structure pour Fairseq :

```bash
mkdir -p uroman/bin && mv uroman/uroman/uroman.pl uroman/bin/uroman.pl && mv uroman/uroman/data uroman/data
```

Votre arborescence doit ressembler à :

```bash
moore-data-scraping-bible/
├── fairseq/
└── uroman/
    ├── bin/
    │   └── uroman.pl
    ├── data/
    └── (autres dossiers)
```

---

### 5. Scraping des données de la Bible

Une fois tout en place, lancez la collecte des données de la Bible en mooré.

Exécutez :

```bash
sh ./crawlers/bible/crawl.sh
```

En cas d'erreur du type :

```
ImportError: ... libstdc++.so.6: version `GLIBCXX_3.4.30' not found
```

Corrigez avec :

```bash
conda install -c conda-forge gcc=12.1.0
```

![Crawling Process](/images/blog/img_moore_speech_corpora/crawling_process.png){: width="1000" height="150" }

---

### 6. Rééchantillonnage

Rééchantillonnez les fichiers audio à 16 kHz.

Lancez :

```bash
bash preprocessing/resample.sh --input_folder datasets/moore/bible/raw --output_folder datasets/moore/bible/resampled
```

Si le script échoue à cause des fins de ligne, convertissez en format Unix :

```bash
sudo apt install dos2unix
dos2unix resample.sh
```

---

### 7. Alignement forcé

Étape cruciale : découper les longs clips en courtes utterances.

Utilisez l’**MMS Forced Aligner**. Vérifiez si votre langue est supportée [ici](https://dl.fbaipublicfiles.com/mms/tts/all-tts-languages.html). Pour le mooré, le code est `mos`.

Lancez l’alignement :

```bash
bash forced_alignement/align_and_segment.sh \
  --audio_folder datasets/moore/bible/resampled \
  --text_folder datasets/moore/bible/resampled \
  --output_folder datasets/moore/bible/aligned \
  --lang mos \
  --uroman_path ../uroman/bin
```

> Sur une Nvidia RTX 4070 (8 Go), compter environ 5 heures.

---

### 8. Export au format Hugging Face

Dernière étape.

Connectez-vous à Hugging Face :

```bash
huggingface-cli login
```

Puis poussez le jeu de données :

```bash
python data_export/prepare_hf_dataset.py \
  --input_folder datasets/moore/bible/aligned \
  --repo_id anyantudre/moore-speech-bible \
  --hf_token hf_xxxx
```

> Par défaut, les jeux de données sont publics. Vous pouvez modifier cela depuis le tableau de bord Hugging Face.

---

C’est tout. Vous disposez d’un jeu de données de parole mooré prétraité, aligné et prêt pour l’entraînement, à partir du texte et de l’audio de la Bible. J’espère que ce tutoriel vous fera gagner du temps et éviter les pièges que j’ai rencontrés.

N’hésitez pas à forker le dépôt, l’adapter à votre langue et proposer des améliorations.
