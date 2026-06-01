---
title: "ASiM: Modeling and Analyzing Inference Accuracy of SRAM-Based Analog CiM Circuits"
short_title: "ASiM"
venue: TVLSI
year: 2025
status: published
section: Circuit
teaser: assets/images/asim-teaser.svg
authors:
  - name: "W. Zhang"
    me: true
  - name: "S. Ando"
    me: true
  - name: "Y.C. Chen"
    me: true
  - name: "K. Yoshioka"
    me: true
tags:
  - CIM
  - Hardware
links:
  paper: https://doi.org/10.1109/tvlsi.2025.3605286
  code: https://github.com/Keio-CSG/ASiM
description_ja: "SRAMベースのアナログCiM回路における推論精度影響をモデル化・解析するシミュレーションフレームワーク。アナログノイズが1LSBでもImageNet等の複雑タスクで精度を大幅低下させることを示し、ハイブリッドアナログ-デジタル実行や多数決投票による軽減策を評価。省エネ効果を保ちながら精度を確保する設計指針を提供する。"
---

A simulation framework for modeling and analyzing how analog noise impacts inference accuracy
in SRAM-based compute-in-memory (CiM) circuits.
Reveals that even 1 LSB of analog noise can significantly impair performance on complex tasks like ImageNet,
and evaluates mitigation strategies — hybrid analog-digital execution and majority voting —
to recover accuracy while preserving CiM energy efficiency benefits.
