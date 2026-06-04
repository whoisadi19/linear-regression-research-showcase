# Linear Regression Research Showcase
### Vectorized Machine Learning, Optimization, and Demographics Bias from First Principles

A research replication and interactive web showcase demonstrating the power of **Linear Regression with Gradient Descent** implemented entirely from scratch. Inspired by the core curriculum of Andrew Ng's Machine Learning Specialization (Week 1).

This project reproduces published scientific and socioeconomic findings from two classic datasets:
1. **Medical Insurance Cost Prediction**: Exploring univariate variables, cost surfaces, learning rates, feature scaling, and the massive impact of categorical features.
2. **Harrison & Rubinfeld (1978) - Boston Housing**: Replicating a landmark environmental economics paper estimating household willingness-to-pay for clean air, featuring a critical ethical analysis of historical demographic variables.

**Interactive Sandbox Showcase URL:** Open `web/index.html` in your default browser to launch the custom HTML5 Canvas Gradient Descent Sandbox and real-time contour valley tracer.

---

## 1. From-Scratch Vectorized ML Engine

Instead of importing standard analytical solvers, the core regression models are driven by a custom vectorized optimization engine built in pure `NumPy`.

### Cost Function (Mean Squared Error)
The average squared distance between predictions and ground-truth values is calculated mathematically as:

$$J(\mathbf{w}, b) = \frac{1}{2m} \sum_{i=1}^{m} \left( f_{\mathbf{w},b}(\mathbf{x}^{(i)}) - y^{(i)} \right)^2$$

In vectorized notation, avoiding slow scalar loops, the engine computes:

$$J(\mathbf{w}, b) = \frac{1}{2m} (\mathbf{X}\mathbf{w} + b\mathbf{1} - \mathbf{y})^T(\mathbf{X}\mathbf{w} + b\mathbf{1} - \mathbf{y})$$

### Vectorized Gradient Descent
The parameter updates are driven by computing the exact partial derivatives of the cost surface:

$$\frac{\partial J(\mathbf{w},b)}{\partial \mathbf{w}} = \frac{1}{m} \mathbf{X}^T (\mathbf{X}\mathbf{w} + b\mathbf{1} - \mathbf{y})$$

$$\frac{\partial J(\mathbf{w},b)}{\partial b} = \frac{1}{m} \sum_{i=1}^{m} \left( f_{\mathbf{w},b}(\mathbf{x}^{(i)}) - y^{(i)} \right)$$

Weights and bias are simultaneously updated each epoch scaled by the learning rate ($\alpha$):

$$\mathbf{w} \leftarrow \mathbf{w} - \alpha \frac{\partial J}{\partial \mathbf{w}}$$

$$b \leftarrow b - \alpha \frac{\partial J}{\partial b}$$

---

## 2. Research Study 1: Medical Insurance Cost Prediction
**Objective**: Analyze actuarial metrics driving individual medical charges based on 1,338 records.

### Key Discoveries & Reproductions
*   **Age Univariate Regressor ($R^2 = 0.0894$)**: Age exhibits a steady positive drift of **$\approx \$257.00$** in annual charges for every year of life. However, univariate models are heavily constrained due to distinct bands in the data.
*   **BMI Univariate Regressor ($R^2 = 0.0393$)**: While a positive coefficient confirms higher BMI leads to elevated charges, individual correlation is widely dispersed.
*   **The Smoker Accuracy Shift ($R^2 = 0.7475$)**: Introducing the qualitative binary feature `smoker` triggers a **$65.8\%$ R² leap**. In actuarial science, this demonstrates that risk categories partition populations into separate mathematical sub-manifolds, making multi-variable classification essential.

### Hyperparameter Studies
*   **Feature Scaling (Z-Score Normalization)**: Standardizing variables to zero-mean and unit-variance ($\mu=0, \sigma=1$) reshapes the elongated MSE loss valley into a symmetric bowl. This allowed our engine to converge in **300 epochs** (at $\alpha = 0.1$) compared to over **3,000 epochs** on raw unscaled features.
*   **Learning Rate Divergence**: We mapped the boundary behaviors of learning rates ($\alpha$). A small rate ($0.0001$) leads to slow descent, while an excessive rate ($1.5$) triggers infinite parameter oscillation and divergent cost limits.

---

## 3. Research Study 2: Harrison & Rubinfeld (1978) — "Hedonic Housing Prices and the Demand for Clean Air"
**Objective**: Replicate Harrison & Rubinfeld's historic OLS model predicting household willingness-to-pay for environmental air quality based on Nitric Oxides ($NO_x$) levels.

### Key Discoveries & Reproductions
*   **NOx Price Elasticity ($R^2 = 0.1826$)**: A negative coefficient proves housing prices decay in tracts with heavy industrial pollution ($NO_x$).
*   **Full hedonic model ($R^2 = 0.7406$)**: Our custom OLS model matches Scikit-Learn's analytical coefficients, establishing the relative weights of socioeconomic indicators:
    *   **Prime Positive Driver**: Average number of rooms (`rm`, coefficient $2.6742$).
    *   **Prime Negative Driver**: Percentage of lower status population (`lstat`, coefficient $-3.7436$) and Nitric Oxide levels (`nox`, coefficient $-2.0567$).

---

## 4. Ethical Analysis: Redlining & Bias in Historic Datasets

A critical portion of our research focuses on the demographic feature **B** included in the original 1978 Boston Housing study. The variable was defined as:

$$B = 1000 \cdot (B_k - 0.63)^2$$

Where $B_k$ is the proportion of Black residents in a given neighborhood block. 

### Socioeconomic and Mathematical Disparities
1.  **Redlining Codification**: The parabolic nature of this feature penalizes integrated communities while mathematically rewarding segregation (tracts with either very high or very low Black populations). This encodes 1970s mortgage redlining practices directly into the pricing matrix.
2.  **Bias Propagation**: Training modern predictive models on historical datasets with demographic features of this nature propagates systemic racial segregation, reinforcing structural bias under the guise of "objective" ML metrics.
3.  **Engineering Responsibility**: Our notebook and web showcase contain a dedicated ethics panel. As machine learning engineers, we advocate utilizing bias-free datasets (such as the **Ames Housing Dataset**) in modern production systems.

---

## 5. How to Run Locally

### Prerequisites
Make sure Python 3.8+ is installed.

### 1. Execute the Jupyter Notebook
Install dependencies:
```bash
pip install numpy pandas matplotlib seaborn scikit-learn
```
Start Jupyter:
```bash
jupyter notebook notebook/linear_regression_showcase.ipynb
```

### 2. Launch the Web Showcase
Simply double-click or open `web/index.html` in any browser. It runs offline with zero-dependency CDNs and custom HTML5 Canvas renderers.
If you prefer a local server, run:
```bash
npx live-server web
```

---

## 6. Connect on LinkedIn
This project demonstrates that standard linear algebra holds the answers to understanding complex optimizer paths in deep neural networks. Let's connect to discuss systems design, statistics, and machine learning research.

[Your LinkedIn Profile Link]

This repository is archived. Future updates and active development have been consolidated into ml-papers-concepts.
