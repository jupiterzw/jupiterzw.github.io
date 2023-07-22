---
title: Splitting Graphs
date: 2023-07-21 18:30
categories: [Posts, Mathematics]
tags: [graph theory, probability]     # TAG names should always be lowercase
math: true
---
## Introduction
There are, in general, two ways to construct things in mathematics. On the one hand, we can construct things explicitly, which tends to be difficult, if we don't know exactly what the target is. On the other hand, we can use an implicit construction, which is to say that we make some equation, show that it has a solution, and this solution is exactly what we want. However, there are certain problems we can't solve using either of the above methods.

The 'probabilistic method' for proving existence lies somewhere in the middle. We make a random object which with some probability $p$ being the object we want, and the existence of this object follows from by showing $p>0$.

## Graph theory examples
### Basic definitions

>**Definition 0.1 (Graph)**
A *graph* is a pair $G = (V, E)$ of sets, with $E \subseteq \binom{V}{2}$. We call elements of $V$ *vertices* and elements of $E$ *edges*.

We denote the vertices and edges of a graph $G$ by $V(G)$ and $E(G)$ repectively.
The *order* of a graph is the number of its vertices $|V|$. 
The *size* of a graph is the number of edges $|E|$. Given a vertex $v \in V$, the *neighbours* of $v$ are $v'$ such that $\\{v,v'\\} \in E$. 
The *degree*, $deg(v)$, of vertex $v$ is the number of neighbours of $v$.

>**Lemma 0.2**
For any graph $G = (V,E)$
>
>$$
>    \sum_{v\in V} d(v) = 2|E|.
>$$

*Proof:*  Summing the degree of all vertices is the same as counting each edge twice. ◼

>**Definition 0.3 (Bipartite graphs)**
A graph $G$ is *bipartite* if $V(G) = A \cup B$ where $A\cap B = \emptyset$ and $E(G) \subseteq \\{ \\{a,b\\} | a \in A, b \in B\\}$.

>**Definition 0.4 (Subgraphs)**
If $G$ and $H$ are graphs with $V(G) \subseteq V(G)$ and $E(H) \subseteq E(G)$, then $H$ is a *subgraph* of $G$.

### An example of bipartite graphs
>**Example 0.5**
Let $G = (V, E)$ be a graph with $m$ edges. Use the probabilitic method to show that $G$ has a bipartite subgraph containing at least $\frac{m}{2}$ edges.

![Bipartite graphs examples](https://mathworld.wolfram.com/images/eps-svg/BipartiteGraph_1000.svg)
_examples of bipartite graphs_

**Soln:**
Let $V_1 \subseteq V$ be a random subset where for each $x \in V$, we insert $x$ into $V_1$ with probability $p$, independently for each $x$.
Let $V_2 = V \setminus V_1$. We call an edge $\\{x, y\\}$ crossing if one of $x, y$ are in $V_1$. Let $X$ be the number of crossing edges. Then

$$
    X = \sum_{\{x, y\} \in E} \mathbb{1}_{xy},
$$

where $\mathbb{1}_{xy}$ is the indicator random variable for $\\{x,y\\}$ being crossing. 
Then by the linearity of expectation,

$$
    E[X] = \sum_{\{x, y\} \in E} E[\mathbb{1}_{xy}] = 2mp(1-p).
$$

We now choose $p \in (0,1)$ to maximise this quantity. A bit of calculus finds that $p = \frac{1}{2}$ does the job, resulting in $E[X] = \frac{m}{2}$. Thus, $\mathbb{P}[X = \frac{m}{2}] > 0$ and $X \geq \frac{m}{2}$ for some choice of $V_1$. ✓

**Remark:** One can choose a more subtle probability space to sharpen this bound.

### An example of stable sets
> **Example 0.6**
A *stable* set $S$ is a subset of $V$ such that no 2 elements of $S$ are neighbours.
Let $d = \frac{2|E|}{|V|}$ and suppose that $d \geq 1$. Then show that $G$ contains a stable set of vertices with at least $\frac{|V|}{2d}$ elements.

![Stable sets examples](https://mathworld.wolfram.com/images/eps-svg/IndependentSet_900.svg)
_examples of stable sets in red_

We first notice that $d$ is the average degree of vertices in $G$ (see lemma 0.2).

**Soln:**
To make notation shorter, denote $|V| = n$ and $|E| = m$.
Similar to the bipartite example, let $p \in (0,1)$ and $S$ be a random subset of $V$ where for each $v \in V$, $\mathbb{P}[v \in S] = p$, independently for each $v$.
Notice that 

$$
    |S| = \sum_{v \in V} \mathbb{1}_{\{v \in S\}}, 
$$

where $\mathbb{1}_{\\{v \in S\\}}$ is the indicator random variable for $v \in V$. 
Then by the linearity of expectation,

$$
    \mathbb{E}[|S|] = \sum_{v \in V} \mathbb{P}[v \in S] = np.
$$
The set $S$ we constructed has not to be a stable set. We want to know how close $S$ is to being a stable set. That is, we want to know how many vertices we need to remove from $S$ in order to make it into a stable set.

Let $Y = \\{e \in E: \text{ both endpoints of }e \text{ are in } S \\}$. 
If we take each edge $e \in Y$ and remove one of the endpoints of $e$ from $S$, then the result will be a stable set of size at least $|S| - |Y|$. The 'at least' comes from the possibility that the same vertex might be reckoned as an endpoint of more than one $e \in Y$.
In symbols,

$$
    |Y| = \sum_{\{v, v'\} \in E} \mathbb{1}_{\{v\in S\}} \mathbb{1}_{\{v' \in S\}}
$$

So, by independence involved in the construction of $S$,

$$
    \mathbb{E}[|Y|] = \sum_{\{v, v'\} \in E} \mathbb{P}[v\in S, v' \in S] = \sum_{\{v, v'\} \in E} \mathbb{P}[v\in S] \mathbb{P}[v' \in S] = mp^2.
$$

Substituing $d = \frac{2m}{n}$, we have

$$
    \mathbb{E}[|S| - |Y|] = np(1-\frac{1}{2}dp).
$$

We now choose $p \in (0,1)$ to maximise this quantity. 
A bit of calculus finds that $p = \frac{1}{d}$ does the job, resulting in $E[|S| - |Y|] = \frac{n}{2d}$. Thus, $\mathbb{P}[|S| - |Y| = \frac{n}{2d}] > 0$. ✓

### Exercise

Take a sphere of radius $1$, and a cube of radius $1$. $10\%$ of the surface of the sphere is coloured red and the rest is coloured black.
Is it possible to inscribe the cube inside the sphere, such that all vertices of the cube are coloured black?

![inscribed cube in a sphere](https://global.discourse-cdn.com/sketchup/original/3X/b/9/b9c64d9acc51392215633dde99bfec331c6159e8.png)

## Hypergraph colouring

