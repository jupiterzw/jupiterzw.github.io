---
title: Conway Look-and-say Sequence
date: 2023-07-24 21:35
categories: [Posts, Mathematics]
tags: [algebraic number theory]     # TAG names should always be lowercase
math: true
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

**Ans:** The next number is $1311221$.

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

Moreover, $\lambda$ is indeed its largest root. Let's show why this is the case.



