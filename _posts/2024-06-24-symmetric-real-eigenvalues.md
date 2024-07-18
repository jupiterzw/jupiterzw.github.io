---
title: The Eigenvalues of a Real Symmetric Matrix Are Real
date: 2024-06-24 22:01
categories: [Posts, Mathematics]
tags: [linear algebra]     # TAG names should always be lowercase
math: true
image: false
published: true
---

<div class="defn" markdown="1">
<div class="title"> Definition (Eigenvalue, eigenvector) </div>
Let $A$ be an $n \times n$ matrix over $\mathbb{F}$. Then $\lambda \in \mathbb{F}$ is an *eigenvalue* of $A$ if there exists a non-zero vector $\mathbf{v} \in \mathbb{F}^n$ such that $A \mathbf{v}=\lambda \mathbf{v}$. Any such vector $\mathbf{v}$ is an *eigenvector* of $A$ associated with the eigenvalue $\lambda$.
</div>





<div class="thm" markdown="1">
<div class="title"> Proposition (Real symmetric matrices have real eigenvalues) </div>
Let $A$ be an $n \times n$ real symmetric matrix (i.e. entries of $A$ are real and $A^{\top} = A$). Then the eigenvalues $A$ are real (i.e. if $\lambda$ is an eigenvalue of $A$, then $\lambda=\overline{\lambda}$).
</div>

**Proof.** Note that the underlying assumption of this proposition is that the ground field is $\mathbb{C}$.

Suppose that $\lambda \in \mathbb{C}$ is an eigenvalue of $A$ and $\mathbf{v}$, with complex entries, is an eigenvector of $A$ associated with $\lambda$ so that $A\mathbf{v} = \lambda \mathbf{v}$. Note that the existence of $\lambda$ is ensured by the fundamental theorem of algebra and $\mathbf{v}$ is non-zero by the definition of eigenvectors.

Taking the complex conjugate of both sides and observing that $\overline{A}=A$ since $A$ has real entries, we have 

$$\overline{A \mathbf{v}}=\overline{\lambda \mathbf{v}} \Rightarrow A \overline{\mathbf{v}}=\overline{\lambda} \overline{\mathbf{v}}.$$

Note that here we used the fact that for two complex numbers $z_1$ and $z_2$, we have $\overline{z_1z_2} = \bar{z_1}\bar{z_2}$.
 
Since $A^{\top}=A$, we have[^1]

$$
\begin{aligned}
\overline{\mathbf{v}}^{\top} A \mathbf{v}&=\overline{\mathbf{v}}^{\top}(A \mathbf{v})=\overline{\mathbf{v}}^{\top}(\lambda \mathbf{v})=\lambda \langle\overline{\mathbf{v}}, \mathbf{v} \rangle, \\
\overline{\mathbf{v}}^{\top} A \mathbf{v}&=(A \overline{\mathbf{v}})^{\top} \mathbf{v}=(\overline{\lambda} \overline{\mathbf{v}})^{\top} \mathbf{v}=\overline{\lambda}\langle\overline{\mathbf{v}}, \mathbf{v} \rangle.
\end{aligned}
$$

Since $\mathbf{v} \neq \mathbf{0}$, we have $\langle\overline{\mathbf{v}}, \mathbf{v} \rangle \neq 0$ [^2]. Thus, $\lambda=\overline{\lambda}$ and hence $\lambda \in \mathbb{R}$.
<p style="text-align: right;"> ◼ </p>




[^1]: This is due to the fact that matrix multiplication is associative, $(\lambda, \mathbf{v})$ is an eigenpair of $A$, and the definition of Eulidean inner product on $\mathbb{C}^n$, where $n$ is the dimension of the matrix $A$.

[^2]: This is by the *non-degeneracy* (or *positive definiteness*) of an inner product.
