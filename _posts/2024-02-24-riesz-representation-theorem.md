---
title: Riesz's Representation Theorem
description: "A proof of the representation of continuous linear functionals on sequence spaces without assuming an inner product."
date: 2024-02-24 12:01
categories: [Posts, Mathematics]
tags: [Functional Analysis]
math: true
image: /assets/img/2024-02-24-riesz-representation-theorem/cover.png
---

## Introduction

The Riesz representation theorem characterizes continuous linear functionals on a Hilbert space in terms of its inner product. In this post, however, we do not assume an inner-product structure. Instead, we describe the continuous duals of the standard sequence spaces $\ell^p$ and $c_0$.

For $1\leq p<\infty$, define

$$
\ell^p=\left\{a=(a_j)_{j=1}^{\infty}:\|a\|_p<\infty\right\},
\qquad
\|a\|_p=\left(\sum_{j=1}^{\infty}|a_j|^p\right)^{1/p}.
$$

We also write

$$
\ell^\infty=\left\{a=(a_j)_{j=1}^{\infty}:\sup_{j\geq1}|a_j|<\infty\right\},
\qquad
\|a\|_\infty=\sup_{j\geq1}|a_j|.
$$

Throughout, $p$ and $q$ are conjugate exponents: $1/p+1/q=1$, with $q=\infty$ when $p=1$. Over $\mathbb C$, the pairing below is bilinear rather than sesquilinear; the conjugates that appear in the proof are chosen accordingly.

## Main theorems

**Theorem 1 (Representation theorem for $\ell^p$, $1\leq p<\infty$).**
Let $p\in[1,\infty)$ and let $q$ be its conjugate exponent. Define

$$
\Psi_p:\ell^q\longrightarrow(\ell^p)^*,
\qquad
[\Psi_p(y)](x)=\sum_{k=1}^{\infty}x_k y_k.
$$

Then $\Psi_p$ is a linear isometric isomorphism.

**Proof.** Hölder's inequality gives

$$
|[\Psi_p(y)](x)|
\leq\sum_{k=1}^{\infty}|x_k y_k|
\leq\|x\|_p\|y\|_q.
$$

Thus the series converges absolutely, $\Psi_p(y)$ is a bounded linear functional, and
$\|\Psi_p(y)\|\leq\|y\|_q$. The map $\Psi_p$ is linear by linearity of the series.

We next prove the reverse norm inequality. Suppose first that $1<p<\infty$ and $y\neq0$. Define

$$
x_k=
\begin{cases}
|y_k|^{q-1}\dfrac{\overline{y_k}}{|y_k|},&y_k\neq0,\\[6pt]
0,&y_k=0.
\end{cases}
$$

Since $(q-1)p=q$, we have $x\in\ell^p$ and

$$
\|x\|_p=\|y\|_q^{q-1},
\qquad
[\Psi_p(y)](x)=\sum_{k=1}^{\infty}|y_k|^q=\|y\|_q^q.
$$

Consequently, $\|\Psi_p(y)\|\geq\|y\|_q$. If $p=1$, then for each $k$ with $y_k\neq0$, the vector
$x=(\overline{y_k}/|y_k|)e^{(k)}$ has $\|x\|_1=1$ and
$|[\Psi_1(y)](x)|=|y_k|$. Taking the supremum over $k$ gives
$\|\Psi_1(y)\|\geq\|y\|_\infty$. Hence

$$
\|\Psi_p(y)\|=\|y\|_q
$$

in every case, so $\Psi_p$ is an isometry and is therefore injective.

It remains to prove surjectivity. Let $\psi\in(\ell^p)^*$ and define
$y_k=\psi(e^{(k)})$, where $e^{(k)}$ is the $k$th standard unit vector.

When $p=1$, $|y_k|\leq\|\psi\|$ for every $k$, so $y\in\ell^\infty$. Now let $1<p<\infty$ and, for $n\geq1$, put

$$
S_n=\sum_{k=1}^n|y_k|^q
$$

and define the finitely supported vector

$$
x_k^{(n)}=
\begin{cases}
|y_k|^{q-1}\dfrac{\overline{y_k}}{|y_k|},&1\leq k\leq n\text{ and }y_k\neq0,\\[6pt]
0,&\text{otherwise}.
\end{cases}
$$

Then $\|x^{(n)}\|_p=S_n^{1/p}$ and

$$
S_n=|\psi(x^{(n)})|
\leq\|\psi\|S_n^{1/p}.
$$

If $S_n>0$, this implies $S_n^{1/q}\leq\|\psi\|$. The partial sums $S_n$ are therefore bounded, so $y\in\ell^q$.

Finally, for any $x\in\ell^p$, its truncations
$x^{[n]}=\sum_{k=1}^n x_k e^{(k)}$ converge to $x$ in $\ell^p$. By continuity and linearity of $\psi$,

$$
\psi(x)
=\lim_{n\to\infty}\sum_{k=1}^n x_k\psi(e^{(k)})
=\sum_{k=1}^{\infty}x_k y_k
=[\Psi_p(y)](x).
$$

Thus $\psi=\Psi_p(y)$, and $\Psi_p$ is surjective. ◼

---

**Theorem 2 (Representation theorem for $c_0$).**
Let $c_0$ be the closed subspace of $\ell^\infty$ consisting of sequences that converge to zero. Define

$$
\Psi_\infty:\ell^1\longrightarrow(c_0)^*,
\qquad
[\Psi_\infty(y)](x)=\sum_{k=1}^{\infty}x_k y_k.
$$

Then $\Psi_\infty$ is a linear isometric isomorphism.

**Proof.** For $x\in c_0$ and $y\in\ell^1$,

$$
|[\Psi_\infty(y)](x)|
\leq\|x\|_\infty\|y\|_1.
$$

Hence $\Psi_\infty(y)$ is a bounded linear functional and
$\|\Psi_\infty(y)\|\leq\|y\|_1$. For each $n$, define

$$
x_k^{(n)}=
\begin{cases}
\dfrac{\overline{y_k}}{|y_k|},&1\leq k\leq n\text{ and }y_k\neq0,\\[6pt]
0,&\text{otherwise}.
\end{cases}
$$

Then $x^{(n)}\in c_0$, $\|x^{(n)}\|_\infty\leq1$, and

$$
[\Psi_\infty(y)](x^{(n)})=\sum_{k=1}^n|y_k|.
$$

Letting $n\to\infty$ yields $\|\Psi_\infty(y)\|\geq\|y\|_1$. Therefore $\Psi_\infty$ is an isometry, and it is linear by linearity of the series.

For surjectivity, let $\psi\in(c_0)^*$ and set $y_k=\psi(e^{(k)})$. Using the vectors $x^{(n)}$ defined above, now with these coefficients $y_k$, gives

$$
\sum_{k=1}^n|y_k|
=|\psi(x^{(n)})|
\leq\|\psi\|.
$$

The partial sums are bounded, so $y\in\ell^1$. If $x\in c_0$, then its truncations
$x^{[n]}=\sum_{k=1}^n x_k e^{(k)}$ converge to $x$ in the supremum norm. Therefore

$$
\psi(x)
=\lim_{n\to\infty}\sum_{k=1}^n x_k\psi(e^{(k)})
=\sum_{k=1}^{\infty}x_k y_k
=[\Psi_\infty(y)](x).
$$

Thus every element of $(c_0)^*$ has the required form, completing the proof. ◼
