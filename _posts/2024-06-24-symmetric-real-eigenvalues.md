---
title: The Eigenvalues of a Real Symmetric Matrix Are Real
description: "A concise proof that every eigenvalue of a real symmetric matrix is real."
date: 2024-06-24 22:01
categories: [Posts, Mathematics]
tags: [Linear Algebra]
math: true
image: /assets/img/2024-06-24-symmetric-real-eigenvalues/cover.png
published: true
---

<div class="defn" markdown="1">
<div class="title"> Definition (Eigenvalue, eigenvector) </div>
Let $A$ be an $n \times n$ matrix over $\mathbb{F}$. Then $\lambda \in \mathbb{F}$ is an *eigenvalue* of $A$ if there exists a non-zero vector $\mathbf{v} \in \mathbb{F}^n$ such that $A \mathbf{v}=\lambda \mathbf{v}$. Any such vector $\mathbf{v}$ is an *eigenvector* of $A$ associated with the eigenvalue $\lambda$.
</div>





<div class="thm" markdown="1">
<div class="title"> Proposition (Real symmetric matrices have real eigenvalues) </div>
Let $A$ be an $n \times n$ real symmetric matrix; that is, the entries of $A$ are real and $A^{\top}=A$. Then every eigenvalue of $A$, considered over $\mathbb{C}$, is real.
</div>

**Proof.** Regard $A$ as a matrix over $\mathbb{C}$. Let $\lambda\in\mathbb{C}$ be an eigenvalue of $A$ with eigenvector $\mathbf{v}\in\mathbb{C}^n\setminus\{\mathbf{0}\}$, so that $A\mathbf{v}=\lambda\mathbf{v}$.

Taking the complex conjugate of both sides and observing that $\overline{A}=A$ since $A$ has real entries, we have 

$$\overline{A \mathbf{v}}=\overline{\lambda \mathbf{v}} \Rightarrow A \overline{\mathbf{v}}=\overline{\lambda} \overline{\mathbf{v}}.$$

Since $A^{\top}=A$, we have

$$
\begin{aligned}
\overline{\mathbf{v}}^{\top}A\mathbf{v}
&=\overline{\mathbf{v}}^{\top}(\lambda\mathbf{v})
=\lambda\,\overline{\mathbf{v}}^{\top}\mathbf{v},\\
\overline{\mathbf{v}}^{\top}A\mathbf{v}
&=(A\overline{\mathbf{v}})^{\top}\mathbf{v}
=(\overline{\lambda}\,\overline{\mathbf{v}})^{\top}\mathbf{v}
=\overline{\lambda}\,\overline{\mathbf{v}}^{\top}\mathbf{v}.
\end{aligned}
$$

Because $\mathbf{v}\neq\mathbf{0}$,

$$
\overline{\mathbf{v}}^{\top}\mathbf{v}
=\sum_{j=1}^n|v_j|^2>0.
$$

Therefore $\lambda=\overline{\lambda}$, so $\lambda\in\mathbb{R}$.
<p style="text-align: right;"> ◼ </p>
