---
title: "MirrorDrift: Actuated Mirror-Based Attacks on LiDAR SLAM"
short_title: "MirrorDrift"
venue: IROS
year: 2026
status: accepted
section: Sensor
teaser: assets/images/mirrordrift-teaser.svg
authors:
  - name: "R. Nagata"
    me: true
  - name: "K. Koide"
  - name: "K. Ikeda"
    me: true
  - name: "O. Sako"
    me: true
  - name: "S. Horie"
    me: true
  - name: "K. Yoshioka"
    me: true
tags:
  - LiDAR
  - Security
links:
  arxiv: https://arxiv.org/abs/2603.11364
description_ja: "信号注入に頼る既存のLiDAR物理攻撃は最新の防御機構で軽減されつつあるが、MirrorDriftはアクチュエーター付き平面鏡の鏡面反射だけでゴースト点群を生成し、注入装置を一切使わずにスキャンマッチングの対応関係を系統的に歪める。鏡の配置・向き・駆動を最適化した結果、ランダム配置比6.1倍の平均姿勢誤差増大、最大6.03mの位置推定誤差を3種のSLAMシステムで実証した。"
---

MirrorDrift demonstrates that mirror reflections are a stealthy, injection-free alternative
to signal-injection-based LiDAR attacks.
Using a planar mirror equipped with an actuation mechanism, ghost points are created by reflecting
existing laser pulses, systematically biasing scan matching correspondences without emitting any signal.
The attack optimizes mirror placement, alignment, and actuation to maximize localization error —
achieving a 6.1× increase in mean pose error over random placement, inducing up to 6.03 m of
localization error, and degrading three SLAM systems to 2.29–3.31 m average trajectory error.
