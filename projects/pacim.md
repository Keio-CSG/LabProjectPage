---
title: "PACiM: A Sparsity-Centric Hybrid Compute-in-Memory Architecture via Probabilistic Approximation"
short_title: "PACiM"
venue: ICCAD
year: 2024
status: published
section: Circuit
highlight: true
description_ja: "確率的近似（PAC）によりベクトル演算をスカラー演算に変換し、スパース性を最大限活用するハイブリッドCIMアーキテクチャ。最小有効ビットの省略でメモリ転送量を半減し、従来比4倍の近似誤差低減を実現。65nm CMOSで14.63 TOPS/Wを達成し、ResNet-18でImageNet精度を維持する。"
teaser: assets/images/pacim-teaser.svg
authors:
  - name: "W. Zhang"
    me: true
  - name: "S. Ando"
    me: true
  - name: "Y.C. Chen"
    me: true
  - name: "S. Miyagi"
    me: true
  - name: "S. Takamaeda-Yamazaki"
  - name: "K. Yoshioka"
    me: true
tags:
  - CIM
  - Hardware
links:
  paper: https://dl.acm.org/doi/10.1145/3676536.3676704
  code: https://github.com/Keio-CSG/PACiM
---

A sparsity-centric hybrid compute-in-memory architecture using probabilistic approximation (PAC)
to convert vector operations into scalar computations, halving memory transfers by eliminating LSB transmission.
Achieves 14.63 TOPS/W in 65 nm CMOS with 4× lower approximation error than prior methods,
maintaining ResNet-18 ImageNet accuracy.
