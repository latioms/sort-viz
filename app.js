// Application principale - Gestion des événements et de l'interface

class SortApp {
    constructor() {
        this.visualizer = new SortVisualizer();
        this.currentAlgorithm = null;
        this.initializeEventListeners();
        this.updateUI();
    }
    
    initializeEventListeners() {
        // Boutons de contrôle
        document.getElementById('start-btn').addEventListener('click', () => this.start());
        document.getElementById('pause-btn').addEventListener('click', () => this.togglePause());
        document.getElementById('reset-btn').addEventListener('click', () => this.reset());
        document.getElementById('new-btn').addEventListener('click', () => this.generateNew());
        
        // Contrôle de vitesse
        document.getElementById('speed').addEventListener('input', (e) => {
            this.visualizer.setSpeed(parseInt(e.target.value));
        });
        
        // Boutons d'algorithmes
        document.querySelectorAll('.algo-btn, .algo-btn-compact').forEach(button => {
            button.addEventListener('click', (e) => {
                const algorithmName = e.currentTarget.dataset.algo;
                this.selectAlgorithm(algorithmName);
            });
        });
        
        // Raccourcis clavier
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Initialiser la vitesse
        this.visualizer.setSpeed(5);
    }
    
    selectAlgorithm(algorithmName) {
        if (this.visualizer.isRunning) return;
        
        // Mettre à jour l'interface
        document.querySelectorAll('.algo-btn, .algo-btn-compact').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector(`[data-algo="${algorithmName}"]`).classList.add('active');
        
        this.currentAlgorithm = algorithmName;
        this.displayAlgorithmInfo(algorithmName);
        this.visualizer.displayPseudocode(algorithmName);
        this.updateUI();
    }
    
    displayAlgorithmInfo(algorithmName) {
        const algorithm = algorithms[algorithmName];
        if (!algorithm) return;
        
        // Mettre à jour le titre
        document.getElementById('algo-title').innerHTML = `
            <span style="font-size: 2rem; margin-right: 10px;">${algorithm.icon}</span>
            ${algorithm.name}
        `;
        
        // Mettre à jour la description
        document.getElementById('algo-description').textContent = algorithm.description;
        
        // Mettre à jour la complexité
        document.getElementById('algo-complexity').innerHTML = `
            <h4>📊 Complexité</h4>
            <ul>
                <li><strong>Temps :</strong> ${algorithm.complexity.time}</li>
                <li><strong>Espace :</strong> ${algorithm.complexity.space}</li>
                <li><strong>Stable :</strong> ${algorithm.complexity.stable}</li>
            </ul>
        `;
        
        // Mettre à jour les étapes
        document.getElementById('algo-steps').innerHTML = `
            <h4>🔄 Principe de fonctionnement</h4>
            <ol>
                ${algorithm.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        `;
    }
    
    async start() {
        if (!this.currentAlgorithm) {
            this.showMessage('Veuillez sélectionner un algorithme first !', 'warning');
            return;
        }
        
        if (this.visualizer.isRunning) {
            this.showMessage('Un tri est déjà en cours !', 'warning');
            return;
        }
        
        this.updateUI();
        await this.visualizer.runAlgorithm(this.currentAlgorithm);
        this.updateUI();
    }
    
    togglePause() {
        if (!this.visualizer.isRunning) return;
        
        if (this.visualizer.isPaused) {
            this.visualizer.resume();
            document.getElementById('pause-btn').innerHTML = '⏸ Pause';
        } else {
            this.visualizer.pause();
            document.getElementById('pause-btn').innerHTML = '▶ Reprendre';
        }
        
        this.updateUI();
    }
    
    reset() {
        this.visualizer.reset();
        document.getElementById('pause-btn').innerHTML = '⏸ Pause';
        this.updateUI();
    }
    
    generateNew() {
        if (this.visualizer.isRunning) {
            this.showMessage('Impossible de générer un nouveau tableau pendant le tri !', 'warning');
            return;
        }
        
        // Options pour différents types de tableaux
        const options = [
            () => generateRandomArray(15),
            () => generateNearlySortedArray(15),
            () => generateReversedArray(15),
            () => generateRandomArray(20, 5, 100),
            () => generateRandomArray(10, 20, 200)
        ];
        
        const randomOption = options[Math.floor(Math.random() * options.length)];
        this.visualizer.array = randomOption();
        this.visualizer.resetStats();
        this.visualizer.clearAllHighlights();
        this.visualizer.updateDisplay();
        
        this.showMessage('Nouveau tableau généré !', 'success');
    }
    
    updateUI() {
        const isRunning = this.visualizer.isRunning;
        const isPaused = this.visualizer.isPaused;
        const hasAlgorithm = this.currentAlgorithm !== null;
        
        // Boutons de contrôle
        document.getElementById('start-btn').disabled = isRunning || !hasAlgorithm;
        document.getElementById('pause-btn').disabled = !isRunning;
        document.getElementById('reset-btn').disabled = false;
        document.getElementById('new-btn').disabled = isRunning;
        
        // Boutons d'algorithmes
        document.querySelectorAll('.algo-btn, .algo-btn-compact').forEach(btn => {
            btn.disabled = isRunning;
        });
        
        // Contrôle de vitesse
        document.getElementById('speed').disabled = false;
        
        // Mettre à jour le texte du bouton pause
        if (!isRunning) {
            document.getElementById('pause-btn').innerHTML = '⏸ Pause';
        }
    }
    
    handleKeyboard(event) {
        // Éviter les conflits avec les champs de saisie
        if (event.target.tagName === 'INPUT') return;
        
        switch (event.code) {
            case 'Space':
                event.preventDefault();
                if (this.visualizer.isRunning) {
                    this.togglePause();
                } else {
                    this.start();
                }
                break;
                
            case 'KeyR':
                event.preventDefault();
                this.reset();
                break;
                
            case 'KeyN':
                event.preventDefault();
                this.generateNew();
                break;
                
            case 'Digit1':
                event.preventDefault();
                this.selectAlgorithm('bubble');
                break;
                
            case 'Digit2':
                event.preventDefault();
                this.selectAlgorithm('insertion');
                break;
                
            case 'Digit3':
                event.preventDefault();
                this.selectAlgorithm('selection');
                break;
                
            case 'Digit4':
                event.preventDefault();
                this.selectAlgorithm('quick');
                break;
                
            case 'Digit5':
                event.preventDefault();
                this.selectAlgorithm('merge');
                break;
                
            case 'Digit6':
                event.preventDefault();
                this.selectAlgorithm('heap');
                break;
        }
    }
    
    showMessage(message, type = 'info') {
        // Créer une notification temporaire
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'warning' ? '#FF9800' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animation de sortie et suppression
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Informations et aide
function showHelp() {
    const helpText = `
🎯 Guide d'utilisation

Raccourcis clavier :
• Espace : Démarrer/Pause
• R : Reset
• N : Nouveau tableau
• 1-6 : Sélectionner algorithme

Algorithmes disponibles :
1. Tri à Bulles - Simple mais lent (O(n²))
2. Tri par Insertion - Bon pour petites listes
3. Tri par Sélection - Simple à comprendre
4. Tri Rapide - Très performant en pratique
5. Tri Fusion - Stable et prévisible
6. Tri par Tas - Efficace avec structure de données

Codes couleur :
🔵 Éléments en cours de comparaison
🔴 Éléments en cours d'échange
🟢 Éléments triés
🟡 Pivot (pour Quick Sort)
    `;
    
    alert(helpText);
}

// Fonction pour exporter les données du tri
function exportData() {
    if (!app.visualizer.array.length) return;
    
    const data = {
        algorithm: app.currentAlgorithm,
        arraySize: app.visualizer.array.length,
        comparisons: app.visualizer.comparisons,
        swaps: app.visualizer.swaps,
        steps: app.visualizer.steps,
        array: [...app.visualizer.array],
        timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sort-data-${data.algorithm}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Initialiser l'application
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new SortApp();
    
    // Afficher un message de bienvenue
    setTimeout(() => {
        app.showMessage('Bienvenue ! Sélectionnez un algorithme pour commencer.', 'info');
    }, 1000);
    
    // Ajouter les événements pour l'aide
    document.addEventListener('keydown', (e) => {
        if (e.code === 'KeyH' && !e.target.matches('input')) {
            e.preventDefault();
            showHelp();
        }
        if (e.code === 'KeyE' && e.ctrlKey) {
            e.preventDefault();
            exportData();
        }
    });
    
    console.log('🔄 Visualisateur d\'algorithmes de tri initialisé !');
    console.log('💡 Appuyez sur H pour l\'aide, Ctrl+E pour exporter les données');
});
