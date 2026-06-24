---
title: "D-SLAMSpoof: An Environment-Agnostic LiDAR Spoofing Attack using Dynamic Point Cloud Injection"
short_title: "D-SLAMSpoof"
venue: IROS
year: 2026
status: accepted
section: Sensor
teaser: assets/images/d-slamspoof-teaser.svg
authors:
  - name: "R. Nagata"
    me: true
  - name: "K. Koide"
  - name: "K. Ikeda"
    me: true
  - name: "O. Sako"
    me: true
  - name: "K. Yoshioka"
    me: true
tags:
  - LiDAR
  - Security
links:
  arxiv: https://arxiv.org/abs/2603.11365
description_ja: "従来のLiDARスプーフィング攻撃は特徴の乏しい環境でしか機能しなかったが、D-SLAMSpoofはスキャンマッチング原理に基づいた動的な点群注入パターンを設計することで、都市部・屋内といった特徴豊富な環境でも有効な攻撃を実現する。また、慣性デッドレコニング信号のみで攻撃を検出・軽減する防御手法ISD-SLAMを合わせて提案し、攻撃と防御の両面から自律システムのセキュリティ課題に取り組む。"
---

D-SLAMSpoof overcomes the fundamental limitation of prior LiDAR spoofing attacks —
ineffectiveness in feature-rich environments such as urban areas and indoor spaces.
By designing spatially structured injection shapes and temporally coordinated dynamic patterns
guided by scan matching principles, the attack successfully manipulates SLAM-based localization
regardless of environmental complexity.
The paper also proposes ISD-SLAM, a practical defense that detects and mitigates spoofing-induced drift
using only onboard inertial dead-reckoning signals, requiring no additional hardware.
