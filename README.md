# Linear Regression Research Paper Showcase
### Replicating Machine Learning Theory from First Principles

An interactive web sandbox and educational Jupyter Notebook project replicating key findings from two classic research papers using linear regression from first principles. Inspired by Andrew Ng's Machine Learning Specialization (Week 1).

---

## 🚀 Key Project Components

1. **Jupyter Notebook (`notebook/linear_regression_showcase.ipynb`)**
   - Implements a from-scratch vectorized optimization engine with standard mathematical representations (MSE Loss, parameter derivatives).
   - Replicates univariate and multivariate structures on the **Medical Insurance Cost dataset** (1,338 records), investigating convergence rates, learning rate boundary behaviors, Z-score scaling speeds, and multi-variable accuracy shifts.
   - Replicates **Harrison & Rubinfeld (1978) Boston Housing** hedonic pricing structures to trace the elasticity of willingness-to-pay for clean air against Nitric Oxides ($NO_x$) levels.
2. **Interactive Web Showcase (`web/`)**
   - Single-page dark dashboard containing visual analytics and models comparison.
   - Includes a **Gradient Descent Sandbox Playground** powered by pure HTML5 Canvas. Plot custom coordinates, select optimization modes (Batch GD, Stochastic GD, Mini-Batch GD), control sliders, and watch parameters trace their trajectories down the nested MSE loss valley.
   - Visualizes standardized coefficients to rank feature impact on housing values.
   - Focuses heavily on design with elegant glassmorphism, glowing micro-animations, and smooth responsive grids.

---

## 📊 Summary of Sourced Findings vs. Our Reproductions

| Study / Regression Model | R² Score (Reproduced) | Key Statistical Takeaway |
| :--- | :---: | :--- |
| **Insurance (Age Only)** | `0.0894` | Flat age increment yielding ~$257/year increase. |
| **Insurance (BMI Only)** | `0.0393` | Positive drift, but extremely poor individual predictor. |
| **Insurance (Age + BMI + Smoker)** | `0.7475` | Massive accuracy jump proving high-leverage qualitative features partition populations. |
| **Boston Housing (NOx Only)** | `0.1826` | Significant negative price elasticity in heavily polluted tracts. |
| **Boston Housing (Full Model)** | `0.7406` | NOx concentration and proximity indices dictate pricing values. |

---

## 🛠️ Step-by-Step Installation & Run Guide

### Prerequisites
Ensure you have Python 3.8+ installed on your system.

### 1. Run the Jupyter Notebook
Clone the repository and install the standard scientific dependencies:
```bash
pip install numpy pandas matplotlib seaborn scikit-learn
```
Launch Jupyter Lab/Notebook:
```bash
jupyter notebook notebook/linear_regression_showcase.ipynb
```

### 2. View the Web Showcase Locally
Simply open `web/index.html` in any web browser! You do not need active servers or web builders.
Alternatively, launch a simple local development host inside the project root:
```bash
npx live-server web
```

---

## ⚠️ Ethical Reflection: The Demise of the Boston 'B' Variable
To faithfully reproduce Harrison & Rubinfeld's 1978 hedonic model, our multivariate code uses the original dataset variables. However, we include a prominent **Ethical & Socioeconomic Variable Disclaimer** inside both the notebook and the web portal discussing feature `B` ($1000 \cdot (B_k - 0.63)^2$, tracking demographic proportions). We discuss why modern data engineering practices explicitly reject demographic proxy metrics that mathematically codify historical racial redlining biases.

---

## 💼 Ready-to-Post LinkedIn Template
Copy and paste this high-engagement structure onto your LinkedIn to showcase your technical implementation:

```text
🔥 Can we understand modern Deep Neural Networks from first principles? Yes, by starting with the fundamental math of Linear Regression.

I have just completed a from-scratch reproduction of two classic machine learning papers/studies using vectorized linear algebra (Andrew Ng's ML Specialization Week 1 framework):

1️⃣ Medical Insurance Cost Prediction (Lantz Dataset)
2️⃣ Harrison & Rubinfeld (1978) - Hedonic Housing and Demand for Clean Air (Boston Dataset)

I bypassed sklearn and built the mathematical optimization engine in raw NumPy to validate convergence behaviors:
👉 Vectorized Cost Function (MSE Paraboloid)
👉 Batch, Stochastic, and Mini-Batch Gradient Descent
👉 Z-Score Scaling & Learning Rate Alpha Studies

💡 High-Impact Takeaways:
- Univariate models (Age or BMI alone) are weak predictors (R² < 9%). But adding a single high-leverage categorical dimension (Smoking Status) shot the accuracy to 74.7%!
- Air pollution (NOx) has a clear, measurable negative elasticity on housing pricing, matching the exact coefficients published in 1978.
- Vectorized gradient descent with standardized features converged in 300 epochs vs. over 3000 epochs on raw features!

⚠️ An Important Ethical Critique:
Faithfully reproducing the 1978 Boston Housing study meant dealing with variable 'B'—a demographic metric tracking neighborhood racial proportions designed to penalize integrated communities. It was a sobering reminder of how historic redlining biases can be mathematically encoded into algorithms. As engineers, we must actively inspect and critique our datasets.

I also built a stunning, interactive glassmorphic web showcase where you can plot coordinates, select optimizer rates, and watch parameters trace their trajectories down the loss contour valley!

Check out my full research notebook and web sandbox here:
🔗 [Insert GitHub Link]

#MachineLearning #DataScience #Math #AI #LinearRegression #Python
```
