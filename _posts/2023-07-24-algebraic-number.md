---
title: Conway Look-and-say Sequence
date: 2023-07-24 21:35
categories: [Posts, Mathematics]
tags: [algebraic number theory]     # TAG names should always be lowercase
math: true
image: /assets/img/feature/look_and_say.png
---
Let's play a game with integer sequences. Observe the following sequence:

$$
\begin{align}
    1\\
    11\\
    21\\
    1211\\
    111221\\
    312211\\
    \vdots
\end{align}
$$

Can you tell the next number?

**Ans:** The next number is $1311221$ because we have "one $3$, one $1$, two $2$s, and two $1$s" from the previous term.

---
I came across this [Conway look-and-say sequence](https://en.wikipedia.org/wiki/Look-and-say_sequence) in a minicourse about computational number theory and found the pattern was hilarious at first. After roughly going through the related section in [Eureka. 46](https://www.archim.org.uk/eureka/archive/Eureka-46.pdf) and some basic theorems, I took some notes for fun.

## Algebraic and transcendental numbers
---

**Definition 0.1 (Algebraic Number)** A number $\theta \in \mathbb{C}$ is *algebraic* if it satifies the polynomial equation, i.e.

$$
    f(\theta) = a_n\theta^n + a_{n-1}\theta^{n-1} + \cdots + a_1\theta + a_0 = 0
$$

with $a_0, ..., a_n \in \mathbb{Q}$.

---
From the definition, we notice that all rational numbers are algebriac as $x = \frac{a}{b}$ is a root of $bx-a$, where $a, b \in \mathbb{Z}$.


Some classic examples are:

- $\sqrt{2} \rightarrow x^2 - 2$,
- $i = \sqrt{-1} \rightarrow x^2 + 1$,
- $\cos(\frac{2\pi}{9})\rightarrow 8x^3-6x+1$.

---
**Proposition 0.2**
The algebraic numbers form a field $\bar{\mathbb{Q}} \subseteq \mathbb{C}$.

---
- Properties such as associativity, commutativity, and distributivity are inherited from $\mathbb{C}$. For $\bar{\mathbb{Q}}$ to be a field, all we need is to show is that the sum, difference, product and quotient (if the denominator is nonzero) of two algebraic numbers is again algebraic.
- To prove the sum and product of two algebraic numbers is again algebraic, the following lemma turns out to be helpful.

---
**Lemma 0.3**
Suppose $V \subseteq \mathbb{C}$ is a finite-dimensional vector space over $\mathbb{Q}$ with $V \ne 0$ and $x \in \mathbb{C}$, then

$$
    xV \subseteq V \implies x \in \bar{\mathbb{Q}}.
$$

*Proof:* Let $e_1, ..., e_n$ be a basis for $V$.
By assumption,

$$
\begin{align}
xe_1 &= a_{11}e_1 + \cdots + a_{1n}e_n, \\
xe_2 &= a_{21}e_1 + \cdots + a_{2n}e_n, \\
&\vdots\\
xe_n &= a_{n1}e_1 + \cdots + a_{nn}e_n. \\
\end{align}
$$

Since a basis can't be all zero vectors, we have

$$
\det(xI - A) = 0,
$$

where 

$$
   A =\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots &\ddots & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{pmatrix}.
$$

This is a polynomial equation with coefficients in $\mathbb{Q} \implies x \in \bar{\mathbb{Q}}$. ◼

---
*Proof of proposition 0.2:*
Let $\theta_1, \theta_2$ be algebraic and, without loss of generality, $f_1, f_2$ be some rational polynomials with least degrees $m,n$ such that $f_1(\theta_1) = 0, f_2(\theta_2) = 0$.
Clearly, $f(-\theta_1) = 0$ and $\theta_1^{m}f_1(\frac{1}{\theta_1}) = 0$. To show that $\theta_1+\theta_2$ and $\theta_1 \theta_2$ are algebaic,
consider the following vector space

$$
    V = \langle \theta_1^i\theta_2^j : 0\leq i <m, 0 \leq j <n \rangle
$$

over $\mathbb{Q}$ spanned by the $mn$ elements $\theta_1^i\theta_2^j$.
Since $\theta_1^m$ can be expressed as a linear combination of lower degrees of $\theta_1$ (similarly for $\theta_2$), we have

$$
    \theta_1 V \subseteq V, ~~~ \theta_2 V \subseteq V.
$$

Hence

$$
    (\theta_1 + \theta_2) V \subseteq V, ~~~ \theta_1\theta_2 V \subseteq V,
$$

which completes the proof by the previous lemma. ◼

**Remark:** Similarly, we can show that the set of all [*algebraic integers*](https://en.wikipedia.org/wiki/Algebraic_integer) forms a ring $\bar{\mathbb{Z}} \subseteq \bar{\mathbb{Q}}$.

---
The algebraic numbers form a countable subset of the $\mathbb{C}$, so "most" numbers are not algebraic. 
Non-algebraic numbers are called *transcendental*.

- $\pi, \text{e}, \log(2), \text{e}^{\pi}$ are examples of transcendental numbers.

One of many useful results is the **Lindemann’s Theorem**.

---
**Theorem 0.4 (Lindemann’s Theorem)**
Suppose $\theta \neq 0$ is algebraic. 
Then $\text{e}^{\theta}$ is transcendental.

---
**Some remarks:**
- $\text{e}, \pi$ are transcendental immediately follows this theorem by setting $\theta = 1$ and $i\pi$.
- I'll prove a related result which implies Lindemann’s Theorem.

---
**Theorem 0.5**
Suppose $\theta_1, ..., \theta_k$ are distinct algebraic integers. Then $\text{e}^{\theta_1}, ..., \text{e}^{\theta_k}$ are linearly independent over $\bar{\mathbb{Q}}$.

Theorem 0.5 $\implies$ Theorem 0.4:
Let $\theta$ be an algebraic number, then there exists an integer $k$ such that $\theta k$ is an algebriac interger (just multiply the corresponding polynomial equation by the appropriate integer).
So, without loss of generality, suppose that $\theta$ is an algebraic integer and $\text{e}^{\theta} = b$ is an algebraic number. 
By setting $\theta_1 = 0$ and $\theta_2 = \theta$, $b_1 = -b$ and $b_2 = 1$, we have

$$
    b_1\text{e}^{\theta_1} + b_2 \text{e}^{\theta_2} = -b + \text{e}^{\theta} = 0,
$$

contradicting the fact that $\text{e}^{\theta_1}$ and $\text{e}^{\theta_2}$ are linearly independent over $\bar{\mathbb{Q}}$. ◼

*Proof of Lindemann’s Theorem:* I just noticed that this proof required lots of technical details. I will try to write my version of proof in a later post, hopefully.
See [Jacobson’s book Algebra I, Page 277](http://www.math.toronto.edu/~ila/Jacobson-Basic_algebra_I%20(1).pdf) for a complete proof. ◼

---

## An algebraic suprise
---
The sequence $1, 11, 21, 1211, 111221, 312211, ...$ is the Conway look-and-say sequence. Write $L_n$ for the length of the $n$th term. 
Then, surprisingly to me at least, the number

$$
    \lambda := \lim_{n \to \infty} \frac{L_{n+1}}{L_n} = 1.303577296...
$$

is algebraic, satisfying a polynomial of degree $71$, which looks like this:

$$
\begin{align}
&x^{71}-x^{69}-2x^{68}-x^{67}+2x^{66}+2x^{65}+x^{64}-x^{63}-x^{62}-x^{61}-x^{60}\\
-&x^{59}+2x^{58}+5x^{57}+3x^{56}-2x^{55}10x^{54}-3x^{53}-2x^{52}+6x^{51}\\
+&6x^{50}+x^{49}+9x^{48}-3x^{47}-7x^{46}-8x^{45}-8x^{44}+10x^{43}+6x^{42}\\
+&8x^{41}-5x^{40}-12x^{39}+7x^{38}-7x^{37}+7x^{36}+x^{35}-3x^{34}+10x^{33}\\
+&x^{32}-6x^{31}-2x^{30}-10x^{29}-3x^{28}+2x^{27}+9x^{26}-3x^{25}+14x^{24}\\
-8&x^{23}-7x^{21}+9x^{20}+3x^{19}-4x^{18}-10x^{17}-7x^{16}+12x^{15}\\
+7&x^{14}+2x^{13}-12x^{12}-4x^{11}-2x^{10}+5x^{9}+x^7-7x^6+7x^5\\
-4&x^4+12x^3-6x^2+3x-6.
\end{align}
$$

The constant $\lambda$ can be interpreted as the ratio of two seccessive terms.
It reveals the fact that the Conway look-and-say sequences grow predictably in size,
and the length (i.e. number of digits) of the $(n+1)$ term is approximately $1.3057$ times the length of the $n$th term.
Moreover, $\lambda$ is in fact the largest root of the above polynomial of degree 
$71$. 

### Properties of Conway look-and-say sequences

One can verify the following properties of the look-and-say sequences by using induction on the length of each term.

1. Only $1, 2$ or $3$ appear in the digits.
2. Every term in the sequences ends in $1$.
3. Every term begin with $1$ or $3$, execpt for the third term $21$.
4. The digits $22$ is stable, in the sence that it never changes.

### $92$ Elements

Conway discovered that each term in the look-and-say sequences can be broken up into smaller, atomic ones, in the sence that each term in the look-and-say sequences is a concatenation of $92$ non-interacting subsequences. 
Conway named them after the $92$ elements in the periodic table from hydrogen $22$ to uranium $3$ with the longest atomic subsequence being rhenium: $111312211312113221133211322112211213322113$.
To be more specific, let us summarise these $92$ atomic subsequences in lexicographical order in the table below.

| Number | Subsequence                               | Length | Evolution               | Element |
|--------|                                       ---:|--------|-------------------------|---------|
|       1|                                       1112|       4|                     (63)|         |
|       2|                                    1112133|       7|                 (64)(62)|         |
|       3|                               111213322112|      12|                     (65)|         |
|       4|                               111213322113|      12|                     (66)|         |
|       5|                                       1113|       4|                     (68)|         |
|       6|                                      11131|       5|                     (69)|         |
|       7|                               111311222112|      12|                 (84)(55)|         |
|       8|                                     111312|       6|                     (70)|         |
|       9|                                   11131221|       8|                     (71)|         |
|      10|                                 1113122112|      10|                     (76)|         |
|      11|                                 1113122113|      10|                     (77)|         |
|      12|                             11131221131112|      14|                     (82)|         |
|      13|                            	 111312211312|      12|                     (78)|         |
|      14|                             11131221131211|      14|                     (79)|         |
|      15|                         111312211312113211|      18|                     (80)|         |
|      16| 111312211312113221133211322112211213322112|      42|             (81)(29)(91)|         |
|      17| 111312211312113221133211322112211213322113|      42|             (81)(29)(90)|         |
|      18|                 11131221131211322113322112|      26|                 (81)(30)|         |
|      19|                             11131221133112|      14|             (75)(29)(92)|         |
|      20|               1113122113322113111221131221|      28|                 (75)(32)|         |
|      21|                             11131221222112|      14|                     (72)|         |
|      22|                   111312212221121123222112|      24|                     (73)|         |
|      23|                   111312212221121123222113|      24|                     (74)|         |
|      24|                                      11132|       5|                     (83)|         |
|      25|                                    1113222|       7|                     (86)|         |
|      26|                                 1113222112|      10|                     (87)|         |
|      27|                                 1113222113|      10|                     (88)|         |
|      28|                                   11133112|       8|                 (89)(92)|         |
|      29|                                         12|       2|                      (1)|         |
|      30|                                  123222112|       9|                      (3)|         |
|      31|                                  123222113|       9|                      (4)|         |
|      32|                    12322211331222113112211|      23|          (2)(61)(29)(85)|         |
|      33|                                         13|       2|                      (5)|         |
|      34|                                     131112|       6|                     (28)|         |
|      35|           13112221133211322112211213322112|      32|     (24)(33)(61)(29)(91)|         |
|      36|           13112221133211322112211213322113|      32|     (24)(33)(61)(29)(90)|         |
|      37|                                   13122112|       8|                      (7)|         |
|      38|                                        132|       3|                      (8)|         |
|      39|                                      13211|       5|                      (9)|         |
|      40|                                     132112|       6|                     (10)|         |
|      41|                                 1321122112|      10|                     (21)|         |
|      42|                         132112211213322112|      18|                     (22)|         |
|      43|                         132112211213322113|      18|                     (23)|         |
|      44|                                     132113|       6|                     (11)|         |
|      45|                                 1321131112|      10|                     (19)|         |
|      46|                                   13211312|       8|                     (12)|         |
|      47|                                    1321132|       7|                     (13)|         |
|      48|                                   13211321|       8|                     (14)|         |
|      49|                               132113212221|      12|                     (15)|         |
|      50|                       13211321222113222112|      20|                     (18)|         |
|      51|         1321132122211322212221121123222112|      34|                     (16)|         |
|      52|         1321132122211322212221121123222113|      34|                     (17)|         |
|      53|                       13211322211312113211|      20|                     (20)|         |
|      54|                                 1321133112|      10|          (6)(61)(29)(92)|         |
|      55|                                    1322112|       7|                     (26)|         |
|      56|                                    1322113|       7|                     (27)|         |
|      57|                                13221133112|      11|             (25)(29)(92)|         |
|      58|                              1322113312211|      13|             (25)(29)(67)|         |
|      59|                      132211331222113112211|      21|             (25)(29)(85)|         |
|      60|                          13221133122211332|      17| (25)(29)(68)(61)(29)(89)|         |
|      61|                                         22|       2|                     (61)|         |
|      62|                                          3|       1|                     (33)|         |
|      63|                                       3112|       4|                     (40)|         |
|      64|                                    3112112|       7|                     (41)|         |
|      65|                             31121123222112|      14|                     (42)|         |
|      66|                             31121123222113|      14|                     (43)|         |
|      67|                                    3112221|       7|                 (38)(39)|         |
|      68|                                       3113|       4|                     (44)|         |
|      69|                                     311311|       6|                     (48)|         |
|      70|                                   31131112|       8|                     (54)|         |
|      71|                                 3113112211|      10|                     (49)|         |
|      72|                           3113112211322112|      16|                     (50)|         |
|      73|               3113112211322112211213322112|      28|                     (51)|         |
|      74|               3113112211322112211213322113|      28|                     (52)|         |
|      75|                                  311311222|       9|                 (47)(38)|         |
|      76|                               311311222112|      12|                 (47)(55)|         |
|      77|                               311311222113|      12|                 (47)(56)|         |
|      78|                           3113112221131112|      16|                 (47)(57)|         |
|      79|                         311311222113111221|      18|                 (47)(58)|         |
|      80|                   311311222113111221131221|      24|                 (47)(59)|         |
|      81|                    31131122211311122113222|      23|                 (47)(60)|         |
|      82|                           3113112221133112|      16|     (47)(33)(61)(29)(92)|         |
|      83|                                     311312|       6|                     (45)|         |
|      84|                                      31132|       5|                     (46)|         |
|      85|                            311322113212221|      15|                     (53)|         |
|      86|                                     311332|       6|             (38)(29)(89)|         |
|      87|                                 3113322112|      10|                 (38)(30)|         |
|      88|                                 3113322113|      10|                 (38)(31)|         |
|      89|                                        312|       3|                     (34)|         |
|      90|                312211322212221121123222113|      27|                     (36)|         |
|      91|                312211322212221121123222112|      27|                     (35)|         |
|      92|                                      32112|       5|                     (37)|         |
