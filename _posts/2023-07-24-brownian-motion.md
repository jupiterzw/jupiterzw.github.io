---
title: Brownian Motion
date: 2023-07-29 09:58
categories: [Posts, Mathematics]
tags: [pde, probability, complex analysis]     # TAG names should always be lowercase
math: true
image: https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5d4RmOgxGRXE3Cq3RtV_Eg.jpeg
---

## Motivation

## 1D Brownian motion

**Theorem 0.1 (Existence of Brownian Motion)**
Let $x \in \mathbb{R}$. 
There is a random continous function $t \mapsto B_t$, defined for all $t \in [0, \infty)$ such that:

1. $B_0 = x$.
2. For any $0 \leq u \leq t$, the random variable $B_t - B_0$ is independent of $\sigma(B_v; v \leq u)$.
3. For any $0 \leq u \leq t$, the random variable $B_t - B_0$ has distribution $N(0, t - u)$.

Any random continuous function which satisfies these conditions has the same distribution.
