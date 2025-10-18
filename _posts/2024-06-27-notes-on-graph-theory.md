---
title: Notes on Graph Theory (Updating...)
date: 2024-06-24 22:01
categories: [Posts, Mathematics]
tags: [graph theory]     # TAG names should always be lowercase
math: true
image: false
published: true
---

- [PDF (without proof)](/assets/img/2024-06-27-math0029-note/notes_on_graph_theory.pdf) 
- [PDF]()

## 1 Basic counting: sets and tuples

*This section lacks a formal definition of the cardinality of a set, offering instead an intuitive explanation of the concept (which refers to the number of elements within a given set). For certain audiences, this approach may be considered insufficiently rigourous. Nevertheless, this is enough for our purpose.*

If $X$ is a set, then $|X|$ is the **size** or **cardinality** of $X$.
Most of the sets we will encounter in this note will be finite (with
the frequent exception of the natural numbers
$\mathbb{N}=\\{1,2,3, \ldots\\}$ ). 

Our **canonical set of size $n$**
(where $n \in \mathbb{N}$ ) is denoted by $[n]:=\\{1,2, \ldots, n\\}.$

The **empty set** is denoted $\emptyset$. 

If $A$ and $B$ are sets, then
$A$ is a **subset** of $B$ if every element of $A$ is also an element of
$B$. We denote this by $A \subseteq B$.

If $A$ and $B$ are sets, then their **union** is
$A \cup B=\\{x \mid x \in A \text{ or } x \in B\\}$ and their **intersection** is
$A \cap B=\\{x \mid x \in A \text{ and } x \in B\\}$. 

The **set difference** of $A$ and $B$ is
$A \backslash B=\\{x \mid x \in A \text{ and } x \notin B\\}$. The
**symmetric difference** of $A$ and $B$ is
$A \Delta B=(A \backslash B) \cup(B \backslash A)=(A \cup B) \backslash(A \cap B).$

If $A$ and $B$ are sets, then their **cartesian product** is
$A \times B=\\{(a, b) \mid a \in A \text{ and } b \in B\\}$.

If $A$ and $B$ are sets such that $A \cap B=\emptyset$, then we say $A$
and $B$ are **disjoint**. If we have a union of two disjoint sets, we
emphasize this by writing $A \dot{\cup} B$. If $A_1, A_2, \ldots, A_n$
are sets, then we say they are **pairwise disjoint** if
$A_i \cap A_j=\emptyset$ for all $1 \leq i<j \leq n$. 




<div class="thm" markdown="1">
<div class="title"> Lemma 1.1 </div>


Let $A$ and $B$ be finite sets. Then

1.  $\|A \setminus B\|=\|A\|-\|A \cap B\|;$
2.  $\|A \cup B\|=\|A\|+\|B\|-\|A \cap B\|;$
3.  $\|A \times B\|=\|A\| \cdot\|B\|;$
4.  If $A_1, A_2, \ldots, A_n$ are pairwise disjoint sets, then
    $\left|\bigcup_{i=1}^n A_i\right|=\sum_{i=1}^n\left|A_i\right|;$
5.  If $A_1, A_2, \ldots, A_n$ are sets, then
    $\left|\bigcup_{i=1}^n A_i\right| \leq \sum_{i=1}^n\left|A_i\right|.$
</div>

*Proof.* Omitted. ◻

<div class="rmk" markdown="1">
<div class="title"> Remark 1.2 </div>
The so-called **sum rule** holds for disjoint sets: if $A$ and $B$ are disjoint sets,
then $|A \cup B|=|A|+|B|$. This follows from Lemma 1.1 (2).
</div>


For any integer $k \geq 1$, we define **$k$ factorial** to be
$k !=k(k-1) \cdots 2 \cdot 1$. We define $0 !=1$. For integers
$n \geq k \geq 1$, we define the **$k$-th falling factorial** of $n$ by
$(n)_k=$ $n(n-1) \cdots(n-k+1)$. So $(k)_k=k !$.

Let $X$ be a set. A **$k$-tuple of elements** from $X$ is
$\left(x_1, x_2, \ldots, x_k\right)$ where $x_i \in X$ for
$1 \leq i \leq k$. Note that the elements of a $k$-tuple need not be
distinct. We will denote **the set of $k$-tuples** from $X$ by $X^k$.

Let $X$ be a set. A **$k$-tuple of distinct elements** from $X$ is
$\left(x_1, x_2, \ldots, x_k\right)$ where $x_i \in X$ for
$1 \leq i \leq k$ and $x_i \neq x_j$ for $i \neq j$. We will denote
**the set of $k$-tuples of distinct elements** from $X$ by $(X)_k$.

If $X$ is a set of size $n$ and $0 \leq k \leq n$, then **the family of
$k$-sets** from $X$ is $${X \choose k} =\{A \subseteq X: | A| =k\} .$$

Let $0 \leq k \leq n$ be integers. Recalling that $0!=1$ and we define
the **binomial coefficient** by
$${n \choose k}=\frac{n !}{k !(n-k) !}=\frac{(n)_k}{k !} .$$ 

If $X$ is a
set, then the **power set** of $X$ is the family of all subsets of $X$ : 
$$\mathscr{P}(X)=\{A \mid A \subseteq X\} .$$

Often we work with subsets of a given \"universal set\" $X$. In this
case we can define the **complement** of a set $A \subseteq X$ by
$A^c=X \backslash A$.

<div class="thm" markdown="1">
<div class="title"> Lemma 1.3 </div>
Let $1 \leq k \leq n$ be integers and $X$ be a set of size $n$. Then

1.  There are $n^k$ different $k$-tuples of elements from $X$, so
    $\left|X^k\right|=n^k$;

2.  There are $n(n-1) \cdots(n-k+1)$ different $k$-tuples of distinct
    elements from $X$, so $\left|(X)_k\right|=(n)_k$;

3.  There are $n!$ distinct permutations of the elements of $X$;

4.  There are ${n \choose k}$ distinct $k$-sets from $X$, so
    $\left|{X \choose k}\right|={n \choose k}$;

5.  ${n \choose k}={n \choose n- k}$;

6.  ${n+1 \choose k}={n \choose k}+{n \choose k-1}$;

7.  $\|\mathscr{P}(X)\|=2^n$.
</div>

*Proof.* Omitted. ◻


## 2 Graphs

### 2.1 Basic definitions

<div class="defn" markdown="1">
<div class="title"> Definition 2.1 (Graph, vertex, edge, order, size)  </div>
A **graph** is a pair $(V, E)$ of sets with $E \subseteq {V \choose 2}$.
An element of $V$ is a **vertex** and an element of $E$ is an **edge**.
We denote the set of vertices and the set of edges of a graph $G$ by $V(G)$
and $E(G)$ respectively. The **order** of a graph $G$ is the number of
vertices $|V(G)|$. The **size** of a graph is the number of edges
$|E(G)|$.
</div>


<div class="defn" markdown="1">
<div class="title"> Definition 2.2 (Neighbourhood, degree)  </div>
If $G$ is a graph and $v \in V(G)$, then the **neighbourhood** (or
$n b h d$) of $v$ is the set
$$\Gamma(v)=\{u \in V(G) \mid u v \in E(G)\} .$$
The **degree** of a vertex $v \in V$ is the size of its neighbourhood:
$d(v)=|\Gamma(v)|$.
</div>


<div class="rmk" markdown="1">
<div class="title"> Remark 2.3 (Simple, loopless, undirected)  </div>
Beware of other different definitions of graphs! All the graphs in this note will be **simple**, **loopless**, and **undirected**. To be
precise, a graph is **simple** if it cannot have multiple edges between
two vertices; a graph is **loopless** if every edge contains exactly two
different vertices; a graph is **undirected** if its edges are 2-sets
such as $\{u, v\}$ rather than ordered pairs such as $(u, v)$ or
$(v, u)$. Note that our definition of a graph as $G=(V, E)$ with
$E \subseteq {V \choose 2}$ implies immediately that they are
simple, loopless and undirected.
</div>

![a directed graph](/assets/img/2024-06-27-math0029-note/figure1_directed_graph.png){: width="300"}
_Figure 1. A directed graph_

![loop and not simple](/assets/img/2024-06-27-math0029-note/figure2_loop_not_simple.png){: width="300"}
_Figure 2. An undirected graph which is not loopless and not simple_


<div class="rmk" markdown="1">
<div class="title"> Remark 2.4 (Notation for edge)  </div>
If $e=\\{u, v\\}$ is an edge in a graph $G$, with a slight abuse of notation, we will often write this as $e=u v$. Note that this does not imply that the edge has a direction as our graphs are undirected.
</div>


<div class="defn" markdown="1">
<div class="title"> Definition 2.5 (Incident)  </div>
If $e=u v$ is an edge, then $e$ is **incident** to $u$ and $v$.
</div>

<div class="defn" markdown="1">
<div class="title"> Definition 2.6 (r-regular)  </div>
A graph $G$ is **$r$-regular** if $d(v)=r$ for all $v \in V(G)$.
</div>

<div class="defn" markdown="1">
<div class="title"> Definition 2.7 (Degree sequence)  </div>
The **degree sequence** of a graph $G = (V, E)$ is the tuple $\left(d\left(v_1\right), d\left(v_2\right), \ldots, d\left(v_n\right)\right),$ where $V=\\left\\{v_1, \ldots, v_n\\right\\}$ and $d\left(v_1\right) \leq d\left(v_2\right) \leq \cdots \leq d\left(v_n\right)$.
</div>

<div class="thm" markdown="1">
<div class="title"> Lemma 2.8 (Handshake Lemma)  </div>
For any graph $G=(V, E)$, one has
$$
\sum_{v \in V} d(v)=2|E|.
$$
</div>

*Proof.* Omitted. ◻


<div class="thm" markdown="1">
<div class="title"> Lemma 2.9  </div>
In any graph, the number of vertices of odd degree is even.
</div>

*Proof.* Omitted. ◻


### 2.2 Examples of graphs

Recall that for $n \in \mathbb{N}$, we define $[n]=\\{1,2, \ldots, n\\}$.

<div class="defn" markdown="1">
<div class="title"> Definition 2.10 (Complete graph)  </div>
$K_n$ is the **complete graph** of order $n \geq 1$ where

$$
V\left(K_n\right)=[n], \quad E\left(K_n\right)= {[n] \choose 2}.
$$ 

</div>

![K5](/assets/img/2024-06-27-math0029-note/figure3_K5.png){: width="300"}
_Figure 3. The complete graph of order $5$, $K_5$_

<div class="defn" markdown="1">
<div class="title"> Definition 2.11 (Empty graph)  </div>
$E_n$ is the **empty graph** of order $n \geq 1$ where

$$
V\left(E_n \right)=[n], \quad E\left(E_n \right)=\emptyset.
$$ 

</div>

![E3](/assets/img/2024-06-27-math0029-note/figure4_E3.png){: width="300"}
_Figure 4. The empty graph of order 3, $E_3$_


<div class="defn" markdown="1">
<div class="title"> Definition 2.12 (Cycle)  </div>
$C_n$ is the **cycle** of length $n \geq 3$ where

$$
V\left(C_n\right)=[n], \quad E\left(C_n\right)=\{\{i, i+1\} \mid i=1,2, \ldots, n-1\} \cup\{\{1, n\}\}.
$$

</div>

![C4](/assets/img/2024-06-27-math0029-note/figure5_C4.png){: width="300"}
_Figure 5. The cycle of order 4, $C_4$_

<div class="defn" markdown="1">
<div class="title"> Definition 2.13 (Path)  </div>
$P_n$ is the **path** of length $n \geq 1$ (with $n$ edges and $n+1$ vertices) where

$$
V\left(P_n\right)=\{0,1,2, \ldots, n\}, \quad E\left(P_n\right)=\{\{i-1, i\} \mid i \in[n]\}.
$$

</div>

![P4](/assets/img/2024-06-27-math0029-note/figure6_P4.png){: width="300"}
_Figure 6. The path of length 4, $P_4$_


<div class="defn" markdown="1">
<div class="title"> Definition 2.14 (Complete bipartite graph)  </div>
$K_{a, b}$ is the **complete bipartite graph** with classes of size $a$ and $b$ $(a, b \geq 1)$ where

$$
\begin{aligned}
    V\left(K_{a, b}\right)&=\{1,2, \ldots, a\} \dot{\cup}\{a+1, a+2, \ldots, a+b\}, \\
    E\left(K_{a, b}\right)&=\{\{i, j\} \mid 1 \leq i \leq a, a+1 \leq j \leq a+b\} .
\end{aligned}
$$ 

</div>

![K23](/assets/img/2024-06-27-math0029-note/figure7_K23.png){: width="300"}
_Figure 7. The complete bipartite graph with classes of size 2 and 3_






<div class="defn" markdown="1">
<div class="title"> Definition 2.15 (Discrete hypercube)  </div>
$Q_n$ is the **discrete hypercube** of dimension $n \geq 1$ where

$$
V\left(Q_n\right)=\{0,1\}^n, \quad E\left(Q_n\right)=\{x y \mid x \text{ and } y \text{ differ in exactly one coordinate} \}.
$$

</div>

![Q3](/assets/img/2024-06-27-math0029-note/figure8_Q3.png){: width="300"}
_Figure 8. The discrete hypercube of dimension 3, $Q_3$_

<!-- ### 2.3 Subgraphs and isomorphisms

definition
If $G$ and $H$ are graphs satisfying $V(H) \subseteq V(G)$ and
$E(H) \subseteq E(G)$, then $H$ is a **subgraph** of $G$.


definition
A subgraph $H$ of $G$ is an **induced subgraph** of $G$ if $E(H)=$
$E(G) \cap {V(H) \choose 2}$. If $G=(V, E)$ is a graph and
$A \subseteq V$, then $G[A]$ is the subgraph induced by $A$ : its vertex
set is $V(G[A])=A$ and edge set is $E(G[A])= E(G) \cap {A \choose 2}$.


definition
Graphs $G$ and $H$ are **isomorphic** iff there is a bijection
$f: V(G) \rightarrow V(H)$ such that
$v w \in E(G) \Longleftrightarrow f(v) f(w) \in E(H)$. If $G$ and $H$
are isomorphic we denote this by $G \cong H$. $G$ contains a **copy** of
$H$ if $G$ has a subgraph isomorphic to $H$.


### 2.4 Walks, paths, and connectedness

definition
A **walk** in $G$ is a sequence of vertices (not necessarily distinct)
$v_0 v_1 \cdots v_t$ such that $v_{i-1} v_i \in E$ for all
$1 \leq i \leq t$. A walk is **closed** if $v_0=v_t$.


definition
A walk in which no edge is used more than once is a **tour**.


remark
A tour can have repeated vertices but cannot have repeated edges. A path
cannot have repeated vertices and hence cannot have repeated edges
either.


lemma
Define the relation $\sim$ on $V(G)$ by $v \sim w$ iff there is a walk
from $v$ to $w$ in $G$. Then $\sim$ is an equivalence relation.


proof
*Proof.* Omitted. ◻


definition
Let $V=V_1 \cup V_2 \cup \cdots \cup V_k$ be the partition of $V$
induced by $\sim$. We call the equivalence classes $V_i$ **components**.
$G$ is **connected** if it consists of a single component.


definition
A **path in a graph $G$** is a subgraph isomorphic to $P_t$ for some
$t \geq 0$. So it consists of a sequence of distinct vertices
$v_0 v_1 \cdots v_t$ such that $v_{i-1} v_i$ is an edge for
$1 \leq i \leq t$. If $x, y \in V(G)$, then an **$x$-$y$ path** in $G$
is a path that starts at $x$ and ends at $y$.


lemma
There is an $x$-$y$ path in $G$ iff there is a walk from $x$ to $y$ in
$G$.


proof
*Proof.* Omitted. ◻


lemma
Let $P=x_1 x_2 \ldots x_t$ be a path in a graph $G$. If $P$ is a
shortest $x_1$-$x_t$ path in $G$, then $x_1 x_2 \cdots x_i$ and
$x_i x_{i+1} \cdots x_t$ are shortest $x_1$-$x_i$ and $x_i$-$x_t$ paths
in $G$ for each $1 \leq i \leq t$.


proof
*Proof.* Omitted. ◻


### 2.5 Euler circuits

definition
An **Euler circuit** in a graph $G$ is a closed tour
$v_0 v_1 \cdots v_t v_0$ containing all edges of $G$.


remark
Since an Euler circuit contains all edges, it also contains all
vertices. The vertices may be repeated but each edge is used exactly
once.


theorem
A graph $G$ has an Euler circuit iff $G$ is connected and every vertex
has even degree.


proof
*Proof.* Omitted. ◻


### 2.6 Bipartite graphs

definition
A graph $G$ is **bipartite** if
$$V(G) = A \dot\cup B \text{ and } E(G) = \{ab \mid a \in A, b \in B\}.$$
We say that $A, B$ is a **bipartition** and sometimes write
$G=(A, B ; E)$ to emphasise this.


theorem
A graph is bipartite iff it contains no odd cycle.


proof
*Proof.* Omitted. ◻


### 2.7 Graph colouring

definition
Let $G$ be a graph. $A \subseteq V(G)$ is an **independent set** if
there are no edges with both endpoints in $A$.


definition
Let $k \in \mathbb{N}$. A **$k$-colouring** of a graph $G$ is a function
$c: V(G) \rightarrow[k]$ such that if $v w \in E$, then
$c(v) \neq c(w)$.


definition
A graph $G$ is **$k$-colourable** if $G$ has a $k$-colouring.


remark
It follows that if a graph $G$ is $k$-colourable, then $G$ is also
$k + 1$-colourable. Note that a graph is bipartite iff it is
$2$-colourable.


definition
A graph $G$ is **$k$-partite** if there is a partition
$V(G)=V_1 \cup V_2 \cup \cdots \cup V_k$ of $V(G)$ into independent
sets.


remark
Note that a graph is $k$-partite iff it is $k$-colourable.


definition
The **chromatic number** of a graph $G$ is the number
$$\chi(G)=\min \{k \geq 1 \mid G \text { is } k \text {-colourable }\}.$$


remark
A useful fact: If $H$ is a subgraph of $G$, then $\chi(H) \leq \chi(G)$.


Note that for any $t \in \mathbb{N}$ we have
$\chi\left(K_t\right)=t, \chi\left(C_{2 t}\right)=2$ and
$\chi\left(C_{2 t+1}\right)=3$.

definition
The **maximum degree** of a graph $G$ is the number
$$\Delta(G)=\max \{d(v) \mid v \in V(G)\}.$$


theorem
If $G$ is a graph, then $$\chi(G) \leq \Delta(G)+1$$


proof
*Proof.* Omitted. ◻


## 3 The probabilistic method

### 3.1 Basics

definition
A **probability space** is a pair $(\Omega, \mathbf{P})$, where $\Omega$
is a (finite) set of elementary events (e.g. {Heads, Tails} or
$\{1,2,3,4,5,6\})$ and $\mathbf{P}: \Omega \rightarrow[0,1]$ is a
function such that $\sum_{\omega \in \Omega} \mathbf{P}[\omega]=1$.


definition
Any subset $A \subseteq \Omega$ is an **event** and we define its
probability to be
$\mathbf{P}[A]=\sum_{\omega \in A} \mathbf{P}[\omega]$.


theorem
If $(\Omega, \mathbf{P})$ is a probability space and
$A \subseteq \Omega$ is an event satisfying $\mathbf{P}[A]>0$, then
$A \neq \emptyset$.


proof
*Proof.* Omitted. ◻


Note that $A \cup B$ and $A \cap B$ denote the events \" $A$ or $B$ \"
and \" $A$ and $B$ \" respectively. Another very simple but useful
result is the probabilistic union bound.

lemma
If $(\Omega, \mathbf{P})$ is a finite probability space and we have
events $A_1, \ldots, A_n \subseteq \Omega$, then
$$\mathbf{P}\left[\bigcup_{i=1}^n A_i\right] \leq \sum_{i=1}^n \mathbf{P}\left[A_i\right] .$$


proof
*Proof.* Omitted. ◻


definition
A **random variable** is a function $X: \Omega \rightarrow \mathbb{R}$.
We say a random variable is **non-negative** if for all
$\omega \in \Omega$, we have $X(\omega) \geq 0$.


example
If our probability space is
$\left(\{1,2,3,4,5,6\}, \mathbf{P}_U\right)$, where
$\mathbf{P}_U[\omega]=1 / 6$ for all $\omega \in[6]$ (i.e. the space
associated with a single fair roll of a die), then we could define the
random variables $X_1$ and $X_2$ by
$$X_1(\omega)= \begin{cases}1, & \omega=1,3,5 \\ 0, & \text { otherwise }\end{cases}$$
and
$$X_2(\omega)= \begin{cases}1, & \omega \geq 4 \\ 0, & \text { otherwise. }\end{cases}$$

Note that both of these random variables are examples of **indicator
random variables**. More generally the indicator random variable of an
event $A \subseteq \Omega$ is
$$\mathbf{1}_A(\omega)= \begin{cases}1, & \omega \in A \\ 0, & \text { otherwise. }\end{cases}$$

So $X_1$ is the indicator random variable of \"the die roll is odd\",
while $X_2$ is the indicator random variable of \"the die roll is at
least 4 \".


definition
The **expectation** of a random variable is simply its average value:
$$\mathbf{E}[X]=\sum_{\omega \in \Omega} X(\omega) \mathbf{P}[\omega]=\sum_{a \in \mathbb{R}} a \mathbf{P}[X=a] .$$


theorem
Let $(\Omega, \mathbf{P})$ be a finite probability space. If $X$ is a
random variable on $(\Omega, \mathbf{P})$, then there exist
$\omega_1, \omega_2 \in \Omega$ such that
$$X\left(\omega_1\right) \leq \mathbf{E}[X] \leq X\left(\omega_2\right).$$


proof
*Proof.* Omitted. ◻


lemma
If $X_1, X_2, \ldots, X_n$ are random variables on
$(\Omega, \mathbf{P})$, then
$$\mathbf{E}\left[\sum_{i=1}^n X_i\right]=\sum_{i=1}^n \mathbf{E}\left[X_i\right] .$$


proof
*Proof.* Omitted. ◻


Note that linearity of expectation has nothing to do with independence
(which we will define now).

definition
Let $(\Omega, \mathbf{P})$ be a probability space. Events
$A_1, \ldots, A_n \subset \Omega$ are **independent** if for any
$1 \leq k \leq n$ of the events, the probability they all hold is the
product of their probabilities i.e. for any $1 \leq k \leq n$ and any
$\left\{m_1, \ldots, m_k\right\} \in {[n] \choose k}$
$$\mathbf{P}\left[\bigcap_{i=1}^k A_{m_i}\right]=\prod_{i=1}^k \mathbf{P}\left[A_{m_i}\right] .$$
Random variables $X, Y$ on the same probability space are
**independent** if for all $a, b \in \mathbb{R}$, the events $X=a$ and
$Y=b$ are independent.


Our first simple application of probability in graph theory is the
following result.

proposition
If $G$ is a graph of order $n$ and size $e$, then $G$ contains a
bipartite subgraph with at least $\lceil e / 2\rceil$ edges.


proof
*Proof.* Omitted. ◻


### 3.2 Random graphs

The probability space for graphs that we will consider is
$\mathscr{G}(n, p)$ : the space of Erdös-Renyi random graphs. The
underlying set of outcomes is the set of all labelled graphs of order
$n$ :
$$\Omega=\left\{G \mid V(G)=[n], E(G) \subseteq {[n] \choose 2} \right\}.$$

For a graph $H \in \Omega$, the probability of the outcome $H$ which is
defined to be $\mathbf{P}[H]$ is the probability that the following
random process produces the graph $H$:

1.  Start with $H=E_n$ the empty graph with vertex set $[n]$ and no
    edges;

2.  For each pair of vertices $i j \in {[n] \choose 2}$, toss a biased
    $\operatorname{coin} C_{i j}$ that has probability $p$ of being
    'Heads' and $1-p$ of being 'Tails'. If $C_{i j}$ is 'Heads' then
    insert the edge $i j$, otherwise do not insert the edge $i j$. All
    coin tosses are independent.

Note that unless $p \in\{0,1\}$, every possible graph $H \in \Omega$ has
non-zero probability of occuring.

### 3.3 Large girth and large chromatic number

definition
The **girth** of a graph $G$ is the length of the shortest cycle in $G$.
We denote this by $g(G)$. If $G$ contains no cycles, then we define
$g(G)=+\infty$.


definition
The **independence number** of a graph $G$ is the number
$$\alpha(G)=\max \{|A| \mid A \subseteq V(G) \text{ is an independent set }\}.$$


theorem
For all $k, l \geq 3$, there exists a graph $G$ with $\chi(G) \geq k$
and $g(G) \geq l$.


proof
*Proof.* Omitted. ◻


lemma
For any graph $G$ of order $n$, we have
$$\chi(G) \geq \frac{n}{\alpha(G)}.$$


proof
*Proof.* Omitted. ◻


lemma
Let $G \in \mathscr{G}(n, p)$ and let $X_t$ be the number of $t$-cycles
in $G$. Then
$$\mathbf{E}\left[X_t\right]=\frac{n(n-1)(n-2) \cdots(n-t+1)}{2 t} p^t .$$


proof
*Proof.* Omitted. ◻


lemma
If $X$ is a non-negative random variable and $\lambda>0$, then
$$\mathbf{P}[X \geq \lambda] \leq \frac{\mathbf{E}[X]}{\lambda} .$$


proof
*Proof.* Omitted. ◻


## 4 Extremal graph theory

### 4.1 Hamilton cycles

definition
A **Hamilton cycle** in a graph $G$ is a cycle containing all the
vertices of $G$.


Note that this is a rather different object to an Euler circuit (a
closed tour containing all edges of a given graph). Whereas we can view
an Euler circuit as a sightseeing tour of a city which must pass along
each road exactly once, a Hamilton cycle can be seen as the itinerary of
a travelling salesman who wishes to visit every city exactly once,
starting and finishing at home.

The question of whether a given graph $G$ contains an Euler circuit has,
as we saw a simple characterisation: $G$ contains an Euler circuit iff
it is connected and all vertices have even degree. The corresponding
question for Hamilton cycles has no such easy answer. (Indeed for those
of you who know any computational complexity theory the problem of
deciding whether a given graph contains a Hamilton cycle is
**NP**-complete. Roughly speaking this means that it is very unlikely
that there is any efficient method for deciding if an arbitrary large
graph contains a Hamilton cycle.) We will instead consider some
sufficient conditions for the existence of Hamilton cycles.

remark
A Hamilton cycle is generally not an Euler circuit since it does not
necessarily contain all edges. An Euler circuit is generally not a
Hamilton cycle since it is not necessarily even a cycle.


definition
The **minimum degree** of a graph $G$ is the number
$$\delta(G)=\min \{d(v) \mid v \in V(G)\} .$$


definition
Two vertices $u, v \in V(G)$ are **adjacent** if $u v \in E(G)$
otherwise they are **non-adjacent**.


theorem
If $G$ is a graph of order $n \geq 3$ and $\delta(G) \geq n / 2$, then
$G$ contains a Hamilton cycle.


proof
*Proof.* Omitted. ◻


Note that Dirac's theorem follows immediately from the following result.

theorem
If $G$ is a graph of order $n \geq 3$ and $d(u)+d(v) \geq n$ for every
pair of non-adjacent vertices $u, v \in V(G)$, then $G$ is Hamiltonian.


proof
*Proof.* Omitted. ◻


### 4.2 Forbidden subgraphs: Mantel's theorem

definition
Let $G$ and $H$ be graphs. $G$ is **$H$-free** if $G$ does not contain a
copy of $H$.


definition
The **extremal number** (or **Turán number**) of $H$ is the number
$$\operatorname{ex}(n, H)=\max \{|E(G)| :  G=(V, E),|V|=n \text { and } G \text { is } H \text {-free}\}.$$


The question of determining the value of $\operatorname{ex}(n, H)$ for a
fixed graph $H$ is called the Turán problem for $H$.

Solving the Turán problem for $H$ really requires us to achieve two
objectives. Suppose we want to show $\operatorname{ex}(n, H)= k$:

1.  $\operatorname{ex}(n, H) \geq k$: Find a graph $G$ of order $n$ and
    size $k$ such that it is $H$-free;

2.  $\operatorname{ex}(n, H) \leq k$: If $G$ is of order $n$ and
    $H$-free, then $|E(G)| \leq k$.

The following result will help us to achieve $\geq$ in many cases.

lemma
[]{#lem4.9 label="lem4.9"} If $G$ and $H$ are graphs with
$\chi(H)>\chi(G)$, then $G$ is $H$-free.


proof
*Proof.* Omitted. ◻


theorem
[]{#thm4.10 label="thm4.10"} If $n \geq 1$, then
$\operatorname{ex}(n, K_3)=\left\lfloor n^2 / 4\right\rfloor$.


proof
*Proof.* Omitted. ◻


### 4.3 Forbidden subgraphs: Turán's theorem

Given () and [\[lem4.9\]](#lem4.9){reference-type="eqref"
reference="lem4.9"}, an obvious candidate for a $K_{r+1}$-free graph
that has the most edges (i.e. that has size ex
$\left(n, K_{r+1}\right)$) is a graph with chromatic number $r$ and as
many edges as possible subject to this constraint.

definition
A graph $G=(V, E)$ is a **complete r-partite graph** if there is a
partition $V=V_1 \cup V_2 \cup \cdots \cup V_r$, each $V_i$ is an
independent set and
$$E(G)=\left\{v w \mid v \in V_i, w \in V_j \text {, for some } 1 \leq i \neq j \leq r\right\} .$$
(i.e. all edges between distinct vertex classes are present.)


Clearly, among all $r$-partite graphs of order $n$ the number of edges
will be maximised by a complete $r$-partite graph (since if an
$r$-partite graph is not complete then we can add an edge while still
maintaining its chromatic number as $r$). But how should the $n$
vertices be shared among the $r$ vertex classes? For $r=2$ we can easily
check that if the two vertex classes have $a$ and $n-a$ vertices then
the number of edges is $a(n-a)$ and the is easily seen to be maximised
when $a=\lfloor n / 2\rfloor$. But for $r>2$ this problem is a little
less straightforward.

In fact, it turns out that taking the $r$ classes to be as equal as
possible in size will achieve the desired result.\
**Fact:** Turán graphs have maximal number of edges among $r$-partite
graphs with vertex set $[n]$.

definition
Let $n \geq r \geq 2$ be integers. The **Turán graph** $T_r(n)$ is the
complete $r$-partite graph with the vertex set $[n]$ and vertex classes
as equal as possible in size.


remark
Note that this defines a unique (upto isomorphism) $r$-partite graph of
order $n$, with $b$ vertex classes each containing
$\lfloor n / r\rfloor$ vertices and $r-b$ vertex classes each containing
$\lceil n / r\rceil$ vertices, where $b$ satisfies
$n=b\lfloor n / r\rfloor+(r-b)\lceil n / r\rceil$. **Denote the number
of edges in $T_r(n)$ by $t_r(n)$.**


Note that if we really wished to we could give an explicit formula for
$t_r(n)$ but it would not in general be very useful so we do not bother!

The next result tells us that $T_r(n)$ is a very plausible candidate for
solving the Turán problem for $K_{r+1}$ in the sense that the converse
of the above **fact** also holds.

lemma
Let $G$ be an r-partite graphs with $n$ vertices and maximal edges. Then
$G$ is isomorphic to $T_r(n)$. Moreover
$$t_r(n)=t_r(n-r)+(r-1)(n-r)+ {r \choose 2}.$$


proof
*Proof.* Omitted. ◻


theorem
If $2 \leq r \leq n$ are integers and $G$ is a $K_{r+1}$-free graph of
order $n$, then $|E(G)| \leq t_r(n)$.


proof
*Proof.* Omitted. ◻


theorem
If $2 \leq r \leq n$ are integers and $G$ is a $K_{r+1}$-free graph of
order $n$ with $\operatorname{ex}(n, K_{r+1})$ edges, then $G$ is
isomorphic to $T_r(n)$.


proof
*Proof.* Omitted. ◻


### 4.4 Digression: double counting

theorem
If $G=(A, B ; E)$ is a bipartite graph, then
$$\sum_{a \in A} d(a)=\sum_{b \in B} d(b) .$$


proof
*Proof.* Omitted. ◻


We have already seen examples of such arguments but we have not
explicitly used this bipartite graph formulation (mainly because it
would have made our arguments more complicated).

For example, the Handshake Lemma says: if $G=(V, E)$ is a graph then
$\sum_{v \in V} d(v)=2|E|$. This can be proved using an explicit double
counting argument as follows. Let $G=(V, E)$ be a graph. Now define a
bipartite graph $H=(A, B ; F)$ where $A=V, B=E$ and the edges in $H$ are
$$F=\{v e \mid v \in V, e \in E \text { and } v \in e\}.$$ So $H$ is a
bipartite graph with edge set $F$. Moreover, using subscripts to denote
degrees in the two different graphs, we have
$$\sum_{a \in A} d_H(a)=\sum_{v \in V} d_G(v)$$ while
$$\sum_{b \in B} d_H(b)=\sum_{e \in E} \#\{v \mid v \in e\}=\sum_{e \in E} 2=2|E| .$$

The double counting principle then tells us that these two expressions
are equal.

### 4.5 Asymptotics: Turán density

definition
The **Turán density** of a graph $F$ is the number
{% raw %}$$\pi(F)=\lim _{n \rightarrow \infty} \frac{\operatorname{ex}(n, F)}{{n \choose 2}} .$${% endraw %}


lemma
For a graph $F, \pi(F)$ is well defined. If $r \geq 2$, then
$\pi\left(K_{r+1}\right)=$ $1-1 / r$.


proof
*Proof.* Omitted. ◻


### 4.6 Bipartite forbidden subgraphs

Turán's theorem gives us a full answer to the Turán problem for complete
graphs, but what can we say for bipartite graphs? It is easy to compute
$\operatorname{ex}(n, K_{1, t})$ directly for any $t \geq 1$, but in
general the problem is hard and we settle for upper bounds.

remark
Let $G$ be a $K_{1, t}$-free graph of order $n$. For each $v \in G$, $v$
can be adjacent to at most $t-1$ vertices:
$$\operatorname{ex}\left(n, K_{1, t}\right)= \frac{(t-1)n}{2}.$$ The
result is divided by $2$ since each edge contains $2$ vertices.


theorem
[]{#thm4.21 label="thm4.21"} If $n \geq r \geq s \geq 2$, then
$$\operatorname{ex}(n, K_{r, s}) \leq \frac{1}{2}(r-1)^{1 / s} n^{2-1 / s}+\frac{1}{2}(s-1) n .$$

In particular,
$\operatorname{ex}(n, K_{r, s})=\mathscr{O}\left(n^{2-1 / s}\right)$ and
$\pi\left(K_{r, s}\right)=0$.


proof
*Proof.* Omitted. ◻


corollary
If $X \subset \mathbb{R}^2$ and $|X|=n$, then at most
$\frac{n^{3 / 2}}{\sqrt{2}}+\frac{n}{2}$ pairs of points in $X$ are at
unit distance.


proof
*Proof.* Omitted. ◻


### 4.7 Erdös-Stone: the fundamental theorem of extremal graph theory

Turán's theorem implies that for $r \geq 3$
$$\pi\left(K_r\right)=1-\frac{1}{r-1}=1-\frac{1}{\chi\left(K_r\right)-1} .$$

So in these cases the Turán density is determined by the chromatic
number. Moreover, this also holds for complete bipartite graphs by the
Kövári-SósTurán theorem [\[thm4.21\]](#thm4.21){reference-type="eqref"
reference="thm4.21"} since
$$\pi\left(K_{r, s}\right)=0=1-\frac{1}{\chi\left(K_{r, s}\right)-1} .$$

In fact, this holds in general and so allows us determine the Turán
density of any graph in terms of its chromatic number.

theorem
[]{#thm4.23 label="thm4.23"} If $H$ is a graph with chromatic number
$\chi(H)=r$, then $$\pi(H)=1-\frac{1}{r-1} .$$


proof
*Proof of [\[thm4.23\]](#thm4.23){reference-type="eqref"
reference="thm4.23"} $\implies$.* Omitted. ◻


proof
*Proof of [\[thm4.23\]](#thm4.23){reference-type="eqref"
reference="thm4.23"} $\Longleftarrow$ .* Omitted. ◻


lemma
Let $0<c, \epsilon<1$ and $n>2(1+1 / c) / \epsilon$. If $G$ is a graph
of order $n$ with at least $(c+\epsilon){n \choose 2}$ edges, then $G$
contains a subgraph $G^{\prime}$ of order
$n^{\prime} \geq \epsilon^{1 / 2} n$ with minimum degree
$\delta\left(G^{\prime}\right) \geq c n^{\prime}$.


proof
*Proof.* Omitted. ◻


theorem
Let $r \geq 2, t \geq 1$ and $0<\epsilon<1 / r$. There exists
$n_0(r, t, \epsilon)$ such that if $G$ has $n \geq n_0$ vertices and
minimum degree
$$\delta(G) \geq\left(1-\frac{1}{r-1}+\epsilon\right) n,$$ then $G$
contains a copy of $K_r(t)$.


proof
*Proof.* Omitted. ◻


### 4.8 Stability

If a $K_3$-free graph of order $n$ has \"almost\" ex
$\left(n, K_3\right)=\left\lfloor n^2 / 4\right\rfloor$ edges must it
look like the Turán graph $T_2(n)$?

theorem
If $G$ is a $K_{r+1}$-free graph of order $n$ with at least ex
$\left(n, K_{r+1}\right)-t$ edges, for some $t \geq 0$, then there
exists $H \subseteq G$ such that $|E(H)| \geq|E(G)|-t$ and
$\chi(H) \leq r$.


proof
*Proof.* Omitted. ◻


## 5 Families of sets: chains, antichains, and intersection problems

### 5.1 Chains and antichains

Let $0 \leq k \leq n$ be integers and recall that $\mathscr{P}([n])$
denotes the power set of $[n]$ :
$$\mathscr{P}([n])=\{A \mid A \subseteq[n]\}$$ while the family of
$k$-subsets of $[n]$ is
$${[n] \choose k}=\{A \subseteq[n] \mid | A | = k\} .$$

definition
A family of sets $\mathscr{C}$ is a **chain** if
$\forall A, B \in \mathscr{C} A \subseteq B$ or $B \subseteq A$.


remark
A chain is a family of sets $\mathscr{C}$ that can be linearly ordered
under inclusion i.e. $\mathscr{C}=\left\{C_1, C_2, \ldots, C_t\right\}$
with $C_1 \subseteq C_2 \subseteq \cdots \subseteq C_t$.


definition
A family of sets $\mathscr{A}$ is an **antichain** if
$\forall A, B \in \mathscr{A}, A \subseteq B \implies A=B$.


remark
An antichain is a family of sets $\mathscr{A}$ that are incomparable
under inclusion i.e. if $A, B \in \mathscr{A}$ and $A \neq B$ then
$A \not \subseteq B$ and $B \not \subseteq A$.


The first question we will explore in this section is: if
$\mathscr{A} \subseteq \mathscr{P}([n])$ is a chain or antichain how
large can $\mathscr{A}$ be?

For chains this question is trivial (stop and figure out the answer for
yourself if it isn't immedidately obvious). For antichains the answer
requires some work.

Both versions of this question require the following simple fact.

lemma
[]{#lem5.5 label="lem5.5"} If $\mathscr{A}$ is an antichain and
$\mathscr{C}$ is a chain, then
$$|\mathscr{A} \cap \mathscr{C}| \leq 1.$$


proof
*Proof.* Omitted. ◻


How large can a chain $\mathscr{C} \subseteq \mathscr{P}([n])$ be?

proposition
[]{#prop5.6 label="prop5.6"} If $\mathscr{C} \subseteq \mathscr{P}([n])$
is a chain, then $|\mathscr{C}| \leq n+1$.


proof
*Proof.* Omitted. ◻


A little thought tells us that an obvious candidate for the largest
antichain in $\mathscr{P}([n])$ is the \"middle layer\":
${[n] \choose \lfloor{n/2}\rfloor}$. This guess turns out to be correct,
and we can prove it using the same basic idea as Proposition
[\[prop5.6\]](#prop5.6){reference-type="eqref" reference="prop5.6"} by
finding a suitable partition of $\mathscr{P}([n])$ into chains.

theorem
[]{#thm5.7 label="thm5.7"} If $\mathscr{A} \subseteq \mathscr{P}([n])$
is an antichain, then
$$|\mathscr{A}| \leq {n \choose \lfloor{n/2}\rfloor} .$$


By Lemma [\[lem5.5\]](#lem5.5){reference-type="eqref"
reference="lem5.5"}, this result will follow if we can show that
$\mathscr{P}([n])$ can be partitioned into
${n \choose \lfloor{n/2}\rfloor}$ chains. In fact, we will prove a
slightly stronger result.

definition
A chain $\mathscr{C} \subseteq \mathscr{P}([n])$ is **symmetric** if
$\mathscr{C}=\left\{C_1, \ldots, C_k\right\}$ with
$\left|C_{i+1}\right|=\left|C_i\right|+1$ for all $1 \leq i \leq k-1$
and $\left|C_1\right|+\left|C_k\right|=n$.


lemma
$\mathscr{P}([n])$ can be partitioned into symmetric chains.


proof
*Proof.* Omitted. ◻


proof
*Proof of [\[thm5.7\]](#thm5.7){reference-type="eqref"
reference="thm5.7"}.* Omitted. ◻


### 5.2 LYM-inequality

theorem
(Lubell, Yamamoto, Meshalkin 1954). If
$\mathscr{A} \subseteq \mathscr{P}([n])$ is an antichain, then
{% raw %}$$\sum_{A \in \mathscr{A}} \frac{1}{{n \choose |A|}} \leq 1.$${% endraw %}


remark
Note that $2$ terms ${ n \choose |A_1|}, { n \choose |A_2|}$ in this
summation is the same if $|A_1| = |A_2|$. For $0 \leq k \leq n$, let
$a_k = |\mathscr{A} \cap {[n] \choose k} |$ denote the number of size
$k$ sets in $\mathscr{A}$, then equivalenly,
{% raw %}$$\left(\sum_{A \in \mathscr{A}} \frac{1}{{n \choose |A|}} = \right) \quad \sum_{k=0}^n \frac{a_k}{{n \choose k}} \leq 1.$$${% endraw %}
We are simply gathering same terms.


remark
If one sums the proportion of each layer contained in $\mathscr{A}$ over
all of the layers, the sum of that proportion $\leq 1$.


proof
*Proof by counting.* Omitted. ◻


proof
*Proof by the probabilistic method.* Omitted. ◻


### 5.3 Intersecting families

definition
A family of sets $\mathscr{A}$ is **intersecting** if
$\forall A, B \in \mathscr{A}, A \cap B \neq \emptyset$.


How large can an intersecting family
$\mathscr{A} \subseteq \mathscr{P}([n])$ be?

proposition
If $\mathscr{A} \subseteq \mathscr{P}([n])$ is intersecting, then
$|\mathscr{A}| \leq 2^{n-1}$.


remark
Note that $2^{n-1}$ is tight since the family
$\mathscr{A} = \{A \in \mathscr{P}([n]) \mid 1 \in A\}$ has size
$2^{n-1}$.


proof
*Proof.* Omitted. ◻


If $\mathscr{A} \subseteq {[n] \choose k}$ is intersecting, how large
can it be?

-   If $n < 2k$, then ${[n] \choose k}$ is intersecting. This is because
    that we need at least $2k$ elements to have $2$ disjoint sets of
    size $k$. Hence, $$|\mathscr{A}| \leq {n \choose k}.$$

-   If $n = 2k$, for $\mathscr{A}$ to be intersecting, one needs
    $A \in \mathscr{A} \implies [n] \setminus A \notin \mathscr{A}$. In
    this case,
    $$|\mathscr{A}| \leq \frac{1}{2}{2k \choose k} = \frac{k}{n}{n \choose k}.$$

-   If $n > 2k$, which is the really interesting case, one large
    intersecting family is
    $$\mathscr{A}^*= \{ A \in {[n] \choose k} \mid 1 \in A \} \text{ and } |\mathscr{A}^*| = { n-1 \choose k-1}.$$
    Thus, the next theorem tells us that one cannot do any better than
    this (i.e. there is no larger upper bounds).

theorem
If $\mathscr{A} \subseteq {[n] \choose k}$ is intersecting and
$n \geq 2 k$, then $$|\mathscr{A}| \leq { n-1 \choose k-1} .$$


remark
Note that ${ n-1 \choose k-1} = \frac{k}{n}{n \choose k}$, which is the
bound we find for $n = 2k$ case.


proof
*Proof by using cyclic permutations due to G.O.H. Katona 1972.*
Omitted. ◻


### 5.4 Compressions (not lectured 2023 and non-examinable)

### 5.5 The linear algebra method

definition
A set of vectors $\left\{v_1, \ldots, v_t\right\}$ in a vector space $V$
over a field $\mathbb{F}$ is **linearly independent** if
$$\sum_{i=1}^t \lambda_i v_i=0 \text{ with } \lambda_1, \ldots, \lambda_t \in \mathbb{F} \implies \lambda_1=\lambda_2=\cdots=\lambda_t=0.$$


lemma
[]{#lem5.2 label="lem5.2"} If $v_1, \ldots, v_t$ are linearly
independent vectors in a vector space of dimension $d$, then $t \leq d$.


proof
*Proof.* This is part of the Steinitz Exchange Lemma (see [1st Year
Algebra 1](https://www.ucl.ac.uk/~ucahmto/0005_2023/Ch4.S9.html)). ◻


definition
Let $X$ be any vector space over $\mathbb{F}$. An **inner product** on
$X$ is a function $(\cdot, \cdot): X \times X \rightarrow \mathbb{F}$
(often called **Hermitian** if $\mathbb{F} = \mathbb{C}$) satisfying
$\forall x, y \in X~ \forall \alpha \in \mathbb{F}$

-   Linearity: $$(x+y, z)=(x, z)+(y, z);$$

-   Homogeneity: $$(\alpha x, y)=\alpha(x, y);$$

-   Conjugate symmetry: $$(x, y)=\overline{(y, x)} ;$$

-   Non-degeneracy (positive definite):
    $$\begin{cases}(x, x) & \geq 0, \\ (x, x) & =0 \Leftrightarrow x=0 .\end{cases}$$

The pair $(X, (\cdot, \cdot))$ is an **inner product space** (or a
**pre-Hilbert space**).


remark
Note that $(0, x) = (0,x) + (0, x) = 0$.


definition
A set of vectors $\left\{v_1, \ldots, v_t\right\}$ in an inner product
space is **orthogonal** if
$\forall i \neq j, \left\langle v_i, v_j\right\rangle=0$.


remark
It is easy to check that any orthogonal set of vectors is linearly
independent hence the bound in Lemma
[\[lem5.2\]](#lem5.2){reference-type="eqref" reference="lem5.2"} applies
to any orthogonal set of vectors. Let $\{v_1, v_2, \dots, v_n\}$ be a
set of **non-zero** orthogonal vectors. Let
$\lambda_1, \lambda_2, \dots, \lambda_n \in \mathbb{F}$ such that
$$\sum_{k=1}^n \lambda_k v_k=0,$$ then
$$\lambda_j \cancelto{ \ne 0}{||v_j||^2}= \quad \bigg\langle\sum_{k=1}^n \lambda_k v_k, v_j\bigg\rangle=0, \quad \forall j=1,2, \dots, n$$
by linearity of the first argument of the inner product.


We start with a simple example to illustrate the method. The basic idea
is to associate vectors with sets from a given family and then show that
the vectors we obtain are linearly independent and hence prove an upper
bound on the size of the family.

theorem
If
$\mathscr{A}=\left\{A_1, \ldots, A_m\right\} \subseteq \mathscr{P}([n])$
is a family of sets satisfying:

1.  $\left|A_i\right|$ is odd for all $1 \leq i \leq m$;

2.  $\left|A_i \cap A_j\right|$ is even for all $i \neq j$,

then $m \leq n$.


proof
*Proof.* Omitted. ◻


A more interesting application is the following result known as Fisher's
Inequality.

theorem
Let $k \geq 1$. If $\mathscr{A} \subseteq \mathscr{P}([n])$ satisfies
$|A \cap B|=k$ for every pair of sets $A, B \in \mathscr{A}$ with
$A \neq B$, then $|\mathscr{A}| \leq n$.


proof
*Proof.* Omitted. ◻


### 5.6 $L$-intersecting families

Our final application of the linear algebra method is to a more
sophisticated intersection problem. This will require us to work over a
vector space of polynomials in several variables.

Recall that $\mathbb{R}[x]$ denotes the **ring of polynomials with real
coefficients**. This is
$$\mathbb{R}[x]=\left\{p(x)=c_0+c_1 x+\cdots+c_d x^d \mid d \in \mathbb{Z}^{+}, c_0, \ldots, c_d \in \mathbb{R}\right\} .$$

It is easy to check that this forms a vector space over $\mathbb{R}$
under the obvious operations of addition and scalar multiplication. The
zero vector is the zero polynomial.

If $x_1, \ldots, x_n$ are variables, then we can form the obvious
generalisation of $\mathbb{R}[x]$, that is, the **ring of multivariate
polynomials with real coefficients**
$\mathbb{R}\left[x_1, \ldots, x_n\right]$. Formally, we define a
**monomial** in $x_1, \ldots, x_n$ to be any product of the form
$x_{a_1}^{\alpha_1} \cdots x_{a_r}^{\alpha_r}$ where
$r \in \mathbb{Z}^{+}, 1 \leq a_1<a_2<\cdots<a_r \leq n$ and
$\alpha_1, \ldots, \alpha_r \in \mathbb{N}$. Note that the empty product
is allowed $(r=0)$, and this is defined to be $1$. A **multivariate
polynomial** is then any finite real linear combination of monomials.
The set of all such polynomials is
$\mathbb{R}\left[x_1, \ldots, x_n\right]$. The **degree of a monomial**
$x_{a_1}^{\alpha_1} \cdots x_{a_r}^{\alpha_r}$ is
$\sum_{i=1}^r \alpha_i$ and the **degree of a non-zero polynomial**
$p\left(x_1, \ldots, x_n\right)$ is the maximum of the degrees of the
monomials it contains.

For example, in $\mathbb{R}\left[x_1, x_2, x_3, x_4, x_5\right]$ the
polynomial
$$p\left(x_1, x_2, x_3, x_4, x_5\right)=-3+2 x_1 x_3 x_5^2+3 x_1^3 x_2^2,$$
has degree: $\operatorname{deg}(p)=\max \{0,4,5\}=5$.

Again, it is easy to check that
$\mathbb{R}\left[x_1, \ldots, x_n\right]$ is a vector space over
$\mathbb{R}$.

We will be interested in a special subspace of this space. Let
$s \in \mathbb{N}$ and define
$$U(s)=\operatorname{Span}\left\{x_{a_1} x_{a_2} \cdots x_{a_r} \mid 0 \leq r \leq s \text { and } 1 \leq a_1<a_2 \cdots<a_r \leq n\right\} .$$

Thus, $U(s)$ is the subspace of
$\mathbb{R}\left[x_1, \ldots, x_n\right]$ spanned by all monomials of
degree at most $s$ with no powers of any variable greater than one.
Since any spanning set of vectors contains a linearly independent
spanning set (i.e. the basis), we have
$\operatorname{dim}(U(s)) \leq |U(s)| = \sum_{r=0}^s{n \choose s}$. This
fact is useful when we prove theorem
[\[thm5.25\]](#thm5.25){reference-type="eqref" reference="thm5.25"}.

The following lemma is useful for the next theorem.

lemma
If $q_1, \ldots, q_m \in \mathbb{R}\left[x_1, \ldots, x_n\right]$ and
$v_1, \ldots, v_m \in \mathbb{R}^n$ satisfy

1.  for $1 \leq i \leq m$ we have $q_i\left(v_i\right) \neq 0$;

2.  for $1 \leq j<i \leq m$ we have $q_i\left(v_j\right)=0$,

then $\left\{q_1, \ldots, q_m\right\}$ are linearly independent.


proof
*Proof.* Omitted. ◻


Having introduced all of the necessary algebra, we now introduce one
more definitino and the combinatorial problem that we wish to consider.

definition
$Let L \subseteq\{0,1,2, \ldots, n\}$. A family
$\mathscr{A} \subseteq \mathscr{P}([n])$ is **$L$-intersecting** if for
each pair of sets $\forall A, B \in \mathscr{A}$ with $A \neq B$, we
have $|A \cap B| \in L$.


theorem
[]{#thm5.25 label="thm5.25"} If $\mathscr{A} \subseteq \mathscr{P}([n])$
is $L$ intersecting and $|L|=s$, then
$$|\mathscr{A}| \leq \sum_{r=0}^s {n \choose r} .$$


proof
*Proof.* Omitted. ◻


## 6 Ramsey theory

Ramsey theory is another branch of extremal combinatorics, it has been
summarised as saying that \"total disorder is impossible.\"\
In Turán-type problems, we consider how dense an object (in our examples
this was typically a graph) needs to be to guarantee that it contains a
copy of a given sub-object. Ramsey theory instead considers questions of
the form \"given an object that is partitioned into two (or more) parts,
how large must the object be to guarantee that one of the parts contains
a particular sub-object\".\
For example, if we take the set of integers $[N]=\{1, \ldots, N\}$ and
partition it into two parts: $[N]=A \dot{\cup} B$, how large must $N$ be
to guarantee that one of the parts contains a three term arithmetic
progression?\
We will consider such questions of Ramsey theory in the integers later,
but we start with the Ramsey theory of complete graphs.\
We will describe partitions in terms of colourings. So, for example, a
partition of the edges of $K_n$ into two parts is described by a
red-blue edge-colouring of $K_n$. Note that such edge-colourings are not
graph colourings as considered earlier in this course, there are no
constraints on how the edges of $K_n$ are coloured, it is simply a
convenient way of describing a partition of the edges of $K_n$.

definition
An **edge-colouring** of $K_n$ with $k$ colours $c_1, \ldots, c_k$ is a
function
$c: E\left(K_n\right) \rightarrow \left\{c_1, c_2, \ldots, c_k\right\}$.


Thus, an edge-colouring of $K_n$ is simply an assignment of colours to
the edges of $K_n$. Given a copy of $K_n$ together with an
edge-colouring, we say that $K_n$ is **edge-coloured**. For most of this
section we will only consider edge-colourings with two colours which we
will take to be red and blue.\
Given a red-blue edge-coloured $K_n$, we say that it contains a red
(blue) $H$ if there is a subgraph isomorphic to $H$ with all edges
coloured red (blue). A subgraph of an edge-coloured $K_n$ is said to be
**monochromatic** if all of its edges have the same colour.\
Given an edge coloured $K_n$ and a colour $c_i$, we define for each
$v \in V\left(K_n\right)$
$$\Gamma_{c_i}(v)=\left\{w \in V\left(K_n\right) \mid c(v w)=c_i\right\} \quad \text { and } \quad d_{c_i}(v)=\left|\Gamma_{c_i}(v)\right| .$$

### 6.1 Ramsey's theorem

Any gathering of six people must contain either three mutual friends or
three mutual strangers. This is the first not entirely trivial example
of a Ramsey number.

definition
Let $s, t \geq 2$ be integers. The **Ramsey number** $R(s, t)$ is the
smallest integer $n$ such that any red-blue edge-coloured $K_n$ always
contains a red $K_s$ or a blue $K_t$ i.e.
$$R(s, t) =   \min\{n \in \mathbb{N} \mid \text{any red-blue edge-coloured } K_n \text{ contains a red } K_s \text{ or a blue } K_t\} .$$


remark
Let
$R_{s,t} = \{n \in \mathbb{N} \mid \text{any red-blue edge-coloured } K_n \text{ contains a red } K_s \text{ or a blue } K_t\}$.
Note that it is not obvious that $R(s, t)$ is well-defined since it is
possible that $R_{s,t} = \emptyset$. However, it turns out that $R(s,t)$
is well-defined and this fact is known as Ramsey's theorem
[\[thm6.4\]](#thm6.4){reference-type="eqref" reference="thm6.4"}. Before
stating and proving Ramsey's theorem, we start with some small exact
examples.


proposition
$R(3,3) = 6$.


proof
*Proof.* Omitted. ◻


proposition
$R(3,4) = 9$.


proof
*Proof.* Omitted. ◻


theorem
[]{#thm6.4 label="thm6.4"} For $s, t \geq 2$, there exists
$n \in \mathbb{N}$ such that any red-blue edge-coloured $K_n$ contains
either a red $K_s$ or a blue $K_t$. Moreover if $R(s, t)$ denotes the
smallest such $n$, then $$R(s, t) \leq {s+t-2 \choose s-1}.$$


proof
*Proof.* Omitted. ◻


proposition
$R(4,4) = 18$.


proof
*Proof.* Omitted. ◻


theorem
There exists a real number $\epsilon>0$ such that
$$R(s, s) \leq(4-\epsilon)^s .$$


See [this](https://arxiv.org/abs/2303.09521) for details.

### 6.2 Ramsey numbers: lower bounds and more colours

What about a lower bound for $R(s, s)$? To show that a given integer $n$
is a lower bound for $R(s, s)$, we need to show that there exists a
red-blue edge-colouring of $K_n$ with no monochromatic $K_s$.

theorem
Let $3 \leq s \leq n$. If ${n \choose 2} 2^{1- { s \choose 2}} <1$, then
$R(s, s)>n$. In particular, $R(s, s)>2^{s / 2}$.


proof
*Proof.* Omitted. ◻


definition
For $k \geq 1$ and $s_1, \ldots, s_k \geq 2$, define
$R_k\left(s_1, s_2, \ldots, s_k\right)$ to be the smallest integer $n$
such that for any edge-colouring of $K_n$ with $k$ colours
$c_1, \ldots, c_k$, there exists a $c_i$-coloured copy of $K_{s_i}$ for
some $1 \leq i \leq k$ i.e. $$\begin{gathered}
            R_k\left(s_1, s_2, \ldots, s_k\right) =   \min\{n \in \mathbb{N} \mid \text{for any edge-colouring of } K_n \text{ with } k \text{ colours } c_1, \ldots, c_k , \\ \text{there exists a $c_i$-coloured copy of } K_{s_i} \text{ for some } 1 \leq i \leq k\} .
        
\end{gathered}$$ If $s_1=s_2 \cdots=s_k=s$, then we denote this by
$R_k(s)$.


remark
For example, $R_k(3)$ is the smallest integer $n$ such that whenever the
edges of $K_n$ are coloured with $k$-colours, there exists a
monochromatic triangle. As in the case of two colours, we need to check
that $R_k\left(s_1, s_2, \ldots, s_k\right)$ is in fact well defined.


theorem
For all $k \geq 1$ and
$s_1, \ldots, s_k \geq 2, R_k\left(s_1, \ldots, s_k\right)$ is well
defined.


proof
*Proof.* Omitted. ◻


### 6.3 Ramsey theory in the integers

theorem
There are no non-trivial integer solutions to $x^n+y^n=z^n$ for any
integer $n \geq 3$.


proof
*Proof.* The proof of Fermat's Last Theorem is unfortunately slightly
too long to fit in these notes. ◻


Instead we will consider the question of solutions to the Fermat
equation modulo a prime $p$. For example
$111^{333}+222^{333}=515^{333} \bmod 1051$. Our next result tells us
that for any fixed $n$ there are always non-trivial solutions modulo any
sufficiently large prime.

theorem
[]{#thm6.13 label="thm6.13"} For every integer $n \geq 1$ there exists
$p_n$ such that for any prime $p \geq p_n$ the congruence
$$x^n+y^n=z^n \quad \bmod p$$ has a non-trivial solution (i.e. a
solution with $x, y, z \neq 0 \bmod p$).


The key to proving Theorem
[\[thm6.13\]](#thm6.13){reference-type="eqref" reference="thm6.13"} is
the following Ramsey type result in the integers known as **Schur's
theorem**, which is itself proved using the Ramsey theory of graphs.

definition
An **integer-colouring** of $A \subseteq \mathbb{N}$ with $k$ colours
$c_1, \ldots, c_k$ is a function
$c: A \rightarrow \left\{c_1, c_2, \ldots, c_k\right\}$.


As with the edge-colourings of $K_n$ in the previous section, there are
no restrictions on these $k$-colourings. A $k$-colouring simply
describes a partition of the set $A$ into $k$ parts.

theorem
For any $k \geq 1$, there exists an integer $S(k)$ such that for any
$k$-colouring of the integers $\{1,2, \ldots, S(k)\}$, there exist
$u, v, w$ of the same colour such that $u+v=w$.


proof
*Proof.* Omitted. ◻


lemma
If $p$ is a prime, then $\mathbb{Z}_p^*$, the multiplicative group of
units $\bmod$ $p$, is a cyclic group.


proof
*Proof.* See 2nd year Algebra 4 notes or Number theory notes. ◻


proof
*Proof of [\[thm6.13\]](#thm6.13){reference-type="eqref"
reference="thm6.13"}.* Omitted. ◻


theorem
In any red-blue edge-colouring of $K_{\mathbb{N}}$, there is an infinite
set $A \subseteq \mathbb{N}$ such that $K_A$ is monochromatic.


proof
*Proof.* Omitted. ◻


### 6.4 Van der Waerden's theorem

The last result of our course is the starting point for many more recent
deep results in combinatorics and additive number theory, such as the
[HalesJewett
theorem](https://en.wikipedia.org/wiki/Hales%E2%80%93Jewett_theorem) and
the [Green-Tao theorem on arithmetic progressions in the
primes](https://en.wikipedia.org/wiki/Green-Tao_theorem).

theorem
If $k, t \geq 1$, there exists an integer $W(k, t)$ such that whenever
$[W(k, t)]$ is $k$-coloured there is a monochromatic arithmetic
progression of length $t$.


proof
*Proof.* Omitted. ◻


## 7 Inequalities

lemma
If $n \geq k \geq 1$, then
$$\frac{(n-k+1)^k}{k !} \leq {n \choose k} \leq \frac{n^k}{k !} .$$


proof
*Proof.* Omitted. ◻


definition
A function $f:(a, b) \rightarrow \mathbb{R}$ is **convex** if for all
$x, y \in(a, b)$ and $\lambda \in[0,1]$
$$f(\lambda x+(1-\lambda) y) \leq \lambda f(x)+(1-\lambda) f(y) .$$


For example $f(x)=x^2$ is convex on $\mathbb{R}$.

lemma
If $f:(a, b) \rightarrow \mathbb{R}$ is differentiable and
$f^{\prime}(x)$ is non-decreasing on $(a, b)$, then $f$ is convex. In
particular if $f^{\prime \prime}(x)>0$, then $f$ is convex.


proof
*Proof.* Omitted. ◻


definition
Let $k \geq 1$ be an integer. We extend the \" $k$-th binomial
coefficient function\" to the real numbers $x \in \mathbb{R}$ as
follows: $${x \choose k}=\frac{x(x-1) \cdots(x-k+1)}{k !},$$ for $x>k-1$
and ${x \choose k} = 0$ for $x \leq k-1$.


lemma
Let $k \geq 1$ be an integer, then $q_k(x)={x \choose k}$ is convex on
$\mathbb{R}$.


proof
*Proof.* Omitted. ◻


One inequality to rule them all\...

theorem
If $\varphi:(a, +\infty) \rightarrow \mathbb{R}$ is convex,
$\lambda_1, \ldots, \lambda_n \in$ $[0,1]$ satisfy
$\sum_{i=1}^n \lambda_i=1$, and $x_1, \ldots, x_n \in(a, +\infty)$ then
$$\varphi\left(\sum_{i=1}^n \lambda_i x_i\right) \leq \sum_{i=1}^n \lambda_i \varphi\left(x_i\right) .$$


proof
*Proof.* Omitted. ◻


corollary
If $x_1, \ldots, x_n \in \mathbb{R}$, then
$$\frac{1}{n}\left(\sum_{i=1}^n x_i\right)^2 \leq \sum_{i=1}^n x_i^2 .$$


proof
*Proof.* Omitted. ◻


corollary
If $x_1, \ldots, x_n \in \mathbb{R}$, then
$${\sum_{i=1}^n x_i \choose k}
        \leq \frac{1}{n} \sum_{i=1}^n {x_i \choose k}.$$


proof
*Proof.* Omitted. ◻
 -->
