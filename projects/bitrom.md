---
title: "BitROM: Weight Reload-Free CiROM Architecture Towards Billion-Parameter 1.58-bit LLM Inference"
short_title: "BitROM"
venue: ASP-DAC
year: 2026
status: published
section: Circuit
teaser: assets/images/bitrom-teaser.svg
authors:
  - name: "W. Zhang"
    me: true
  - name: "X. Li"
    me: true
  - name: "S. Ando"
    me: true
  - name: "K. Yoshioka"
    me: true
tags:
  - CIM
  - Hardware
  - Edge AI
links:
  arxiv: https://arxiv.org/abs/2509.08542
  code: https://github.com/Wenlun-Zhang/BitROM
description_ja: "1.58ビット（三値）重みを用いた10億パラメータ規模LLM推論をウェイトリロードなしで実現するCiROMアーキテクチャ。双方向ROMアレイ・三値局所アキュムレータ・KVキャッシュ用eDRAMを統合し、外部DRAMアクセスを43.6%削減。20.8 TOPS/Wの高効率と先行デジタルCiROM比10倍の面積効率を達成する。"
---

A weight reload-free Compute-in-Read-Only-Memory (CiROM) architecture for billion-parameter LLM inference
using 1.58-bit (ternary) weights.
Integrates bidirectional ROM arrays, tri-mode local accumulators, and eDRAM KV-cache management,
reducing external DRAM access by 43.6% during decoding.
Achieves 20.8 TOPS/W and 10× area efficiency improvement over prior digital CiROM designs.
