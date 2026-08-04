---
title: Splitting Graphs
description: "An exploration of the probabilistic method through graph splitting, stable sets, bipartite graphs, and hypergraph colouring."
date: 2023-07-21 18:30
categories: [Posts, Mathematics]
tags: [Graph Theory, Probabilistic Method]
math: true
image: /assets/img/2023-07-21-splitting-graphs/cover.png
---
## Introduction
There are, broadly speaking, two familiar ways to construct objects in mathematics. We may construct an object explicitly, or we may specify conditions and prove that an object satisfying them exists. Some problems, however, resist both approaches.

The probabilistic method offers another way to prove existence. We construct a random object and show that it has the desired property with positive probability. The existence of at least one such object then follows immediately.

## Bipartite graphs and stable sets
### Basic definitions

---
**Definition 0.1 (Graph)**
A *graph* is a pair $G = (V, E)$ of sets, with $E \subseteq \binom{V}{2}$. We call elements of $V$ *vertices* and elements of $E$ *edges*.

---

We denote the vertex and edge sets of a graph $G$ by $V(G)$ and $E(G)$, respectively.
The *order* of a graph is the number of its vertices $|V|$. 
The *size* of a graph is the number of edges $|E|$. Given a vertex $v \in V$, the *neighbours* of $v$ are $v'$ such that $\\{v,v'\\} \in E$. 
The *degree*, $d(v)$, of a vertex $v$ is the number of neighbours of $v$.

---
**Lemma 0.2**
For any graph $G = (V,E)$

$$
    \sum_{v\in V} d(v) = 2|E|.
$$


*Proof:*  Summing the degree of all vertices is the same as counting each edge twice. ◼

---
**Definition 0.3 (Bipartite graphs)**
A graph $G$ is *bipartite* if $V(G) = A \cup B$ where $A\cap B = \emptyset$ and $E(G) \subseteq \\{ \\{a,b\\} | a \in A, b \in B\\}$.

---

**Definition 0.4 (Subgraphs)**
If $G$ and $H$ are graphs with $V(H) \subseteq V(G)$ and $E(H) \subseteq E(G)$, then $H$ is a *subgraph* of $G$.

---
### An example of bipartite graphs
---
**Example 0.5**
Let $G = (V, E)$ be a graph with $m$ edges. Use the probabilistic method to show that $G$ has a bipartite subgraph containing at least $\frac{m}{2}$ edges.

![Bipartite graphs examples](https://mathworld.wolfram.com/images/eps-svg/BipartiteGraph_1000.svg)
_Examples of bipartite graphs_

**Solution:**
Construct a random subset $V_1\subseteq V$ by placing each vertex in $V_1$ independently with probability $p$, and let $V_2=V\setminus V_1$. We call an edge $\\{x,y\\}$ *crossing* if one endpoint lies in $V_1$ and the other lies in $V_2$. Let $X$ be the number of crossing edges. Then

$$
    X = \sum_{\{x, y\} \in E} \mathbb{1}_{xy},
$$

where $\mathbb{1}_{xy}$ is the indicator random variable for $\\{x,y\\}$ being crossing. 
Then by the linearity of expectation,

$$
    \mathbb{E}[X] = \sum_{\{x, y\} \in E} \mathbb{E}[\mathbb{1}_{xy}] = 2mp(1-p).
$$

This expectation is maximised at $p=\frac12$, where $\mathbb{E}[X]=\frac{m}{2}$. Since some outcome must satisfy $X\geq\mathbb{E}[X]$, there is a choice of $V_1$ for which the crossing edges form a bipartite subgraph with at least $\frac{m}{2}$ edges. ✓

**Remark:** One can choose a more subtle probability space to sharpen this bound.

---
### An example of stable sets
---
 **Example 0.6**
A *stable set* $S$ is a subset of $V$ in which no two vertices are adjacent.
Let $d=\frac{2|E|}{|V|}$ and suppose that $d\geq1$. Show that $G$ contains a stable set with at least $\frac{|V|}{2d}$ vertices.

![Stable sets examples](https://mathworld.wolfram.com/images/eps-svg/IndependentSet_900.svg)
_Examples of stable sets, shown in red_

The quantity $d$ is the average degree of the vertices of $G$ by Lemma 0.2.

**Solution:**
For brevity, write $|V|=n$ and $|E|=m$. As in the bipartite example, construct a random subset $S\subseteq V$ by including each vertex independently with probability $p\in[0,1]$.
Notice that 

$$
    |S| = \sum_{v \in V} \mathbb{1}_{\{v \in S\}}, 
$$

where $\mathbb{1}_{\\{v \in S\\}}$ is the indicator random variable of the event $v\in S$.
Then by the linearity of expectation,

$$
    \mathbb{E}[|S|] = \sum_{v \in V} \mathbb{P}[v \in S] = np.
$$
The random set $S$ need not be stable, so we estimate how many vertices must be removed to make it stable.

Let $Y = \\{e \in E: \text{ both endpoints of }e \text{ are in } S \\}$. 
For each edge $e\in Y$, remove one of its endpoints from $S$. The resulting set is stable and has size at least $|S|-|Y|$; the same vertex may account for several edges of $Y$.
In symbols,

$$
    |Y| = \sum_{\{v, v'\} \in E} \mathbb{1}_{\{v\in S\}} \mathbb{1}_{\{v' \in S\}}
$$

By the independence in the construction of $S$,

$$
    \mathbb{E}[|Y|] = \sum_{\{v, v'\} \in E} \mathbb{P}[v\in S, v' \in S] = \sum_{\{v, v'\} \in E} \mathbb{P}[v\in S] \mathbb{P}[v' \in S] = mp^2.
$$

Substituting $m=\frac{dn}{2}$ gives

$$
    \mathbb{E}[|S| - |Y|] = np(1-\frac{1}{2}dp).
$$

This expectation is maximised at $p=\frac{1}{d}$, giving $\mathbb{E}[|S|-|Y|]=\frac{n}{2d}$. Hence some outcome yields a stable set of size at least $\frac{n}{2d}$. ✓

---
### Exercise

Take a sphere of radius $1$, and a cube of radius $1$. $10\%$ of the surface of the sphere is coloured red and the rest is coloured black.
Is it possible to inscribe the cube inside the sphere, such that all vertices of the cube are coloured black?

![inscribed cube in a sphere](https://global.discourse-cdn.com/sketchup/original/3X/b/9/b9c64d9acc51392215633dde99bfec331c6159e8.png)

## Hypergraph colouring

A *$k$-colouring* of a graph $G=(V,E)$ is a map $c:V\to[k]$. It is *proper* if the endpoints of every edge receive different colours. Let us generalise this idea to hypergraphs.
### Basic definitions

In a graph, every edge is a two-element subset of $V$. In a *hypergraph*, an edge may contain any number of vertices: each $e\in E$ is a subset of $V$. The elements of $E$ are called *hyperedges*.

![hypergraph](https://www.angioi.com/assets/pics/hypergraphs/graph_vs_hypergraph.png)
_A graph and a hypergraph_

We update our definitions:

- The *degree*, $d(v)$, of a vertex $v\in V$ is the number of hyperedges that contain $v$.
We say that a hypergraph is $k$-regular if each vertex has degree $k$.

- The *order* of an edge, $|e|$, is the number of vertices contained inside this hyperedge. 
We say that a hypergraph is $k$-uniform if each edge has order $k$.

- A colouring is *proper* if no hyperedge is monochromatic.
Note that $|e| = 2$ reduces to the definition for graphs.

For a finite hypergraph, assigning a different colour to every vertex always gives a proper colouring. A more interesting question is how few colours are sufficient.

We'll show the following result in this post.

---
**Lemma 0.7**
Let $k \geq 9$ and let $G = (V, E)$ be a $k$-regular, $k$-uniform hypergraph. Then there exists a $2$-colouring of $G$.

---
To use the probabilistic method as before, one might colour each vertex independently with one of two colours. A direct union-bound argument is too weak here, so we use the following lemma instead.

---
**Lemma 0.8 (Symmetric Lovász Local Lemma)**
Let $p \in (0,1)$ and $d \in \mathbb{N}$. 
Let $A_1,..., A_n$ be a sequence of events such that $\mathbb{P}[A_i] \leq p$ for all $i$, and each event is independent of all except $d$ of the others.
If $\text{e}p(d + 1) \leq 1$, then $\mathbb{P}[A_1^c\cap A_2^c \cap ... \cap A_n^c] > 0$.

**Remark:** The constant $\mathrm{e}\approx2.71828$ is Euler's number. The power of Lemma 0.8 is that it can guarantee the simultaneous avoidance of arbitrarily many bad events, provided that each event depends on only a limited number of the others. A proof is given in the post on the [Lovász Local Lemma](https://www.jupiterzw.com/posts/lovasz-local-lemma/#proof-of-lov%C3%A1sz-local-lemma).

With Lemma 0.8 in hand, we can prove Lemma 0.7 quite easily.

---

**Proof of Lemma 0.7:**
Independently assign each vertex $v\in V$ one of two colours, each with probability $\frac12$.
For each hyperedge in $E$, let $A_e$ be the event that all vertices inside $e$ have the same colour. 
Since $G$ is $k$-uniform, we have $\mathbb{P}[A_e] = 2 \times \frac{1}{2^k} = 2^{1-k}$ for all $e \in E$.

Note that if $e, e' \in E$ are two hyperedges with no vertices in common, then $A_e$ and $A_{e'}$ are independent. 
Any given hyperedge $e\in E$ contains $k$ vertices, and each of these vertices lies in at most $k-1$ other hyperedges. Hence $A_e$ is dependent on at most $k(k-1)$ other events $A_{e'}$.

Applying Lemma 0.8 with $d=k(k-1)$ and $p=2^{1-k}$, it remains to verify

$$
\mathrm{e}\,2^{1-k}\bigl(k(k-1)+1\bigr)\leq1.
$$

This inequality holds at $k=9$ and its left-hand side decreases for $k\geq9$. Therefore $\mathbb{P}[\bigcap_{e\in E}A_e^c]>0$, so a proper $2$-colouring exists. ◼

The conclusion in fact holds for every $k\geq4$ [(Henning and Yeo, 2013)](https://doi.org/10.1016/j.ejc.2013.04.005). It fails in general for $k=2$ and $k=3$: odd cycles and the Fano plane provide counterexamples, respectively.
