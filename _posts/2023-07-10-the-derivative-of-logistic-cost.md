---
title: The Derivative of Logistic Cost
description: "A step-by-step derivation of the logistic regression cost function and its gradient."
date: 2023-07-10 08:00
categories: [Posts, Machine Learning]
tags: [Calculus, Machine Learning]
math: true
image: /assets/img/2023-07-10-the-derivative-of-logistic-cost/cover.png
---

## Introduction

In machine learning, cost functions play a crucial role in training and evaluating models. They quantify the discrepancy between predicted values and labels, guiding a model towards optimal parameters. In this post, we derive the gradient of the cost function used in logistic regression.

We begin with linear regression, a widely used technique for predicting continuous values. A standard cost function for linear regression is the mean squared error (MSE):

$$
    \operatorname{MSE} = \frac{1}{m} \sum_{i=1}^{m}\left(\hat{y}^{(i)} - y^{(i)}\right)^2.
$$

Here, $\hat{y}^{(i)}$ is the prediction for the $i$th training example, $y^{(i)}$ is its true response, and $m$ is the number of training examples. This cost is convex as a function of the parameters of a linear model, so gradient descent can be used to find a global minimum. For logistic regression, however, composing MSE with the sigmoid model generally produces a non-convex objective.

We therefore use the binary cross-entropy cost:

$$
J(\mathbf{w}, b) = \frac{1}{m} \sum^m_{i=1}[-y^{(i)} \log(f_{\mathbf{w}, b}(\mathbf{x}^{(i)})) - (1-y^{(i)}) \log(1 - f_{\mathbf{w}, b}(\mathbf{x}^{(i)}))],
$$

where

$$
f_{\mathbf{w}, b}(\mathbf{x}^{(i)})
= \frac{1}{1 + e^{-(\mathbf{w} \cdot \mathbf{x}^{(i)} + b)}}
$$

is the sigmoid prediction. To apply gradient descent, we compute the partial derivatives of this cost with respect to $\mathbf{w}$ and $b$.

## The derivative of the logistic cost
Let $w_j$ and $x_j^{(i)}$ denote the $j$th components of $\mathbf{w}$ and $\mathbf{x}^{(i)}$, respectively. Writing $f^{(i)}=f_{\mathbf{w},b}(\mathbf{x}^{(i)})$, the chain rule gives

$$
\begin{align*}
\frac{\partial f^{(i)}}{\partial w_j}
&= \frac{x_j^{(i)}e^{-(\mathbf{w} \cdot \mathbf{x}^{(i)} + b)}}
{\left(1 + e^{-(\mathbf{w} \cdot \mathbf{x}^{(i)} + b)}\right)^2}\\
&= x_j^{(i)}f^{(i)}\left(1-f^{(i)}\right),\\
\frac{\partial f^{(i)}}{\partial b}
&= f^{(i)}\left(1-f^{(i)}\right).
\end{align*}
$$

Consequently,

$$
\begin{align*}
\frac{\partial}{\partial w_j}\left(1-f^{(i)}\right)
&=-x_j^{(i)}f^{(i)}\left(1-f^{(i)}\right).
\end{align*}
$$

Combining these identities, we obtain

$$
\begin{align*}
\frac{\partial J}{\partial w_j}
&= -\frac{1}{m}\sum_{i=1}^m
\left[
y^{(i)}\left(1-f^{(i)}\right)x_j^{(i)}
-(1-y^{(i)})f^{(i)}x_j^{(i)}
\right]\\
&=\frac{1}{m}\sum_{i=1}^m
\left(f^{(i)}-y^{(i)}\right)x_j^{(i)}.
\end{align*}
$$

Similarly,

$$
\frac{\partial J}{\partial b}
=\frac{1}{m}\sum_{i=1}^m\left(f^{(i)}-y^{(i)}\right).
$$

## Gradient descent for logistic regression
Gradient descent updates the parameters simultaneously as follows:

$$
\begin{align*}
\textbf{repeat} \{\\
w_j &\leftarrow w_j-\alpha\frac{1}{m}\sum_{i=1}^m
\left(f^{(i)}-y^{(i)}\right)x_j^{(i)},\\
b &\leftarrow b-\alpha\frac{1}{m}\sum_{i=1}^m
\left(f^{(i)}-y^{(i)}\right),\\
\} &\textbf{simultaneous updates}
\end{align*}
$$
