---
title: "Neural Reconstruction of LiDAR Point Clouds under Jamming Attacks via Full-Waveform Representation and Simultaneous Laser Sensing"
short_title: "PULSAR-Net"
venue: arXiv
year: 2026
status: preprint
section: Sensor
teaser: assets/images/pulsar-net-teaser.svg
authors:
  - name: "R. Yoshida"
    me: true
  - name: "T. Sato"
    me: true
  - name: "W. Zhang"
    me: true
  - name: "Y. Hayakawa"
    me: true
  - name: "S. Nagai"
    me: true
  - name: "T. Kado"
  - name: "T. Beppu"
  - name: "I. Fujioka"
  - name: "Y. Zhong"
  - name: "K. Yoshioka"
    me: true
tags:
  - LiDAR
  - Security
links:
  arxiv: https://arxiv.org/abs/2604.00371
description_ja: "高頻度レーザーパルスでLiDARを完全に盲目にするジャミング攻撃に対する世界初の有効な防御手法PULSAR-Netを提案。通常廃棄される中間フルウェーブフォームデータと同時マルチレーザーセンシングの空間時間相関を活用し、軸方向アテンション付きU-Netで攻撃パルスを正当反射から分離する。合成データのみで訓練しながら、実世界の静止・走行シナリオで92%・73%の点群再構成率を達成した。"
---

PULSAR-Net, the first effective defense against LiDAR jamming attacks that blind sensors
by flooding them with high-frequency laser pulses.
By leveraging intermediate full-waveform data (normally discarded after peak detection)
and simultaneous multi-laser sensing patterns, a 3D U-Net with axial spatial-temporal attention
segments attack pulses from legitimate reflections directly in the waveform domain.
Trained exclusively on synthetic data, PULSAR-Net achieves 92% and 73% point-cloud reconstruction
rates for vehicles erased by attacks in real-world static and driving scenarios respectively.
