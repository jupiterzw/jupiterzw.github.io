---
title: UCL MATH0109 Theorem Proving in Lean Notes
date: 2024-03-09 12:00
categories: [Posts, Mathematics]
tags: [Lean4]     # TAG names should always be lowercase
math: true
image: /assets/img/2024-03-09-math0109-theorem-proving-in-lean/lean.png
---

## 1. Introduction
## 2. Foundations
### 2.1 A_functions

* **`exact`**
    * if your goal is `⊢ A` and you have a term `x : A`, then exact `x` will close the goal

* **`sorry`**
    * this tactic closes the goal without a proof. It is used as a placeholder until we are ready to complete the proof

* **`apply`**
    * if we have a function `f : A → B` and our goal is `⊢ B`, then `apply f` reduces our goal to `⊢ A`

* **`intro`**
    * if our goal is a function type `⊢ A → B`, then `intro a` will introduce a term `a : A` into the local context and change our goal to `⊢ B`


### 2.2 B_or_and_imp

* **`left / right`**
  
    * if our goal is `⊢ P ∨ Q`, then `left` reduces this to `⊢ P` while right reduces this to `⊢ Q`

* **`cases`**
  
    * if we have  `h : P ∨ Q`, then `cases h` gives us two goals with `h : P` in the first local context and `h : Q` in the second

* **`constructor`**
  
    * if our goal is `⊢ P ∧ Q`,  this gives us two new goals of `⊢ P` and `⊢ Q`. Similarly, if our goal is `⊢ P ↔ Q`, then it gives two new goals `⊢ P → Q` and `⊢ Q → P`
    * * if our goal is `⊢ P ↔ Q`, then `constructor` will convert this into two goals: `⊢ P → Q` and `⊢ Q → P`

* **`obtain`** 
  
    * if we have  `h : P ∧ Q` in the local context, then `obtain ⟨hp, hq⟩ := h` replaces `h` by `hp : P` and `hq : Q` in the local context
    * we can use `obtain ⟨hpq, hqp⟩ := h` to convert `h : P ↔ A` into `hpq : P → Q` and `hqp : Q → P` in the local context
    * if we have `h : P ↔ Q` in the local context, then `h.1 : P → Q` and `h.2 : Q → P`
    


### 2.3 C_not_false

* **`contradiction`** 
  * prove any goal if you already have a contradiction in the local context
  
* **`by_cases P`** (or **`by_cases hp : P`**) 
  * replace the current goal by two separate goals, the first assuming P is true and the second assuming P is false
  
* **`exfalso`** 
  * replace the current goal by `False`
  
* **`triv`** 
  * prove the goal `True`

* **`contrapose`**
  * convert any goal `P → Q` into its contrapositive


### 2.4 D_quantifiers

**Universal `∀`**
* **`apply h`**  
  * close any goal of the form `P a`, given `h : ∀x, P x` in the local context


* **`specialize h a`**   
  * replace `h : ∀x, P x` by `h : P a` in the local context

* **`intro a`**  
  * if the goal is `∀x, P x`, then introduce a new variable `a` and change the goal to `P a`

**Existential `∃`**
* **`use a`**  
  * if the goal is `∃x, P x`, then change the goal to `P a` (If `P a` is already in the local context, then the goal is closed automatically)

* **`obtain ⟨a,ha⟩ := h`** 
  * if `h : ∃x, P x` is in the local context then create a new term `a` in the local context and a new hypothesis `ha : P a`
  * if our hypothesis in the local context is `h : ∃x, ∃y, ...`, then `obtain ⟨x, y, hxy⟩ := h` will give us `x` and `y`


**Negated quantifiers `¬`**

In Lean `¬P` is formally defined as `P → False` so it is an implication.

* **`push_neg`** 
  * move all `¬` symbols as far to the right as possible. In particular, replace `¬∀x, P x` by `∃x, ¬P x`, and similarly with `¬∃`
  * use it to simplify a hypothesis in the local context `h` with `push_neg at h`

* **`by_contra h`** 
  * add a hypothesis `h` stating that the current goal is false, and change the goal to `False`


### 2.5 E_equality_rfl_rw

* **`rfl`** 
  * if your goal is  `⊢ a = b` and `a` is **definitionally equal** to `b`, then `rfl` will close the goal
* **`rw`** 
  * if we have a hypothesis `h : a = b` in the local context, then `rw [h]` will replace every occurence of `a` by `b` in the goal
  * we can also do `rw [← h]` to replace `b` by `a` in the goal
  * if `h2` is another term in the local context then `rw [h] at h2` replaces `a` by `b` in `h2`
  * the `a` in `rwa` is short for `assumption`
  * we can group a sequence of rewrites together as follows `rw [h1, h2]`
  * if we have a hypothesis (or theorem) of the form `h : ∀ a b , ... = ...`, then we can use `rw [h i j]` to rewrite using this equality in the case `a = i` and `b = j` (we can also use `rw [h]` and Lean will choose `i` and `j` for us)

### 2.6 F_nat

* **`induction n`** 
  * if our goal is of the form  `⊢ P n` where `n` is an arbitrary natural number, then this allows us to do induction on `n`. We get two goals one for `0` and one for `succ n`, in the latter we also have an inductive hypothesis saying that the result holds for `n`
  ```lean
    theorem zero_add (n : N) : 0 + n = n :=
    by
        induction n with
        | zero =>
            rfl
        | succ n ih =>
            rw [add_succ, ih]
  ```

* **`cases n`** 
  * this allows us to prove a result `⊢ P n` by considering the two cases, `0` and `succ n` separately (but we no longer have the inductive hypothesis)
  ```lean
    theorem zero_pow (n : N) (h : n ≠ 0) : 0 ^ n = 0:=
    by
        cases n with
        | zero =>
            contradiction
        | succ n =>
            rw [pow_succ,zero_mul]
  ```

### 2.7 G_ext

* **`ext`** 
  * if our goal is to show that `⊢ f = g` where `f g : A → B`,  we can use `ext x` to introduce `x : A` into the local context and our goal becomes `⊢ f x = g x`
  * `ext` also allows to prove equalities between other types, such as complex numbers, matrices, etc.
  * sometimes `ext` does too much, for example if we want to prove that two complex matrices are equal,
  we can use `ext1` to apply one extensionality lemma at a time
* **Functions: fun => notation**
  * We have already seen how to define functions using tactics, however it
        will be useful to also know the function notation that Lean uses to display
        functions in the Infoview.
    ```lean
        -- tactic definition
        def double1 : ℕ → ℕ :=
        by
            intro n
            exact 2 * n

        -- fun => notation
        def double2 : ℕ → ℕ := fun n => 2 * n
    ```
* **Sets**
  * If `A : Type`, then we can form the type of subsets of A, called `Set A`.
    Two sets are equal iff they contain exactly the same elements.
    Applying the `ext` tactic allows us to prove set identities using the tactics introduced to prove basic results in logic.
  * If `x : A` and `s t : Set A` then `x ∈ s` is the Prop `x is a member of s`
    Proving set identities is just logic in disguise.

    `x ∈ s ∪ t` is `x ∈ s ∨ x ∈ t`

    `x ∈ s ∩ t` is `x ∈ s ∧ x ∈ t`

    `x ∉ s` is `¬ x ∈ s` which is `x ∈ s → False`

    `x ∈ sᶜ` is another way of writing `x ∉ s`

    `x ∈ s \ t` is `x ∈ s ∧ x ∉ t`

    `s ⊆ t` is `∀x, x ∈ s → x ∈ t`

    Note that `A` is not a term of type `Set A`. We use `univ` to refer to the `Set A` that is `all of A`. We also have the empty set `∅`.

    `x ∈ univ` is the Prop `True`

    `x ∈ ∅` is the Prop `False`

### 2.8 H_Mathlib

* **Mathlib**
  
    "Mathlib" is a huge database of mathematical theorems all written in lean.
It currently has well over 3000 files, each containing many theorems.
The first line of this file allows us to use any theorem in Mathlib. 

* **`exact? / apply?`**

  * Often, we are faced with proving a very simple goal, which is almost certainly
already in Mathlib. Typing `exact?` will search Mathlib and try to find the
theorem that we need.
  * `exact?` searchs Mathlib for a result that will close the goal.
  * `apply?` gives suggestions for a lemma to apply when `exact?` fails.

* **`le_of_lt`**

  * We can look up the theorem `le_of_lt` in the *API documentation* of
Mathlib to see exactly what it says.
We can also use the command `#check` to do this.
Also "ctrl-click" on `le_of_lt` will take us to the file
in Mathlib where this theorem is proved.
  * We can think of the theorem `le_of_lt` as a function, which takes a
long list of arguments and returns a proof of the statement `a < b`.
The arguments are listed before the `:`.
  * Note that some of the arguments are contained in `( )`, some in `{ }`
and some in `[ ]`. The arguments contained in `( )` are called
**explicit arguments**, and the others are called **implicit arguments**.
If we type `le_of_lt h`, then lean will assume that `h` is the explicit
argument. It is usually not necessary to provide the implicit arguments,
because lean can work out for itself what values they need to take.
In the case of `le_of_lt`, the only explicit argument is `h : a < b`.
If we give it a value of `h`, then it can deduce the what `a` and `b`
are, and also that `α = ℝ`, since this is the type of the variables
`a` and `b`.

## 3. Analysis
### 3.1 A_structured_tactics

* **`refine`** 
  
  * `refine` is like `exact` except that we can replace any explicit argument that we don't currently have in our local context by `?_` and Lean will add this as a new goal
  * if `exact my_lemma h` would close the current goal, then `refine my_lemma ?h` reduces our goal to `⊢ h`

* **`congr! `** 
  * apply congrence lemmas to try to reduce the goal to several smaller goals that may be easier to prove
  * Congruence lemmas: if `f = g` and `a = b` then `f a = g b`. We can prove this easily using `rw` but the tactic `congr!` will do it for us
  * sometimes `congr!` is too aggressive and results in goals that are false. We can control this using `congr! n` where `n = 1,2,..`

* **`convert`** 
  * if our goal is  `⊢ e`, then `convert d` tells Lean to try to use `d` and produce new subgoals to prove that `d = e`
  * `convert` is similar to `refine` but it works when the goal is not exactly the same as the term we use. It introduces new goals for us to prove that the given term is in fact correct. It uses the same strategies as `congr!` and can be controlled in a similar way using `convert h using n` where `n = 1, 2, ...`

* **`symm`** 
  * if our goal is `⊢ A ∼ B` where `∼` is a symmetric relation then symm changes the goal to `⊢ B ∼ A`
  * if `h : A ∼ B` is in the local context then `h.symm` is `B ∼ A`
  
* **`trans`** 
  * if our goal is `⊢ A ∼ B` where `∼` is a transitive relation, then `trans C` converts this into two goals `⊢ A ∼ C` and `⊢ C ∼ B`
  
### 3.2 B_higher_tactics

* **`ring`**  
  * prove identities in commutative rings (eg ℝ, ℤ, ℚ)
  
* **`norm_num`** 
  * close goals only involving numerical expressions
  
* **`decide`** 
  * close the goal by applying an algorithm for deciding if the goal is true or false
  
* **`linarith`** 
  * prove results involving linear (in)equalities and arithmetic
  * e.g. the goal can be solved by `linarith`
    ```lean
        abc: ℕ
        h: a + b + c = 3 * c
        ⊢ 2 * c = a + b
    ```
  
* **`nlinarith`** 
  * extension of linarith to some simple non-linear examples such as quadratics
  
### 3.3 C_have

* **`have h : P`**   
  * introduce a new goal `P`, and add the hypothesis `h : P` to the local context of the current goal
  
  ```lean
    import Mathlib.Tactic.Basic
    import Mathlib.Data.Real.Basic

    /-- xₙ → a if for any ε > 0 there is N ∈ ℕ such that for all n ≥ N we have |xₙ - a| < ε  -/
    def sLim (x : ℕ → ℝ) (a : ℝ) : Prop :=
    ∀ ε, 0 < ε → ∃ N, ∀ n, N ≤ n → |x n - a| < ε

    notation "limₙ " => sLim 

    /-- The sequence `1/(n+1) → 0` -/
    theorem one_over_nat : limₙ (fun n => (n + 1)⁻¹) 0 :=
    by
    intro ε hε
    dsimp
    have h : ∃ N : ℕ, N > ε⁻¹
    · exact exists_nat_gt ε⁻¹
    obtain ⟨N,hN⟩ := h 
    use N
    intro n hn
    rw [sub_zero]
    have h : |(n+1:ℝ)⁻¹| = (n+1:ℝ)⁻¹
    · rw [abs_eq_self]
        apply le_of_lt
        exact Nat.inv_pos_of_nat
    rw [h]
    have : n+1 > ε⁻¹
    · trans (N:ℝ)
        · norm_cast
        exact Nat.lt_succ.mpr hn
        · assumption
    exact inv_lt_of_inv_lt hε this
  ```

### 3.4 D_calc

* **`calc`**
  * A `calc`-block is a useful way of writing a proof which consists of
a series of rearrangements of a formula. This way of writing proofs is
very similar to the way that most mathematicians write proofs on paper,
so the resulting proofs are easy to read.
  * When dealing with inequalities in `calc`-blocks, the tactic `rel` is often useful. `rel` is similar to `rw`, but substitutes inequalities rather than equalities. 


### 3.5 E1_intro_to_finsets

* **Finsets**
  * Finite sets, such as $\{0, 1, 2,..., n\}$ have a special type in Lean,
they are called `Finsets`. If `s : Finset α` then `s` is a finite set of terms of type α. In many respects we can treat them like `Set α`.
    ```lean
    -- Most standard set notation is still valid
    #check n ∈ s
    #check s ⊆ t
    #check s ∩ t
    #check s ∪ t
    #check s \ t
    --#check sᶜ -- fails since the complement of a `Finset ℕ` is never finite
    -- In general there is no `univ : Finset α` (unless `α` is itself finite) similiarly there is no `sᶜ`.
    -- We  `open` the `Finset` namespace so that we can write `range` instead of `Finset.range` etc.
    open Finset
    #check s.Nonempty       -- ∃x , x ∈ s
    #check Disjoint s t     -- s ∩ t = ∅
    #check range n          -- {0,1,...,n - 1} as a Finset ℕ
    #check ({n} : Finset ℕ) -- {n} as a Finset ℕ
    #check insert n s       -- s ∪ {n}
    #check s.erase n        -- s \ {n}
    #check s.image f        -- {f x | x ∈ s}
    #check s.card           -- |s| the number of elements in s
    --  We can `filter` a set to obtain the subset with a given property.
    #check s.filter Even    -- { x | x ∈ s and x is even}
    #eval Ico a (b + 1)     -- {a,a+1,..,b} defaults to ∅ if b ≤ a
    ```
  * `mem_union`: `a ∈ s ∪ t ↔ a ∈ s ∨ a ∈ t`
  * `mem_Ico`: `x ∈ Ico a b ↔ a ≤ x ∧ x < b`
  * There are two different `maximum` functions defined for `s : Finset P` when `P` is any LinearOrder such as `ℕ` or `ℝ`
    
    ```lean
        #check Finset.max'
        -- this requires a proof that s is Nonempty and then returns a value in `P`
        #check Finset.max
        -- this returns a value in `WithBot P` which we can think of as `P` with an extra
        -- element that is < everything in `P`.
    ```
    requring a proof: `use s.max' h` where `h` is the proof that `s.Nonempty`

  * If `S : α → Finset β` and `I : Finset α` then `I.biUnion S` is the finite union of the Finsets indexed by `I`.
  
  * The cardinality of `s : Finset α` is `s.card`. 

* **Finite sums**
  * `∑ i in range n.succ, i`: `0 + 1 + 2 + ... + n`
  * `sum_range_succ`: `∑ x in range (n + 1), f x = ∑ x in range n, f x + f n`
  * `sum_range_one`: `∑ k in range 1, f k = f 0`
  * `card_eq_sum_ones`: `card s = ∑ x in s, 1`
  * `sum_range_add_sum_Ico`: `Finset.sum_range_add_sum_Ico.{v} {β : Type v} [inst✝ : AddCommMonoid β] (f : ℕ → β) {m n : ℕ} (h : m ≤ n) : ∑ k in range m, f k + ∑ k in Ico m n, f k = ∑ k in range n, f k`
  

### 3.6 E2_let

* **`let`**
  * `let I : Finset ℕ := range K.succ`
  
  * a new way of using `have`: `have hne : I.Nonempty := by exact nonempty_range_succ`
  
### 3.7 F_casts

* **divisibility**
  * `a ∣ b` (typed as `\|`) means that there is some `c` such that `b = a * c` (`use` is helpful here)
  
  * `Nat.div_mul_div_comm`: `Nat.div_mul_div_comm {m n k l : ℕ} (hmn : n ∣ m) (hkl : l ∣ k) : m / n * (k / l) = m * k / (n * l)`
  
  * `Nat.mul_div_mul`: `Nat.mul_div_mul {m : ℕ} (n k : ℕ) (H : 0 < m) : m * n / (m * k) = n / k`

* **`push_cast`**
  * change `↑(a + b)` to `↑a + ↑b`
  
* **`norm_cast`**
  * sometimes try `norm_cast at h` or `norm_cast at h ⊢`
  * If `d n : ℕ` and we have the hypothesis `h: d ∣ n` then norm_cast can prove that `((n / d : ℕ) : ℝ)` equals `(n : ℝ)/(d : ℝ)`, but without this hypothesis it simply isn't true.

* **`cancel_denoms`**
  * change `a = b / 2` to `2 * a = b`


## 4. Structures and classes

### 4.1 A_structures_and_classes

* **Structures**
  * In Lean, there are many `Type`s, for example `ℕ`, `ℤ`, `ℚ`, `ℝ`, `ℂ`,
  `ℕ → ℝ`, `Set ℕ`, ... etc.

    A common way of defining a new `Type` is using the command `structure`.

    Below, we define a new `Type` called `Plane` whose terms can be thought of as being
    points in the plane. They each have an `x`-coordinate and a `y`-coordinate, both
    of which are integers.

    ```lean
        @[ext]  -- automatically generates a lemma `Plane.ext`,
                -- which gives us a way of proving that two terms of type `Plane` are equal.
                -- The lemma is used by the `ext` tactic.   
        structure Plane where
        x : ℤ
        y : ℤ
        -- `x` and `y` are called "fields" of the structure `Plane`.

        /-
        We can define terms of type `Plane` in one of the following
        equivalent methods:
        -/
        def A : Plane where
            x := 1
            y := 3
        def B : Plane := ⟨-4,7⟩
        def origin : Plane := {x := 0, y:= 0}
    ```

* **Classes**
  * later

### 4.2 B_defining_a_class

* **Group**
  * Let's define the notion of a group in lean.
  Recall that a group is a set `G`, together with
    * a multiplication operation `G → G → G`,
    * a function `G → G` taking an element `x` to an element `x⁻¹`,
    * a certain element in `G` called `1`.
    Furthermore, `G` must satisfy the group axioms:
    * multiplication in `G` is associative,
    * `1` is a 2-sided identity element,
    * For every element `x`, the element `x⁻¹`
    is a 2-sided inverse of `x`.
        ```lean
            /-
            The following code tells lean what it means for `G` to be a group.
            Note that `Mul` and `Inv` and `One` are also classes, and
            you can see their definition by control-clicking on them.
            -/
            class MyGroup (G : Type) extends Mul G, Inv G, One G where
            ax_assoc    : ∀ x y z : G, (x * y) * z = x * (y * z)
            ax_mul_one  : ∀ x : G, x * 1 = x
            ax_one_mul  : ∀ x : G, 1 * x = x
            ax_mul_inv  : ∀ x : G, x * x⁻¹ = 1
            ax_inv_mul  : ∀ x : G, x⁻¹ * x = 1

            #check (MyGroup)
        ```

### 4.3 C_groups

* **Subgroup**
  
  In lean, `Subgroup G` is a `Type`, defined as a structure with fields
    * `carrier` - a subset of `G` (the elements of the subgroup);
    * `mul_mem'` - a proof that if `g` and `h` are in `carrier` then so is `g * h`;
    * `one_mem'` - a proof that `1` is in `carrier`;
    * `inv_mem'` - a proof that if `g ∈ carrier` then `g⁻¹ ∈ carrier`.
        ```lean
            open Set
            -- Show that `{1}` is a subgroup of `G`
            def Trivial_subgroup : Subgroup G where
            carrier := {1}
            mul_mem' := by
                intro a b ha hb
                rw [mem_singleton_iff] at *
                rw [ha, hb, one_mul]
            one_mem' := rfl
            inv_mem' := by
                intro a ha
                dsimp at ha ⊢
                rw [mem_singleton_iff] at *
                rw [ha, inv_one]
        ```

* **Homomorphism**

    If `G` and `H` are groups, then `G →* H` is the `Type` of group homomorphisms from `G` to `H`. This is a `structure` with fields:
    * `toFun` a function `G → H`;
    * `map_mul'` a proof that `toFun (g * g') = toFun g * toFun g'`;
    * `map_one'` a proof that `toFun 1 = 1`.
        ```lean
            /-
            Show that the function taking every element of `G` to `1 : H` is
            a homomorphism.
            -/
            def trivial_hom : G →* H where
            toFun := fun _ ↦ 1
            map_one' := rfl
            map_mul' := by
                intro x y
                dsimp
                exact self_eq_mul_left.mpr rfl
        ```
* **Isomorphism**
  
    If `G` and `H` are groups, then `G ≃+ H` is the `Type` of group isomorphisms from `G` to `H`. This is a `structure` with fields:
    * `toFun` a function `G → H`;
    * `invFun` the inverse function of the above function;
    * `left_inv` a proof that `invFun` is a left inverse of `toFun`;
    * `right_inv` a proof that `invFun` is a right inverse of `toFun`;
    * `map_mul'` a proof that `toFun (g * g') = toFun g * toFun g'`.
        ```lean
            /-
            Prove that if there is a surjective homomorphism `φ : G →+ ℤ` then
            `G` is isomorphic to `φ.ker × ℤ`.
            -/
            lemma equiv_prod_of_ontoInt [AddCommGroup G] (φ : G →+ ℤ) (hφ : Function.Surjective (φ : G → ℤ)) :
            φ.ker × ℤ ≃+ G :=
            by
            specialize hφ 1
            set g := hφ.choose with g_def
            have g_spec := hφ.choose_spec
            exact {
                toFun := fun ⟨x,n⟩ ↦ x + n • g
                invFun := fun x ↦ ⟨⟨x - φ x • g, by simp [AddMonoidHom.mem_ker, g_spec]⟩, φ x⟩
                left_inv := by
                intro ⟨⟨_,h⟩,_⟩
                rw [AddMonoidHom.mem_ker] at h
                dsimp
                ext <;>
                · simp [g_spec, h]
                right_inv := by intro; simp
                map_add' := by
                intros
                dsimp
                rw [←g_def, add_zsmul, add_assoc, add_assoc]
                congr 1
                rw [add_comm, add_assoc]
                congr 1
                apply add_comm
            }
        ```
    

### 4.4 D_simp

* **`simp`**
  * `simp` is a high level tactic, which repeatedly searches for ways to `rw` a goal in order to make it "simpler". It doesn't search through the whole of Mathlib, but only the `lemma`s and `theorem`s marked with the attribute `@[simp]` just before their statement. Such `lemma`s are always equations or iff statements, in which the RHS is in some sense simpler than the LHS.
  * To see exactly what `simp` does, typing this line after importing: `set_option trace.Meta.Tactic.simp.rewrite true`.
  * If we type `simp?` instead of `simp`, then lean will tell us which lemmas it has used, and offer to replace your `simp` by an equivalent `simp only ...`. This should always be done if `simp` does not completely close the goal.