// Classe pour gérer la visualisation des algorithmes de tri

class SortVisualizer {
    constructor() {
        this.array = [];
        this.isRunning = false;
        this.isPaused = false;
        this.speed = 500; // ms
        this.currentAlgorithm = null;
        
        // Statistiques
        this.comparisons = 0;
        this.swaps = 0;
        this.steps = 0;
        
        // Éléments du DOM
        this.arrayContainer = document.getElementById('array-container');
        this.comparisonsElement = document.getElementById('comparisons');
        this.swapsElement = document.getElementById('swaps');
        this.stepsElement = document.getElementById('steps');
        this.pseudocodeElement = document.getElementById('pseudocode');
        
        // États des barres
        this.comparing = new Set();
        this.swapping = new Set();
        this.sorted = new Set();
        this.pivot = new Set();
        
        this.init();
    }
    
    init() {
        this.generateNewArray();
        this.updateDisplay();
    }
    
    generateNewArray(size = 15) {
        this.array = generateRandomArray(size);
        this.resetStats();
        this.clearAllHighlights();
        this.updateDisplay();
    }
    
    resetStats() {
        this.comparisons = 0;
        this.swaps = 0;
        this.steps = 0;
        this.updateStats();
    }
    
    updateStats() {
        this.comparisonsElement.textContent = this.comparisons;
        this.swapsElement.textContent = this.swaps;
        this.stepsElement.textContent = this.steps;
    }
    
    incrementComparisons() {
        this.comparisons++;
        this.steps++;
        this.updateStats();
    }
    
    incrementSwaps() {
        this.swaps++;
        this.steps++;
        this.updateStats();
    }
    
    setSpeed(speed) {
        // Convertir la valeur du slider (1-10) en délai (ms)
        this.speed = 1100 - (speed * 100); // 1000ms à 100ms
    }
    
    async delay() {
        if (this.isPaused) {
            await this.waitForResume();
        }
        return new Promise(resolve => setTimeout(resolve, this.speed));
    }
    
    async waitForResume() {
        return new Promise(resolve => {
            const checkPause = () => {
                if (!this.isPaused) {
                    resolve();
                } else {
                    setTimeout(checkPause, 100);
                }
            };
            checkPause();
        });
    }
    
    updateDisplay() {
        this.arrayContainer.innerHTML = '';
        
        if (this.array.length === 0) return;
        
        const maxValue = Math.max(...this.array);
        const containerHeight = 300;
        
        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            bar.id = `bar-${index}`;
            
            const height = (value / maxValue) * (containerHeight - 20);
            bar.style.height = `${height}px`;
            bar.textContent = value;
            
            // Appliquer les classes d'état
            if (this.comparing.has(index)) bar.classList.add('comparing');
            if (this.swapping.has(index)) bar.classList.add('swapping');
            if (this.sorted.has(index)) bar.classList.add('sorted');
            if (this.pivot.has(index)) bar.classList.add('pivot');
            
            this.arrayContainer.appendChild(bar);
        });
    }
    
    setComparing(indices) {
        this.clearHighlights();
        indices.forEach(index => this.comparing.add(index));
        this.updateDisplay();
    }
    
    setSwapping(indices) {
        this.clearHighlights();
        indices.forEach(index => this.swapping.add(index));
        this.updateDisplay();
    }
    
    setSorted(indices) {
        indices.forEach(index => this.sorted.add(index));
        this.updateDisplay();
    }
    
    setPivot(indices) {
        this.clearHighlights();
        indices.forEach(index => this.pivot.add(index));
        this.updateDisplay();
    }
    
    clearHighlights() {
        this.comparing.clear();
        this.swapping.clear();
        this.pivot.clear();
        this.updateDisplay();
    }
    
    clearAllHighlights() {
        this.comparing.clear();
        this.swapping.clear();
        this.sorted.clear();
        this.pivot.clear();
        this.updateDisplay();
    }
    
    highlightCode(lineNumber) {
        // Effacer les highlights précédents
        const lines = this.pseudocodeElement.querySelectorAll('.code-line');
        lines.forEach(line => {
            line.classList.remove('highlight', 'executing');
        });
        
        // Mettre en évidence la ligne actuelle
        if (lineNumber && lines[lineNumber - 1]) {
            lines[lineNumber - 1].classList.add('executing');
            lines[lineNumber - 1].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    displayPseudocode(algorithm) {
        if (!algorithms[algorithm]) return;
        
        const pseudocode = algorithms[algorithm].pseudocode;
        const lines = pseudocode.split('\n');
        
        let html = '';
        lines.forEach((line, index) => {
            html += `<span class="code-line" data-line="${index + 1}">${line}</span>\n`;
        });
        
        this.pseudocodeElement.innerHTML = `<code>${html}</code>`;
    }
    
    async runAlgorithm(algorithmName) {
        if (this.isRunning) return;
        
        const algorithm = algorithms[algorithmName];
        if (!algorithm) return;
        
        this.isRunning = true;
        this.currentAlgorithm = algorithmName;
        this.resetStats();
        this.clearAllHighlights();
        this.displayPseudocode(algorithmName);
        
        try {
            // Créer une copie du tableau pour le tri
            const arrayToSort = [...this.array];
            await algorithm.sort(arrayToSort, this);
            
            // Mettre à jour le tableau principal avec le résultat
            this.array = arrayToSort;
            this.updateDisplay();
            
        } catch (error) {
            console.error('Erreur pendant le tri:', error);
        } finally {
            this.isRunning = false;
            this.isPaused = false;
            
            // Marquer tous les éléments comme triés à la fin
            for (let i = 0; i < this.array.length; i++) {
                this.setSorted([i]);
            }
            
            // Animation finale
            await this.celebrateSort();
        }
    }
    
    async celebrateSort() {
        // Animation de célébration - faire "sauter" les barres
        for (let i = 0; i < this.array.length; i++) {
            const bar = document.getElementById(`bar-${i}`);
            if (bar) {
                bar.style.transform = 'translateY(-10px) scale(1.05)';
                bar.style.transition = 'transform 0.3s ease';
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
        
        // Remettre les barres à leur position normale
        setTimeout(() => {
            for (let i = 0; i < this.array.length; i++) {
                const bar = document.getElementById(`bar-${i}`);
                if (bar) {
                    bar.style.transform = '';
                }
            }
        }, 1000);
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
    }
    
    stop() {
        this.isRunning = false;
        this.isPaused = false;
        this.clearAllHighlights();
        this.updateDisplay();
    }
    
    reset() {
        this.stop();
        this.generateNewArray();
        this.pseudocodeElement.innerHTML = '<code>// Sélectionnez un algorithme pour voir son pseudo-code\n// Les lignes seront mises en évidence pendant l\'exécution</code>';
    }
}

// Fonctions utilitaires pour les animations
function animateElement(element, animation) {
    element.style.animation = animation;
    return new Promise(resolve => {
        element.addEventListener('animationend', resolve, { once: true });
    });
}

// Gestionnaire pour les événements tactiles (mobile)
function addTouchSupport() {
    const buttons = document.querySelectorAll('.algo-btn, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Initialiser le support tactile
document.addEventListener('DOMContentLoaded', addTouchSupport);
