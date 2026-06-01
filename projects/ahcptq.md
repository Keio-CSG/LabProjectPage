---
title: "AHCPTQ: Accurate and Hardware-Compatible Post-Training Quantization for Segment Anything Model"
short_title: "AHCPTQ"
venue: ICCV
year: 2025
status: published
section: Circuit
teaser: assets/images/ahcptq-teaser.svg
highlight: true
authors:
  - name: "W. Zhang"
    me: true
  - name: "Y. Zhong"
  - name: "S. Ando"
    me: true
  - name: "K. Yoshioka"
    me: true
tags:
  - Hardware
  - Edge AI
  - Transformer
links:
  paper: https://openaccess.thecvf.com/content/ICCV2025/papers/Zhang_AHCPTQ_Accurate_and_Hardware-Compatible_Post-Training_Quantization_for_Segment_Anything_Model_ICCV_2025_paper.pdf
description_ja: "Segment Anything Model（SAM）の世界初4ビット量子化PTQを実現するハードウェア協調設計手法。post-GELUの重尾分布に対応するHybrid Log-Uniform量子化と、チャネルグルーピングによるオンチップレジスタ削減（−99.7%）を組み合わせる。FPGA上でW4A4動作時に浮動小数点比7.89倍の高速化・8.64倍の省エネを達成し、36.6% mAPを維持。"
---

Enables the first functional 4-bit post-training quantization of the Segment Anything Model (SAM)
via two hardware co-designed innovations: Hybrid Log-Uniform Quantization (HLUQ) for heavy-tailed
post-GELU activations, and Channel-Aware Grouping (CAG) cutting on-chip register overhead by 99.7%.
FPGA deployment achieves 7.89× speedup and 8.64× energy efficiency over float at W4A4 with 36.6% mAP.
