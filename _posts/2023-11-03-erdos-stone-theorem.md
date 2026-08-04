---
title: Erdős–Stone Theorem
description: "An introduction to the Erdős–Stone theorem and its role in asymptotic extremal graph theory."
date: 2023-11-03 13:55
last_modified_at: 2024-03-07 00:46:18 +0000
categories: [Posts, Mathematics]
tags: [Graph Theory]
math: true
image: /assets/img/2023-11-03-erdos-stone-theorem/cover.png
permalink: /posts/erdös-stone-theorem/
---

## Basics

**Definition 0.1 (Chromatic number).**
The *chromatic number* of a graph $G$ is

$$
\chi(G)=\min\{k\geq1:G\text{ is }k\text{-colourable}\}.
$$

For $k\in\mathbb N$, a $k$-colouring of $G$ is a map
$c:V(G)\to[k]$, where $[k]=\{1,2,\ldots,k\}$, such that
$c(v)\neq c(w)$ whenever $vw\in E(G)$.

**Definition 0.2 (Extremal number).**
For a graph $H$, its *extremal number* is

$$
\operatorname{ex}(n,H)
=\max\{|E(G)|:|V(G)|=n\text{ and }G\text{ is }H\text{-free}\}.
$$

Here, $G$ is $H$-free if it contains no subgraph isomorphic to $H$. Graphs $G$ and $H$ are isomorphic if there is a bijection
$f:V(G)\to V(H)$ such that

$$
vw\in E(G)\quad\Longleftrightarrow\quad f(v)f(w)\in E(H).
$$

**Proposition 0.3 (Double-counting principle).**
If $G=(A,B;E)$ is bipartite, then

$$
\sum_{a\in A}d(a)=|E|=\sum_{b\in B}d(b).
$$

**Lemma 0.4 (Handshake lemma).**
For every graph $G$,

$$
\sum_{v\in V(G)}d(v)=2|E(G)|.
$$

**Definition 0.5 (Turán density).**
The *Turán density* of a graph $F$ is

$$
\pi(F)=\lim_{n\to\infty}
\frac{\operatorname{ex}(n,F)}{\binom n2}.
$$

Determining $\operatorname{ex}(n,H)$ for a fixed graph $H$ is called the *Turán problem* for $H$.

**Theorem 0.6 (Turán, 1941).**
If $2\leq r\leq n$, then the unique $n$-vertex $K_{r+1}$-free graph with
$\operatorname{ex}(n,K_{r+1})$ edges is the Turán graph $T_r(n)$.

The graph $T_r(n)$ is the complete $r$-partite graph on $n$ vertices whose vertex classes are as equal in size as possible. In particular,

$$
\pi(K_{r+1})=1-\frac1r.
$$

**Theorem 0.7 (Kővári–Sós–Turán, 1954).**
If $n\geq r\geq s\geq2$, then

$$
\operatorname{ex}(n,K_{r,s})
\leq\frac12(r-1)^{1/s}n^{2-1/s}+\frac12(s-1)n.
$$

Thus $\operatorname{ex}(n,K_{r,s})=O(n^{2-1/s})$ and
$\pi(K_{r,s})=0$.

## Erdős–Stone: the fundamental theorem of extremal graph theory

Turán's theorem gives, for $r\geq3$,

$$
\pi(K_r)=1-\frac1{r-1}
=1-\frac1{\chi(K_r)-1}.
$$

The Kővári–Sós–Turán theorem gives the same formula for complete bipartite graphs. The Erdős–Stone theorem shows that it holds for every graph with chromatic number at least two.

**Theorem 0.8 (Erdős–Stone, 1946).**
If $H$ is a graph with $\chi(H)=r\geq2$, then

$$
\pi(H)=1-\frac1{r-1}.
$$

We first prove two lemmas.

---

**Lemma 0.9.**
Let $0<c,\varepsilon<1$ and
$n>2(1+1/c)/\varepsilon$. If an $n$-vertex graph $G$ has at least
$(c+\varepsilon)\binom n2$ edges, then $G$ contains an induced subgraph
$G'$ on $n'\geq\sqrt\varepsilon\,n$ vertices with
$\delta(G')\geq cn'$.

**Proof.** Starting with $G_n=G$, repeatedly delete a vertex of degree less than $ck$ whenever the current graph $G_k$ has $k$ vertices and minimum degree below $ck$. Let
$s=\lceil\sqrt\varepsilon\,n\rceil$.

Suppose the process reaches a graph $G_s$. At the deletion from $G_k$, fewer than $ck$ edges are removed, so

$$
|E(G_s)|
>(c+\varepsilon)\binom n2-c\sum_{k=s+1}^n k.
$$

To verify the required bound, write
$s=\sqrt\varepsilon\,n+\rho$ with $0\leq\rho<1$. Using
$\sum_{k=s+1}^n k=\binom{n+1}{2}-\binom{s+1}{2}$, twice the difference between the right-hand side above and $\binom s2$ is

$$
\begin{aligned}
&c\varepsilon n^2
-n\left(\varepsilon+2c+
\bigl(2(1-c)\rho-(1+c)\bigr)\sqrt\varepsilon\right)\\
&\qquad+\rho\bigl((1+c)-(1-c)\rho\bigr).
\end{aligned}
$$

The final term is non-negative, while

$$
\varepsilon+2c+(1-3c)\sqrt\varepsilon<2(c+1)<c\varepsilon n.
$$

It follows that

$$
(c+\varepsilon)\binom n2-c\sum_{k=s+1}^n k
>\binom s2.
$$

This is impossible for an $s$-vertex graph. Hence the deletion process stops at some $n'>s$, producing an induced subgraph $G'$ with
$\delta(G')\geq cn'$. ◼

**Lemma 1.0.**
Let $r\geq2$, $t\geq1$, and $0<\varepsilon<1/r$. There is an integer
$n_0=n_0(r,t,\varepsilon)$ such that every graph $G$ on
$n\geq n_0$ vertices with

$$
\delta(G)\geq\left(1-\frac1{r-1}+\varepsilon\right)n
$$

contains $K_r(t)$, the complete $r$-partite graph with $t$ vertices in each class.

**Proof.** We argue by induction on $r$. For $r=2$, the minimum-degree assumption is $\delta(G)\geq\varepsilon n$, and hence

$$
|E(G)|\geq\frac{\varepsilon n^2}{2}.
$$

The Kővári–Sós–Turán bound gives
$\operatorname{ex}(n,K_{t,t})=O(n^{2-1/t})$. Therefore, for sufficiently large $n$,
$|E(G)|>\operatorname{ex}(n,K_{t,t})$, so $G$ contains $K_2(t)=K_{t,t}$.

Now let $r\geq3$ and assume the result for $r-1$. Put

$$
w=\left\lceil\frac{2t}{\varepsilon}\right\rceil.
$$

For sufficiently large $n$, the induction hypothesis yields a copy
$H\cong K_{r-1}(w)$ in $G$, because

$$
1-\frac1{r-1}+\varepsilon
>1-\frac1{r-2}+\varepsilon.
$$

Write the vertex classes of $H$ as
$W_1,\ldots,W_{r-1}$, with $|W_i|=w$, and let
$W=V(H)$. Define

$$
S=\{v\in V(G)\setminus W:d_W(v)\geq(r-2)w+t\}.
$$

Every vertex in $S$ has at least $t$ neighbours in each $W_i$. Suppose that $G$ is $K_r(t)$-free. Count pairs $(v,L)$ where $v\in S$ and $L$ is a copy of $K_{r-1}(t)$ in $H$ all of whose vertices are adjacent to $v$. Every $v\in S$ occurs in at least one such pair, while each $L$ occurs in at most $t-1$ pairs; otherwise, $L$ and $t$ of its common neighbours would form a $K_r(t)$. Consequently,

$$
|S|\leq(t-1)\binom wt^{r-1}.
\tag{1}
$$

We show that this is impossible when $n$ is large. The number of edges between $W$ and $V(G)\setminus W$ satisfies

$$
\begin{aligned}
e(W,V(G)\setminus W)
&=\sum_{v\in W}d_G(v)-2e(W)\\
&>|W|\left(1-\frac1{r-1}+\varepsilon\right)n-|W|^2.
\end{aligned}
\tag{2}
$$

On the other hand, vertices outside $S\cup W$ have fewer than
$(r-2)w+t$ neighbours in $W$, whereas vertices in $S$ have at most
$|W|$ such neighbours. Hence

$$
e(W,V(G)\setminus W)
<((r-2)w+t)(n-|W|-|S|)+|W||S|.
\tag{3}
$$

Since $|W|=(r-1)w$, combining (2) and (3) gives

$$
|S|>
n\frac{\varepsilon(r-1)w-t}{w-t}-|W|.
\tag{4}
$$

The coefficient of $n$ is positive because
$w\geq2t/\varepsilon$. Thus the right-hand side of (4) tends to infinity with $n$, contradicting the constant upper bound in (1). Therefore $G$ contains $K_r(t)$. ◼

![A diagram of the sets used in the proof](/assets/img/2023-11-03-erdos-stone-theorem/graph-g.png)
_The sets used in the proof of Lemma 1.0_

---

We can now prove the main theorem.

**Proof of Theorem 0.8.** Let $\chi(H)=r\geq2$. The Turán graph
$T_{r-1}(n)$ is $(r-1)$-colourable and therefore $H$-free. Hence

$$
\operatorname{ex}(n,H)
\geq |E(T_{r-1}(n))|
=\operatorname{ex}(n,K_r),
$$

which yields

$$
\pi(H)\geq1-\frac1{r-1}.
\tag{5}
$$

For the reverse inequality, choose $t\geq|V(H)|$. A proper $r$-colouring embeds $H$ into $K_r(t)$. Therefore every $H$-free graph is also $K_r(t)$-free, and

$$
\operatorname{ex}(n,H)\leq\operatorname{ex}(n,K_r(t)).
\tag{6}
$$

It remains to bound the right-hand side. Let $\eta>0$ be sufficiently small and suppose that an $n$-vertex graph $G$ has at least

$$
\left(1-\frac1{r-1}+\eta\right)\binom n2
$$

edges. Apply Lemma 0.9 with

$$
c=1-\frac1{r-1}+\frac\eta2
\qquad\text{and}\qquad
\varepsilon=\frac\eta2.
$$

For sufficiently large $n$, it produces a subgraph $G'$ whose order tends to infinity with $n$ and whose minimum degree is at least

$$
\left(1-\frac1{r-1}+\frac\eta2\right)|V(G')|.
$$

Lemma 1.0 then implies that $G'$ contains $K_r(t)$. Thus, for all sufficiently large $n$,

$$
\frac{\operatorname{ex}(n,K_r(t))}{\binom n2}
<1-\frac1{r-1}+\eta.
$$

Because $\eta>0$ is arbitrary, (6) gives
$\pi(H)\leq1-1/(r-1)$. Combining this with (5) proves the theorem. ◼
