---
title: "Ghost-FWL: A Large-Scale Full-Waveform LiDAR Dataset for Ghost Detection and Removal"
short_title: "Ghost-FWL"
venue: CVPR
year: 2026
status: accepted
highlight: true
section: Sensor
teaser: assets/images/ghost-fwl-teaser.svg
authors:
  - name: "K. Ikeda"
    me: true
  - name: "R. Hara"
    me: true
  - name: "R. Nagata"
    me: true
  - name: "O. Sako"
    me: true
  - name: "Z. Ding"
  - name: "T. Kado"
    me: true
  - name: "I. Fujioka"
    me: true
  - name: "T. Beppu"
    me: true
  - name: "M. Isogawa"
  - name: "K. Yoshioka"
    me: true
tags:
  - LiDAR
  - Security
  - Dataset
links:
  arxiv: https://arxiv.org/abs/2603.28224
  code: https://github.com/Keio-CSG/Ghost-FWL
  paper: https://openaccess.thecvf.com/content/CVPR2026/papers/Ikeda_Ghost-FWL_A_Large-Scale_Full-Waveform_LiDAR_Dataset_for_Ghost_Detection_and_CVPR_2026_paper.pdf
  project: https://keio-csg.github.io/Ghost-FWL/
description_ja: "自動運転LiDARで発生するガラス等の多重反射による幽霊点群（ゴースト）を検出・除去するための世界初の大規模モバイルFWLデータセット。24,412フレーム・75億ピークのアノテーションを収録し従来最大比100倍の規模を誇る。FWL-MAE事前学習とTransformerベースラインも提供し、自動運転の3Dマッピング・物体検出精度向上に貢献する。"
order: 1
---

The first large-scale annotated mobile full-waveform LiDAR dataset for ghost artifact
detection and removal, with 24,412 frames and 7.5 billion peak-level annotations — 100× more than prior work.
Ghost points arise from multi-path reflections off glass and reflective surfaces,
degrading 3D mapping and object detection in autonomous driving.
Includes FWL-MAE pretraining and transformer-based detection baselines across Ghost, Object, Glass, and Noise categories.
