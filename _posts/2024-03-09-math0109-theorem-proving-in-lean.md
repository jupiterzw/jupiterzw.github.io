---
title: UCL MATH0109 Theorem Proving in Lean Notes
date: 2024-03-09 12:00
categories: [Posts, Mathematics]
tags: [lean4]     # TAG names should always be lowercase
math: true
image: /assets/img/2024-03-09-math0109-theorem-proving-in-lean/cover.png
---

## Introduction

This post is a compact reference based on the UCL MATH0109 theorem-proving notes. It is intended for students who are new to Lean and want to connect familiar mathematical reasoning with Lean 4 syntax and Mathlib.

The examples assume that you:

- know the basics of propositional logic, functions, sets, and elementary algebra;
- can open a Lean project in an editor and inspect the goal state;
- have Mathlib available through `import Mathlib`.

The material begins with propositions and core tactics, moves to proof organization and automation, then introduces finite sets, casts, structures, classes, homomorphisms, and isomorphisms. The examples in this revision were checked with Lean and Mathlib `v4.33.0-rc1`.

### Contents

- [Foundations](#foundations)
- [Organizing mathematical proofs](#organizing-mathematical-proofs)
- [Finite sets, finite sums, and casts](#finite-sets-finite-sums-and-casts)
- [Structures, classes, and algebraic maps](#structures-classes-and-algebraic-maps)

## Foundations

### Reading a Lean goal

A proposition is a term of type `Prop`. A proof of a proposition `P` is a term of type `P`. In a tactic proof, Lean displays:

- **variables**, such as `n : ℕ`;
- **hypotheses**, such as `h : n > 0`;
- a **goal**, such as `⊢ n + 1 > 0`.

A tactic changes the proof state while constructing an underlying proof term. A theorem or lemma that has already been proved can itself be used as a term in a later proof.

### Terms, functions, and basic tactics

#### `exact`

- **What it does:** `exact t` closes the current goal when `t` has the required type.
- **When to use it:** Use it when a hypothesis, theorem, or constructed term already proves the goal.
- **Example:**

  ```lean
  example {P : Prop} (h : P) : P := by
    exact h
  ```

- **Limitation:** The type of `t` must match the goal, up to definitional equality. If `t` proves an implication whose conclusion is the goal, use `apply` instead.

#### `apply`

- **What it does:** If `h : P → Q` and the goal is `Q`, then `apply h` changes the goal to `P`.
- **When to use it:** Use it to work backward from a theorem's conclusion to its premises.
- **Example:**

  ```lean
  example {P Q : Prop} (hPQ : P → Q) (hP : P) : Q := by
    apply hPQ
    exact hP
  ```

- **Limitation:** Applying a theorem with several premises can create several goals. Lean must also be able to infer the theorem's implicit arguments.

#### `refine`

- **What it does:** `refine` supplies part of a proof term and turns each placeholder `?_` into a new goal.
- **When to use it:** Use it when you know the overall proof constructor or theorem but want to fill in its arguments step by step.
- **Example:**

  ```lean
  example {P Q : Prop} (h : P → Q) (hp : P) : Q := by
    refine h ?_
    exact hp
  ```

- **Limitation:** Every placeholder must eventually be solved. A placeholder is not a persistent name for a mathematical fact.

#### `intro`

- **What it does:** For a goal `P → Q` or `∀ x, P x`, `intro` adds the input to the local context and leaves the corresponding conclusion as the new goal.
- **When to use it:** Use it to prove implications, universal statements, and function types.
- **Example:**

  ```lean
  example {P : Prop} : P → P := by
    intro h
    exact h
  ```

- **Limitation:** `intro` only applies when the goal reduces to a function or dependent function type.

#### `sorry`

- **What it does:** `sorry` asks Lean to accept a missing proof temporarily.
- **When to use it:** Use it only as a local placeholder while developing or teaching an unfinished proof.
- **Example:** A declaration containing `sorry` elaborates, but Lean reports a warning that the declaration uses `sorry`.
- **Limitation:** It does not prove the theorem. Published or trusted code should not contain `sorry`.

### Propositional logic

#### `left` and `right`

- **What they do:** For a goal `P ∨ Q`, `left` selects `P`, while `right` selects `Q`.
- **When to use them:** Use them when proving a disjunction and you know which side is true.
- **Example:**

  ```lean
  example {P Q : Prop} (h : P) : P ∨ Q := by
    left
    exact h
  ```

- **Limitation:** Choosing a side commits the proof to that disjunct; Lean will not switch sides automatically if the resulting goal is unprovable.

#### `constructor`

- **What it does:** It applies the constructor of the goal. For `P ∧ Q`, it creates goals `P` and `Q`; for `P ↔ Q`, it creates goals `P → Q` and `Q → P`.
- **When to use it:** Use it when the goal is built from a structure or inductive type with an appropriate constructor.
- **Example:**

  ```lean
  example {P Q : Prop} (hp : P) (hq : Q) : P ∧ Q := by
    constructor
    · exact hp
    · exact hq
  ```

- **Limitation:** Some types have several constructors or constructors with many fields. In those cases, an explicit term such as `⟨hp, hq⟩` may be clearer.

#### `cases`

- **What it does:** It eliminates an inductive value by considering its constructors. For `h : P ∨ Q`, it creates one case with a proof of `P` and one with a proof of `Q`.
- **When to use it:** Use it to reason by cases or unpack a value whose constructor matters.
- **Example:**

  ```lean
  example {P Q : Prop} (h : P ∨ Q) : Q ∨ P := by
    cases h with
    | inl hp => exact Or.inr hp
    | inr hq => exact Or.inl hq
  ```

- **Limitation:** `cases` does not provide an induction hypothesis. For recursive arguments, use `induction`.

#### `obtain`

- **What it does:** `obtain` destructures a hypothesis using a pattern.
- **When to use it:** Use it to unpack conjunctions, existential statements, subtypes, or other structured values.
- **Example:**

  ```lean
  example {P Q : Prop} (h : P ∧ Q) : Q ∧ P := by
    obtain ⟨hp, hq⟩ := h
    exact ⟨hq, hp⟩
  ```

- **Limitation:** The pattern must match the constructor shape of the hypothesis. For `h : P ↔ Q`, the projections `h.1 : P → Q` and `h.2 : Q → P` are often simpler.

### Negation, falsehood, and classical cases

Lean defines `¬ P` as `P → False`. A proof of `False` can be eliminated to prove any proposition.

#### `contradiction`

- **What it does:** It closes the goal when the local context already contains contradictory facts, such as `h : P` and `hn : ¬ P`.
- **When to use it:** Use it after the contradiction has become explicit in the context.
- **Example:**

  ```lean
  example {P Q : Prop} (h : P) (hn : ¬ P) : Q := by
    contradiction
  ```

- **Limitation:** It is not a general-purpose proof search tactic; it may not discover a contradiction that still requires mathematical reasoning.

#### `exfalso`

- **What it does:** It replaces the current proposition-valued goal with `False`.
- **When to use it:** Use it when a contradiction is easier to derive than the original goal.
- **Example:**

  ```lean
  example {P Q : Prop} (h : P) (hn : ¬ P) : Q := by
    exfalso
    exact hn h
  ```

- **Limitation:** This only helps if the assumptions really imply `False`.

#### `trivial`

- **What it does:** It proves the proposition `True`.
- **When to use it:** Use it when the current goal is definitionally `True`.
- **Example:**

  ```lean
  example : True := by
    trivial
  ```

- **Limitation:** The modern tactic name is `trivial`, not `triv`; it does not solve arbitrary easy-looking goals.

#### `by_cases`

- **What it does:** `by_cases hp : P` creates one goal under `hp : P` and another under `hp : ¬ P`.
- **When to use it:** Use it when a proof naturally splits according to whether a proposition holds.
- **Example:**

  ```lean
  example {P Q : Prop} (hp : P) : P ∨ Q := by
    by_cases hq : Q
    · exact Or.inr hq
    · exact Or.inl hp
  ```

- **Limitation:** Case splits can duplicate later work. For arbitrary propositions, the reasoning is classical.

#### `by_contra`

- **What it does:** `by_contra h` assumes the negation of the current goal and changes the goal to `False`.
- **When to use it:** Use it for proofs by contradiction.
- **Example:**

  ```lean
  example {P : Prop} : ¬¬P → P := by
    intro h
    by_contra hn
    exact h hn
  ```

- **Limitation:** Double-negation elimination is classical for arbitrary propositions.

#### `contrapose` and `contrapose!`

- **What they do:** They replace an implication with a contrapositive form. The `!` variant also pushes negations inward.
- **When to use them:** Use them when `¬ Q → ¬ P` is easier to prove than `P → Q`.
- **Example:**

  ```lean
  example {P Q : Prop} (h : ¬ Q → ¬ P) : P → Q := by
    contrapose!
    exact h
  ```

- **Limitation:** The transformed goal may be less readable, and the logical equivalence can require classical reasoning.

### Quantifiers

#### Universal quantifiers

To prove `∀ x, P x`, introduce an arbitrary `x`. To use `h : ∀ x, P x`, apply it to a specific argument.

```lean
example : ∀ n : ℕ, n = n := by
  intro n
  rfl

example (h : ∀ n : ℕ, n ≤ n) : 3 ≤ 3 := by
  exact h 3
```

#### `specialize`

- **What it does:** `specialize h a` replaces a universal hypothesis `h : ∀ x, P x` with the instance `h : P a`.
- **When to use it:** Use it when only one instance of a universal fact is needed.
- **Example:**

  ```lean
  example (h : ∀ n : ℕ, n ≤ n) : 3 ≤ 3 := by
    specialize h 3
    exact h
  ```

- **Limitation:** It overwrites the local form of `h`. Use `have ha := h a` if later steps still need the universal statement.

#### `use`

- **What it does:** For a goal `∃ x, P x`, `use a` supplies the witness `a` and leaves `P a` as the goal.
- **When to use it:** Use it when you can exhibit a concrete witness.
- **Example:**

  ```lean
  example : ∃ n : ℕ, n = 3 := by
    use 3
  ```

- **Limitation:** A witness alone is not enough; its required property must also be proved. Lean may close that property automatically only when it follows immediately.

Existential hypotheses can be unpacked with `obtain`:

```lean
example (h : ∃ n : ℕ, n > 10) : True := by
  obtain ⟨n, hn⟩ := h
  -- Here `n : ℕ` and `hn : n > 10`.
  trivial
```

Nested existentials can be unpacked with a larger pattern, such as `obtain ⟨x, y, hxy⟩ := h`.

#### `push Not`

- **What it does:** It pushes negations through logical connectives and quantifiers using the relevant equivalences.
- **When to use it:** Use it to turn a negated quantified statement into a more usable form, in a goal or at a hypothesis.
- **Example:**

  ```lean
  example (h : ¬ ∀ n : ℕ, n = 0) : ∃ n : ℕ, n ≠ 0 := by
    push Not at h
    exact h
  ```

- **Limitation:** Transformations such as `¬ ∀ x, P x` into `∃ x, ¬ P x` are classical. In current Mathlib, `push_neg` is deprecated in favor of `push Not`.

### Equality and rewriting

#### `rfl`

- **What it does:** It proves an equality whose two sides are definitionally equal.
- **When to use it:** Use it for direct computation, unfolding, or reflexive equalities.
- **Example:**

  ```lean
  example (n : ℕ) : (fun x => x) n = n := by
    rfl
  ```

- **Limitation:** Mathematically equal expressions need not be definitionally equal. For example, commutativity generally requires a theorem or automation rather than `rfl`.

#### `rw` and `rwa`

- **What they do:** `rw [h]` rewrites with an equality or equivalence. `rw [← h]` uses the reverse direction. `rwa` rewrites and then tries `assumption`.
- **When to use them:** Use them to replace equals by equals in the goal or in a hypothesis.
- **Example:**

  ```lean
  example {α : Type*} (a b c : α) (h : a = b) : (a, c) = (b, c) := by
    rw [h]
  ```

- **Limitation:** Rewriting follows syntactic occurrences after elaboration. Specify a location with `rw [h] at h₂`, and instantiate a quantified theorem explicitly, for example `rw [h i j]`, when inference is ambiguous.

#### `symm`

- **What it does:** It reverses a goal involving a symmetric relation; for equality it changes `a = b` to `b = a`.
- **When to use it:** Use it when a known fact has the required relation in the opposite direction.
- **Example:**

  ```lean
  example {α : Type*} (a b : α) (h : a = b) : b = a := by
    symm
    exact h
  ```

- **Limitation:** The relation must have a registered symmetry theorem. For a hypothesis `h : a = b`, the term `h.symm` is often shorter.

#### `trans`

- **What it does:** `trans b` splits a transitive relation from `a` to `c` into relations from `a` to `b` and from `b` to `c`.
- **When to use it:** Use it when an intermediate term makes the proof clearer.
- **Example:**

  ```lean
  example {α : Type*} (a b c : α) (hab : a = b) (hbc : b = c) : a = c := by
    trans b
    · exact hab
    · exact hbc
  ```

- **Limitation:** The relation must have a registered transitivity rule. For longer readable chains, prefer a `calc` block.

### Natural numbers: cases and induction

#### `induction`

- **What it does:** Induction on `n : ℕ` creates a base case for `0` and a successor case with an induction hypothesis.
- **When to use it:** Use it when the statement for `n + 1` depends on the statement for `n`.
- **Example:**

  ```lean
  example (n : ℕ) : 0 + n = n := by
    induction n with
    | zero => rfl
    | succ n ih =>
        rw [Nat.add_succ, ih]
  ```

- **Limitation:** Choosing the wrong induction variable or generalizing too little can produce an unusable induction hypothesis.

#### `cases` on a natural number

- **What it does:** It splits `n : ℕ` into the cases `0` and `Nat.succ n`, without an induction hypothesis.
- **When to use it:** Use it when only the zero/successor distinction matters.
- **Example:**

  ```lean
  example (n : ℕ) (h : n ≠ 0) : 0 ^ n = 0 := by
    cases n with
    | zero => contradiction
    | succ n => simp
  ```

- **Limitation:** Use `induction`, not `cases`, when the successor case needs a recursive hypothesis.

### Extensionality, functions, and sets

#### `ext` and `ext1`

- **What they do:** They apply extensionality lemmas. For functions, equality reduces to pointwise equality; for sets, it reduces to equality of membership propositions.
- **When to use them:** Use them to prove equality of functions, sets, structures, matrices, complex numbers, and other types with registered extensionality lemmas.
- **Example:**

  ```lean
  example {α β : Type*} (f g : α → β) (h : ∀ x, f x = g x) : f = g := by
    ext x
    exact h x
  ```

- **Limitation:** `ext` may apply several lemmas and create more goals than intended. Use `ext1` to apply one extensionality lemma at a time.

Functions can be written either as tactic proofs or lambda terms:

```lean
def double1 : ℕ → ℕ := by
  intro n
  exact 2 * n

def double2 : ℕ → ℕ := fun n => 2 * n
```

For a type `α`, `Set α` is the type of sets of elements of `α`. Internally, a set behaves like a predicate `α → Prop`. Consequently, set identities reduce to logic:

- `x ∈ s ∪ t` means `x ∈ s ∨ x ∈ t`;
- `x ∈ s ∩ t` means `x ∈ s ∧ x ∈ t`;
- `x ∉ s` means `¬ x ∈ s`;
- `x ∈ sᶜ` means `x ∉ s`;
- `x ∈ s \ t` means `x ∈ s ∧ x ∉ t`;
- `s ⊆ t` means `∀ x, x ∈ s → x ∈ t`;
- `x ∈ Set.univ` simplifies to `True`;
- `x ∈ (∅ : Set α)` simplifies to `False`.

For example:

```lean
example {α : Type*} (s t : Set α) (h : s ⊆ t) : s ∩ t = s := by
  ext x
  constructor
  · intro hx
    exact hx.1
  · intro hx
    exact ⟨hx, h hx⟩
```

### Finding and inspecting Mathlib results

Mathlib is a large, community-maintained library of Lean definitions and theorems. `import Mathlib` makes its umbrella import available; focused project files often use narrower imports to reduce dependencies.

#### `exact?`

- **What it does:** It searches the local context and imported library for a term that closes the current goal, then reports a reproducible suggestion.
- **When to use it:** Use it when the goal is likely an existing theorem or an immediate consequence of one.
- **Example:** For `h : a < b` and goal `a ≤ b`, `exact?` can suggest `exact le_of_lt h`.
- **Limitation:** Search depends on imported declarations and can be slower or less predictable than naming the intended theorem directly.

#### `apply?`

- **What it does:** It searches for a theorem whose conclusion can be applied to the current goal.
- **When to use it:** Use it when `exact?` cannot close the goal but a library theorem may reduce it to useful subgoals.
- **Example:** Run `apply?` at the goal and inspect the proposed `apply ...` replacement.
- **Limitation:** A successful application may leave premises that are no easier than the original goal. Treat suggestions as code to understand, not as opaque magic.

The `#check` command displays a term's type:

```lean
#check le_of_lt
```

Its relevant type is:

```lean
-- le_of_lt {α : Type*} [Preorder α] {a b : α}
--   (hab : a < b) : a ≤ b
```

Thus `le_of_lt` takes a proof of `a < b` and returns a proof of `a ≤ b`. Parenthesized arguments are explicit, braces mark implicit arguments inferred from context, and square brackets mark type-class arguments. Editor navigation to the declaration is useful when the displayed type alone is not enough.

## Organizing mathematical proofs

### Local facts and readable calculations

#### `have`

- **What it does:** `have h : P := ...` proves a local fact `P` and adds it to the context as `h`.
- **When to use it:** Use it to name an intermediate result, document the argument, or give Lean a type annotation that improves inference.
- **Example:**

  ```lean
  example (a b c : ℝ) (hab : a ≤ b) (hbc : b ≤ c) : a ≤ c := by
    have hac : a ≤ c := le_trans hab hbc
    exact hac
  ```

- **Limitation:** Too many one-use local facts can obscure a short proof. Prefer names that express mathematical meaning.

#### `calc`

- **What it does:** A `calc` block chains equalities or other compatible relations through intermediate expressions.
- **When to use it:** Use it when the paper proof is naturally a sequence of equations or inequalities.
- **Example:**

  ```lean
  example (a b c : ℝ) (hab : a ≤ b) (hbc : b < c) : a < c := by
    calc
      a ≤ b := hab
      _ < c := hbc
  ```

- **Limitation:** Each line needs a proof, and consecutive relations must have a known transitivity rule.

#### `gcongr`

- **What it does:** It applies generalized congruence and monotonicity lemmas, reducing a relation between compound expressions to relations between their parts.
- **When to use it:** Use it for monotone operations in equality or inequality goals.
- **Example:**

  ```lean
  example (a b : ℝ) (h : a ≤ b) : a + 2 ≤ b + 2 := by
    gcongr
  ```

- **Limitation:** Side conditions such as positivity may remain as goals, and the required monotonicity lemma must be registered.

#### `rel`

- **What it does:** `rel [h₁, h₂]` uses supplied relational hypotheses with generalized congruence rules.
- **When to use it:** Use it when particular inequalities should be substituted into corresponding monotone positions.
- **Example:**

  ```lean
  example (a b x c d : ℝ) (h₁ : a ≤ b) (h₂ : c ≤ d) :
      x ^ 2 * a + c ≤ x ^ 2 * b + d := by
    rel [h₁, h₂]
  ```

- **Limitation:** `rel` does not rewrite inequalities as if they were equalities. It succeeds only when registered generalized-congruence rules justify the requested relation and all side conditions can be discharged.

### Congruence and conversion

#### `congr!`

- **What it does:** It applies congruence lemmas recursively to reduce equality or relation goals to smaller component goals.
- **When to use it:** Use it when two compound expressions differ only in corresponding arguments.
- **Example:**

  ```lean
  example {α : Type*} (a b : α) (h : a = b) : (a, a) = (b, b) := by
    congr! 1
  ```

- **Limitation:** It can decompose too aggressively. A depth such as `congr! 1` limits how far it descends.

#### `convert`

- **What it does:** It uses a term whose type is close to the goal and creates equality subgoals for mismatching parts.
- **When to use it:** Use it when a theorem has the right mathematical content but its expression differs slightly from the target.
- **Example:**

  ```lean
  example (n : ℕ) (h : n = 2) : n + 1 = 3 := by
    convert congrArg (fun k : ℕ => k + 1) h using 1
  ```

- **Limitation:** The generated equalities can be harder than the original goal. The optional `using n` controls the transparency depth used during comparison.

### Arithmetic automation

#### `ring`

- **What it does:** It proves polynomial identities by normalization.
- **When to use it:** Use it for identities in commutative semirings and rings, including `ℕ`, `ℤ`, `ℚ`, and `ℝ` where applicable.
- **Example:**

  ```lean
  example (x y : ℤ) : (x + y) ^ 2 = x ^ 2 + 2 * x * y + y ^ 2 := by
    ring
  ```

- **Limitation:** It does not prove arbitrary inequalities or handle non-polynomial functions directly.

#### `norm_num`

- **What it does:** It normalizes concrete numerical expressions and proves many resulting arithmetic facts.
- **When to use it:** Use it when the essential work is computation with explicit numerals.
- **Example:**

  ```lean
  example : (21 : ℚ) / 3 + 2 = 9 := by
    norm_num
  ```

- **Limitation:** It is not intended to solve symbolic algebra by itself; combine it with tactics such as `ring` or `linarith` when variables matter.

#### `decide`

- **What it does:** It proves a decidable proposition by evaluating its `Decidable` instance.
- **When to use it:** Use it for small closed propositions whose truth is computationally decidable.
- **Example:**

  ```lean
  example : (17 : ℕ) < 23 := by
    decide
  ```

- **Limitation:** The proposition must have a `Decidable` instance, and large computations may be expensive.

#### `linarith`

- **What it does:** It searches for contradictions or consequences of linear equalities and inequalities.
- **When to use it:** Use it for linear arithmetic over ordered rings and fields.
- **Example:**

  ```lean
  example (a b c : ℤ) (h : a + b + c = 3 * c) : 2 * c = a + b := by
    linarith
  ```

- **Limitation:** Products of variables, powers, and non-linear functions are outside its linear fragment. Arithmetic over `ℕ` can also require care because natural subtraction is truncated.

#### `nlinarith`

- **What it does:** It extends `linarith` with polynomial preprocessing for many non-linear arithmetic goals.
- **When to use it:** Use it for modest polynomial problems, especially those involving squares and sign conditions.
- **Example:**

  ```lean
  example (x : ℝ) (h : x ^ 2 ≤ 0) : x = 0 := by
    nlinarith [sq_nonneg x]
  ```

- **Limitation:** It is incomplete and is not a solver for arbitrary transcendental, rational, or high-degree problems.

### Simplification

#### `simp`

- **What it does:** It repeatedly rewrites using simplification lemmas, local hypotheses, and selected definitions.
- **When to use it:** Use it to remove routine logical, algebraic, and structural clutter.
- **Example:**

  ```lean
  example (n : ℕ) : n + 0 = n := by
    simp
  ```

- **Limitation:** `simp` does not search all of Mathlib. Its main rewrite set comes from declarations tagged `@[simp]`, and adding unsuitable rewrite rules can make proofs slow or unstable.

To inspect simplifier rewrites locally, use:

```lean
set_option trace.Meta.Tactic.simp.rewrite true in
example (n : ℕ) : n + 0 = n := by
  simp
```

#### `simp?`

- **What it does:** It runs simplification and suggests a more explicit replacement, often using `simp only [...]`.
- **When to use it:** Use it to discover which simplification lemmas matter or to make a proof's dependencies more explicit.
- **Example:** Replace a trial `simp` with `simp?` and inspect the editor suggestion.
- **Limitation:** A long `simp only` list is not automatically more readable or more robust. Keep the version that best communicates the proof.

### Example: proving a sequence limit

The following course-style definition says that a real sequence `x` converges to `a` when, for every positive `ε`, all terms after some index lie within `ε` of `a`.

```lean
def sLim (x : ℕ → ℝ) (a : ℝ) : Prop :=
  ∀ ε, 0 < ε → ∃ N, ∀ n, N ≤ n → |x n - a| < ε

notation "limₙ " => sLim
```

Here is a direct proof that \(1/(n+1)\) converges to \(0\). It illustrates `have`, `obtain`, `refine`, casts, and a `calc` block.

```lean
theorem one_over_nat :
    limₙ (fun n => (((n + 1 : ℕ) : ℝ)⁻¹)) 0 := by
  intro ε hε
  obtain ⟨N, hN⟩ := exists_nat_gt (1 / ε)
  refine ⟨N, ?_⟩
  intro n hn
  rw [sub_zero, abs_of_pos (by positivity)]
  have hNn : (1 / ε : ℝ) < ((n + 1 : ℕ) : ℝ) := by
    calc
      (1 / ε : ℝ) < (N : ℝ) := hN
      _ ≤ (n : ℝ) := by exact_mod_cast hn
      _ < ((n + 1 : ℕ) : ℝ) := by
        exact_mod_cast Nat.lt_succ_self n
  have hprod : 1 < ((n + 1 : ℕ) : ℝ) * ε :=
    (div_lt_iff₀ hε).mp hNn
  rw [inv_lt_iff_one_lt_mul₀
    (by positivity : (0 : ℝ) < (n + 1 : ℕ))]
  simpa [mul_comm] using hprod
```

This is an elementary epsilon proof, not Mathlib's general topological definition of sequence convergence.

## Finite sets, finite sums, and casts

### Sets and finsets

`Set α` represents an arbitrary set as a predicate. `Finset α` is a data structure representing a finite collection without duplicates. Some `Finset` operations require a `DecidableEq α` instance so that Lean can compute whether two elements are equal.

```lean
section

open Finset

variable {α β : Type*} [DecidableEq α] [DecidableEq β]
variable (s t : Finset α) (f : α → β)

#check (show Finset α from s ∩ t)
#check (show Finset α from s ∪ t)
#check (show Finset α from s \ t)
#check s.Nonempty
#check Disjoint s t
#check s.image f
#check s.card

end
```

As with sets, `n ∈ s` is a proposition and `s ⊆ t` means every member of `s` is a member of `t`. The usual finite intersection, union, and difference operations are available.

`Finset.univ` and finset complement require the ambient type itself to be finite:

```lean
section

variable {α : Type*} [Fintype α] [DecidableEq α]
variable (s : Finset α)

#check (Finset.univ : Finset α)
#check sᶜ

end
```

For an infinite ambient type such as `ℕ`, there is no finset containing every value, even though individual finite ranges are available.

### Ranges, intervals, filtering, and images

- `Finset.range n` is `{0, 1, ..., n - 1}`.
- `Finset.Ico a b` contains values `x` satisfying `a ≤ x ∧ x < b`.
- `{n}` is singleton notation when Lean can infer a `Finset` type.
- `insert n s` inserts `n`; `s.erase n` removes it.
- `s.image f` is the finset of values `f x` for `x ∈ s`.
- `s.filter p` keeps the elements satisfying the decidable predicate `p`.
- `s.card` is the number of elements in `s`.
- `s.Nonempty` means `∃ x, x ∈ s`.
- `Disjoint s t` means that `s` and `t` have no common member.

```lean
open Finset

example : Finset.Ico 2 6 = {2, 3, 4, 5} := by
  decide

#check Finset.mem_union
#check Finset.mem_Ico
#check (Finset.range 10).filter (fun n => n % 2 = 0)
```

In particular, `Finset.Ico a b` is empty when `b ≤ a`. To represent `{a, a + 1, ..., b}`, use `Finset.Ico a (b + 1)`.

If `I : Finset α` and `S : α → Finset β`, then `I.biUnion S` is the finite union of the finsets indexed by `I`. This operation requires decidable equality on `β`.

### Maximum elements

For a `Finset α` with `[LinearOrder α]`, the two common maximum operations have different result types:

```lean
#check Finset.max'
#check Finset.max
```

- `s.max' h` takes `h : s.Nonempty` and returns an element of `α`.
- `s.max` returns a value of `WithBot α`; the extra bottom value represents the empty finset case.

Use `max'` when a nonemptiness proof is already available and the result should remain in `α`.

### Finite sums

With `open Finset`, the expression `∑ i in Finset.range n.succ, i` denotes
\(0 + 1 + \cdots + n\). Useful library facts include:

```lean
#check Finset.sum_range_succ
#check Finset.sum_range_one
#check Finset.card_eq_sum_ones
#check Finset.sum_range_add_sum_Ico
```

Their mathematical content is:

- `sum_range_succ`: split the last term from a sum over `range (n + 1)`;
- `sum_range_one`: a sum over `range 1` equals the term at `0`;
- `card_eq_sum_ones`: the cardinality of a finset is the sum of `1` over it;
- `sum_range_add_sum_Ico`: when `m ≤ n`, a sum over `range m` plus a sum over `Ico m n` equals the sum over `range n`.

### Local definitions with `let`

#### `let`

- **What it does:** `let I := t` gives the term `t` a local name.
- **When to use it:** Use it to shorten a repeated expression or expose the mathematical object used in the next part of a proof.
- **Example:**

  ```lean
  example (K : ℕ) : ∃ I : Finset ℕ, I.Nonempty := by
    let I : Finset ℕ := Finset.range K.succ
    have hne : I.Nonempty := by
      exact Finset.nonempty_range_iff.mpr (Nat.succ_ne_zero K)
    exact ⟨I, hne⟩
  ```

- **Limitation:** A `let` definition is local and definitionally reducible, but simplification may still need `dsimp [I]` or `simp [I]`.

### Divisibility and natural-number division

For natural numbers, `a ∣ b` means that there exists `c` such that `b = a * c`:

```lean
example {a b : ℕ} (h : a ∣ b) : ∃ c, b = a * c := h
```

Current names for two useful division results are:

```lean
#check Nat.div_mul_div_comm
#check Nat.mul_div_mul_left
```

The first combines two exact quotients, assuming the corresponding divisibility
hypotheses. The second states, for `0 < m`, that
`m * n / (m * k) = n / k`.

The older name `Nat.mul_div_mul` is not present in the checked toolchain; use `Nat.mul_div_mul_left` or `Nat.mul_div_mul_right` according to the common factor's position.

### Moving between number systems

#### `push_cast`

- **What it does:** It pushes coercions through supported operations, for example changing `↑(a + b)` into `↑a + ↑b`.
- **When to use it:** Use it when a goal mixes arithmetic in a source type such as `ℕ` with arithmetic in a target type such as `ℤ` or `ℝ`.
- **Example:**

  ```lean
  example (a b : ℕ) :
      (((a + b : ℕ) : ℤ)) = (a : ℤ) + (b : ℤ) := by
    push_cast
    rfl
  ```

- **Limitation:** It only uses known cast lemmas and may normalize the goal without closing it.

#### `norm_cast`

- **What it does:** It normalizes casts and can move suitable equalities or inequalities between numeric types.
- **When to use it:** Use it at a goal or hypothesis whose main difficulty is coercion syntax.
- **Example:**

  ```lean
  example {m n : ℕ} (h : (m : ℤ) ≤ (n : ℤ)) : m ≤ n := by
    exact_mod_cast h
  ```

  With exact divisibility, it can also justify a natural-number quotient cast:

  ```lean
  example (d n : ℕ) (h : d ∣ n) :
      (((n / d : ℕ) : ℝ)) = (n : ℝ) / (d : ℝ) := by
    norm_cast
  ```

- **Limitation:** Cast normalization does not make incompatible division operations equivalent. The divisibility hypothesis above is essential.

#### `cancel_denoms`

- **What it does:** It removes explicit numeral denominators from field-valued equalities and inequalities.
- **When to use it:** Use it to clear fixed rational denominators before arithmetic reasoning.
- **Example:**

  ```lean
  example (a b : ℚ) (h : a = b / 2) : 2 * a = b := by
    cancel_denoms at h
    linarith
  ```

- **Limitation:** It is designed for numeral denominators. General symbolic denominators require nonzero side conditions and usually different tools.

## Structures, classes, and algebraic maps

### Defining structures

A structure packages named fields into a new type. Here a point in an integer plane has two coordinates:

```lean
@[ext]
structure Plane where
  x : ℤ
  y : ℤ

def pointA : Plane where
  x := 1
  y := 3

def pointB : Plane := ⟨-4, 7⟩

def origin : Plane := { x := 0, y := 0 }
```

The `@[ext]` attribute generates an extensionality theorem used by the `ext` tactic. `Plane.x` and `Plane.y` are fields, and the three definitions illustrate record and constructor notation.

### Defining a class

A class is a structure intended for type-class inference. The following pedagogical definition packages group operations and axioms:

```lean
class MyGroup (G : Type*) extends Mul G, Inv G, One G where
  ax_assoc : ∀ x y z : G, (x * y) * z = x * (y * z)
  ax_mul_one : ∀ x : G, x * 1 = x
  ax_one_mul : ∀ x : G, 1 * x = x
  ax_mul_inv : ∀ x : G, x * x⁻¹ = 1
  ax_inv_mul : ∀ x : G, x⁻¹ * x = 1
```

Mathlib already provides the standard `Group` class and its extensive API; `MyGroup` is only an instructional example.

> **TODO:** The original notes do not yet develop instances or type-class inference. Add that material only when it is covered in the course.

### Subgroups

For `[Group G]`, `Subgroup G` is a structure containing:

- `carrier : Set G`;
- `one_mem'`, proving that `1` belongs to the carrier;
- `mul_mem'`, proving closure under multiplication;
- `inv_mem'`, proving closure under inverses.

The singleton `{1}` forms the trivial subgroup:

```lean
section

variable (G : Type*) [Group G]

def trivialSubgroup : Subgroup G where
  carrier := {1}
  one_mem' := by simp
  mul_mem' := by
    intro a b ha hb
    simp only [Set.mem_singleton_iff] at ha hb ⊢
    simp [ha, hb]
  inv_mem' := by
    intro a ha
    simp only [Set.mem_singleton_iff] at ha ⊢
    simp [ha]

end
```

The library notation `⊥ : Subgroup G` denotes the same subgroup.

### Homomorphisms

A bundled multiplicative homomorphism from `G` to `H` has type `G →* H`. It contains a function together with proofs that it preserves `1` and multiplication. For groups, preservation of inverses follows from these fields.

```lean
section

variable (G H : Type*) [Group G] [Group H]

def trivialHom : G →* H where
  toFun := fun _ => 1
  map_one' := rfl
  map_mul' := by simp

end
```

For additive structures, the corresponding notation is `A →+ B`.

### Equivalences and isomorphisms

Keep the following bundled types distinct:

- `α ≃ β` is an equivalence of types;
- `G ≃* H` is a multiplicative equivalence, suitable for group isomorphisms written multiplicatively;
- `A ≃+ B` is an additive equivalence.

Thus the notation `G ≃+ H` is not the general notation for a multiplicative group isomorphism.

The following advanced example preserves the original note's result. If `G` is an additive commutative group and `φ : G →+ ℤ` is surjective, choosing an element sent to `1` gives an additive equivalence `φ.ker × ℤ ≃+ G`.

Because the result is an equivalence value rather than a proposition, it is defined with `noncomputable def`, not `lemma`:

```lean
noncomputable def equivProdOfOntoInt {G : Type*} [AddCommGroup G]
    (φ : G →+ ℤ) (hφ : Function.Surjective (φ : G → ℤ)) :
    φ.ker × ℤ ≃+ G := by
  let g := Classical.choose (hφ 1)
  have hg : φ g = 1 := Classical.choose_spec (hφ 1)
  exact
    { toFun := fun ⟨x, n⟩ => (x : G) + n • g
      invFun := fun x =>
        ⟨⟨x - φ x • g, by
          rw [AddMonoidHom.mem_ker]
          simp [hg]⟩, φ x⟩
      left_inv := by
        intro ⟨⟨x, hx⟩, n⟩
        rw [AddMonoidHom.mem_ker] at hx
        ext <;> simp [hg, hx]
      right_inv := by
        intro x
        simp
      map_add' := by
        intro x y
        simp only [AddSubgroup.coe_add, add_zsmul]
        abel }
```

This construction is noncomputable because it uses classical choice to select `g` from the surjectivity proof.
