---
title: Conway's Look-and-Say Sequence
description: "An exploration of Conway's look-and-say sequence, its long-term behaviour, and the algebraic structure behind it."
date: 2023-07-24 21:35
categories: [Posts, Mathematics]
tags: [Algebraic Number Theory]
math: true
image: /assets/img/2023-07-24-algebraic-number/cover.png
---

Let's play a game with integer sequences. Observe the following sequence:

$$
\begin{aligned}
1&\\
11&\\
21&\\
1211&\\
111221&\\
312211&\\
\vdots&
\end{aligned}
$$

Can you tell the next number?

**Answer.** It is $$13112221$$, because $$312211$$ is read as “one $$3$$, one
$$1$$, two $$2$$s, and two $$1$$s.”

At first I found this pattern hilarious. It looks like the sort of puzzle whose
mathematics should end after ten minutes. Instead, it leads to field theory,
algebraic integers, finite-state transducers, Perron--Frobenius theory, and an
irreducible polynomial of degree $$71$$. This post is my attempt to explain why.

## Algebraic and transcendental numbers

**Definition 1 (algebraic number).** A complex number $$\alpha$$ is
*algebraic over* $$\mathbb Q$$ if there is a nonzero polynomial

$$
f(x)=a_nx^n+\cdots+a_1x+a_0\in\mathbb Q[x]
$$

such that $$f(\alpha)=0$$. Otherwise, $$\alpha$$ is *transcendental*.

After clearing denominators, we may equivalently require
$$f\in\mathbb Z[x]$$. Among all monic polynomials in $$\mathbb Q[x]$$
annihilating $$\alpha$$ there is a unique one of least degree: its
*minimal polynomial* $$m_\alpha(x)$$. The number

$$
[\mathbb Q(\alpha):\mathbb Q]=\deg m_\alpha
$$

is called the degree of $$\alpha$$.

For example,

- $$\sqrt 2$$ has minimal polynomial $$x^2-2$$;
- $$i$$ has minimal polynomial $$x^2+1$$;
- $$2\cos(2\pi/9)$$ has minimal polynomial $$x^3-3x+1$$.

The last example is a useful reminder: algebraic numbers need not be expressible
by square roots, and their natural home is field theory rather than a catalogue
of special formulas.

---

**Proposition 2.** The set $$\overline{\mathbb Q}$$ of algebraic numbers is a
subfield of $$\mathbb C$$.

We first isolate the linear-algebra trick behind the proof.

**Lemma 3.** Let $$V\subseteq\mathbb C$$ be a nonzero finite-dimensional
$$\mathbb Q$$-vector space. If $$xV\subseteq V$$, then
$$x\in\overline{\mathbb Q}$$.

*Proof.* Multiplication by $$x$$ defines a $$\mathbb Q$$-linear operator
$$T_x\colon V\to V$$. By the Cayley--Hamilton theorem,
its characteristic polynomial $$\chi_{T_x}\in\mathbb Q[t]$$ satisfies
$$\chi_{T_x}(T_x)=0$$. Applying this operator identity to any nonzero
$$v\in V$$ gives

$$
\chi_{T_x}(x)v=0.
$$

Since $$v\ne0$$ in the field $$\mathbb C$$, we have
$$\chi_{T_x}(x)=0$$. Thus $$x$$ is algebraic. $$\square$$

*Proof of Proposition 2.* Take algebraic numbers $$\alpha,\beta$$ of degrees
$$m,n$$. The $$\mathbb Q$$-algebra

$$
A=\mathbb Q[\alpha,\beta]
$$

is spanned over $$\mathbb Q$$ by the $$mn$$ elements

$$
\alpha^i\beta^j,\qquad 0\le i<m,\quad 0\le j<n.
$$

Indeed, the equations $$m_\alpha(\alpha)=0$$ and
$$m_\beta(\beta)=0$$ reduce all higher powers. Moreover, a nonzero
finite-dimensional algebra over a field that is also an integral domain is
itself a field: multiplication by a nonzero element is injective, hence
surjective. Therefore $$A=\mathbb Q(\alpha,\beta)$$. Multiplication by each of
$$\alpha+\beta$$, $$\alpha-\beta$$, $$\alpha\beta$$ and, if
$$\beta\ne0$$, $$\alpha/\beta$$ preserves $$A$$. Lemma 3 shows that all
four numbers are algebraic. $$\square$$

An algebraic number is an **algebraic integer** if its minimal polynomial lies
in $$\mathbb Z[x]$$. Algebraic integers form a ring
$$\overline{\mathbb Z}$$. One clean proof uses the integral-dependence
criterion: $$x$$ is integral over $$\mathbb Z$$ exactly when some finitely
generated nonzero $$\mathbb Z$$-module $$M\subset\mathbb C$$ satisfies
$$xM\subseteq M$$. The same module argument, applied to
$$\mathbb Z[\alpha,\beta]$$, proves closure under addition and multiplication.

There are only countably many polynomials in $$\mathbb Z[x]$$, and each has
finitely many roots. Thus $$\overline{\mathbb Q}$$ is countable, whereas
$$\mathbb R$$ and $$\mathbb C$$ are uncountable. In this precise sense, almost
every complex number is transcendental, although proving transcendence for a
particular familiar constant can be extremely difficult.

Two landmarks are worth stating accurately.

**Hermite--Lindemann theorem.** If
$$0\ne\alpha\in\overline{\mathbb Q}$$, then $$e^\alpha$$ is
transcendental.

**Lindemann--Weierstrass theorem.** If
$$\alpha_1,\ldots,\alpha_r$$ are distinct algebraic numbers, then
$$e^{\alpha_1},\ldots,e^{\alpha_r}$$ are linearly independent over
$$\overline{\mathbb Q}$$.

The second theorem implies the first by taking $$\alpha_1=0$$ and
$$\alpha_2=\alpha$$. It also gives the transcendence of $$e$$ immediately.
If $$\pi$$ were algebraic, then $$i\pi$$ would be a nonzero algebraic number
whose exponential is $$-1$$, a contradiction. Similarly, if
$$\log 2$$ were algebraic, its exponential would be algebraic. The
transcendence of $$e^\pi$$ is a different theorem: it follows from
Gelfond--Schneider by writing $$e^\pi$$ as a value of
$$(-1)^{-i}$$.

These theorems are much deeper than we need below. The point is simply that
“algebraic” is a rigid arithmetic condition. So why should the growth rate of
a silly digit game satisfy any polynomial at all?

## The look-and-say operator

Let a word be written in maximal constant runs as

$$
w=a_1^{r_1}a_2^{r_2}\cdots a_k^{r_k},
\qquad a_i\ne a_{i+1}.
$$

The look-and-say operator $$D$$ replaces every run by its length followed by
its symbol:

$$
D(w)=r_1a_1\,r_2a_2\cdots r_ka_k.
$$

Thus $$D(312211)=13112221$$. Starting from $$w_0=1$$, put
$$w_{n+1}=D(w_n)$$ and $$L_n=|w_n|$$.

For this particular seed, only the symbols $$1,2,3$$ occur after the first
few generations, and no run has length more than $$3$$. These facts are easy
to check inductively, but by themselves they do not explain the asymptotic
growth.

The crucial notion is **independent evolution**. A factorisation $$w=uv$$ is
a permanent split if

$$
D^n(w)=D^n(u)D^n(v)\qquad\text{for every }n\ge0.
$$

This is stronger than saying that the first derivation happens to concatenate:
the boundary between $$u$$ and $$v$$ must never merge at any later time. An
**atom** is a nonempty word admitting no nontrivial permanent split.

For example, $$22$$ is fixed because $$D(22)=22$$. It is the atom called
hydrogen. Conway found $$92$$ common atoms and named them after the chemical
elements from hydrogen to uranium. A few representatives are:

| Element | Atom | Its decay |
|:--|:--|:--|
| H | `22` | H |
| He | `13112221133211322112211213322112` | Hf · Pa · H · Ca · Li |
| C | `3113112211322112211213322112` | B |
| K | `1112` | Ar |
| Ca | `12` | K |
| Re | `111312211312113221133211322112211213322113` | Ge · Ca · W |
| Pa | `13` | Th |
| U | `3` | Pa |

Here “decay” means that applying $$D$$ produces the concatenation of the atoms
listed in the last column. The chemical names are whimsical; the finite
decomposition is the mathematics.

---

**Cosmological theorem, informal form.** Over the classical alphabet
$$\{1,2,3\}$$, every sufficiently old nonempty look-and-say word, apart from
the fixed word $$22$$, splits into Conway's common atoms. For a general initial
alphabet, two parameterised “transuranic” families must also be allowed.

The modern sharp formulation is stronger. Lairez and Storozhenko prove that if
a word contains no factor $$aaaa$$, then every iterate from day $$24$$ onward
splits into the $$94$$ common-or-transuranic atom types. Every first-generation
word has no four consecutive equal symbols, so day $$25$$ is a uniform bound
for an arbitrary seed. For the classical seed $$1$$, only the $$92$$ common
atoms are relevant.

This theorem is the hidden finiteness principle. An infinite process on longer
and longer strings eventually becomes a finite substitution system.

## From atoms to an integer matrix

Index the relevant atoms by $$E_1,\ldots,E_{92}$$. When $$E_j$$ decays, let
$$m_{ij}$$ be the number of copies of $$E_i$$ in its atomic factorisation, and
form the nonnegative integer matrix

$$
M=(m_{ij})\in M_{92}(\mathbb Z_{\ge0}).
$$

If $$c_n\in\mathbb Z_{\ge0}^{92}$$ records the number of atoms of each type in
generation $$n$$, then

$$
c_{n+1}=Mc_n.
$$

Let

$$
\ell=(|E_1|,\ldots,|E_{92}|)^{\mathsf T}.
$$

Once the primordial part of the sequence has decayed, its total digit length is
therefore

$$
L_n=\ell^{\mathsf T}c_n=\ell^{\mathsf T}M^{\,n-n_0}c_{n_0}.
$$

At this point the surprise becomes linear algebra. The full matrix is
reducible---hydrogen, for instance, only produces hydrogen---but its dominant
recurrent block is primitive. The Perron--Frobenius theorem gives that block a
simple positive eigenvalue $$\lambda$$ whose modulus is strictly larger than
that of every other eigenvalue in the block. Provided the initial vector reaches
the dominant component, as the seed $$1$$ does,

$$
M^nc=C\lambda^n v+O(\rho^n)
\qquad (\rho<\lambda),
$$

where $$v$$ is a positive right Perron eigenvector and $$C>0$$. Applying the
positive linear functional $$\ell^{\mathsf T}$$ yields

$$
\boxed{\displaystyle
\lim_{n\to\infty}\frac{L_{n+1}}{L_n}=\lambda}.
$$

The same argument gives more than a growth rate. After normalisation, the atom
count vector converges to the Perron eigenvector:

$$
\frac{c_n}{\mathbf 1^{\mathsf T}c_n}
\longrightarrow
\frac{v}{\mathbf 1^{\mathsf T}v}.
$$

Thus every atom has a limiting abundance, and digit frequencies are obtained
by applying further linear functionals to $$v$$. The spectral gap
$$\lambda-\rho$$ controls the exponential rate of convergence. In the language
of symbolic dynamics, the mature look-and-say sequence is governed by a finite
substitution with a unique asymptotic frequency vector.

Most importantly, $$M$$ has integer entries. Every eigenvalue of an integer
matrix is a root of its monic characteristic polynomial, so $$\lambda$$ is an
algebraic integer. Algebraicity is not a numerical coincidence: it is forced by
the finite atomic description.

## Conway's constant

Removing the transient directions and factoring the characteristic polynomial
leaves the following irreducible degree-$$71$$ polynomial:

$$
\begin{aligned}
p(x)={}&x^{71}-x^{69}-2x^{68}-x^{67}+2x^{66}+2x^{65}+x^{64}
-x^{63}-x^{62}-x^{61}-x^{60}\\
&-x^{59}+2x^{58}+5x^{57}+3x^{56}-2x^{55}-10x^{54}-3x^{53}
-2x^{52}+6x^{51}\\
&+6x^{50}+x^{49}+9x^{48}-3x^{47}-7x^{46}-8x^{45}-8x^{44}
+10x^{43}+6x^{42}\\
&+8x^{41}-5x^{40}-12x^{39}+7x^{38}-7x^{37}+7x^{36}+x^{35}
-3x^{34}+10x^{33}\\
&+x^{32}-6x^{31}-2x^{30}-10x^{29}-3x^{28}+2x^{27}+9x^{26}
-3x^{25}+14x^{24}\\
&-8x^{23}-7x^{21}+9x^{20}+3x^{19}-4x^{18}-10x^{17}
-7x^{16}+12x^{15}\\
&+7x^{14}+2x^{13}-12x^{12}-4x^{11}-2x^{10}+5x^9+x^7
-7x^6+7x^5\\
&-4x^4+12x^3-6x^2+3x-6.
\end{aligned}
$$

Conway's constant is the unique positive real root of $$p$$:

$$
\lambda
=1.303577269034296391257099112152551890730702504659404875754\ldots
$$

Because $$p$$ is irreducible over $$\mathbb Q$$, this really is the minimal
polynomial of $$\lambda$$ and

$$
[\mathbb Q(\lambda):\mathbb Q]=71.
$$

Notice the logical order. A decimal approximation can suggest a constant, but
it cannot explain degree $$71$$. The explanation is the finite decay matrix;
the polynomial is a compressed algebraic shadow of that matrix.

## What is recent here?

Conway's original analysis was ingenious, but the cosmological theorem was
notoriously awkward to verify by hand. The subject has recently acquired a much
cleaner computational language.

In 2024, Pierre Lairez and Aleksandr Storozhenko represented look-and-say
derivation, splitting, and admissible sources by finite-state transducers. Their
proof of the day-$$24$$ bound reduces the theorem to equality of two finite
transducers. In their reported computation, the largest minimised automaton has
$$592$$ states and the complete verification takes about $$150$$ milliseconds
on a laptop. The result was subsequently published in *The American
Mathematical Monthly* in 2025. This is a satisfying example of computer-assisted
proof: the computer checks a finite automata identity, while the paper proves
why that identity implies the infinite theorem.

The same finite-state and substitution viewpoint also exposes nearby worlds:

- Dresden and Siehler showed in 2024 that bases $$b\ge4$$ eventually recover
  Conway's $$92$$ elements and the same constant $$\lambda$$. Binary and ternary
  look-and-say behave differently: their growth constants are respectively the
  positive roots of $$x^3-x^2-1$$ and $$x^3-x-1$$.
- In a “stuttering” variant, a run is described with an extra repeated count.
  Comes proved that its asymptotic growth rate is again an algebraic integer,
  but now of degree $$415$$.

So the frontier is not about guessing more digits of $$\lambda$$. It is about
understanding which local description rules admit a finite atomic
decomposition, how to certify that decomposition, and what spectral data the
resulting substitution system forces.

## Final thought

The look-and-say sequence begins as a joke and ends as a small piece of
algebraic dynamics:

$$
\text{local run rule}
\longrightarrow
\text{finite atomic decay}
\longrightarrow
\text{integer substitution matrix}
\longrightarrow
\text{algebraic Perron eigenvalue}.
$$

That chain is the real reason a degree-$$71$$ algebraic integer appears. The
polynomial is spectacular, but the finite-state structure behind it is the
better surprise.

## References

1. J. H. Conway, [*The Weird and Wonderful Chemistry of Audioactive
   Decay*](https://doi.org/10.1007/978-1-4612-4808-8_53), in *Open Problems in
   Communication and Computation*, 1987, pp. 173--188.
2. P. Lairez and A. Storozhenko, [*Conway's Cosmological Theorem and Automata
   Theory*](https://arxiv.org/abs/2409.20341), *The American Mathematical
   Monthly* **132** (2025), 867--882.
3. G. Dresden and J. Siehler, [*Look, There's More to Say about Conway's
   Look-and-Say Sequence*](https://arxiv.org/abs/2405.11103), 2024.
4. J. Comes, [*Stuttering Look-and-Say Sequences and a Challenger to Conway's
   Cosmological Theorem*](https://arxiv.org/abs/2206.11991), 2022.
