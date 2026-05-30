/**
 * ==========================================================================
 * LINEAR REGRESSION SHOWCASE - CORE JS ENGINE
 * ==========================================================================
 */

// Sourced numerical results from our Python Jupyter Notebook run
const STUDY_DATA = {
    insurance: {
        r2_age: 0.0894,
        r2_bmi: 0.0393,
        r2_multi: 0.7475,
        evolution_labels: ['Age Univariate Only', 'BMI Univariate Only', 'Age + BMI + Smoker (Multi)'],
        evolution_scores: [0.0894, 0.0393, 0.7475]
    },
    boston: {
        r2_nox: 0.1826,
        r2_multi: 0.7406,
        features: ['lstat', 'rm', 'dis', 'tax', 'ptratio', 'nox', 'zn', 'crim', 'b', 'chas', 'indus', 'age'],
        importances: [-3.7436, 2.6742, -3.1040, -2.0768, -2.0606, -2.0567, 1.0816, -0.9281, 0.8493, 0.6817, 0.1409, 0.0195]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initScrollAnimations();
    initStaticCharts();
    initGDSandbox();
});

/* ==========================================================================
   TAB NAVIGATION SYSTEM
   ========================================================================== */
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const insightText = document.getElementById('ins-insight-text');
    
    const tabInsights = {
        'tab-ins-age': 'Age displays a solid, highly distinct linear banding structure. The custom OLS regression line shows a cost increment of roughly $257 for every year of age. However, univariate accuracy remains limited (R² = 0.089) due to multiple underlying population tiers.',
        'tab-ins-bmi': 'Body Mass Index (BMI) exhibits a widely dispersed scatter distribution. OLS calculations confirm a positive correlation (higher BMI yields higher average cost), but the individual linear accuracy is incredibly weak (R² = 0.039), indicating that BMI alone is a poor standalone predictor.',
        'tab-ins-smoker': 'Adding the binary indicator for Smoking status triggers a massive statistical jump! R² accuracy sky-rockets from a poor ~0.089 to an outstanding 0.7475. This demonstrates how a high-leverage qualitative variable partitions the data into separate predictive manifolds.'
    };

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedTab = btn.getAttribute('data-tab');
            
            // Toggle buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle content panels
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === selectedTab) {
                    content.classList.add('active');
                }
            });
            
            // Update insights paragraph
            insightText.style.opacity = 0;
            setTimeout(() => {
                insightText.textContent = tabInsights[selectedTab];
                insightText.style.opacity = 1;
            }, 150);
        });
    });
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.glass-card, .section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

/* ==========================================================================
   STATIC CHARTS CREATION (Chart.js)
   ========================================================================== */
function initStaticCharts() {
    // A. Chart.js global settings
    Chart.defaults.color = '#8b949e';
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
    
    // B. Generate synthetic visual distributions matching Lantz Insurance
    const genInsuranceAgePoints = () => {
        const points = [];
        const seedRandom = (i) => {
            let x = Math.sin(i) * 10000;
            return x - Math.floor(x);
        };
        // 100 sample subset points for cleaner charting performance
        for(let i=0; i<120; i++) {
            let age = 18 + seedRandom(i) * 46;
            let charges = 0;
            let smoker = seedRandom(i+1) < 0.2;
            if (smoker) {
                charges = 15000 + age * 280 + seedRandom(i+2) * 12000 + 12000;
            } else {
                charges = 2000 + age * 240 + seedRandom(i+3) * 6000;
            }
            points.push({x: age, y: charges});
        }
        return points;
    };

    const genInsuranceBmiPoints = () => {
        const points = [];
        const seedRandom = (i) => {
            let x = Math.sin(i) * 10000;
            return x - Math.floor(x);
        };
        for(let i=0; i<120; i++) {
            let bmi = 18 + seedRandom(i) * 28;
            let charges = 0;
            let smoker = seedRandom(i+1) < 0.25;
            if (smoker && bmi > 30) {
                charges = 32000 + bmi * 350 + seedRandom(i+2) * 10000;
            } else if (smoker) {
                charges = 18000 + bmi * 250 + seedRandom(i+3) * 8000;
            } else {
                charges = 1000 + bmi * 200 + seedRandom(i+4) * 7000;
            }
            points.push({x: bmi, y: charges});
        }
        return points;
    };

    // 1. Insurance Age Chart
    const ctxAge = document.getElementById('chart-insurance-age').getContext('2d');
    const agePoints = genInsuranceAgePoints();
    const sortedAgePoints = [...agePoints].sort((a,b) => a.x - b.x);
    
    new Chart(ctxAge, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Charges ($)',
                data: agePoints,
                backgroundColor: 'rgba(162, 89, 255, 0.45)',
                borderColor: 'rgba(162, 89, 255, 0.8)',
                borderWidth: 1,
                pointRadius: 4,
                hoverRadius: 6
            }, {
                label: 'OLS Fit (Charges = Age * 257 + 3165)',
                type: 'line',
                data: [
                    {x: 18, y: 18 * 257 + 3165},
                    {x: 64, y: 64 * 257 + 3165}
                ],
                borderColor: 'rgba(0, 240, 255, 1)',
                borderWidth: 3,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Age (Years)' }, grid: { color: 'rgba(255,255,255,0.03)' } },
                y: { title: { display: true, text: 'Charges ($)' }, grid: { color: 'rgba(255,255,255,0.03)' } }
            }
        }
    });

    // 2. Insurance BMI Chart
    const ctxBmi = document.getElementById('chart-insurance-bmi').getContext('2d');
    const bmiPoints = genInsuranceBmiPoints();
    
    new Chart(ctxBmi, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Charges ($)',
                data: bmiPoints,
                backgroundColor: 'rgba(46, 204, 113, 0.45)',
                borderColor: 'rgba(46, 204, 113, 0.8)',
                borderWidth: 1,
                pointRadius: 4,
                hoverRadius: 6
            }, {
                label: 'OLS Fit Line',
                type: 'line',
                data: [
                    {x: 18, y: 18 * 393 + 1200},
                    {x: 46, y: 46 * 393 + 1200}
                ],
                borderColor: 'rgba(0, 240, 255, 1)',
                borderWidth: 3,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'BMI Score' }, grid: { color: 'rgba(255,255,255,0.03)' } },
                y: { title: { display: true, text: 'Charges ($)' }, grid: { color: 'rgba(255,255,255,0.03)' } }
            }
        }
    });

    // 3. Insurance Evolution Bar Chart
    const ctxEvolution = document.getElementById('chart-insurance-evolution').getContext('2d');
    new Chart(ctxEvolution, {
        type: 'bar',
        data: {
            labels: STUDY_DATA.insurance.evolution_labels,
            datasets: [{
                label: 'Model R² Accuracy',
                data: STUDY_DATA.insurance.evolution_scores,
                backgroundColor: [
                    'rgba(162, 89, 255, 0.65)',
                    'rgba(46, 204, 113, 0.65)',
                    'rgba(0, 240, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(162, 89, 255, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(0, 240, 255, 1)'
                ],
                borderWidth: 1.5,
                barThickness: 50
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 0, max: 1.0, title: { display: true, text: 'R² Score (Coefficient of Determination)' }, grid: { color: 'rgba(255,255,255,0.03)' } }
            }
        }
    });

    // 4. Boston Housing NOx Chart
    const ctxBostonNox = document.getElementById('chart-boston-nox').getContext('2d');
    const genBostonNoxPoints = () => {
        const points = [];
        const seedRandom = (i) => {
            let x = Math.sin(i) * 12345;
            return x - Math.floor(x);
        };
        for(let i=0; i<100; i++) {
            let nox = 0.38 + seedRandom(i) * 0.49;
            // House prices generally go down as NOx increases
            let medv = 36.0 - nox * 25.0 + seedRandom(i+1) * 9.0;
            if (medv < 5) medv = 5;
            points.push({x: nox, y: medv});
        }
        return points;
    };
    
    new Chart(ctxBostonNox, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Boston Blocks',
                data: genBostonNoxPoints(),
                backgroundColor: 'rgba(46, 204, 113, 0.55)',
                borderColor: 'rgba(46, 204, 113, 0.8)',
                borderWidth: 1,
                pointRadius: 4.5
            }, {
                label: 'OLS Price Decay Curve',
                type: 'line',
                data: [
                    {x: 0.38, y: 36.0 - 0.38 * 25.0 + 4.5},
                    {x: 0.87, y: 36.0 - 0.87 * 25.0 + 4.5}
                ],
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 3,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Nitric Oxides concentration (parts per 10M)' }, grid: { color: 'rgba(255,255,255,0.03)' } },
                y: { title: { display: true, text: 'Median Home Value ($1000s)' }, grid: { color: 'rgba(255,255,255,0.03)' } }
            }
        }
    });

    // 5. Boston Housing Feature Importance Chart (Standardized coefficients)
    const ctxBostonImportance = document.getElementById('chart-boston-importance').getContext('2d');
    new Chart(ctxBostonImportance, {
        type: 'bar',
        data: {
            labels: STUDY_DATA.boston.features,
            datasets: [{
                label: 'Standardized Coefficient Weight',
                data: STUDY_DATA.boston.importances,
                backgroundColor: STUDY_DATA.boston.importances.map(val => val < 0 ? 'rgba(231, 76, 60, 0.65)' : 'rgba(46, 204, 113, 0.65)'),
                borderColor: STUDY_DATA.boston.importances.map(val => val < 0 ? 'rgba(231, 76, 60, 1)' : 'rgba(46, 204, 113, 1)'),
                borderWidth: 1.5
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Coefficient Weight Impact' }, grid: { color: 'rgba(255,255,255,0.03)' } }
            }
        }
    });
}

/* ==========================================================================
   SECTION 1: GRADIENT DESCENT SANDBOX & CONTOUR SYSTEM
   ========================================================================== */
function initGDSandbox() {
    const canvas = document.getElementById('sandbox-canvas');
    const ctx = canvas.getContext('2d');
    const contourCanvas = document.getElementById('contour-canvas');
    const contourCtx = contourCanvas.getContext('2d');
    
    // Select HTML control links
    const btnPlay = document.getElementById('btn-play-gd');
    const btnStep = document.getElementById('btn-step-gd');
    const btnReset = document.getElementById('btn-reset-gd');
    const btnClear = document.getElementById('btn-clear-points');
    const btnGenLinear = document.getElementById('btn-gen-linear');
    const btnGenOutliers = document.getElementById('btn-gen-outliers');
    
    const selectMode = document.getElementById('select-gd-mode');
    const sliderLR = document.getElementById('slider-lr');
    const valLR = document.getElementById('val-lr');
    const sliderSpeed = document.getElementById('slider-speed');
    const valSpeed = document.getElementById('val-speed');
    
    const lblEpoch = document.getElementById('live-epoch');
    const lblLoss = document.getElementById('live-loss');
    const lblSlope = document.getElementById('live-slope');
    const lblIntercept = document.getElementById('live-intercept');

    // State Variables
    let points = []; // Array of {x, y} mapped to math coordinates [-10, 10]
    let w = 0.0;
    let b = 0.0;
    let gdPlaying = false;
    let epoch = 0;
    let learningRate = parseFloat(sliderLR.value);
    let simSpeed = parseInt(sliderSpeed.value);
    let gdMode = selectMode.value; // 'batch', 'stochastic', 'minibatch'
    let animationTimer = null;
    let trajectory = []; // list of {w, b}

    // Canvas scaling mappings
    // Screen dimensions: 600 width, 400 height
    // Math range: x in [0, 10], y in [0, 10]
    const screenToMath = (sx, sy) => {
        let rect = canvas.getBoundingClientRect();
        // Scale factor due to styling width responsive stretching
        let scaleX = canvas.width / rect.width;
        let scaleY = canvas.height / rect.height;
        let x = (sx - rect.left) * scaleX;
        let y = (sy - rect.top) * scaleY;
        
        let mx = (x / canvas.width) * 10;
        let my = 10 - (y / canvas.height) * 10; // Flip Y axis
        return { x: mx, y: my };
    };

    const mathToScreen = (mx, my) => {
        let sx = (mx / 10) * canvas.width;
        let sy = (1 - (my / 10)) * canvas.height;
        return { x: sx, y: sy };
    };

    // Preset point structures
    const generateLinearPoints = () => {
        points = [];
        for(let i=0; i<15; i++) {
            let mx = 1.0 + (i / 14) * 8.0;
            let my = 2.0 + mx * 0.7 + (Math.sin(i) * 0.5);
            points.push({x: mx, y: my});
        }
        resetModelParameters();
        drawSandboxGrid();
        updateDisplayMetrics();
    };

    const generateOutliersPoints = () => {
        points = [];
        for(let i=0; i<12; i++) {
            let mx = 1.5 + (i / 11) * 7.0;
            let my = 1.5 + mx * 0.6 + (Math.cos(i) * 0.4);
            points.push({x: mx, y: my});
        }
        // Add two massive outlier matrices
        points.push({x: 2.0, y: 9.0});
        points.push({x: 8.5, y: 1.5});
        resetModelParameters();
        drawSandboxGrid();
        updateDisplayMetrics();
    };

    // Calculate closed-form OLS solutions instantly
    const solveOLS = () => {
        if(points.length < 2) return { w: 0, b: 0 };
        let meanX = 0, meanY = 0;
        points.forEach(p => { meanX += p.x; meanY += p.y; });
        meanX /= points.length;
        meanY /= points.length;
        
        let num = 0, den = 0;
        points.forEach(p => {
            num += (p.x - meanX) * (p.y - meanY);
            den += (p.x - meanX) ** 2;
        });
        
        let olsW = den === 0 ? 0 : num / den;
        let olsB = meanY - olsW * meanX;
        return { w: olsW, b: olsB };
    };

    // Calculate MSE loss
    const computeMSE = (modelW, modelB) => {
        if(points.length === 0) return 0;
        let sumSqrError = 0;
        points.forEach(p => {
            let pred = modelW * p.x + modelB;
            sumSqrError += (pred - p.y) ** 2;
        });
        return sumSqrError / (2 * points.length);
    };

    // Step-by-Step Gradient Descent update
    const stepGradientDescent = () => {
        if (points.length === 0) return;
        const m = points.length;
        
        if (gdMode === 'batch') {
            let dw = 0;
            let db = 0;
            points.forEach(p => {
                let error = (w * p.x + b) - p.y;
                dw += error * p.x;
                db += error;
            });
            w -= learningRate * (dw / m);
            b -= learningRate * (db / m);
        } 
        else if (gdMode === 'stochastic') {
            let randIdx = Math.floor(Math.random() * m);
            let p = points[randIdx];
            let error = (w * p.x + b) - p.y;
            w -= learningRate * error * p.x;
            b -= learningRate * error;
        } 
        else if (gdMode === 'minibatch') {
            const batchSize = Math.min(4, m);
            let dw = 0;
            let db = 0;
            for(let i=0; i<batchSize; i++) {
                let randIdx = Math.floor(Math.random() * m);
                let p = points[randIdx];
                let error = (w * p.x + b) - p.y;
                dw += error * p.x;
                db += error;
            }
            w -= learningRate * (dw / batchSize);
            b -= learningRate * (db / batchSize);
        }

        epoch++;
        trajectory.push({ w, b });
        if(trajectory.length > 80) trajectory.shift(); // Keep visual path clean
        
        drawSandboxGrid();
        updateDisplayMetrics();
    };

    const runGDLoop = () => {
        if (!gdPlaying) return;
        stepGradientDescent();
        setTimeout(() => {
            animationTimer = requestAnimationFrame(runGDLoop);
        }, 1000 / simSpeed);
    };

    const togglePlayState = () => {
        gdPlaying = !gdPlaying;
        if(gdPlaying) {
            btnPlay.classList.add('playing');
            btnPlay.innerHTML = `<span class="btn-icon">⏸</span> <span class="btn-text">Pause GD</span>`;
            runGDLoop();
        } else {
            btnPlay.classList.remove('playing');
            btnPlay.innerHTML = `<span class="btn-icon">▶</span> <span class="btn-text">Play GD</span>`;
            cancelAnimationFrame(animationTimer);
        }
    };

    const resetModelParameters = () => {
        w = 0.0;
        b = 0.0;
        epoch = 0;
        trajectory = [{w, b}];
        if (gdPlaying) togglePlayState();
        drawSandboxGrid();
        updateDisplayMetrics();
    };

    const updateDisplayMetrics = () => {
        lblEpoch.textContent = epoch;
        
        let loss = computeMSE(w, b);
        
        // Divergence Check (Learning Rate is too high)
        if (isNaN(loss) || !isFinite(loss) || loss > 100000 || isNaN(w) || !isFinite(w) || isNaN(b) || !isFinite(b)) {
            if (gdPlaying) {
                togglePlayState();
            }
            lblLoss.innerHTML = `<span style="color: var(--accent-red); font-weight: bold; text-shadow: 0 0 6px rgba(239,68,68,0.3)">Diverged</span>`;
            lblSlope.textContent = "Over limit";
            lblIntercept.textContent = "Over limit";
            document.querySelector('.canvas-instructions').innerHTML = `<span style="color: var(--accent-red); font-weight: bold;">Warning: Model diverged! Learning rate (&alpha;) is too high. Reset parameters.</span>`;
            return;
        }
        
        lblLoss.textContent = loss.toFixed(4);
        lblSlope.textContent = w.toFixed(4);
        lblIntercept.textContent = b.toFixed(4);
        
        // Reset instructions if healthy
        if (points.length > 0) {
            document.querySelector('.canvas-instructions').textContent = "Click grid to add coordinates. Drag to reposition. Right-click to remove.";
        }
        
        drawContourValley();
    };

    /* ==========================================================================
       GRID DRAWING CONTROLLERS
       ========================================================================== */
    const drawSandboxGrid = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 1. Draw matrix coordinate grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        for(let i=0; i<=10; i++) {
            let startH = mathToScreen(0, i);
            let endH = mathToScreen(10, i);
            ctx.beginPath();
            ctx.moveTo(startH.x, startH.y);
            ctx.lineTo(endH.x, endH.y);
            ctx.stroke();
            
            let startV = mathToScreen(i, 0);
            let endV = mathToScreen(i, 10);
            ctx.beginPath();
            ctx.moveTo(startV.x, startV.y);
            ctx.lineTo(endV.x, endV.y);
            ctx.stroke();
        }

        // 2. Draw standard OLS Perfect solution (Green dotted)
        if(points.length >= 2) {
            let ols = solveOLS();
            ctx.strokeStyle = 'rgba(46, 204, 113, 0.45)';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([6, 4]);
            ctx.beginPath();
            let startY = ols.w * 0 + ols.b;
            let endY = ols.w * 10 + ols.b;
            let screenStart = mathToScreen(0, startY);
            let screenEnd = mathToScreen(10, endY);
            ctx.moveTo(screenStart.x, screenStart.y);
            ctx.lineTo(screenEnd.x, screenEnd.y);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // 3. Draw gradient descent convergence line (Purple Solid Glow)
        if (!isNaN(w) && isFinite(w) && !isNaN(b) && isFinite(b) && Math.abs(w) < 100000 && Math.abs(b) < 100000) {
            ctx.strokeStyle = 'rgba(162, 89, 255, 1)';
            ctx.lineWidth = 4;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(162, 89, 255, 0.5)';
            ctx.beginPath();
            let startY = w * 0 + b;
            let endY = w * 10 + b;
            let screenStart = mathToScreen(0, startY);
            let screenEnd = mathToScreen(10, endY);
            ctx.moveTo(screenStart.x, screenStart.y);
            ctx.lineTo(screenEnd.x, screenEnd.y);
            ctx.stroke();
            ctx.shadowBlur = 0; // Reset glow
        }

        // 4. Draw Coordinates Points
        ctx.fillStyle = 'rgba(0, 240, 255, 1)';
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1.5;
        points.forEach(p => {
            let pos = mathToScreen(p.x, p.y);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 6.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });
    };

    /* ==========================================================================
       CONTOUR TRAJECTORY DRAWING
       ========================================================================== */
    const drawContourValley = () => {
        contourCtx.clearRect(0, 0, contourCanvas.width, contourCanvas.height);
        
        let ols = solveOLS();
        let centerX = contourCanvas.width / 2;
        let centerY = contourCanvas.height / 2;
        
        // Draw nested ellipses centered at the optimal parameter coordinate OLS
        for(let i=0; i<6; i++) {
            let radiusX = (6 - i) * 22;
            let radiusY = (6 - i) * 11;
            contourCtx.strokeStyle = `rgba(0, 240, 255, ${0.05 + i * 0.03})`;
            contourCtx.lineWidth = 1.5;
            contourCtx.beginPath();
            contourCtx.ellipse(centerX, centerY, radiusX, radiusY, Math.PI/6, 0, Math.PI*2);
            contourCtx.stroke();
        }

        // Draw perfect optimal star coordinate (OLS parameters)
        contourCtx.fillStyle = 'rgba(46, 204, 113, 1)';
        contourCtx.beginPath();
        contourCtx.arc(centerX, centerY, 5, 0, Math.PI*2);
        contourCtx.fill();

        // Map weight parameters (w, b) coordinates relative to OLS baseline
        if(points.length > 0) {
            contourCtx.strokeStyle = 'rgba(231, 76, 60, 0.8)';
            contourCtx.lineWidth = 2;
            contourCtx.beginPath();
            
            trajectory.forEach((t, idx) => {
                // Scaling relative delta onto canvas grid
                let dx = (t.w - ols.w) * 35;
                let dy = (t.b - ols.b) * 15;
                
                let plotX = centerX + dx;
                let plotY = centerY - dy;
                
                if (idx === 0) contourCtx.moveTo(plotX, plotY);
                else contourCtx.lineTo(plotX, plotY);
            });
            contourCtx.stroke();

            // Draw current active weights tracker (Red dot)
            if(trajectory.length > 0) {
                let latest = trajectory[trajectory.length - 1];
                let dx = (latest.w - ols.w) * 35;
                let dy = (latest.b - ols.b) * 15;
                contourCtx.fillStyle = 'rgba(231, 76, 60, 1)';
                contourCtx.beginPath();
                contourCtx.arc(centerX + dx, centerY - dy, 4.5, 0, Math.PI*2);
                contourCtx.fill();
            }
        }
    };

    /* ==========================================================================
       CANVAS EVENT LISTENER MANAGERS
       ========================================================================== */
    canvas.addEventListener('mousedown', (e) => {
        if(e.button === 0) { // Left-click: Add coordinate
            let mathPos = screenToMath(e.clientX, e.clientY);
            // Check if user clicked near an existing point to select/delete
            let clickedIndex = -1;
            points.forEach((p, idx) => {
                let dist = Math.hypot(p.x - mathPos.x, p.y - mathPos.y);
                if(dist < 0.3) clickedIndex = idx;
            });

            if (clickedIndex === -1) {
                points.push(mathPos);
            }
        } else if (e.button === 2) { // Right-click: Delete coordinate
            let mathPos = screenToMath(e.clientX, e.clientY);
            let clickedIndex = -1;
            points.forEach((p, idx) => {
                let dist = Math.hypot(p.x - mathPos.x, p.y - mathPos.y);
                if(dist < 0.35) clickedIndex = idx;
            });
            if (clickedIndex !== -1) {
                points.splice(clickedIndex, 1);
            }
        }
        drawSandboxGrid();
        updateDisplayMetrics();
    });

    // Disable default right-click menu popping up on canvas space
    canvas.addEventListener('contextmenu', e => e.preventDefault());

    // Event control mappings
    btnPlay.addEventListener('click', togglePlayState);
    btnStep.addEventListener('click', stepGradientDescent);
    btnReset.addEventListener('click', resetModelParameters);
    btnClear.addEventListener('click', () => {
        points = [];
        resetModelParameters();
    });
    btnGenLinear.addEventListener('click', generateLinearPoints);
    btnGenOutliers.addEventListener('click', generateOutliersPoints);
    
    selectMode.addEventListener('change', () => {
        gdMode = selectMode.value;
        document.getElementById('val-gd-mode').textContent = selectMode.options[selectMode.selectedIndex].text;
    });

    sliderLR.addEventListener('input', () => {
        learningRate = parseFloat(sliderLR.value);
        valLR.textContent = learningRate.toFixed(3);
        
        // Update styling of active slider pills
        document.querySelectorAll('.preset-pill').forEach(pill => {
            pill.classList.remove('active');
            if (parseFloat(pill.getAttribute('data-lr')) === learningRate) {
                pill.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.preset-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            let lrVal = parseFloat(pill.getAttribute('data-lr'));
            sliderLR.value = lrVal;
            learningRate = lrVal;
            valLR.textContent = lrVal.toFixed(3);
            
            document.querySelectorAll('.preset-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    sliderSpeed.addEventListener('input', () => {
        simSpeed = parseInt(sliderSpeed.value);
        valSpeed.textContent = `${simSpeed} FPS`;
    });

    // Populate initial demo states
    generateLinearPoints();
}
